const axios = require("axios")
const crypto = require("crypto")
const zlib = require("zlib")
const axiosThrottle = require("axios-request-throttle").default
const { getRedisClient } = require("@config/redis")
const { decryptData, encryptData } = require("./encryption")

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const CACHE_TIME = process.env.CACHE_TIME || 86400

if (!API_URL || !API_KEY) {
  console.error("API_URL atau API_KEY are not provided in .env")
  process.exit(1)
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, deflate",
  },
})

// Rate Limiting: 5 requests per second
axiosThrottle.use(apiClient, { requestsPerSecond: 5 })

/**
 * Response API helper
 */
const fetchResponse = (data, metaResponse = { cache: false, staleTime: 0 }) => ({
  meta: {
    timestamp: +new Date(),
    ...metaResponse
  },
  body: data,
})

/**
 * Utility for requesting data from API with Redis
 */
const fetchData = async (
  endpoint, 
  params = {}, 
  cachePrefix = 'api_cache', 
  cacheTime = CACHE_TIME
) => {
  const redisClient = getRedisClient()
  
  params.apikey = API_KEY
  
  const queryPart = JSON.stringify(params) || "no-query"
  const queryHash = crypto.createHash("sha256").update(queryPart).digest("hex")
  const cacheKey = `${cachePrefix}:${endpoint}:${queryHash}`
  
  try {
    const cachedData = await redisClient.get(cacheKey)
    
    if (cachedData) {
      const decryptedData = decryptData(cachedData)
      const decompressedData = zlib.gunzipSync(Buffer.from(decryptedData, "base64")).toString()
      const parsedData = JSON.parse(decompressedData)

      const staleTime = Date.now() - parsedData.cachedAt
      
      return fetchResponse(parsedData.data, { 
        cache: true,
        lastUpdated: new Date(parsedData.cachedAt).toLocaleString(),
        staleTime
      })
    }

    const response = await apiClient.get(endpoint, { params })
    const payload = {
      data: response.data,
      cachedAt: Date.now()
    }

    const compressedData = zlib.gzipSync(JSON.stringify(payload)).toString("base64")
    const encryptedData = encryptData(compressedData)
    await redisClient.setEx(cacheKey, cacheTime, encryptedData)

    return fetchResponse(response.data)
  } catch (error) {
    console.log("ERROR: ", error)
    const responseData = error.response?.data
    const message = typeof responseData === "object" ? Object.values(responseData) : responseData
    throw ({
      status: error.status,
      ...fetchResponse({
        code: error?.code ?? null,
        message: message ?? error.message
      })
    })
  }
}

// Request Interceptors
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Fetching: ${config.baseURL}/${config.url}`)
    return config
  },
  (error) => {
    console.error("Request Error:", error.message)
    return Promise.reject(error)
  }
)

// Response Interceptors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      console.warn("Rate Limit Exceeded. Retrying in 2 seconds...")
      await new Promise((res) => setTimeout(res, 2000))
      return apiClient.request(error.config)
    }
    return Promise.reject(error)
  }
)

module.exports = { fetchData }
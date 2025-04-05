import crypto from 'crypto'
import zlib from 'zlib'
import type { ParsedQs } from 'qs'
import { getRedisClient } from '@/config/redis'
import { decryptData, encryptData } from './encryption'
import APIClientFactory from './axios-instance'
import { formatResponse } from './response'

type CacheOptions = {
  prefix: string
  time: number
}

/**
 * Utility for requesting data from API with Redis
 */
const fetchData = async (baseUrl: string, endpoint: string, params: ParsedQs, cache: CacheOptions) => {
  const redisClient = getRedisClient()

  const queryPart = JSON.stringify(params) || 'no-query'
  const queryHash = crypto.createHash('sha256').update(queryPart).digest('hex')
  const cacheKey = `${cache.prefix}:${endpoint}:${queryHash}`

  try {
    const cachedData = await redisClient.get(cacheKey)

    if (cachedData) {
      const decryptedData = decryptData(cachedData)
      const decompressedData = zlib.gunzipSync(Buffer.from(decryptedData, 'base64')).toString()
      const parsedData = JSON.parse(decompressedData)

      const staleTime = Date.now() - parsedData.cachedAt

      return formatResponse(200, {
        meta: {
          cache: true,
          lastUpdated: new Date(parsedData.cachedAt).toLocaleString(),
          staleTime,
        },
        body: parsedData.data,
      })
    }

    const apiClient = APIClientFactory.getInstance(baseUrl)
    const response = await apiClient.get(endpoint, { params })
    const payload = {
      data: response.data,
      cachedAt: Date.now(),
    }

    const compressedData = zlib.gzipSync(JSON.stringify(payload)).toString('base64')
    const encryptedData = encryptData(compressedData)
    await redisClient.setEx(cacheKey, cache.time, encryptedData)

    return formatResponse(response.status, { body: response.data })
  } catch (error) {
    const responseData = error.response?.data
    const message = typeof responseData === 'object' ? Object.values(responseData) : responseData
    throw formatResponse(error.status, {
      body: {
        code: error?.code ?? null,
        message: message ?? error.message,
      },
    })
  }
}

export { fetchData }

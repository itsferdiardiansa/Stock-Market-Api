import axios, { AxiosInstance } from 'axios'
import axiosThrottle from 'axios-request-throttle'

function APIClientFactory() {
  let instances: Map<string, AxiosInstance> = new Map()

  console.log('Instances Factory: ', instances)

  function ApiClientSingleton(apiBaseUrl: string) {
    console.log('Init API Client Singleton: ', instances)
    const apiClient = axios.create({
      baseURL: apiBaseUrl,
      timeout: 20000, // 20 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
    })

    // Rate Limiting: 5 requests per second
    axiosThrottle.use(apiClient, { requestsPerSecond: 5 })

    // Request Interceptor
    apiClient.interceptors.request.use(
      config => {
        console.log(`Fetching: ${config.baseURL}${config.url}`)
        return config
      },
      error => {
        console.error('Request Error:', error.message)
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    apiClient.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 429) {
          console.warn('Rate Limit Exceeded. Retrying in 2 seconds...')
          await new Promise(res => setTimeout(res, 2000))
          return this.apiClient.request(error.config)
        }
        return Promise.reject(error)
      }
    )

    return apiClient
  }

  this.getInstance = (url: string) => {
    if (!instances.has(url)) {
      console.log('First .getInstance(): ', instances)
      instances.set(url, ApiClientSingleton(url))

      const selectedInstace = instances.get(url)
      selectedInstace.constructor = null

      return selectedInstace
    }

    console.log('Cache .getInstance(): ', instances)
    return instances.get(url)
  }
}

export default new APIClientFactory()

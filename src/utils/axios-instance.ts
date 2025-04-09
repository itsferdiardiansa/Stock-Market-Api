import axios, { AxiosInstance } from 'axios'
import axiosThrottle from 'axios-request-throttle'
import logger from './logger'

function APIClientFactory() {
  let instances: Map<string, AxiosInstance> = new Map()

  function ApiClientSingleton(apiBaseUrl: string) {
    logger.info('Axios - init APIClientFactory: ')
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
        logger.info(`Axios - fetching: ${config.baseURL}/${config.url}`)
        return config
      },
      error => {
        logger.error('Axios - request error:', error.message)
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    apiClient.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 429) {
          logger.warn('Axios - rate limit exceeded. retrying in 2 seconds...')
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
      logger.info('Axios - call .getInstance() first: ', instances)
      instances.set(url, ApiClientSingleton(url))

      const selectedInstace = instances.get(url)
      selectedInstace.constructor = null

      return selectedInstace
    }

    logger.info('Axios - return .getInstance() cached: ', instances)
    return instances.get(url)
  }
}

export default new APIClientFactory()

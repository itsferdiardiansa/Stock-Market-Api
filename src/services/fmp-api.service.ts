import { ParsedQs } from 'qs'
import platformConfig from '@/config/platform'
import { fetchData } from '@/utils/fetcher'
// import { formatResponse } from '@/utils/response'
import type { ApiCustomResponse } from '@/types/api'
import logger from '@/utils/logger'

const { apiUrl, apiKey, cacheTime } = platformConfig

if (!apiUrl || !apiKey) {
  logger.error('Server - API_URL or API_KEY are not provided in .env')
  process.exit(1)
}

/**
 * Helper function to handle FMP API requests.
 *
 * @param {Response} res - Express response object.
 * @param {string} endpoint - API endpoint.
 * @param {object} [params={}] - Optional query parameters.
 */
export const fetchFmpData = async (endpoint: string, params: ParsedQs = {}) => {
  try {
    // Set FMP api key
    params.apikey = apiKey

    const responseData = (await fetchData(apiUrl, endpoint, params, {
      prefix: 'fmp_cache',
      time: cacheTime,
    })) as ApiCustomResponse

    return responseData
  } catch (errorResponse) {
    return errorResponse
  }
}

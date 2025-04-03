import type { Response } from 'express'
import { ParsedQs } from 'qs'
import platformConfig from '@/config/platform'
import { fetchData } from '@/utils/fetcher'
import { createResponse } from '@/utils/response'
import type { ApiCustomResponse } from '@/types/api'

const { apiUrl, apiKey, cacheTime } = platformConfig

if (!apiUrl || !apiKey) {
  console.error('API_URL or API_KEY are not provided in .env')
  process.exit(1)
}

/**
 * Helper function to handle FMP API requests.
 *
 * @param {Response} res - Express response object.
 * @param {string} endpoint - API endpoint.
 * @param {object} [params={}] - Optional query parameters.
 */
export const handleRequest = async (res: Response, endpoint: string, params: ParsedQs = {}) => {
  try {
    // Set FMP api key
    params.apikey = apiKey

    const response = (await fetchData(apiUrl, endpoint, params, {
      prefix: 'fmp_cache',
      time: cacheTime,
    })) as ApiCustomResponse
    res.json(createResponse(200, response))
  } catch (error) {
    const statusCode = error.status || 500
    res.json(createResponse(statusCode, error))
  }
}

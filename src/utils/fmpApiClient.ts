import type { Response } from 'express'
import { ParsedQs } from 'qs'
import { fetchData } from './fetcher'
import { createResponse, type CustomResponse } from './response'

/**
 * Helper function to handle FMP API requests.
 *
 * @param {Response} res - Express response object.
 * @param {string} endpoint - API endpoint.
 * @param {object} [params={}] - Optional query parameters.
 */
export const handleRequest = async (res: Response, endpoint: string, params: ParsedQs = {}) => {
  try {
    const response = await fetchData(endpoint, params, 'fmp_cache') as CustomResponse
    res.json(createResponse(200, response))
  } catch (error) {
    const statusCode = error.status || 500
    res.json(createResponse(statusCode, error))
  }
}

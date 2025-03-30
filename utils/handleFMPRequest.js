const { fetchData } = require("./fetcher")
const { createResponse } = require("./response")

/**
 * Helper function to handle FMP API requests.
 * 
 * @param {Response} res - Express response object.
 * @param {string} endpoint - API endpoint.
 * @param {object} [params={}] - Optional query parameters.
 */
const handleRequest = async (res, endpoint, params = {}) => {
  try {
    const response = await fetchData(endpoint, params)
    res.json(createResponse(200, response))
  } catch (error) {
    const statusCode = error.status || 500
    res.json(createResponse(statusCode, error))
  }
}

module.exports = { handleRequest }
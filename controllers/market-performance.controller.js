const { handleRequest } = require("@utils/handleFMPRequest")

/**
 * View the most actively traded stocks using the Top Traded Stocks API. 
 * Identify the companies experiencing the highest trading volumes in the market and track where the most trading activity is happening.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const getMostActives = async (_, res) => {
  await handleRequest(res, "most-actives")
}

/**
 * Access data on the stocks with the largest price drops using the Biggest Stock Losers API. 
 * Identify companies experiencing significant declines and track the stocks that are falling the fastest in the market.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const getBiggestLosers = async (_, res) => {
  await handleRequest(res, "biggest-losers")
}

/**
 * Track the stocks with the largest price increases using the Top Stock Gainers API. 
 * Identify the companies that are leading the market with significant price surges, offering potential growth opportunities.
 * 
 * @param {Request} req
 * @param {Response} res
 */
const getBiggestGainers = async (_, res) => {
  await handleRequest(res, "biggest-gainers")
}

/**
 * Get a snapshot of sector performance using the Market Sector Performance Snapshot API. 
 * Analyze how different industries are performing in the market based on average changes across sectors.
 *
 * @Request
 * @query {date} [date] - until the day after today.
 * @query {string} [exchange] - untilExchanges limited to NASDAQ, NYSE, AMEX.
 * @query {string} [sector].
 */
const getSectorPerformanceSnapshot = async (req, res) => {
  const { query } = req

  await handleRequest(res, "sector-performance-snapshot", { ...query })
}

/**
 * Access detailed performance data by industry using the Industry Performance Snapshot API. 
 * Analyze trends, movements, and daily performance metrics for specific industries across various stock exchanges.
 *
 * @Request
 * @query {date} [date] - until next month.
 * @query {string} [exchange] - untilExchanges limited to NASDAQ, NYSE, AMEX.
 * @query {string} [industry].
 */
const getIndustryPerformanceSnapshot = async (req, res) => {
  const { query } = req

  await handleRequest(res, "industry-performance-snapshot", { ...query })
}

const getBeneficialOwnership = async (req, res) => {
  const { query } = req

  await handleRequest(res, "acquisition-of-beneficial-ownership", { ...query })
}


module.exports = {
  getMostActives,
  getBiggestLosers,
  getBiggestGainers,
  getBeneficialOwnership,
  getSectorPerformanceSnapshot,
  getIndustryPerformanceSnapshot
}
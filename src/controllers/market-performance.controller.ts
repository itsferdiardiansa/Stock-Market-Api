import type { Request, Response } from 'express'
import { handleRequest } from '@/services/fmp-api.service'

/**
 * View the most actively traded stocks using the Top Traded Stocks API.
 * Identify the companies experiencing the highest trading volumes in the market and track where the most trading activity is happening.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getMostActives = async (_: Request, res: Response) => {
  await handleRequest(res, 'most-actives')
}

/**
 * Access data on the stocks with the largest price drops using the Biggest Stock Losers API.
 * Identify companies experiencing significant declines and track the stocks that are falling the fastest in the market.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getBiggestLosers = async (_: Request, res: Response) => {
  await handleRequest(res, 'biggest-losers')
}

/**
 * Track the stocks with the largest price increases using the Top Stock Gainers API.
 * Identify the companies that are leading the market with significant price surges, offering potential growth opportunities.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getBiggestGainers = async (_: Request, res: Response) => {
  await handleRequest(res, 'biggest-gainers')
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
export const getSectorPerformanceSnapshot = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'sector-performance-snapshot', { ...query })
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
export const getIndustryPerformanceSnapshot = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'industry-performance-snapshot', { ...query })
}

/**
 * Access historical sector performance data using the Historical Market Sector Performance API.
 * Review how different sectors have performed over time across various stock exchanges.
 *
 * @Request
 * @query {from} [date]
 * @query {to} [date]
 * @query {string} [exchange] - untilExchanges limited to NASDAQ, NYSE, AMEX.
 * @query {string} [sector].
 */
export const getHistoricalSectorPerformance = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'historical-sector-performance', { ...query })
}

/**
 * Access historical performance data for industries using the Historical Industry Performance API.
 * Track long-term trends and analyze how different industries have evolved over time across various stock exchanges.
 *
 * @Request
 * @query {from} [date]
 * @query {to} [date]
 * @query {string} [exchange] - untilExchanges limited to NASDAQ, NYSE, AMEX.
 * @query {string} [industry].
 */
export const getHistoricalIndustryPerformance = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'historical-industry-performance', { ...query })
}

/**
 * Retrieve the price-to-earnings (P/E) ratios for various sectors using the Sector P/E Snapshot API.
 * Compare valuation levels across sectors to better understand market valuations.
 *
 * @Request
 * @query {date} [date]
 * @query {string} [exchange] - untilExchanges limited to NASDAQ, NYSE, AMEX.
 * @query {string} [sector].
 */
export const getSectorPESnapshot = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'sector-pe-snapshot', { ...query })
}

export const getBeneficialOwnership = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'acquisition-of-beneficial-ownership', { ...query })
}

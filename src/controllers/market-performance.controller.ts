import type { Request, Response } from 'express'
import { fetchFmpData } from '@/services/fmp-api.service'
import { sendResponse } from '@/utils/response'
import { ValidatedRequest } from '@/types/validated-request'

/**
 * View the most actively traded stocks using the Top Traded Stocks API.
 * Identify the companies experiencing the highest trading volumes in the market and track where the most trading activity is happening.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getMostActives = async (req: Request, res: Response) => {
  const data = await fetchFmpData('most-actives')

  sendResponse(data, { req, res })
}

/**
 * Access data on the stocks with the largest price drops using the Biggest Stock Losers API.
 * Identify companies experiencing significant declines and track the stocks that are falling the fastest in the market.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getBiggestLosers = async (req: Request, res: Response) => {
  const data = await fetchFmpData('biggest-losers')

  sendResponse(data, { req, res })
}

/**
 * Track the stocks with the largest price increases using the Top Stock Gainers API.
 * Identify the companies that are leading the market with significant price surges, offering potential growth opportunities.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const getBiggestGainers = async (req: Request, res: Response) => {
  const data = await fetchFmpData('biggest-gainers')

  sendResponse(data, { req, res })
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
export const getSectorPerformanceSnapshot = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('sector-performance-snapshot', { ...validatedQuery })

  sendResponse(data, { req, res })
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
export const getIndustryPerformanceSnapshot = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('industry-performance-snapshot', { ...validatedQuery })

  sendResponse(data, { req, res })
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
export const getHistoricalSectorPerformance = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('historical-sector-performance', { ...validatedQuery })

  sendResponse(data, { req, res })
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
export const getHistoricalIndustryPerformance = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('historical-industry-performance', { ...validatedQuery })

  sendResponse(data, { req, res })
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
export const getSectorPESnapshot = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('sector-pe-snapshot', { ...validatedQuery })

  sendResponse(data, { req, res })
}

export const getBeneficialOwnership = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('acquisition-of-beneficial-ownership', { ...validatedQuery })

  sendResponse(data, { req, res })
}

import type { Request, Response } from 'express'
import { handleRequest } from '@/utils/fmpApiClient'

/**
 * Easily find the ticker symbol of any stock with the FMP Stock Symbol Search API.
 * Search by company name or symbol across multiple global markets.
 *
 * @Request
 * @query {string} [query] - company symbol.
 */
export const getSearchSymbol = async (req: Request, res: Response) => {
  const { query } = req.query

  await handleRequest(res, 'search-symbol', { query })
}

/**
 * Discover stocks that align with your investment strategy using the FMP Stock Screener API.
 * Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.
 *
 * @Request
 */
export const getCompanyScreener = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'company-screener', { ...query })
}

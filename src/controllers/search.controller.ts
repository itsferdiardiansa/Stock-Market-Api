import type { Request, Response } from 'express'
import { handleRequest } from '@/services/fmpApiService'

/**
 * Search by company name or symbol across multiple global markets.
 *
 * @query {string} [query] - company symbol.
 * @query {string} [exchange].
 */
export const getStockSymbol = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-symbol', { ...query })
}

/**
 * Retrieving ticker symbols when you know the full or partial company or asset name but not the symbol identifier.
 *
 * @query {string} [query] - company symbol.
 * @query {string} [exchange]
 */
export const getCompanyName = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-name', { ...query })
}

/**
 * Access unique identifiers needed for SEC filings and regulatory documents.
 *
 * @query {string} [cik]
 */
export const getCIK = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-cik', { ...query })
}

/**
 * Find key details such as company name, stock symbol, and market capitalization associated with the CUSIP.
 *
 * @query {string} [cusip]
 */
export const getCUSIP = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-cusip', { ...query })
}

/**
 * Find key details such as company name, stock symbol, and market capitalization associated with the ISIN.
 *
 * @query {string} [isin]
 */
export const getISIN = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-isin', { ...query })
}

/**
 * Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.
 *
 * @Request
 */
export const getCompanyScreener = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'company-screener', { ...query })
}

/**
 * Retrieve exchanges to find where a given stock symbol.
 *
 * @query {string} [symbol]
 */
export const getExchangeVariants = async (req: Request, res: Response) => {
  const { query } = req

  await handleRequest(res, 'search-exchange-variants', { ...query })
}

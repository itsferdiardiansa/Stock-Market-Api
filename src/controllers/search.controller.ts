import type { Response } from 'express'
import { fetchFmpData } from '@/services/fmp-api.service'
import { sendResponse } from '@/utils/response'
import { ValidatedRequest } from '@/types/validated-request'

/**
 * Search by company name or symbol across multiple global markets.
 *
 * @query {string} [query] - company symbol.
 * @query {string} [exchange].
 */
export const getStockSymbol = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-symbol', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Retrieving ticker symbols when you know the full or partial company or asset name but not the symbol identifier.
 *
 * @query {string} [query] - company symbol.
 * @query {string} [exchange]
 */
export const getCompanyName = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-name', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Access unique identifiers needed for SEC filings and regulatory documents.
 *
 * @query {string} [cik]
 */
export const getCIK = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-cik', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Find key details such as company name, stock symbol, and market capitalization associated with the CUSIP.
 *
 * @query {string} [cusip]
 */
export const getCUSIP = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-cusip', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Find key details such as company name, stock symbol, and market capitalization associated with the ISIN.
 *
 * @query {string} [isin]
 */
export const getISIN = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-isin', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.
 *
 * @Request
 */
export const getCompanyScreener = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('company-screener', { ...validatedQuery })

  sendResponse(data, { req, res })
}

/**
 * Retrieve exchanges to find where a given stock symbol.
 *
 * @query {string} [symbol]
 */
export const getExchangeVariants = async (req: ValidatedRequest, res: Response) => {
  const { validatedQuery } = req
  const data = await fetchFmpData('search-exchange-variants', { ...validatedQuery })

  sendResponse(data, { req, res })
}

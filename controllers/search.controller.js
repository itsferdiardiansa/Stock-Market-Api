const { handleRequest } = require("@utils/fmpApiClient")

/**
 * Easily find the ticker symbol of any stock with the FMP Stock Symbol Search API. 
 * Search by company name or symbol across multiple global markets.
 
 * @Request
 * @query {string} [query] - company symbol.
 */
const getSearchSymbol = async (req, res) => {
  const { query } = req.query

  await handleRequest(res, "search-symbol", { query })
}

/**
 * Discover stocks that align with your investment strategy using the FMP Stock Screener API. 
 * Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.
 *
 * @Request
 * @query {number} [marketCapMoreThan] - Minimum market capitalization.
 * @query {number} [marketCapLowerThan] - Maximum market capitalization.
 * @query {string} [sector] - Filter by sector (e.g., "Technology").
 * @query {string} [industry] - Filter by industry (e.g., "Software").
 * @query {number} [betaMoreThan] - Minimum beta value.
 * @query {number} [betaLowerThan] - Maximum beta value.
 * @query {number} [priceMoreThan] - Minimum stock price.
 * @query {number} [priceLowerThan] - Maximum stock price.
 * @query {number} [dividendMoreThan] - Minimum dividend yield.
 * @query {number} [dividendLowerThan] - Maximum dividend yield.
 * @query {number} [volumeMoreThan] - Minimum trading volume.
 * @query {number} [volumeLowerThan] - Maximum trading volume.
 * @query {string} [country] - Filter by country (e.g., "USA").
 * @query {boolean} [isEtf] - Filter by ETFs (true/false).
 * @query {boolean} [isFund] - Filter by mutual funds (true/false).
 * @query {boolean} [isActivelyTrading] - Filter by active trading status (true/false).
 *
 */
const getCompanyScreener = async (req, res) => {
  const { query } = req

  await handleRequest(res, "company-screener", { ...query })
}

module.exports = { 
  getCompanyScreener, 
  getSearchSymbol
}
import express, { type Router } from 'express'
import validate from '@/middlewares/validate'
import {
  stockSymbolSchema,
  companyNameSchema,
  companyScreenerSchema,
  searchCIKSchema,
  searchCUSIPSchema,
  searchISINSchema,
  searchExchangeVariantsSchema,
} from '@/validators/search.validate'
import {
  getStockSymbol,
  getCompanyName,
  getCompanyScreener,
  getCIK,
  getCUSIP,
  getISIN,
  getExchangeVariants,
} from '@/controllers/search.controller'

const router: Router = express.Router()

router.get('/search-symbol', validate(stockSymbolSchema), getStockSymbol)
router.get('/search-name', validate(companyNameSchema), getCompanyName)
router.get('/search-cik', validate(searchCIKSchema), getCIK)
router.get('/search-cusip', validate(searchCUSIPSchema), getCUSIP)
router.get('/search-isin', validate(searchISINSchema), getISIN)
router.get('/search-exchange-variants', validate(searchExchangeVariantsSchema), getExchangeVariants)
router.get('/company-screener', validate(companyScreenerSchema), getCompanyScreener)

export default router

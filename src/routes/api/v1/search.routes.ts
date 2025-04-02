import express, { type Router } from 'express'
import validate from '@/middlewares/validate'
import { searchSymbolSchema, companyScreenerSchema } from '@/validators/search.validate'
import { getSearchSymbol, getCompanyScreener } from '@/controllers/search.controller'

const router: Router = express.Router()

router.get('/company-screener', validate(companyScreenerSchema), getCompanyScreener)
router.get('/search-symbol', validate(searchSymbolSchema), getSearchSymbol)

export default router

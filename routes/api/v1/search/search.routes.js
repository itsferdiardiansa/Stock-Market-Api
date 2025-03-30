const express = require("express")
const validate = require("@middlewares/validate")
const { searchSymbolSchema, companyScreenerSchema } = require("./search.validate")
const { getSearchSymbol, getCompanyScreener } = require("@controllers/search.controller")

const router = express.Router()

router.get("/company-screener", validate(companyScreenerSchema), getCompanyScreener)
router.get("/search-symbol", validate(searchSymbolSchema), getSearchSymbol)

module.exports = router
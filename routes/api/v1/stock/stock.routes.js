const express = require("express")
const validate = require("@middlewares/validate")
const { searchSymbolSchema } = require("./stock.validate")
const { getMostActives, getSearchSymbol } = require("@controllers/stock.controller")

const router = express.Router()

router.get("/most-actives", getMostActives)
router.get("/search-symbol", validate(searchSymbolSchema), getSearchSymbol)

module.exports = router
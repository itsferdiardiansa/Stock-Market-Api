const express = require("express")
const { fetchData } = require("@utils/fetcher")
const { createResponse } = require("@utils/response")
const validate = require("@middlewares/validate")
const { searchSymbolSchema } = require("./stock.validate")

const router = express.Router()

router.get("/most-actives", async (_, res) => {
  try {
    const response = await fetchData("most-actives")

    res.json(createResponse(200, response))
  } catch (error) {
    res.json(createResponse(error.status, error))
  }
})

router.get("/search-symbol", validate(searchSymbolSchema), async (req, res) => {
  const { query } = req.query

  try {
    const response = await fetchData("search-symbol", { query })

    res.json(createResponse(200, response))
  } catch (error) {
    res.json(createResponse(error.status, error))
  }
})

module.exports = router
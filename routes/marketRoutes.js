const express = require("express")
const path = require("path")
const { readJsonFile } = require("../utils/fileUtils")
const { paginate } = require("../utils/paginationUtils")
const { createResponse } = require("../utils/responseUtils")

const router = express.Router()

// 📌 GET /api/v1/markets/tickers?page=1&type=STOCKS
router.get("/tickers", (req, res) => {
  const { page = 1, type } = req.query
  const filePath = path.join(__dirname, "../data/markets/tickers.json")

  const jsonData = readJsonFile(filePath)
  if (!jsonData) return res.status(500).json(createResponse(500, "Internal Server Error"))

  let tickers = jsonData.body

  if (type) {
    tickers = tickers.filter((ticker) => ticker.type.toUpperCase() === type.toUpperCase())
  }

  const result = paginate(tickers, Number(page), 2)

  return res.json(createResponse(200, "Success", result))
})

module.exports = router
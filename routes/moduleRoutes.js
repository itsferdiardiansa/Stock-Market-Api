const express = require("express")
const path = require("path")
const { readJsonFile } = require("../utils/fileUtils")
const { createResponse } = require("../utils/responseUtils")

const router = express.Router()

router.get("/stock/modules", (req, res) => {
  const { module } = req.query
  const filePath = path.join(__dirname, `../data/module/${module}.json`)

  const jsonData = readJsonFile(filePath)
  if (!jsonData) return res.status(500).json(createResponse(500, "Internal Server Error"))

  return res.json(createResponse(200, "Success", jsonData))
})

module.exports = router
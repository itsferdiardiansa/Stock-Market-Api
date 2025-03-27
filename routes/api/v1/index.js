const express = require("express")
const stockRoutes = require("./stock.routes")

const router = express.Router()

router.use(stockRoutes)

module.exports = router
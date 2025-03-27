const express = require("express")
const stockRoutes = require("./stock/stock.routes")

const router = express.Router()

router.use("/stock", stockRoutes)

module.exports = router
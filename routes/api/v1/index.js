const express = require("express")

const marketPerformanceRoutes = require("./market-performance/market-performance.routes")
const searchRoutes = require("./search/search.routes")

const router = express.Router()

router.use("/market-performance", marketPerformanceRoutes)
router.use("/search", searchRoutes)

module.exports = router
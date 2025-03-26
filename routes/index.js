const express = require("express")
const marketRoutes = require("./marketRoutes")
const moduleRoutes = require("./moduleRoutes")

const router = express.Router()

router.use("/markets", marketRoutes)
router.use(moduleRoutes)

module.exports = router
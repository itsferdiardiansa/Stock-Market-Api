const express = require("express")
const validate = require("@middlewares/validate")
const { sectorPerformanceSnapshotSchema, industryPerformanceSnapshotSchema } = require("./market-performance.validate")
const { 
  getMostActives, 
  getBiggestLosers, 
  getBiggestGainers, 
  getSectorPerformanceSnapshot, 
  getIndustryPerformanceSnapshot 
} = require("@controllers/market-performance.controller")

const router = express.Router()

router.get("/most-actives", getMostActives)
router.get("/biggest-losers", getBiggestLosers)
router.get("/biggest-gainers", getBiggestGainers)
router.get("/sector-performance-snapshot", validate(sectorPerformanceSnapshotSchema), getSectorPerformanceSnapshot)
router.get("/industry-performance-snapshot", validate(industryPerformanceSnapshotSchema), getIndustryPerformanceSnapshot)

// router.get("/acquisition-of-beneficial-ownership", validate(beneficialOwnershipSchema), getBeneficialOwnership)

module.exports = router
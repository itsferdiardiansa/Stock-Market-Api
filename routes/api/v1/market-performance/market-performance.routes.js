const express = require("express")
const validate = require("@middlewares/validate")
const { 
  sectorPerformanceSnapshotSchema, 
  industryPerformanceSnapshotSchema, 
  historicalSectorPerformanceSchema, 
  historicalIndustryPerformanceSchema,
  sectorPESnapshotSchema
} = require("./market-performance.validate")
const { 
  getMostActives, 
  getBiggestLosers, 
  getBiggestGainers, 
  getSectorPerformanceSnapshot, 
  getIndustryPerformanceSnapshot,
  getHistoricalSectorPerformance,
  getHistoricalIndustryPerformance,
  getSectorPESnapshot
} = require("@controllers/market-performance.controller")

const router = express.Router()

router.get("/most-actives", getMostActives)
router.get("/biggest-losers", getBiggestLosers)
router.get("/biggest-gainers", getBiggestGainers)
router.get("/sector-performance-snapshot", validate(sectorPerformanceSnapshotSchema), getSectorPerformanceSnapshot)
router.get("/industry-performance-snapshot", validate(industryPerformanceSnapshotSchema), getIndustryPerformanceSnapshot)
router.get("/historical-sector-performance", validate(historicalSectorPerformanceSchema), getHistoricalSectorPerformance)
router.get("/historical-industry-performance", validate(historicalIndustryPerformanceSchema), getHistoricalIndustryPerformance)
router.get("/sector-pe-snapshot", validate(sectorPESnapshotSchema), getSectorPESnapshot)

// router.get("/acquisition-of-beneficial-ownership", validate(beneficialOwnershipSchema), getBeneficialOwnership)

module.exports = router
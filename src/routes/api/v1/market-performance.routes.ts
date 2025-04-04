import express from 'express'
import type { Router } from 'express'
import validate from '@/middlewares/validate'
import {
  sectorPerformanceSnapshotSchema,
  industryPerformanceSnapshotSchema,
  historicalSectorPerformanceSchema,
  historicalIndustryPerformanceSchema,
  sectorPESnapshotSchema,
} from '@root/src/validators/market-performance.validate'
import {
  getMostActives,
  getBiggestLosers,
  getBiggestGainers,
  getSectorPerformanceSnapshot,
  getIndustryPerformanceSnapshot,
  getHistoricalSectorPerformance,
  getHistoricalIndustryPerformance,
  getSectorPESnapshot,
} from '@/controllers/market-performance.controller'

const router: Router = express.Router()

router.get('/most-actives', getMostActives)
router.get('/biggest-losers', getBiggestLosers)
router.get('/biggest-gainers', getBiggestGainers)
router.get('/sector-performance-snapshot', validate(sectorPerformanceSnapshotSchema), getSectorPerformanceSnapshot)
router.get(
  '/industry-performance-snapshot',
  validate(industryPerformanceSnapshotSchema),
  getIndustryPerformanceSnapshot
)
router.get(
  '/historical-sector-performance',
  validate(historicalSectorPerformanceSchema),
  getHistoricalSectorPerformance
)
router.get(
  '/historical-industry-performance',
  validate(historicalIndustryPerformanceSchema),
  getHistoricalIndustryPerformance
)
router.get('/sector-pe-snapshot', validate(sectorPESnapshotSchema), getSectorPESnapshot)

// router.get("/acquisition-of-beneficial-ownership", validate(beneficialOwnershipSchema), getBeneficialOwnership)

export default router

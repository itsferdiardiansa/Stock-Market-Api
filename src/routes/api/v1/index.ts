import express from 'express'

import marketPerformanceRoutes from './market-performance.routes'
import searchRoutes from './search.routes'

const router = express.Router()

router.use('/market-performance', marketPerformanceRoutes)
router.use('/search', searchRoutes)

module.exports = router

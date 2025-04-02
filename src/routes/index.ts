import express from 'express'
import type { Router } from 'express'

const router: Router = express.Router()

router.use('/v1', require('./api/v1'))

export default router

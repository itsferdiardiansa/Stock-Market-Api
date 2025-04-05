import express from 'express'
import type { Express } from 'express'
import { connectRedis } from './config/redis'

import notFoundHandler from './middlewares/not-found'
import errorHandler from './middlewares/error-handler'

import apiV1Routes from './routes'
import { httpLogger } from './middlewares/http-logger'
import { httpHeaders, applySecurity, rateLimiter, applyCors } from './middlewares/http-headers'

const app: Express = express()

connectRedis()

app.use(express.json({ limit: '10kb' }))

// Middlewares
app.use(applySecurity())
app.use(applyCors())
app.use(httpHeaders())
app.use(rateLimiter())
app.use(httpLogger())

app.use('/api', apiV1Routes)
app.use(notFoundHandler)
app.use(errorHandler)

export default app

import express from 'express'
import type { Express } from 'express'
import { connectRedis } from './config/redis'

import notFoundHandler from './middlewares/notFound'
import errorHandler from './middlewares/errorHandler'

import apiV1Routes from './routes'

const app: Express = express()

connectRedis()

app.use(express.json())
app.use('/api', apiV1Routes)
app.use(notFoundHandler)
app.use(errorHandler)

export default app

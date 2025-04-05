import { v4 as uuid } from 'uuid'
import type { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import platformConfig from '@/config/platform'
import { getRedisClient } from '@/config/redis'
import { formatResponse, sendResponse } from '@/utils/response'

export const httpHeaders = () => {
  return (_: Request, res: Response, next: NextFunction) => {
    const requestId = uuid()
    res.setHeader('X-Request-Id', requestId)
    res.locals.requestId = requestId

    next()
  }
}

export const applySecurity = () =>
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-origin' },
    dnsPrefetchControl: { allow: false },
    hidePoweredBy: true,
    noSniff: true,
    hsts: !platformConfig.isProduction
      ? false
      : {
          maxAge: 60 * 60 * 24 * 365, // a year
          includeSubDomains: true,
          preload: true,
        },
    frameguard: { action: 'deny' },
    xssFilter: true,
    referrerPolicy: { policy: 'no-referrer' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  })

const WINDOW = platformConfig.rateLimitWindow
const MAX_REQUEST = platformConfig.rateLimitMax
export const rateLimiter = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const redis = getRedisClient()
    const ip = req.ip
    const key = `ratelimit:${ip}`
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, WINDOW)
    }

    const ttl = await redis.ttl(key)
    const remaining = Math.max(0, MAX_REQUEST - current)

    res.setHeader('X-RateLimit-Limit', MAX_REQUEST.toString())
    res.setHeader('X-RateLimit-Remaining', remaining.toString())
    res.setHeader('X-RateLimit-Reset', `${Math.floor(Date.now() / 1000) + ttl}`)

    if (current > MAX_REQUEST) {
      return sendResponse(
        formatResponse(429, {
          body: {
            message: 'Too many requests. Please try again later.',
          },
        }),
        { req, res }
      )
    }

    next()
  }
}

/* eslint-disable no-unused-vars */
type CorsOriginCallback = (err: string | Error, allow?: boolean) => void
const allowedOrigins = platformConfig.corsOrigin
export const applyCors = () =>
  cors({
    origin: (origin: string, callback: CorsOriginCallback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Rate-Limit-Limit', 'X-Rate-Limit-Remaining', 'X-Rate-Limit-Reset', 'X-Request-Id'],
    credentials: true,
  })

import type { Request, Response, NextFunction } from 'express'
import logger from '@/utils/logger'

export const httpLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime.bigint()
    const { method, originalUrl } = req
    const requestId = res.getHeader('x-request-id') || 'unknown'

    res.on('finish', () => {
      const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000
      const statusCode = res.statusCode
      const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'

      logger[level](
        {
          requestId,
          method,
          url: originalUrl,
          statusCode,
          durationMs: durationMs.toFixed(2),
        },
        `[${method}] ${originalUrl} - ${statusCode} (${durationMs.toFixed(0)}ms)`
      )
    })

    next()
  }
}

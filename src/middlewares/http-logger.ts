import morgan from 'morgan'
import { type TokenIndexer } from 'morgan'
import logger from '@/utils/logger'
import type { Request, Response } from 'express'

export const httpLogger = () => {
  return morgan((tokens: TokenIndexer, req: Request, res: Response) => {
    const statusCode = Number(tokens.status(req, res))
    const logMessage = `[${tokens.method(req, res)}] ${tokens.url(req, res)} - ${statusCode} (${tokens['response-time'](req, res)}ms)`
    const level = statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'info'

    logger[level](logMessage)

    return null
  })
}

import logger from '@/utils/logger'
import { formatResponse, sendResponse } from '@/utils/response'
import type { Request, Response, NextFunction } from 'express'

/* eslint-disable no-unused-vars  */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const data = formatResponse(500, {
    body: {
      message: 'Internal Server Error',
    },
  })

  logger.error(err, 'Server - Internal server error')
  sendResponse(data, { req, res })
}

export default errorHandler

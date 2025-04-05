import { formatResponse, sendResponse } from '@/utils/response'
import type { Request, Response, Errback, NextFunction } from 'express'

/* eslint-disable handle-callback-err, no-unused-vars  */
const errorHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  const data = formatResponse(500, {
    body: {
      message: 'Internal Server Error',
    },
  })

  sendResponse(data, { req, res })
}

export default errorHandler

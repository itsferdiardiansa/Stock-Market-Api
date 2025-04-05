import type { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'
import logger from '@/utils/logger'
import { formatResponse, sendResponse } from '@/utils/response'
import { ValidatedRequest } from '@/types/validated-request'

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.query, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    })

    if (error) {
      const responseData = formatResponse(400, {
        body: error.details.map(item => ({
          field: item.path.join('.'),
          message: item.message,
          type: item.type,
        })),
      })

      logger.error(responseData, 'Validation Error')
      return sendResponse(responseData, { req, res })
    }

    ;(req as ValidatedRequest).validatedQuery = value
    next()
  }
}

export default validate

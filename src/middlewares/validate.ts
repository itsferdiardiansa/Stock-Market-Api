import { createResponse } from '@/utils/response'
import type { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'
import logger from '@/utils/logger'

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.query, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    })

    if (error) {
      const responseData = {
        body: error.details.map(item => ({
          field: item.path.join('.'),
          message: item.message,
          type: item.type,
        })),
      }

      logger.error(responseData, 'Validation Error')
      res.json(createResponse(400, responseData))
      return
    }

    req.query = value // Sanitize
    next()
  }
}

export default validate

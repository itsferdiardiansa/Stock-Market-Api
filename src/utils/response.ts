import type { Response, Request } from 'express'
import pkgJson from '@root/package.json'
import { STATUS_MESSAGES } from '@/constants/status-messages'
import type { ApiCustomResponse, StatusCodes } from '@/types/api'

export const formatResponse = (
  statusCode: StatusCodes,
  responseData: ApiCustomResponse = {},
  options?: {
    rateLimit?: Record<string, any>
    requestId?: string
  }
): ApiCustomResponse => {
  return {
    meta: {
      status: statusCode,
      message: STATUS_MESSAGES[statusCode],
      cache: false,
      staleTime: 0,
      lastUpdated: null,
      version: pkgJson.version,
      ...responseData.meta,
      ...(options?.rateLimit && { rateLimit: options.rateLimit }),
    },
    body: responseData.body ?? {},
  }
}

export const sendResponse = (
  responseData: ApiCustomResponse = {},
  params: {
    req: Request
    res: Response
  }
) => {
  const { res } = params
  const requestId = res.locals.requestId
  const { meta, body } = responseData

  res.status(meta.status).json({
    meta: {
      _id: requestId,
      ...meta,
    },
    body,
  })
}

import type { Response, Request } from 'express'
import { STATUS_MESSAGES } from '@/constants/status-messages'
import type { ApiCustomResponse, StatusCodes } from '@/types/api'
import { getRequestContext } from '@/context/request-context'
import logger from './logger'

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
      version: '1.0.0',
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
  const { requestId } = getRequestContext()
  const { meta, body } = responseData

  if (meta.status >= 400) {
    logger.error({ meta, body }, 'HTTP - Response Sent')
  }

  res.status(meta.status).json({
    meta: {
      _id: requestId,
      ...meta,
    },
    body,
  })
}

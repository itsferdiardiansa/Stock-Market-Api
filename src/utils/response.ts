import { v4 as uuidv4 } from 'uuid'
import pkgJson from '@root/package.json'
import { STATUS_MESSAGES } from '@root/src/constants/status-messages'
import { ApiCustomResponse } from '@/types/api'

export const createResponse = (
  statusCode: number,
  response: ApiCustomResponse = {},
  rateLimit = null
): ApiCustomResponse => {
  return {
    meta: {
      _id: uuidv4(),
      status: statusCode,
      message: STATUS_MESSAGES[statusCode],
      version: pkgJson.version,
      ...response.meta,
      ...(rateLimit && { rateLimit }),
    },
    body: response.body,
  }
}

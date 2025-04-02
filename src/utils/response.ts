import { v4 as uuidv4 } from 'uuid'
import pkgJson from '@root/package.json'

export const STATUS_MESSAGES = {
  200: 'Success',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',

  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',

  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  422: 'Unprocessable Entity',

  429: 'Too Many Requests',

  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
}

export type StatusMessages = keyof typeof STATUS_MESSAGES
export type ResponseMeta = {
  cache: boolean
  staleTime: number
  status: StatusMessages
  message: string
  requestId: string
  version: string
  timestamp: number
  lastUpdated: string
  rateLimit?: number | null
}

export type CustomResponse = {
  meta?: ResponseMeta
  body?: Record<string, string>
}

export const createResponse = (status: number, response: CustomResponse = {}, rateLimit = null) => {
  return {
    meta: {
      status,
      message: STATUS_MESSAGES[status],
      requestId: uuidv4(),
      version: pkgJson.version,
      ...response.meta,
      ...(rateLimit && { rateLimit }),
    },
    body: response.body,
  }
}

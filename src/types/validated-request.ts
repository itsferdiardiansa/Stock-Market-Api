import { Request } from 'express'

export interface ValidatedRequest<T = {}> extends Request {
  validatedQuery: T
}

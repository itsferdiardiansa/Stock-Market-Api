import { AsyncLocalStorage } from 'async_hooks'
import type { Request } from 'express'

type ContextType = {
  requestId?: string
  path: Request['path']
  ip: Request['ip']
  query?: Request['query']
  params?: Request['params']
}
export const asyncLocalStorage = new AsyncLocalStorage<ContextType>()

export const setRequestContext = (data: ContextType) => {
  asyncLocalStorage.run(data, () => {})
}

export const getRequestContext = () => {
  return asyncLocalStorage.getStore()
}

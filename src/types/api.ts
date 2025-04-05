import { v4 as uuidv4 } from 'uuid'
import { ParsedQs } from 'qs'
import type { STATUS_MESSAGES } from '@root/src/constants/status-messages'

export type StatusCodes = keyof typeof STATUS_MESSAGES

export type ApiResponseMeta = Partial<{
  _id: ReturnType<typeof uuidv4>
  cache: boolean
  staleTime: number
  status: StatusCodes
  message: string
  version: string
  lastUpdated: string
  options: {
    rateLimit: number | null
  }
}>

export type ApiResponseMetaFiltered = Pick<ApiResponseMeta, 'lastUpdated' | 'staleTime' | 'cache'>

export type ApiFetchResponse<T = {}> = {
  meta: ApiResponseMetaFiltered
  body: Record<string, string> | T
}

export type FetchDataParams = {
  apikey?: string
} & ParsedQs

export type ApiCustomResponse = {
  meta?: ApiResponseMeta
  body?: Record<string, string> | Record<string, string>[]
}

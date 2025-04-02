import { v4 as uuidv4 } from 'uuid'
import type { StatusMessages } from '@/constants/statusMessages'
import { ParsedQs } from 'qs'

export type ApiResponseMeta = {
  _id: ReturnType<typeof uuidv4>
  cache: boolean
  staleTime: number
  status: StatusMessages
  message: string
  version: string
  lastUpdated: string
  timestamp?: number
  rateLimit?: number | null
}

export type ApiResponseMetaFiltered = Pick<ApiResponseMeta, 'lastUpdated' | 'staleTime' | 'cache' | 'timestamp'>

export type ApiFetchResponse<T = {}> = {
  meta: ApiResponseMetaFiltered
  body: Record<string, string> | T
}

export type FetchDataParams = {
  apikey?: string
} & ParsedQs

export type ApiCustomResponse = {
  meta?: ApiResponseMeta
  body?: Record<string, string>
}

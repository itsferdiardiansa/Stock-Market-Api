import dotenv from 'dotenv'
dotenv.config()

type PlatformConfig = {
  port: number
  nodeEnv: string
  isProduction: boolean

  encryptionAlgorithm: string
  encryptionKey: string
  encryptionIV: string

  apiUrl: string
  apiKey: string

  cacheUrl: string
  cacheTime: number

  newRelicLogApi: string
  newRelicLicenseKey: string

  rateLimitMax: number
  rateLimitWindow: number

  corsOrigin: string[]
}

const platformConfig: PlatformConfig = {
  port: Number(process.env.APP_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',

  encryptionAlgorithm: process.env.API_ENCRYPTION_ALGORITHM,
  encryptionKey: process.env.API_ENCRYPTION_KEY,
  encryptionIV: process.env.API_ENCRYPTION_IV,

  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,

  cacheUrl: process.env.CACHE_URL,
  cacheTime: Number(process.env.CACHE_TIME) || 86400,

  newRelicLogApi: process.env.NEW_RELIC_LOG_API,
  newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY,

  rateLimitMax: Number(process.env.RATE_LIMIT_MAX),
  rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW),

  corsOrigin: process.env.CORS_ORIGIN.split(',') || ['*'],
}

export default platformConfig

import dotenv from 'dotenv'
dotenv.config()

type PlatformConfig = {
  port: number
  nodeEnv: string

  encryptionAlgorithm: string
  encryptionKey: string
  encryptionIV: string

  apiUrl: string
  apiKey: string

  cacheUrl: string
  cacheTime: number

  newRelicLogApi: string
  newRelicLicenseKey: string
}

const platformConfig: PlatformConfig = {
  port: Number(process.env.APP_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV,

  encryptionAlgorithm: process.env.API_ENCRYPTION_ALGORITHM,
  encryptionKey: process.env.API_ENCRYPTION_KEY,
  encryptionIV: process.env.API_ENCRYPTION_IV,

  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,

  cacheUrl: process.env.CACHE_URL,
  cacheTime: Number(process.env.CACHE_TIME) || 86400,

  newRelicLogApi: process.env.NEW_RELIC_LOG_API,
  newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY,
}

export default platformConfig

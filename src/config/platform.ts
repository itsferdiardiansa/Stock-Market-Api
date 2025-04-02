import dotenv from 'dotenv'
dotenv.config()

type PlatformConfig = {
  port: number
  encryptionAlgorithm: string
  encryptionKey: string
  encryptionIV: string

  apiUrl: string
  apiKey: string
  cacheTime: number
}

const platformConfig: PlatformConfig = {
  port: Number(process.env.APP_PORT) || 3000,
  encryptionAlgorithm: process.env.API_ENCRYPTION_ALGORITHM,
  encryptionKey: process.env.API_ENCRYPTION_KEY,
  encryptionIV: process.env.API_ENCRYPTION_IV,

  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  cacheTime: Number(process.env.CACHE_TIME) || 86400,
}

export default platformConfig

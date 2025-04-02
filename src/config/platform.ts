import dotenv from 'dotenv'
dotenv.config()

type PlatformConfig = {
  port: number
  encryptionAlgorithm: string
  encryptionKey: string
  encryptionIV: string
}

const platformConfig: PlatformConfig = {
  port: Number(process.env.APP_PORT) || 3000,
  encryptionAlgorithm: process.env.API_ENCRYPTION_ALGORITHM,
  encryptionKey: process.env.API_ENCRYPTION_KEY,
  encryptionIV: process.env.API_ENCRYPTION_IV
}

export default platformConfig

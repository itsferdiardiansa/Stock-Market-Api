import crypto from 'crypto'
import platformConfig from '@/config/platform'

const ALGORITHM = platformConfig.encryptionAlgorithm
const ENCRYPTION_KEY = Buffer.from(platformConfig.encryptionKey, 'utf-8')
const ENCRYPTION_IV = Buffer.from(platformConfig.encryptionIV, 'utf-8')
const AUTH_TAG_LENGTH = ENCRYPTION_IV.length

// These methods (createChiperiv and createDechiperiv) use `any` types purposely to hide the algorithm encryption that set by the env
const encryptData = (text: string) => {
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV, {
    authTagLength: AUTH_TAG_LENGTH,
  } as any)

  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = (cipher as any).getAuthTag().toString('hex')

  return `${encrypted}:${authTag}`
}

const decryptData = (encryptedValue: string) => {
  const [encrypted, authTag] = encryptedValue.split(':')
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV, {
    authTagLength: AUTH_TAG_LENGTH,
  } as any) as any

  decipher.setAuthTag(Buffer.from(authTag, 'hex'))

  let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')

  return decrypted
}

export { encryptData, decryptData }

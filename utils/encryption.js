const crypto = require("crypto")

const ALGORITHM = process.env.API_ENCRYPTION_ALGORITHM
const ENCRYPTION_KEY = Buffer.from(process.env.API_ENCRYPTION_KEY, "utf-8")
const ENCRYPTION_IV = Buffer.from(process.env.API_ENCRYPTION_IV, "utf-8").slice(0, 12)
const AUTH_TAG_LENGTH = 16

const encryptData = (text) => {
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV, { authTagLength: AUTH_TAG_LENGTH })
  
  let encrypted = cipher.update(text, "utf-8", "hex")
  encrypted += cipher.final("hex")
  const authTag = cipher.getAuthTag().toString("hex")

  return `${encrypted}:${authTag}`
}

const decryptData = (encryptedText) => {
  const [encrypted, authTag] = encryptedText.split(":")
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV, { authTagLength: AUTH_TAG_LENGTH })

  decipher.setAuthTag(Buffer.from(authTag, "hex"))

  let decrypted = decipher.update(encrypted, "hex", "utf-8")
  decrypted += decipher.final("utf-8")

  return decrypted
}

module.exports = { encryptData, decryptData }
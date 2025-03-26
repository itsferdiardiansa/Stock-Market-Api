const { v4: uuidv4 } = require("uuid")
const pkgJson = require("../package.json")

const createResponse = (status, message, data = {}, pagination = null, fromCache = false, rateLimit = null) => {
  const timestamp = new Date().toISOString()
  return {
    meta: {
      status,
      message,
      timestamp,
      requestId: uuidv4(),
      version: pkgJson.version,
      cache: fromCache,
      ...(pagination && { pagination }),
      ...(rateLimit && { rateLimit })
    },
    body: data
  }
}

module.exports = { createResponse }

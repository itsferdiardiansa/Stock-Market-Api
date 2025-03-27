const { v4: uuidv4 } = require("uuid")
const pkgJson = require("../package.json")

const STATUS_MESSAGES = {
  200: "Success",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  
  301: "Moved Permanently",
  302: "Found",
  304: "Not Modified",

  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  422: "Unprocessable Entity",

  429: "Too Many Requests",

  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
}

const createResponse = (status, response = {}, pagination = null, rateLimit = null) => {
  return {
    meta: {
      status,
      message: STATUS_MESSAGES[status],
      requestId: uuidv4(),
      version: pkgJson.version,
      ...response.meta,
      ...(pagination && { pagination }),
      ...(rateLimit && { rateLimit })
    },
    body: response.body
  }
}

module.exports = { createResponse }

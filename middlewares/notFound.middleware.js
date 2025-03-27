const { createResponse } = require("../utils/response")

const notFoundHandler = (_, res) => {
  res.json(createResponse(404, {
    body: {
      message: "Not Found"
    }
  }))
}

module.exports = notFoundHandler
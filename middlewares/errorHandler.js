const { createResponse } = require("../utils/response")

const errorHandler = (err, _, res) => {
  res.json(createResponse(500, {
    body: {
      message: "Internal Server Error"
    }
  }))
}

module.exports = errorHandler
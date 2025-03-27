const Joi = require("joi")

const searchSymbolSchema = Joi.object({
  query: Joi.string().trim().min(1).required().messages({
    "any.required": "missing query parameter"
  })
})

module.exports = { searchSymbolSchema }
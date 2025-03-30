const Joi = require("joi")

const searchSymbolSchema = Joi.object({
  query: Joi.string().trim().min(1).required().messages({
    "any.required": "missing query parameter"
  })
})

const companyScreenerSchema = Joi.object({
  marketCapMoreThan: Joi.number(),
  marketCapLowerThan: Joi.number(),
  sector: Joi.string().trim(),
  industry: Joi.string().trim(),
  betaMoreThan: Joi.number(),
  betaLowerThan: Joi.number(),
  priceMoreThan: Joi.number(),
  priceLowerThan: Joi.number(),
  dividendMoreThan: Joi.number(),
  dividendLowerThan: Joi.number(),
  volumeMoreThan: Joi.number(),
  volumeLowerThan: Joi.number(),
  country: Joi.string().trim(),
  isEtf: Joi.boolean(),
  isFund: Joi.boolean(),
  isActivelyTrading: Joi.boolean()
})

module.exports = { searchSymbolSchema, companyScreenerSchema }
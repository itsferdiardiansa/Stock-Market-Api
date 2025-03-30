const Joi = require("joi")
const { ACQUISITION_OWNERSHIP_SYMBOLS } = require("@constants/symbols")

const getFormattedLocalDate = (date) => {
  return date.toLocaleDateString("en-CA") // Format "YYYY-MM-DD"
}

const getRelativeLocalDate = (daysAhead) => {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  return getFormattedLocalDate(date)
}

const validateDateRange = (minDate, maxDate) => (value, helpers) => {
  if (value < minDate || value > maxDate) {
    return helpers.error("any.invalid")
  }
  return value
}

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
const TODAY = getRelativeLocalDate(0)
const TOMORROW = getRelativeLocalDate(1)
const ONE_MONTH_LATER = getRelativeLocalDate(30)
const EXCHANGE_LIST = ["NASDAQ", "NYSE", "AMEX"]

// ================== Schema ==========================

const beneficialOwnershipSchema = Joi.object({
  symbol: Joi.string().trim().required().valid(...ACQUISITION_OWNERSHIP_SYMBOLS),
  limit: Joi.number()
})

const sectorPerformanceSnapshotSchema = Joi.object({
  date: Joi.string()
    .pattern(DATE_PATTERN) // format YYYY-MM-DD
    .required()
    .custom(validateDateRange(TODAY, TOMORROW))
    .messages({
      "string.pattern.base": "Date format must be YYYY-MM-DD.",
      "any.invalid": `Date must be between ${TODAY} and ${TOMORROW}.`,
    }),
  exchange: Joi.string().trim().valid(...EXCHANGE_LIST),
  sector: Joi.string().trim()
})

const industryPerformanceSnapshotSchema = Joi.object({
  date: Joi.string()
    .pattern(DATE_PATTERN) // format YYYY-MM-DD
    .required()
    .custom(validateDateRange(TODAY, ONE_MONTH_LATER))
    .messages({
      "string.pattern.base": "Date format must be YYYY-MM-DD.",
      "any.invalid": `Date must be between ${TODAY} and ${ONE_MONTH_LATER}.`,
    }),
  exchange: Joi.string().trim().valid(...EXCHANGE_LIST),
  industry: Joi.string().trim()
})

module.exports = { 
  beneficialOwnershipSchema, 
  sectorPerformanceSnapshotSchema, 
  industryPerformanceSnapshotSchema 
}
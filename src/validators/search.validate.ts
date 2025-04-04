import Joi from 'joi'
import { EXCHANGE_VARIANTS_SYMBOLS, EXCHANGE_LIST } from '@/constants/symbols'

export const stockSymbolSchema = Joi.object({
  query: Joi.string().trim().required().messages({
    'any.required': 'missing query parameter',
  }),
  exchange: Joi.string()
    .trim()
    .uppercase()
    .valid(...EXCHANGE_LIST),
})

export const companyNameSchema = Joi.object({
  query: Joi.string().trim().required().messages({
    'any.required': 'missing query parameter',
  }),
  exchange: Joi.string()
    .trim()
    .uppercase()
    .valid(...EXCHANGE_LIST),
})

export const searchCIKSchema = Joi.object({
  cik: Joi.string().trim().required(),
})

export const searchCUSIPSchema = Joi.object({
  cusip: Joi.string().trim().required(),
})

export const searchISINSchema = Joi.object({
  isin: Joi.string().trim().required(),
})

export const searchExchangeVariantsSchema = Joi.object({
  symbol: Joi.string()
    .trim()
    .uppercase()
    .required()
    .valid(...EXCHANGE_VARIANTS_SYMBOLS),
})

export const companyScreenerSchema = Joi.object({
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
  isActivelyTrading: Joi.boolean(),
  exchange: Joi.string()
    .trim()
    .uppercase()
    .valid(...EXCHANGE_LIST),
})

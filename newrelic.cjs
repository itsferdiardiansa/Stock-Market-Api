"use strict"
const dotenv = require("dotenv")
dotenv.config()

/**
 * https://docs.newrelic.com/docs/apm/agents/nodejs-agent/
 */
exports.config = {
  app_name: ['Stock Market Eye API'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  attributes: {
    enabled: true
  }
}
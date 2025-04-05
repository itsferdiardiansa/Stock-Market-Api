import axios from 'axios'
import pino from 'pino'
import platformConfig from '@/config/platform'

const newRelicLogApi = platformConfig.newRelicLogApi
const newRelicLicenseKey = platformConfig.newRelicLicenseKey

const logger = pino({
  level: platformConfig.isProduction ? 'info' : 'debug',
  formatters: { level: label => ({ level: label }) },
  transport: platformConfig.isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'HH:MM:ss Z',
        },
      },
})

const sendToNewRelic = async (level: string, message: string) => {
  if (!newRelicLicenseKey) {
    return
  }
  try {
    await axios.post(newRelicLogApi, [{ message, level, timestamp: new Date().toISOString() }], {
      headers: { 'Content-Type': 'application/json', 'X-License-Key': newRelicLicenseKey },
    })
  } catch (error) {
    console.error('Failed to send log to New Relic:', error.message)
  }
}

type LogParams = Parameters<typeof logger.info>

for (const level of ['info', 'error', 'fatal'] as const) {
  const originalMethod = logger[level].bind(logger)
  logger[level] = async (...args: LogParams) => {
    originalMethod(...args)
    platformConfig.isProduction && sendToNewRelic(level, args.join(' '))
  }
}

export default logger

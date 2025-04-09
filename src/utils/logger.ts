import pino from 'pino'
import platformConfig from '@/config/platform'
import { getRequestContext } from '@/context/request-context'

const logger = pino({
  level: platformConfig.isProduction ? 'info' : 'debug',
  formatters: {
    level: label => ({ level: label }),
    log: obj => {
      const requestContext = getRequestContext()

      return { ...requestContext, ...obj }
    },
  },
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

export default logger

import platformConfig from './config/platform'
import app from './app'
import { connectRedis } from './config/redis'
import logger from './utils/logger'

const startServer = async () => {
  await connectRedis()

  app.listen(platformConfig.port, () => {
    logger.info('Server - Application started')
    logger.info('Server - Listening on port %d [env: %s]', platformConfig.port, platformConfig.nodeEnv)
  })
}

startServer()

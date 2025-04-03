import app from './app'
import platformConfig from './config/platform'
import { connectRedis } from './config/redis'
import logger from './utils/logger'

const startServer = async () => {
  await connectRedis()

  app.listen(platformConfig.port, () => {
    logger.info(`Server is running...`)
  })
}

startServer()

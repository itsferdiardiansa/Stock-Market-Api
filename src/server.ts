import chalk from 'chalk'
import app from './app'
import platformConfig from './config/platform'
import { connectRedis } from './config/redis'
import { showAppBanner, showBanner } from '@root/scripts/devInfo'

const startServer = async () => {
  showBanner()

  console.log(chalk.yellow('⏳ Connecting to Redis...'))
  await connectRedis()

  app.listen(platformConfig.port, () => {
    showAppBanner(platformConfig.port)
  })
}

startServer()

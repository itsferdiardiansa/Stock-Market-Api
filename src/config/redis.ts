import chalk from 'chalk'
import { createClient, type RedisClientType } from 'redis'
import platformConfig from './platform'
import logger from '@/utils/logger'

const REDIS_URL = platformConfig.cacheUrl

if (!REDIS_URL) {
  logger.info('CACHE_URL is not defined in environment variables!')
  process.exit(1)
}

let redisClient: RedisClientType<Record<string, never>> | null = null

export const connectRedis = async (retryCount = 5): Promise<RedisClientType<Record<string, never>>> => {
  if (redisClient && redisClient.isOpen) {
    return redisClient
  }

  logger.info(`Connecting to Redis...`)

  redisClient = createClient({ url: REDIS_URL })

  redisClient.on('connect', () => {
    logger.info(`Redis is Connected to: ${chalk.blue(REDIS_URL)}`)
  })

  redisClient.on('error', error => {
    logger.error('Redis Connection Error!')
    logger.error(error.message)
  })

  try {
    await redisClient.connect()
    return redisClient
  } catch (error) {
    logger.error(`Redis connection failed! Attempt: ${6 - retryCount}`)
    logger.error(error)

    if (retryCount > 0) {
      logger.info(`Retrying in 3 seconds...`)
      await new Promise(res => setTimeout(res, 3000))
      return connectRedis(retryCount - 1)
    } else {
      logger.error('All Redis connection attempts failed! Exiting...')
      process.exit(1)
    }
  }
}

export const getRedisClient = () => {
  if (!redisClient || !redisClient.isOpen) {
    logger.info('Redis is not connected. Call connectRedis() first.')
  }
  return redisClient
}

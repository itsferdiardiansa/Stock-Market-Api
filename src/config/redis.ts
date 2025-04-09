import { createClient, type RedisClientType } from 'redis'
import platformConfig from './platform'
import logger from '@/utils/logger'

const REDIS_URL = platformConfig.cacheUrl
if (!REDIS_URL) {
  logger.error('Redis - `CACHE_URL` is not defined in environment variables')
  process.exit(1)
}

let redisClient: RedisClientType<Record<string, never>> | null = null
type RedisClient = typeof redisClient

let connectingPromise: Promise<RedisClient> | null = null

const connectWithTimeout = (client: RedisClient, timeoutMs: number) => {
  return Promise.race([
    client.connect(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Redis - Connection timeout')), timeoutMs)),
  ])
}

export const connectRedis = async (retryCount = 5, timeoutMs = 2000) => {
  if (redisClient?.isOpen) {
    return redisClient
  }
  if (connectingPromise) {
    return connectingPromise
  }

  connectingPromise = (async () => {
    const client = createClient({ url: REDIS_URL }) as RedisClient

    client.on('error', err => {
      logger.error({ err }, 'Redis - Background error')
    })

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        logger.info(`Redis - Connecting to ${REDIS_URL}... (attempt ${attempt})`)
        await connectWithTimeout(client, timeoutMs)
        logger.info('Redis - Connected successfully')
        redisClient = client
        connectingPromise = null
        return redisClient
      } catch (err) {
        logger.error({ err, attempt }, 'Redis - Connection failed')
        if (attempt < retryCount) {
          logger.warn(`Redis - Retrying in 3s...`)
          await new Promise(res => setTimeout(res, 3000))
        } else {
          logger.fatal('Redis - All connection attempts failed. Exiting...')
          process.exit(1)
        }
      }
    }

    // Defensive fallback
    connectingPromise = null
    throw new Error('Redis - Unexpected exit from retry loop')
  })()

  return connectingPromise
}

export const getRedisClient = (): RedisClient | null => {
  if (!redisClient?.isOpen) {
    logger.warn('Redis - Client not connected. Call connectRedis() first.')
  }
  return redisClient
}

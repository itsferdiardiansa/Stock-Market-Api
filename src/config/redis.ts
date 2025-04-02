import chalk from 'chalk'
import { createClient, type RedisClientType } from 'redis'

const redisClient: RedisClientType<Record<string, never>> = createClient({
  url: process.env.CACHE_URL,
})

redisClient.on('connect', () => {
  console.log(chalk.gray(`📡 Redis URL: ${chalk.blue(process.env.CACHE_URL)}`))
  console.log(chalk.gray('---------------------------------------\n'))
})

redisClient.on('error', error => {
  console.error(chalk.red.bold('\n❌ Redis Connection Error!'))
  console.error(chalk.red(error))
})

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  } catch (error) {
    console.error(chalk.red.bold('\n🚨 Redis connection failed!'))
    console.error(error)
  }
}

export const getRedisClient = () => {
  if (!redisClient.isOpen) {
    console.log(chalk.yellow('\n⚠️ Redis is not connected. Call connectRedis() first.'))
  }
  return redisClient
}

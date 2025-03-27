const { createClient } = require("redis")

const redisClient = createClient({
  url: process.env.CACHE_URL,
})

redisClient.on("connect", () => console.log(`Redis connected at ${process.env.CACHE_URL}`))
redisClient.on("error", (error) => console.error("Can't connected to redis server: ", error))

const connectRedis = async () => {
  try {
    if (!redisClient.open) {
      await redisClient.connect()
    }
  } catch (error) {
    console.log("Redis connection failed: ", error)
  }
}

const getRedisClient = () => {
  if (!redisClient.open) {
    console.log("Redis is not connected. Call connectRedis() first.")
  }

  return redisClient
}

module.exports = { connectRedis, getRedisClient }
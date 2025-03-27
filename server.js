require("module-alias/register")

const express = require("express")
const dotenv = require("dotenv")
const { connectRedis } = require("./config/redis")

dotenv.config()

connectRedis()

const apiV1Routes = require("./routes")
const notFoundHandler = require("./middlewares/notFound.middleware")
const errorHandler = require("./middlewares/errorHandler.middleware")

const PORT = process.env.APP_PORT
const app = express()

app.use("/api", apiV1Routes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
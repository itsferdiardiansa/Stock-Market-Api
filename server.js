const express = require("express")
const jsonServer = require("json-server")

const apiV1Routes = require("./routes")

const app = express()
const middlewares = jsonServer.defaults()

app.use(middlewares)
app.use("/api/v1", apiV1Routes)

const PORT = 9000
app.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`)
})
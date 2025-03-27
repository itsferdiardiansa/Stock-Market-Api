const express = require("express")
const { fetchData } = require("../../../utils/fetcher")
const { createResponse } = require("../../../utils/response")

const router = express.Router()

router.get("/most-actives", async (_, res) => {
  try {
    const response = await fetchData("most-actives")

    return res.json(createResponse(200, response))
  } catch (error) {
    console.log("err: ", error)
    return res.json(createResponse(error.status, error))
  }
})

module.exports = router
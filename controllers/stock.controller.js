const { fetchData } = require("@utils/fetcher")
const { createResponse } = require("@utils/response")

const getMostActives = async (_, res) => {
  try {
    const response = await fetchData("most-actives")

    res.json(createResponse(200, response))
  } catch (error) {
    res.json(createResponse(error.status, error))
  }
}

const getSearchSymbol = async (req, res) => {
  const { query } = req.query

  try {
    const response = await fetchData("search-symbol", { query })

    res.json(createResponse(200, response))
  } catch (error) {
    res.json(createResponse(error.status, error))
  }
}

module.exports = { getMostActives, getSearchSymbol }
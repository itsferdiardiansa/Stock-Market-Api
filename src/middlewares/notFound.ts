import { createResponse } from '@/utils/response'

const notFoundHandler = (_, res) => {
  res.json(
    createResponse(404, {
      body: {
        message: 'Not Found',
      },
    })
  )
}

export default notFoundHandler

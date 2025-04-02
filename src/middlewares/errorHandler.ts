import { createResponse } from '@/utils/response'

/* eslint-disable handle-callback-err, no-unused-vars  */
const errorHandler = (err, _, res, next) => {
  res.json(
    createResponse(500, {
      body: {
        message: 'Internal Server Error',
      },
    })
  )
}

export default errorHandler

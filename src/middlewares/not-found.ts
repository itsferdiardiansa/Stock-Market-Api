import type { Request, Response } from 'express'
import { formatResponse, sendResponse } from '@/utils/response'

const notFoundHandler = (req: Request, res: Response) => {
  const data = formatResponse(404, {
    body: {
      message: 'Not Found',
    },
  })

  sendResponse(data, { req, res })
}

export default notFoundHandler

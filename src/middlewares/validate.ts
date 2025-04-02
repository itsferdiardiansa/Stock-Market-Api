import { createResponse } from '@/utils/response'

const validate = schema => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.query, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    })

    if (error) {
      return res.json(
        createResponse(400, {
          body: error.details.map(item => ({
            field: item.path.join('.'),
            message: item.message,
            type: item.type,
          })),
        })
      )
    }

    req.query = value // Sanitize
    next()
  }
}

export default validate

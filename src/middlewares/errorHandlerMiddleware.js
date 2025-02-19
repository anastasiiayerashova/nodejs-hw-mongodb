import { isHttpError } from 'http-errors'
import { MongooseError } from 'mongoose'

export const errorHandlerMiddleware = (e, req, res, next) => {
    if (isHttpError(e)) {
    return res.status(e.status).json({ status: e.status, message: e.name, data: e })
  }

  if (e instanceof MongooseError) {
    return res.status(e.status).json({ status: e.status, message: 'Mongoose error', data: { message: e.message }} )
  }

  res.status(500).json({ status: 500, message: 'Something went wrong', error: e.message })
}

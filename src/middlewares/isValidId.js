import { isValidObjectId } from "mongoose"
import createHttpError from "http-errors"

export const isValidId = (idName) => (req, res, next) => {
    const id = req.params[idName]

    if (!id) {
        throw new Error('Missing idName in isValidId')
    }

    if (!isValidObjectId(id)) {
        return next(createHttpError(404, `Contact with id ${id} not found` ))
    }
    next()
}
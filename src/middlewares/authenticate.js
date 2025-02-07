import createHttpError from "http-errors"
import { sessionsCollection } from "../db/models/session.js"
import { usersCollection } from "../db/models/user.js"

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        return next(createHttpError(401, 'Use authorization header'))
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer') {
        return next(createHttpError(401, 'Auth header should be of type Bearer'))
    }

    if (!token) {
        return next(createHttpError(401, 'No access token provided'))
    }

    const session = await sessionsCollection.findOne({ accessToken: token })

    if (!session) {
        return next(createHttpError(401, 'Session not found'))
    }
    
    if (session.accessTokenValidUntil < new Date()) {
        return next(createHttpError(401, 'Access token is expired'))
    }

    const user = await usersCollection.findOne({ _id: session.userId })
    
    if (!user) {
        await sessionsCollection.findByIdAndDelete(session._id)
        return next(createHttpError(401, 'No user found for such session'))
    }

    req.user = user

    next()
}
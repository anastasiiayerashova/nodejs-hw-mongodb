import createHttpError from "http-errors"
import { usersCollection } from "../db/models/user.js"
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { sessionsCollection } from "../db/models/session.js"
import { FIFTEEN_MINUTES, THIRTY_DAYS } from "../constants/contacts.js"

const createSession = () => {
    return {
        accessToken: randomBytes(30).toString('base64'),
        refreshToken: randomBytes(30).toString('base64'),
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    }
}

export const registerUser = async (payload) => {
    let user = await usersCollection.findOne({ email: payload.email })

    if (user) {
        throw createHttpError(409, 'Email in use') 
    }

    const hashedPwd = await bcrypt.hash(payload.password, 10)

    return await usersCollection.create({...payload, password: hashedPwd})
}

export const loginUser = async ({email, password}) => {
    const user = await usersCollection.findOne({ email: email })
    
    if (!user) {
        throw createHttpError(404, 'User not found') 
    }

    const arePwdEqual = await bcrypt.compare(password, user.password)

    if (!arePwdEqual) {
        throw createHttpError(401, 'Login or password is incorrect') 
    }

    await sessionsCollection.deleteOne({ userId: user._id })
    
    return await sessionsCollection.create({
        ...createSession(),
        userId: user._id
    })
}

export const logoutUser = async (sessionId) => {
    return await sessionsCollection.deleteOne({_id: sessionId})
}

export const refreshUser = async (sessionId, refreshToken) => {
    const session = await sessionsCollection.findOne({ _id: sessionId })
    
    if (!session) {
        throw createHttpError(401, 'Can not refresh a session')
    }

    if (session.refreshTokenValidUntil < new Date()) {
        throw createHttpError(401, 'Refresh token expired')
    }

    const user = await usersCollection.findOne({ _id: session.userId })
    
    if (!user) {
        throw createHttpError(401, 'Session user not found')
    }

    await sessionsCollection.findOneAndDelete({ _id: session._id })
    
    return await sessionsCollection.create({
        ...createSession(),
        userId: session.userId
    })

}
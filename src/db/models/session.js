import { model, Schema } from "mongoose"
import { usersCollection } from "./user.js"

const sessionSchema = new Schema(
    {
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
            unique: true,
        },
        accessTokenValidUntil: {
            type: Date,
            required: true,
        },
        refreshTokenValidUntil: {
            type: Date,
            required: true,
        },
        userId: {
            type: Schema.ObjectId,
            required: true,
            ref: usersCollection,
            unique: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const sessionsCollection = model('sessions', sessionSchema)
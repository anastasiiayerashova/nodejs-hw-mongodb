import { OAuth2Client } from 'google-auth-library'
import path from 'node:path'
import fs from 'fs/promises'
import { getEnvVar } from "../utils/getEnvVar.js"
import { googleOAuth } from '../constants/contacts.js'
import createHttpError from 'http-errors'

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json')

const googleConfig = JSON.parse(
    await fs.readFile(PATH_JSON)
)

const client = new OAuth2Client({
    clientId: getEnvVar(googleOAuth.GOOGLE_AUTH_CLIENT_ID),
    clientSecret: getEnvVar(googleOAuth.GOOGLE_AUTH_CLIENT_SECRET),
    project_id: googleConfig.web.project_id,
    redirectUri: googleConfig.web.redirect_uris[0]
})

export const generateOAuthURL = () => {
    return client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ]
    })
}

export const validateOAuthCode = async (code) => {
    try {
        const { tokens } = await client.getToken(code)

        const tokensId = tokens.id_token

        if (!tokensId) throw createHttpError(401, 'Unauthorized')

        const loginTicket = await client.verifyIdToken({idToken: tokensId})

        return loginTicket.getPayload()
    }
    catch (e) {
        console.log(e)
        throw createHttpError(500, 'Error during google oauth authorization')
    }
}

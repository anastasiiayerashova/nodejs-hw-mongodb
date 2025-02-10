import { controllerWrapper } from "../decorators/controllerWrapper.js"
import { loginUser, logoutUser, refreshUser, registerUser, resetPwd, sendResetPwd } from "../services/authServices.js"

const setupCookies = (session, res) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil
    })

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil
    })

}

const registerController = async (req, res) => {
    const { body } = req
    
    const user = await registerUser(body)

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user',
        data: user
    })
}

const loginController = async (req, res) => {
    const { body } = req
    
    const session = await loginUser(body)

    setupCookies(session, res)

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user',
        data: {
            accessToken: session.accessToken
        }
    })
}

const logoutController = async (req, res) => {
    const { sessionId } = req.cookies
    
    await logoutUser(sessionId)

    res.clearCookie('refreshToken')
    res.clearCookie('sessionId')

    res.status(204).send()
}

const refreshController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies
    
    const session = await refreshUser(sessionId, refreshToken)

    setupCookies(session, res)

    res.status(200).json({
        status: 200,
        message: 'Successfully refreshed a session',
        data: {
           accessToken: session.accessToken,
        }
    })
}

const sendResetPwdController = async (req, res) => {
    await sendResetPwd(req.body)

    res.status(200).json({
        status: 200,
        message: 'Reset password email was successfully sent',
        data: {}
    })
}

const resetPwdController = async (req, res) => {
    await resetPwd(req.body)

    res.status(200).json({
        status: 200,
        message: 'Password was successfully reset',
        data: {}
    })
}

export default {
    registerController: controllerWrapper(registerController),
    loginController: controllerWrapper(loginController),
    logoutController: controllerWrapper(logoutController),
    refreshController: controllerWrapper(refreshController),
    sendResetPwdController: controllerWrapper(sendResetPwdController),
    resetPwdController: controllerWrapper(resetPwdController)
}
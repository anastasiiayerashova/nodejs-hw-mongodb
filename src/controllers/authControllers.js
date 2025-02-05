import { controllerWrapper } from "../decorators/controllerWrapper.js"
import { loginUser, logoutUser, registerUser } from "../services/authServices.js"

const registerController = async (req, res) => {
    const { body } = req
    
    const user = await registerUser(body)

    res.status(200).json({
        status: 200,
        message: 'Successfully registered a user!',
        data: user
    })
}

const loginController = async (req, res) => {
    const { body } = req
    
    const session = await loginUser(body)

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil
    })

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil
    })

    res.json({
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

export default {
    registerController: controllerWrapper(registerController),
    loginController: controllerWrapper(loginController),
    logoutController: controllerWrapper(logoutController)
}
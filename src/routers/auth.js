import express from 'express'
import { loginUserSchema, registerUserSchema } from '../validation/auth.js'
import { validateBody } from '../middlewares/validateBody.js'
import authControllers from '../controllers/authControllers.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(registerUserSchema), authControllers.registerController)
authRouter.post('/login', validateBody(loginUserSchema), authControllers.loginController)
authRouter.post('/logout', authControllers.logoutController)
authRouter.post('/refresh', authControllers.refreshController)

export default authRouter
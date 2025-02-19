import express from 'express'
import authRouter from './auth.js'
import contactsRouter from './contactsRouter.js'
import { swaggerDocs } from '../middlewares/swaggerDocs.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/contacts', contactsRouter)
router.use('/api-docs', swaggerDocs())

export default router

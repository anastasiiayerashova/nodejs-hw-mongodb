import express from 'express'
import dotenv from 'dotenv'
import pino from 'pino-http'
import cors from 'cors'
import { getEnvVar } from './utils/getEnvVar.js'
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'
import { serverErrorMiddleware } from './middlewares/serverErrorMiddleware.js'
import contactsRouter from './routers/contactsRouter.js'

dotenv.config()

const PORT = Number(getEnvVar('PORT', 3001))

export const startServer = () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(pino({
        transport: {
            target: 'pino-pretty'
        }
    }))

    app.use('/contacts', contactsRouter)
    
    app.use(notFoundMiddleware)
    app.use(serverErrorMiddleware)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
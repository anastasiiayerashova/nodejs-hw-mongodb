import express from 'express'
import pino from 'pino-http'
import cors from 'cors'
import { getEnvVar } from './utils/getEnvVar.js'
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js'
import router from './routers/index.js'
import cookieParser from 'cookie-parser'
import { MAIN_UPLOAD_DIR } from './constants/contacts.js'

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
    app.use(cookieParser())

    app.use('/uploads', express.static(MAIN_UPLOAD_DIR))

    app.use(router)
    
    app.use(notFoundMiddleware)
    app.use(errorHandlerMiddleware)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
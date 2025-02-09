import nodemailer from 'nodemailer'
import { getEnvVar } from './getEnvVar.js'
import { SMTP } from '../constants/contacts.js'

const transport = nodemailer.createTransport({
    host: getEnvVar(SMTP.SMTP_HOST),
    port: Number(getEnvVar(SMTP.SMTP_PORT)),
    auth: {
        user: getEnvVar(SMTP.SMTP_USER),
        pass: getEnvVar(SMTP.SMTP_PASSWORD)
    }
})

export const sendEmail = async (options) => {
    return await transport.sendMail(options)
}
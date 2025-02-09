import path from 'node:path'
import fs from 'node:fs/promises'
import { MAIN_UPLOAD_DIR, SMTP } from '../constants/contacts.js'
import { getEnvVar } from './getEnvVar.js'

export const saveFileToUploadDir = async (file) => {
    const content = await fs.readFile(file.path)

    const newPath = path.join(MAIN_UPLOAD_DIR, file.filename)

    await fs.writeFile(newPath, content)

    await fs.unlink(file.path)

    return `${getEnvVar(SMTP.APP_DOMAIN)}/uploads/${file.filename}`

 }
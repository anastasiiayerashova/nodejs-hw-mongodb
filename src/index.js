import { startServer } from "./server.js"
import { initMongoConnection } from "./db/initMongoConnection.js"
import { createDirIfNotExists } from "./utils/createDirIfNotExist.js"
import { MAIN_UPLOAD_DIR, TEMP_UPLOAD_DIR } from "./constants/contacts.js"

(async () => {
    await initMongoConnection()
    await createDirIfNotExists(TEMP_UPLOAD_DIR)
    await createDirIfNotExists(MAIN_UPLOAD_DIR)
    startServer()
})()
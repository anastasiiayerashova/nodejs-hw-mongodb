import { CLOUDINARY } from "../constants/contacts.js"
import { getEnvVar } from "./getEnvVar.js"
import { saveFileToCloudinary } from "./saveFileToCloudinary.js"
import { saveFileToUploadDir } from "./saveFileToUploadDir.js"

export const saveFile = async (file) => {
    if (!file) return
    
    let url

    if (getEnvVar(CLOUDINARY.IS_CLOUDINARY_ENABLED) === 'true') {
       url = await saveFileToCloudinary(file)
    }
    else {
        url = await saveFileToUploadDir(file)
    }

    return url
}
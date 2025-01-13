import { getAllContacts, getContactById } from "../services/contactsServices.js"
import { notFoundMiddleware } from "../middlewares/notFoundMiddleware.js"


export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts()
        if (!contacts) {
            throw notFoundMiddleware()
        }
        res.json({
            status: 200, message: 'Successfully found contacts', data: contacts
        })
    }
    catch (e) {
        next(e)
    }
}

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contact = await getContactById(contactId)
        if (!contact) {
            return res.status(404).json({status: 404, message: `Contact with id ${contactId} not found`
            })
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}`,
            data: contact
        })
    }
    catch (e) {
         next(e)
    }
}


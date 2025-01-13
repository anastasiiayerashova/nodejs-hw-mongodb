import { controllerWrapper } from "../decorators/controllerWrapper.js"
import { getAllContacts, getContactById } from "../services/contactsServices.js"

const getAllController = async (req, res) => {
        const contacts = await getAllContacts()

        if (!contacts) {
            res.status(404).json({ status: 404, message: 'No contacts found'
            })
        }

        res.json({
            status: 200, message: 'Successfully found contacts', data: contacts
        })
}

export const getByIdController = async (req, res) => {
        const { contactId } = req.params
        const contact = await getContactById(contactId)

        if (!contact) {
            return res.status(404).json({status: 404, message: `Contact with id ${contactId} not found`
            })
        }

        res.json({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact
        })
}

export default {
    getAllController: controllerWrapper(getAllController),
    getByIdController: controllerWrapper(getByIdController)
}
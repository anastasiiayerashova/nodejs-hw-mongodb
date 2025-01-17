import { controllerWrapper } from "../decorators/controllerWrapper.js"
import { createContact, deleteContact, getAllContacts, getContactById, upsertContact } from "../services/contactsServices.js"
import createHttpError from "http-errors"

const getAllController = async (req, res, next) => {
        const contacts = await getAllContacts()

        if (!contacts) {
            return next(createHttpError(404, 'No contacts found'))
        }

        res.status(200).json({ status: 200, message: 'Successfully found contacts', data: contacts })
}

const getByIdController = async (req, res, next) => {
        const {contactId} = req.params
        const contact = await getContactById(contactId)

        if (!contact) {
            return next(createHttpError(404, `Contact with id ${contactId} not found`))
        }

        res.status(200).json({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact })
}

const createContactController = async (req, res) => {
        const contact = await createContact(req.body)

        res.status(201).json({ status: 201, message: 'Successfully created a contact', data: contact })
}

const deleteContactController = async (req, res) => {
        const {contactId} = req.params
        await deleteContact(contactId)

        res.status(204).send()
}

const upsertContactController = async (req, res) => {
        const { body } = req
        const { contactId } = req.params
    
        const { contact, isNew } = await upsertContact(contactId, body, { upsert: true })
        const status = isNew ? 201 : 200
    
        res.status(status).json({status, message: 'Successfully upserted contact', data: contact})
}

const patchContactController = async (req, res) => {
        const {body} = req
        const {contactId} = req.params
    
        const {contact} = await upsertContact(contactId, body)

        res.status(200).json({ status: 200, message: 'Successfully patched a contact', data: contact})
}

export default {
        getAllController: controllerWrapper(getAllController),
        getByIdController: controllerWrapper(getByIdController),
        createContactController: controllerWrapper(createContactController),
        deleteContactController: controllerWrapper(deleteContactController),
        upsertContactController: controllerWrapper(upsertContactController),
        patchContactController: controllerWrapper(patchContactController)
}
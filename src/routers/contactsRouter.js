import express from 'express'
import contactsControllers from '../controllers/contactsControllers.js'
import { isValidId } from '../middlewares/isValidId.js'

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAllController)
contactsRouter.get('/:contactId', isValidId, contactsControllers.getByIdController)
contactsRouter.post('/', contactsControllers.createContactController)
contactsRouter.delete('/:contactId', isValidId, contactsControllers.deleteContactController)
contactsRouter.put('/:contactId', isValidId, contactsControllers.upsertContactController)
contactsRouter.patch('/:contactId', isValidId, contactsControllers.patchContactController)

export default contactsRouter
import express from 'express'
import contactsControllers from '../controllers/contactsControllers.js'
import { isValidId } from '../middlewares/isValidId.js'

const contactsRouter = express.Router()

contactsRouter.use('/:contactId', isValidId('contactId'))

contactsRouter.get('/', contactsControllers.getAllController)
contactsRouter.get('/:contactId', contactsControllers.getByIdController)
contactsRouter.post('/', contactsControllers.createContactController)
contactsRouter.delete('/:contactId', contactsControllers.deleteContactController)
contactsRouter.put('/:contactId', contactsControllers.upsertContactController)
contactsRouter.patch('/:contactId', contactsControllers.patchContactController)

export default contactsRouter
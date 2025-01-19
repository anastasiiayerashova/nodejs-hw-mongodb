import express from 'express'
import contactsControllers from '../controllers/contactsControllers.js'
import { isValidId } from '../middlewares/isValidId.js'
import { validateBody } from '../middlewares/validateBody.js'
import { createContactsSchema } from '../validation/createContactsSchema.js'
import { updateContactsSchema } from '../validation/updateContactsSchema.js'

const contactsRouter = express.Router()

contactsRouter.use('/:contactId', isValidId('contactId'))

contactsRouter.get('/', contactsControllers.getAllController)
contactsRouter.get('/:contactId', contactsControllers.getByIdController)
contactsRouter.post('/', validateBody(createContactsSchema), contactsControllers.createContactController)
contactsRouter.delete('/:contactId', contactsControllers.deleteContactController)
contactsRouter.put('/:contactId', validateBody(updateContactsSchema), contactsControllers.upsertContactController)
contactsRouter.patch('/:contactId', validateBody(updateContactsSchema), contactsControllers.patchContactController)

export default contactsRouter
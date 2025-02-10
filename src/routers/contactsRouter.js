import express from 'express'
import contactsControllers from '../controllers/contactsControllers.js'
import { isValidId } from '../middlewares/isValidId.js'
import { validateBody } from '../middlewares/validateBody.js'
import { createContactsSchema } from '../validation/createContactsSchema.js'
import { updateContactsSchema } from '../validation/updateContactsSchema.js'
import { authenticate } from '../middlewares/authenticate.js'
import { upload } from '../middlewares/multer.js'

const contactsRouter = express.Router()

contactsRouter.use('/', authenticate)

contactsRouter.use('/:contactId', isValidId('contactId'))

contactsRouter.get('/', contactsControllers.getAllController)
contactsRouter.get('/:contactId', contactsControllers.getByIdController)
contactsRouter.post('/', upload.single('photo'), validateBody(createContactsSchema), contactsControllers.createContactController)
contactsRouter.delete('/:contactId', contactsControllers.deleteContactController)
contactsRouter.put('/:contactId', upload.single('photo'), validateBody(updateContactsSchema), contactsControllers.upsertContactController)
contactsRouter.patch('/:contactId', upload.single('photo'), validateBody(updateContactsSchema), contactsControllers.patchContactController)

export default contactsRouter
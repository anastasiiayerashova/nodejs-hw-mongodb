import express from 'express'
import { getAllContactsController, getContactByIdController } from '../controllers/contactsControllers.js'


const contactsRouter = express.Router()

contactsRouter.get('/', getAllContactsController);
contactsRouter.get('/:contactId', getContactByIdController)

export default contactsRouter

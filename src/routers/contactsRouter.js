import express from 'express'
import contactsControllers from '../controllers/contactsControllers.js';

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAllController);
contactsRouter.get('/:contactId', contactsControllers.getByIdController)

export default contactsRouter
import Joi from "joi"
import { emailMessages, nameMessages, phoneMessages, typeMessages } from "../constants/contacts.js"

const validateName = (value, helpers) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return helpers.message('Name should only contain letters')
    }
    return value
}

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).custom(validateName).messages(nameMessages),
    phoneNumber: Joi.string().pattern(/^\+?\d{6,20}$/).min(6).max(20).messages(phoneMessages),
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(20).messages(emailMessages),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Is favourite should be a boolean',
    }),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(8).messages(typeMessages)
})
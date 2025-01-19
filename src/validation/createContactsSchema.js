import Joi from "joi"
import { emailMessages, nameMessages, phoneMessages, typeMessages } from "../constants/contacts.js"

const validateName = (value, helpers) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return helpers.message('Name should only contain letters')
    }
    return value
}

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().custom(validateName).messages({
        'any.required': 'Name is required',
        ...nameMessages
    }),
    phoneNumber: Joi.number().min(6).required().messages({
        'any.required': 'Phone number is required',
        ...phoneMessages
    }),
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(20).required().messages({
        'any.required': 'Email is required',
        ...emailMessages
    }),
    isFavourite: Joi.boolean().required().messages({
        'boolean.base': 'Is favourite should be a boolean',
        'any.required': 'Is favourite is required'
    }),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(8).required().messages({
        'any.required': 'Contact type is required',
       ...typeMessages
    })
})
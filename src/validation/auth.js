import Joi from "joi"
import { nameMessages, emailMessages } from "../constants/contacts.js"

const validateName = (value, helpers) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return helpers.message('Name should only contain letters')
    }
    return value
}

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).custom(validateName).messages(nameMessages).required(),
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(20).messages(emailMessages).required(),
    password: Joi.string().min(3).max(20).required()
})

export const loginUserSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(20).messages(emailMessages).required(),
    password: Joi.string().min(3).max(20).required()
})
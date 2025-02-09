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
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(25).messages(emailMessages).required(),
    password: Joi.string().min(3).max(20).required()
})

export const loginUserSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(25).messages(emailMessages).required(),
    password: Joi.string().min(3).max(20).required()
})

export const sendEmailSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).max(25).messages(emailMessages).required()
})

export const resetPwdSchema = Joi.object({
    password: Joi.string().min(3).max(20).required(),
    token: Joi.string().required()
})
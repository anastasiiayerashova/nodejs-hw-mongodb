import { contactsCollection } from "../db/models/contacts.js"
import mongoose from "mongoose"
import createHttpError from "http-errors"

export const getAllContacts = async () => await contactsCollection.find()

export const getContactById = async (contactId) => {
    if (!mongoose.Types.ObjectId.isValid(contactId)) return null
    
    return await contactsCollection.findById(contactId)
}

export const createContact = async (payload) => await contactsCollection.create(payload)

export const deleteContact = async (contactId) => {
    if (!mongoose.Types.ObjectId.isValid(contactId)) return null
    
    return await contactsCollection.findByIdAndDelete(contactId)
}

export const upsertContact = async (contactId, payload, options = {}) => {
    const result = await contactsCollection.findByIdAndUpdate(contactId, payload, {
        new: true,
        includeResultMetadata: true,
        ...options
    })

    if (!result || !result.value) {
        throw createHttpError(404, 'Contact not found')
    }

    return {
        contact: result.value,
        isNew: !result?.lastErrorObject?.updatedExisting
    }
}
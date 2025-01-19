import { contactsCollection } from "../db/models/contacts.js"
import mongoose from "mongoose"
import createHttpError from "http-errors"
import { calculatePaginationData } from "../utils/calculatePaginationData.js"
import { sort_order } from "../constants/contacts.js"

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder = sort_order.asc, filter = {} }) => {
    const skip = perPage * (page - 1)

    const contactsQuery = contactsCollection.find()

    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type)
    }

    if (filter.isFavourite !== undefined) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite)
    }

    const [contactsCount, contacts] = await Promise.all([contactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder }).exec()])
    
    const paginationInfo = calculatePaginationData(page, perPage, contactsCount)

    return {
        data: contacts,
        ...paginationInfo
    }
}

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
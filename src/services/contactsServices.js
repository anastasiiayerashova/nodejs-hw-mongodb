import { contactsCollection } from "../db/models/contacts.js"
import createHttpError from "http-errors"
import { calculatePaginationData } from "../utils/calculatePaginationData.js"
import { sort_order } from "../constants/contacts.js"
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js"
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js"
import { saveFile } from "../utils/saveFile.js"

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder = sort_order.asc, filter = {}, userId }) => {
    const skip = perPage * (page - 1)

    const contactsQuery = contactsCollection.find({...filter, userId})

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

export const getContactById = async (contactId, userId) => {
    return await contactsCollection.findOne({_id: contactId, userId})
}

export const createContact = async (payload) => {
    const url = await saveFile(payload.avatar)
    return await contactsCollection.create({...payload, avatarUrl: url})
}

export const deleteContact = async (contactId, userId) => {
    return await contactsCollection.findOneAndDelete({_id: contactId, userId})
}

export const upsertContact = async (contactId, payload, userId, options = {}) => {
    const result = await contactsCollection.findOneAndUpdate({_id: contactId, userId}, payload, {
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
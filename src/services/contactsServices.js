import { contactsCollection } from "../db/models/contacts.js";
import mongoose from "mongoose";

export const getAllContacts = async () => {
    return await contactsCollection.find()
}

export const getContactById = async (contactId) => {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return null
    }

    return await contactsCollection.findById(contactId);
};


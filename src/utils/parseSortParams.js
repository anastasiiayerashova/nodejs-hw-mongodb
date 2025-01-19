import { sort_order } from "../constants/contacts.js"

const parseSortOrder = (sortOrder) => {
    if (!Object.values(sort_order).includes(sortOrder)) return sort_order.asc

    return sortOrder
}

const parseSortBy = (sortBy) => {
    const keys = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt']

    if (!keys.includes(sortBy)) return '_id'

    return sortBy
}

export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query
    
    const parsedSortOrder = parseSortOrder(sortOrder)
    const parsedSortBy = parseSortBy(sortBy)

    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy
    }
}
const parseNumber = (unknown, defaultNumber) => {
    if (typeof unknown !== 'string' || !/^\d+$/.test(unknown)) return defaultNumber

    const parsedNumber = parseInt(unknown)

    if (Number.isNaN(parsedNumber) || parsedNumber < 0) return defaultNumber
    
    return parsedNumber

}

export const parsePaginationParams = (query) => {
    const { page, perPage } = query

    return {
        page: parseNumber(page, 1),
        perPage: parseNumber(perPage, 10)
    }
}
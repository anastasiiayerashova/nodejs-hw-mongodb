export const sort_order = {
    asc: 'asc',
    desc: 'desc'
}

export const nameMessages = {
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
}

export const phoneMessages = {
        'number.base': 'Phone number must be a number',
        'number.min': 'Phone number must have at least {#limit} digits',
        'number.max': 'Phone number cannot exceed {#limit} digits',
}

export const emailMessages = {
        'string.base': 'Email should be a string',
        'string.min': 'Email should have at least {#limit} characters',
        'string.max': 'Email should have at most {#limit} characters',
}

export const typeMessages = {
        'string.base': 'Contact type should be a string',
        'any.only': 'Contact type must be one of [work, home, personal], but received "{{#value}}"'
}

export const FIFTEEN_MINUTES = 15 * 60 * 1000
export const ONE_DAY = 24 * 60 * 60 * 1000
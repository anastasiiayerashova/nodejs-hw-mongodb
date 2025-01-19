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
        'string.pattern.base': 'Phone number must be a valid number with optional "+" and 6-20 digits',
        'string.min': 'Phone number must have at least {#limit} digits',
        'string.max': 'Phone number cannot exceed {#limit} digits',
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
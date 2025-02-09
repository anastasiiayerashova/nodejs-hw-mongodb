import path from 'node:path'

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
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN'
}

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp')
export const MAIN_UPLOAD_DIR = path.join(process.cwd(), 'uploads')

export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
    IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED'
}
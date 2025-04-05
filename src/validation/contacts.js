import Joi from 'joi';

// Оголошення схеми з кастомізованими повідомленнями
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'PhoneNumber should be a string', // Кастомізація повідомлення
    'string.min': 'PhoneNumber should have at least {#limit} characters',
    'string.max': 'PhoneNumber should have at most {#limit} characters',
    'any.required': 'PhoneNumber is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string', // Кастомізація повідомлення
    'string.email': 'The string is not a valid email.',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'IsFavourite should be a boolean', // Кастомізація повідомлення
    'any.required': 'IsFavourite is required',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'ContactType should be a string', // Кастомізація повідомлення
      'string.empty': 'ContactType is not allowed to be empty', // Кастомізація повідомлення
      'string.min': 'ContactType should have at least {#limit} characters',
      'string.max': 'ContactType should have at most {#limit} characters',
      'any.required': 'ContactType is required',
      'any.valid':
        'СontactType only allows values "work", "home" or "personal"',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення
    'string.empty': 'Username is not allowed to be empty',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'PhoneNumber should be a string', // Кастомізація повідомлення
    'string.min': 'PhoneNumber should have at least {#limit} characters',
    'string.max': 'PhoneNumber should have at most {#limit} characters',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.base': 'Email should be a string', // Кастомізація повідомлення
    'string.email': 'The string is not a valid email.',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'IsFavourite should be a boolean', // Кастомізація повідомлення
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .messages({
      'string.base': 'ContactType should be a string', // Кастомізація повідомлення
      'string.min': 'ContactType should have at least {#limit} characters',
      'string.max': 'ContactType should have at most {#limit} characters',
      'any.valid':
        'СontactType only allows values "work", "home" or "personal"',
    }),
});

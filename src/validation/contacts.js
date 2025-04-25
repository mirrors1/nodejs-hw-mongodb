import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';
import { emailRegexp } from '../constants/auth.js';

// Оголошення схеми з кастомізованими повідомленнями
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення
    'string.empty': 'Username is not allowed to be empty',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phonenumber should be a string', // Кастомізація повідомлення
    'string.empty': 'Phonenumber is not allowed to be empty',
    'any.required': 'PhoneNumber is required',
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'E-mail should be a string', // Кастомізація повідомлення
    'string.empty': 'E-mail is not allowed to be empty',
    'string.pattern.base': 'The {email} is not a valid e-mail',
    //'string.email': 'The string is not a valid e-mail',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'IsFavourite should be a boolean', // Кастомізація повідомлення
  }),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .required()
    .messages({
      'any.only': `СontactType only allows values: ${contactTypeList}`, // Кастомізація повідомлення
      'any.required': 'ContactType is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення
    'string.empty': 'Username is not allowed to be empty',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().messages({
    'string.base': 'Phonenumber should be a string', // Кастомізація повідомлення
    'string.empty': 'Phonenumber is not allowed to be empty',
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'E-mail should be a string', // Кастомізація повідомлення
    'string.empty': 'E-mail is not allowed to be empty',
    'string.pattern.base': 'The {email} is not a valid e-mail',
    //'string.email': 'The string is not a valid e-mail.',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'IsFavourite should be a boolean', // Кастомізація повідомлення
  }),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .messages({
      'any.only': `СontactType only allows values: ${contactTypeList}`, // Кастомізація повідомлення
    }),
});

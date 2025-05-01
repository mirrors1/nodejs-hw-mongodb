import Joi from 'joi';
import { emailRegexp } from '../constants/auth.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення
    'string.empty': 'Username is not allowed to be empty',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'E-mail should be a string', // Кастомізація повідомлення
    'string.empty': 'E-mail is not allowed to be empty',
    'string.pattern.base': 'The {email} is not a valid e-mail',
    'any.required': 'E-mail is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a string', // Кастомізація повідомлення
    'string.empty': 'Password is not allowed to be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'E-mail should be a string', // Кастомізація повідомлення
    'string.empty': 'E-mail is not allowed to be empty',
    'string.pattern.base': 'The {email} is not a valid e-mail',
    'any.required': 'E-mail is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a string', // Кастомізація повідомлення
    'string.empty': 'Password is not allowed to be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': 'E-mail should be a string',
    'string.empty': 'E-mail is not allowed to be empty',
    'string.pattern.base': 'The {email} is not a valid e-mail',
    'any.required': 'E-mail is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a string', // Кастомізація повідомлення
    'string.empty': 'Password is not allowed to be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Token should be a string', // Кастомізація повідомлення
    'string.empty': 'Token is not allowed to be empty',
    'any.required': 'Token is required',
  }),
});

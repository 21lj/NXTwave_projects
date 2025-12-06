import Joi from 'joi';
import { CATEGORY_ENUM } from '../models/Expense.js';

export const createExpenseSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  amount: Joi.number().precision(2).min(0).required(),
  type: Joi.string().valid('expense', 'income').required(),
  category: Joi.string().valid(...CATEGORY_ENUM).required(),
  note: Joi.string().allow('').max(1000),
  date: Joi.date().iso().required()
});

export const updateExpenseSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  amount: Joi.number().precision(2).min(0),
  type: Joi.string().valid('expense', 'income'),
  category: Joi.string().valid(...CATEGORY_ENUM),
  note: Joi.string().allow('').max(1000),
  date: Joi.date().iso()
}).min(1); 


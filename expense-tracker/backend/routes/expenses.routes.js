import express from 'express';
import auth from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { createExpenseSchema, updateExpenseSchema } from '../validators/expense.validator.js';
import * as controller from '../controllers/expenses.controller.js';

const router = express.Router();

router.use(auth);

router.post('/', validate(createExpenseSchema), controller.createExpense);
router.get('/', controller.getExpenses);

router.get('/search', controller.searchExpenses);
router.get('/filter', controller.filterExpenses);
router.get('/sort', controller.sortExpenses);
router.get('/summary', controller.getSummary);
router.get('/statistics', controller.getStatistics);

router.delete('/', controller.deleteAllExpenses);

router.get('/:id', controller.getExpenseById);
router.put('/:id', validate(updateExpenseSchema), controller.updateExpense);
router.delete('/:id', controller.deleteExpense);

export default router;

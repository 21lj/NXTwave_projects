import express from 'express';
import auth from '../middleware/auth.middleware.js';
import * as controller from '../controllers/expenses.controller.js';

const router = express.Router();

router.get('/:id/expenses', auth, controller.getUserExpenses);

export default router;

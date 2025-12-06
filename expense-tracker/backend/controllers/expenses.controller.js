import mongoose from 'mongoose';
import { Expense } from '../models/Expense.js';

/**
 * Create an expense (or income)
 * POST /api/expenses
 * body: { title, amount, type, category, note, date }
 * req.user is required (auth middleware)
 */
export const createExpense = async (req, res, next) => {
  try {
    const payload = { ...req.body, user: req.user._id };
    const exp = new Expense(payload);
    await exp.save();
    res.status(201).json({ expense: exp });
  } catch (err) {
    next(err);
  }
};

/**
 * Get list of expenses for authenticated user
 * GET /api/expenses
 * Query params (optional): page, limit, sortBy (date|amount), order (asc|desc)
 */
export const getExpenses = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const page = Math.max(1, Number.parseInt(req.query.page ?? '1', 10) || 1);
    const limit = Math.min(100, Number.parseInt(req.query.limit ?? '20', 10) || 20);
    const sortBy = req.query.sortBy === 'amount' ? 'amount' : 'date';
    const order = req.query.order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Expense.find({ user: userId })
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Expense.countDocuments({ user: userId }).exec()
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    next(err);
  }
};

/**
 * Get single expense by id (only owner)
 * GET /api/expenses/:id
 */
export const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid id' });

    const exp = await Expense.findById(id).populate('user', 'name email').exec();
    if (!exp) return res.status(404).json({ error: 'Expense not found' });

    const ownerId = String(exp.user._id ?? exp.user);
    if (ownerId !== String(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized to view this expense' });
    }

    res.json({ expense: exp });
  } catch (err) {
    next(err);
  }
};

/**
 * Update expense (owner only)
 * PUT /api/expenses/:id
 */
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid id' });

    const exp = await Expense.findById(id).exec();
    if (!exp) return res.status(404).json({ error: 'Expense not found' });

    if (String(exp.user) !== String(req.user._id))
      return res.status(403).json({ error: 'Not authorized to update this expense' });

    Object.assign(exp, req.body);
    await exp.save();
    res.json({ expense: exp });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete an expense (owner only)
 * DELETE /api/expenses/:id
 */
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'Invalid id' });

    const exp = await Expense.findById(id).exec();
    if (!exp) return res.status(404).json({ error: 'Expense not found' });

    if (String(exp.user) !== String(req.user._id))
      return res.status(403).json({ error: 'Not authorized to delete this expense' });

    await exp.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete all expenses (for reset) - owner only
 * DELETE /api/expenses
 */
export const deleteAllExpenses = async (req, res, next) => {
  try {
    await Expense.deleteMany({ user: mongoose.Types.ObjectId(req.user._id) }).exec();
    res.json({ message: 'All expenses deleted for user' });
  } catch (err) {
    next(err);
  }
};

/**
 * Search expenses by keyword in title or note
 * GET /api/expenses/search?keyword=...
 */
export const searchExpenses = async (req, res, next) => {
  try {
    const keyword = (req.query.keyword || '').trim();
    if (!keyword) return res.status(400).json({ error: 'keyword is required' });

    const q = {
      user: new mongoose.Types.ObjectId(req.user._id),
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { note: { $regex: keyword, $options: 'i' } }
      ]
    };

    const items = await Expense.find(q).sort({ date: -1 }).limit(200).lean().exec();
    res.json({ items, count: items.length });
  } catch (err) {
    next(err);
  }
};

/**
 * Filter by category and/or month
 * GET /api/expenses/filter?category=food&month=YYYY-MM
 */
export const filterExpenses = async (req, res, next) => {
  try {
    const { category, month } = req.query;
    const q = { user: new mongoose.Types.ObjectId(req.user._id) };

    if (category) q.category = category;

    if (month) {
      const parts = String(month).split('-');
      if (parts.length !== 2)
        return res.status(400).json({ error: 'Invalid month format, use YYYY-MM' });

      const year = Number.parseInt(parts[0], 10);
      const monthNum = Number.parseInt(parts[1], 10) - 1;

      if (Number.isNaN(year) || Number.isNaN(monthNum) || monthNum < 0 || monthNum > 11)
        return res.status(400).json({ error: 'Invalid month format, use YYYY-MM' });

      q.date = {
        $gte: new Date(Date.UTC(year, monthNum, 1)),
        $lt: new Date(Date.UTC(year, monthNum + 1, 1))
      };
    }

    const items = await Expense.find(q).sort({ date: -1 }).limit(1000).lean().exec();
    res.json({ items, count: items.length });
  } catch (err) {
    next(err);
  }
};

/**
 * Sort endpoint (alias of getExpenses)
 * GET /api/expenses/sort?by=amount&order=asc
 */
export const sortExpenses = async (req, res, next) => {
  try {
    req.query.sortBy = req.query.by || req.query.sortBy;
    req.query.order = req.query.order || 'desc';
    return getExpenses(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Summary: totals for income, expenses and balance
 * GET /api/expenses/summary
 */
export const getSummary = async (req, res, next) => {
  try {
    // Use Types.ObjectId — safe and compatible
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const agg = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]).exec();

    let totalIncome = 0;
    let totalExpense = 0;
    agg.forEach(({ _id, total }) => {
      if (_id === 'income') totalIncome = total;
      if (_id === 'expense') totalExpense = total;
    });

    res.json({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
  } catch (err) {
    next(err);
  }
};




/**
 * Statistics: category totals and monthly totals (last N months)
 * GET /api/expenses/statistics?months=6
 */
export const getStatistics = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const months = Math.max(1, Math.min(24, Number.parseInt(req.query.months ?? '6', 10) || 6));

    const categoryAgg = Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

    const monthlyAgg = Expense.aggregate([
      { $match: { user: userId, date: { $gte: startMonth } } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' },
          total: { $sum: '$amount' }
        }
      },
      { $project: { year: '$_id.year', month: '$_id.month', type: '$_id.type', total: 1, _id: 0 } },
      { $sort: { year: 1, month: 1 } }
    ]);

    const [categoryRes, monthlyRes] = await Promise.all([categoryAgg.exec(), monthlyAgg.exec()]);

    const monthlyMap = {};
    monthlyRes.forEach(r => {
      const key = `${r.year}-${String(r.month).padStart(2, '0')}`;
      monthlyMap[key] = monthlyMap[key] || { income: 0, expense: 0 };
      monthlyMap[key][r.type] = r.total;
    });

    res.json({ categories: categoryRes, monthly: monthlyMap });
  } catch (err) {
    next(`${err} hahaha`);
  }
};


/**
 * Get expenses for a specific user id (only allow if same as req.user._id)
 * GET /api/users/:id/expenses
 */
export const getUserExpenses = async (req, res, next) => {
  try {
    const { id: targetId } = req.params;
    if (String(targetId) !== String(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden: can only access your own expenses' });
    }

    const items = await Expense.find({ user: targetId }).sort({ date: -1 }).lean().exec();
    res.json({ items, count: items.length });
  } catch (err) {
    next(err);
  }
};

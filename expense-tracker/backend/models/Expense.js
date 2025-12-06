import mongoose from 'mongoose';

export const CATEGORY_ENUM = [
  'food',
  'transport',
  'entertainment',
  'shopping',
  'bills',
  'salary',
  'investment',
  'other'
];

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: [true, 'Title required'], trim: true, maxlength: 200 },
  amount: { type: Number, required: [true, 'Amount required'], min: 0 },
  type: { type: String, enum: ['expense', 'income'], default: 'expense' }, // expense or income
  category: { type: String, enum: CATEGORY_ENUM, default: 'other', index: true },
  note: { type: String, default: '', maxlength: 1000 },
  date: { type: Date, required: true, default: Date.now, index: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for faster queries per user sorted by date
expenseSchema.index({ user: 1, date: -1 });

// Exporting as ES6 module
export const Expense = mongoose.model('Expense', expenseSchema);

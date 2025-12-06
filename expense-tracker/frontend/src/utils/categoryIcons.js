import {
  MdFastfood,
  MdDirectionsBus,
  MdOutlineMovie,
  MdShoppingCart,
  MdReceiptLong,
  MdWork,
  MdTrendingUp,
  MdCategory,
} from 'react-icons/md';

export const categoryMeta = {
  food: { label: 'Food', icon: MdFastfood, color: 'text-rose-500' },
  transport: { label: 'Transport', icon: MdDirectionsBus, color: 'text-sky-500' },
  entertainment: { label: 'Entertainment', icon: MdOutlineMovie, color: 'text-purple-500' },
  shopping: { label: 'Shopping', icon: MdShoppingCart, color: 'text-emerald-500' },
  bills: { label: 'Bills', icon: MdReceiptLong, color: 'text-amber-500' },
  salary: { label: 'Salary', icon: MdWork, color: 'text-green-600' },
  investment: { label: 'Investment', icon: MdTrendingUp, color: 'text-indigo-500' },
  other: { label: 'Other', icon: MdCategory, color: 'text-slate-500' },
};

export function getCategoryMeta(category) {
  return categoryMeta[category] || categoryMeta.other;
}

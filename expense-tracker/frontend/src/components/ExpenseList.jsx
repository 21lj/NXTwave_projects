import React from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { getCategoryMeta } from '../utils/categoryIcons';

export default function ExpenseList({ items = [], onDelete, onEdit }) {
  if (!items || items.length === 0) {
    return <div className="py-4 text-xs text-slate-500">No expenses found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs">
        <thead className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((it) => {
            const meta = getCategoryMeta(it.category);
            const Icon = meta.icon;
            return (
              <tr key={it._id} className="hover:bg-slate-50/60">
                <td className="px-3 py-2 text-slate-800">{it.title}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                    <Icon className={`text-sm ${meta.color}`} />
                    {meta.label}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      it.type === 'income'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {it.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-900">
                  ₹{Number(it.amount).toFixed(2)}
                </td>
                <td className="px-3 py-2 text-slate-500">
                  {new Date(it.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(it)}
                      className="rounded-full border border-slate-200 p-1 text-slate-600 hover:bg-slate-50"
                    >
                      <FiEdit className="text-xs" />
                    </button>
                    <button
                      onClick={() => onDelete(it._id)}
                      className="rounded-full border border-rose-200 p-1 text-rose-600 hover:bg-rose-50"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

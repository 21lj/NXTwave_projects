import React, { useState } from 'react';

const CATEGORIES = ['all','food','transport','entertainment','shopping','bills','salary','investment','other'];

export default function Filters({ onSearch, onFilter, onSort }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [month, setMonth] = useState('');

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200">
      <div className="flex flex-1 gap-2">
        <input
          className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-slate-400"
          placeholder="Search by title or note..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={() => onSearch(keyword)}
          className="rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-slate-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          type="month"
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-slate-400"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button
          onClick={() => onFilter({ category: category === 'all' ? undefined : category, month: month || undefined })}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
        >
          Apply
        </button>
      </div>

      <div className="ml-auto flex gap-2">
        <button
          onClick={() => onSort({ by: 'date', order: 'desc' })}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
        >
          Newest
        </button>
        <button
          onClick={() => onSort({ by: 'amount', order: 'asc' })}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
        >
          Amount ↑
        </button>
        <button
          onClick={() => onSort({ by: 'amount', order: 'desc' })}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
        >
          Amount ↓
        </button>
      </div>
    </div>
  );
}

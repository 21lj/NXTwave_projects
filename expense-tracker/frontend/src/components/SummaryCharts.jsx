import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#0f766e', '#0369a1', '#7c3aed', '#ea580c', '#16a34a', '#e11d48'];

export default function SummaryCharts({ summary, statistics }) {
  const pieData = (statistics?.categories || []).map((c) => ({ name: c._id, value: c.total }));
  const monthlyEntries = statistics?.monthly
    ? Object.entries(statistics.monthly).map(([k, v]) => ({ month: k, income: v.income || 0, expense: v.expense || 0 }))
    : [];

  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm shadow-slate-200">
      <div className="flex items-baseline justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Summary</h4>
          <p className="text-[11px] text-slate-500">Income vs expenses</p>
        </div>
      </div>

      <div className="grid gap-3 text-xs sm:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-3">
          <div className="text-[11px] text-emerald-700">Total income</div>
          <div className="text-lg font-semibold text-emerald-900">
            ₹{summary?.totalIncome?.toFixed ? summary.totalIncome.toFixed(2) : summary?.totalIncome ?? 0}
          </div>
        </div>
        <div className="rounded-xl bg-rose-50 p-3">
          <div className="text-[11px] text-rose-700">Total expense</div>
          <div className="text-lg font-semibold text-rose-900">
            ₹{summary?.totalExpense?.toFixed ? summary.totalExpense.toFixed(2) : summary?.totalExpense ?? 0}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[11px] text-slate-600">Balance</div>
          <div className="text-lg font-semibold text-slate-900">
            ₹{summary?.balance?.toFixed ? summary.balance.toFixed(2) : summary?.balance ?? 0}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-48 rounded-xl bg-slate-50 p-2">
          <h5 className="px-1 text-[11px] font-semibold text-slate-600">
            Category breakdown
          </h5>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70}>
                {pieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-48 rounded-xl bg-slate-50 p-2">
          <h5 className="px-1 text-[11px] font-semibold text-slate-600">
            Monthly trend
          </h5>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEntries}>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="income" stackId="a" />
              <Bar dataKey="expense" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

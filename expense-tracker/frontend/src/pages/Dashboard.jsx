import React, { useState } from 'react';
import useExpenses from '../hooks/useExpenses';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Filters from '../components/Filters';
import SummaryCharts from '../components/SummaryCharts';
import Timeline from '../components/Timeline';
import { toast } from 'react-toastify';
import LoadingOverlay from '../components/LoadingOverlay';
import ConfirmModal from '../components/ConfirmModal';

export default function Dashboard() {
  const {
    items,
    summary,
    statistics,
    loading,
    error,
    fetchList,
    createExpense,
    updateExpense,
    deleteExpense,
    search,
    filter,
    getSummary,
    getStatistics,
  } = useExpenses();

  const [editing, setEditing] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleCreate = async (payload) => {
    try {
      await createExpense(payload);
      await getSummary();
      await getStatistics({ months: 6 });
      toast.success('Expense added');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Create failed');
    }
  };

  const handleDeleteAsk = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteExpense(confirmDeleteId);
      await getSummary();
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateExpense(id, payload);
      setEditing(null);
      toast.success('Updated');
      await getSummary();
      await getStatistics({ months: 6 });
    } catch {
      toast.error('Update failed');
    }
  };

  if (error && !loading) {
    console.error(error);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <LoadingOverlay show={loading} />
      <ConfirmModal
        open={!!confirmDeleteId}
        title="Delete expense"
        message="Are you sure you want to delete this entry? This cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Dashboard
          </h2>
          <p className="text-xs text-slate-500">
            Track expenses, income and trends in one place.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <ExpenseForm
            onCreate={editing ? (data) => handleUpdate(editing._id, data) : handleCreate}
            defaultValues={
              editing
                ? { ...editing, date: new Date(editing.date).toISOString().slice(0, 10) }
                : undefined
            }
          />
          <Filters
            onSearch={(kw) => search(kw)}
            onFilter={(params) => filter(params)}
            onSort={(params) => fetchList(params)}
          />
          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-slate-200">
            <h3 className="mb-2 text-sm font-semibold text-slate-900">
              Expenses
            </h3>
            <ExpenseList
              items={items}
              onDelete={handleDeleteAsk}
              onEdit={handleEdit}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
  <section>
    <SummaryCharts summary={summary} statistics={statistics} />
  </section>

  <section className="max-w-full overflow-hidden">
    <Timeline items={items} />
  </section>
</div>

      </div>
    </div>
  );
}

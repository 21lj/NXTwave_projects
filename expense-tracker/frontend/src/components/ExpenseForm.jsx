import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const CATEGORIES = ['food','transport','entertainment','shopping','bills','salary','investment','other'];

const schema = yup.object({
  title: yup.string().required('Title required').max(200),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(0)
    .required('Amount required'),
  type: yup.string().oneOf(['expense','income']).required(),
  category: yup.string().oneOf(CATEGORIES).required(),
  note: yup.string().max(1000).nullable(),
  date: yup.date().required('Date required'),
}).required();

export default function ExpenseForm({ onCreate, defaultValues }) {
  const emptyDefaults = useMemo(
    () => ({
      title: '',
      amount: '',
      type: 'expense',
      category: 'other',
      note: '',
      date: new Date().toISOString().slice(0, 10),
    }),
    []
  );

  const isEditing = !!defaultValues;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || emptyDefaults,
  });

  useEffect(() => {
    if (defaultValues) {
      const safe = {
        ...defaultValues,
        date: new Date(defaultValues.date).toISOString().slice(0, 10),
      };
      reset(safe);
    } else {
      reset(emptyDefaults);
    }
  }, [defaultValues, reset, emptyDefaults]);

  const submit = async (data) => {
    data.date = new Date(data.date).toISOString();
    await onCreate(data);
    if (!isEditing) {
      reset(emptyDefaults); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {isEditing ? 'Edit expense' : 'Add new expense'}
          </h3>
          <p className="text-xs text-slate-500">
            {isEditing ? 'Update the selected record.' : 'Log a new expense or income.'}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-600">Title</label>
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. Coffee at cafe"
            {...register('title')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-600">Amount</label>
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. 120"
            {...register('amount')}
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-600">Type</label>
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register('type')}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-600">Category</label>
          <select
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register('category')}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-slate-600">Date</label>
          <input
            type="date"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            {...register('date')}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs font-medium text-slate-600">Note</label>
        <input
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="Optional note"
          {...register('note')}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isEditing
            ? isSubmitting ? 'Saving changes...' : 'Save changes'
            : isSubmitting ? 'Adding...' : 'Add expense'}
        </button>
        <button
          type="button"
          onClick={() => reset(isEditing ? defaultValues : emptyDefaults)}
          className="inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {!!Object.keys(errors).length && (
        <div className="mt-3 space-y-1 text-xs text-rose-600">
          {Object.values(errors).map((e) => (
            <div key={e.message}>{e.message}</div>
          ))}
        </div>
      )}
    </form>
  );
}

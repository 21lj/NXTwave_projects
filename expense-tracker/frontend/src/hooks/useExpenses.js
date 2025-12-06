import { useCallback, useEffect, useState } from 'react';
import useApi from './useApi';

export default function useExpenses() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [statistics, setStatistics] = useState(null);

  const { request, loading, error, resetError } = useApi();

  // GET /api/expenses
  const fetchList = useCallback(
    async (opts = {}) => {
      const res = await request({
        url: '/expenses',
        method: 'GET',
        params: { page: 1, limit: 20, ...opts },
      });
      setItems(res.data.items || []);
      return res.data;
    },
    [request]
  );

  // POST /api/expenses
  const createExpense = useCallback(
    async (payload) => {
      const res = await request({
        url: '/expenses',
        method: 'POST',
        data: payload,
      });
      setItems((prev) => [res.data.expense, ...prev]);
      return res.data.expense;
    },
    [request]
  );

  // PUT /api/expenses/:id
  const updateExpense = useCallback(
    async (id, payload) => {
      const res = await request({
        url: `/expenses/${id}`,
        method: 'PUT',
        data: payload,
      });
      setItems((prev) =>
        prev.map((it) => (String(it._id) === String(id) ? res.data.expense : it))
      );
      return res.data.expense;
    },
    [request]
  );

  // DELETE /api/expenses/:id
  const deleteExpense = useCallback(
    async (id) => {
      await request({
        url: `/expenses/${id}`,
        method: 'DELETE',
      });
      setItems((prev) => prev.filter((it) => String(it._id) !== String(id)));
      return true;
    },
    [request]
  );

  // GET /api/expenses/search
  const search = useCallback(
    async (keyword) => {
      const res = await request({
        url: '/expenses/search',
        method: 'GET',
        params: { keyword },
      });
      setItems(res.data.items);
      return res.data;
    },
    [request]
  );

  // GET /api/expenses/filter
  const filter = useCallback(
    async (params) => {
      const res = await request({
        url: '/expenses/filter',
        method: 'GET',
        params,
      });
      setItems(res.data.items);
      return res.data;
    },
    [request]
  );

  // GET /api/expenses/summary
  const getSummary = useCallback(async () => {
    const res = await request({
      url: '/expenses/summary',
      method: 'GET',
    });
    setSummary(res.data);
    return res.data;
  }, [request]);

  // GET /api/expenses/statistics
  const getStatistics = useCallback(
    async (params) => {
      const res = await request({
        url: '/expenses/statistics',
        method: 'GET',
        params,
      });
      setStatistics(res.data);
      return res.data;
    },
    [request]
  );

  // 🔥 THIS is the crucial bit you’re missing:
  // Fetch from DB when the hook mounts (page load / refresh).
  useEffect(() => {
    (async () => {
      try {
        await fetchList({}); // initial list
        await getSummary();
        await getStatistics({ months: 6 });
      } catch {
        // error is stored in `error` state
      }
    })();
  }, [fetchList, getSummary, getStatistics]);

  return {
    items,
    summary,
    statistics,
    loading,
    error,
    resetError,
    fetchList,
    createExpense,
    updateExpense,
    deleteExpense,
    search,
    filter,
    getSummary,
    getStatistics,
  };
}

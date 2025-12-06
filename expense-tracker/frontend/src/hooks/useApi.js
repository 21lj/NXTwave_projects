import { useState, useCallback } from 'react';
import api from '../api/axiosInstance';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api(config);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  const resetError = () => setError(null);

  return { request, loading, error, resetError };
}

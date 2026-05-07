'use client';

import { DependencyList, useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(asyncFn: () => Promise<{ data: T }>, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFn();
        if (active) {
          setData(result.data);
        }
      } catch (err) {
        if (active) {
          setData(null);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [asyncFn, ...deps]);

  return { data, loading, error } satisfies UseFetchState<T>;
}

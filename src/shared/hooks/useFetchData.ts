import { useCallback, useEffect, useReducer, useRef } from 'react';

import { getCachedData, hasCache, setCachedData } from './cache';
import { useFetchReducer } from './useFetchReducer';

export const useFetchData = <Data, Params = void>({
  key,
  fetchFunction,
  enabled = true,
  refetchInterval,
  shouldCache = true,
}: {
  key: string;
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled?: boolean;
  refetchInterval?: number;
  shouldCache?: boolean;
}) => {
  const initialData = shouldCache ? getCachedData<Data>(key) : undefined;
  const { state, dispatch } = useFetchReducer<Data>(initialData);

  const fetchFunctionRef = useRef(fetchFunction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false); // 중복 요청 방지

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (shouldCache && hasCache(key)) {
      const cachedData = getCachedData<Data>(key);
      dispatch({ type: 'FETCH_SUCCESS', payload: cachedData as Data });

      // Stale-while-revalidate: 캐시된 데이터를 우선 제공하고, 백그라운드에서 최신 데이터 갱신
      fetchFunctionRef
        .current()
        .then((result) => {
          if (shouldCache) setCachedData(key, result);
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_ERROR' });
        })
        .finally(() => {
          isFetchingRef.current = false;
        });

      return;
    }

    // 새로운 데이터 요청
    dispatch({ type: 'FETCH_START' });
    try {
      const result = await fetchFunctionRef.current();
      if (shouldCache) setCachedData(key, result);
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
    } finally {
      isFetchingRef.current = false;
    }
  }, [key, shouldCache]);

  useEffect(() => {
    if (!enabled) return;

    fetchData(); // 초기 데이터 패치 실행

    if (refetchInterval) {
      intervalRef.current = setInterval(fetchData, refetchInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, refetchInterval, key, fetchData]);

  return { ...state, refetch: fetchData };
};

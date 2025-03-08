import { useCallback, useEffect, useRef } from 'react';

import { getCachedData, hasCache, setCachedData } from './cache';
import { FetchState, useFetchReducer } from './useFetchReducer';

const promiseCache = new Map<string, Promise<any>>();

type UseFetchDataOptions<Data, Params = void, T extends boolean = false> = {
  key: string;
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled?: boolean;
  refetchInterval?: number;
  shouldCache?: boolean;
  suspense?: T;
};
type SuspenseResult<Data> = {
  data: Data;
  isPending: false;
  isSuccess: true;
  isError: false;
  refetch: () => void;
};

type NonSuspenseResult<Data> = FetchState<Data> & { refetch: () => void };

export const useFetchData = <Data, Params = void, S extends boolean = false>({
  key,
  fetchFunction,
  enabled = true,
  refetchInterval,
  shouldCache = true,
  suspense = false as S,
}: UseFetchDataOptions<Data, Params, S>): S extends true ? SuspenseResult<Data> : NonSuspenseResult<Data> => {
  if (suspense) {
    if (hasCache(key)) {
      return {
        data: getCachedData<Data>(key) as Data,
        isPending: false,
        isSuccess: true,
        isError: false,
        refetch: () => {},
      } as SuspenseResult<Data>;
    }

    if (!promiseCache.has(key)) {
      const promise = fetchFunction()
        .then((data: Data) => {
          setCachedData(key, data);
          promiseCache.delete(key);
          return data;
        })
        .catch((error) => {
          promiseCache.delete(key);
          throw error;
        });

      promiseCache.set(key, promise);
    }

    throw promiseCache.get(key)!;
  }

  // 기존 방식 (Suspense 미사용)
  const initialData = shouldCache ? getCachedData<Data>(key) : undefined;
  const { state, dispatch } = useFetchReducer<Data>(initialData);

  const fetchFunctionRef = useRef(fetchFunction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (shouldCache && hasCache(key)) {
      const cachedData = getCachedData<Data>(key) as Data;
      dispatch({ type: 'FETCH_SUCCESS', payload: cachedData });

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

    fetchData();

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

  return { ...state, refetch: fetchData } as unknown as S extends true ? never : NonSuspenseResult<Data>;
};

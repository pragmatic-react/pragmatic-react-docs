import { useCallback, useEffect, useReducer, useRef } from 'react';

const globalCache = new Map<string, any>();

interface FetchState<Data> {
  data?: Data;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

type FetchAction<Data> = { type: 'FETCH_START' } | { type: 'FETCH_SUCCESS'; payload: Data } | { type: 'FETCH_ERROR' };

const fetchReducer = <Data>(state: FetchState<Data>, action: FetchAction<Data>): FetchState<Data> => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isPending: true, isError: false, isSuccess: false };
    case 'FETCH_SUCCESS':
      return { data: action.payload, isPending: false, isSuccess: true, isError: false };
    case 'FETCH_ERROR':
      return { ...state, isPending: false, isError: true, isSuccess: false };
    default:
      return state;
  }
};

export const useFetchData = <Data, Params = void>({
  key,
  fetchFunction,
  enabled = true,
  refetchInterval,
}: {
  key: string;
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled?: boolean;
  refetchInterval?: number;
}) => {
  // 초기 캐싱된 데이터 불러오기
  const initialData = globalCache.get(key);
  const [state, dispatch] = useReducer(fetchReducer<Data>, {
    data: initialData,
    isPending: false,
    isSuccess: !!initialData,
    isError: false,
  });

  const fetchFunctionRef = useRef(fetchFunction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    if (globalCache.has(key)) {
      const cachedData = globalCache.get(key);
      dispatch({ type: 'FETCH_SUCCESS', payload: cachedData });

      // Stale-while-revalidate: 캐시된 데이터를 우선 제공하고, 백그라운드에서 최신 데이터 갱신
      fetchFunctionRef
        .current()
        .then((result) => {
          globalCache.set(key, result);
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        })
        .catch(() => {
          dispatch({ type: 'FETCH_ERROR' });
        });

      return;
    }

    // 새로운 데이터 요청
    dispatch({ type: 'FETCH_START' });
    try {
      const result = await fetchFunctionRef.current();
      globalCache.set(key, result);
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
    }
  }, [key]);

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
  }, [enabled, refetchInterval, key]);

  return { ...state, refetch: fetchData };
};

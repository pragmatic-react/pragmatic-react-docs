import { useCallback, useEffect, useReducer, useRef } from 'react';

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
  fetchFunction,
  enabled = true,
  refetchInterval,
}: {
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled?: boolean;
  refetchInterval?: number;
}) => {
  const [state, dispatch] = useReducer(fetchReducer<Data>, {
    data: undefined,
    isPending: false,
    isSuccess: false,
    isError: false,
  });

  const fetchFunctionRef = useRef(fetchFunction);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });

    try {
      const result = await fetchFunctionRef.current();
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
    }
  }, []);

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
  }, [enabled, refetchInterval, fetchData]);

  return { ...state, refetch: fetchData };
};

import { useReducer } from 'react';

export interface FetchState<Data> {
  data?: Data;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export type FetchAction<Data> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Data }
  | { type: 'FETCH_ERROR' };

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

export const useFetchReducer = <Data>(initialData?: Data) => {
  const [state, dispatch] = useReducer(fetchReducer<Data>, {
    data: initialData,
    isPending: !initialData,
    isSuccess: !!initialData,
    isError: false,
  });

  return { state, dispatch };
};

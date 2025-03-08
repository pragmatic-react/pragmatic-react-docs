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
  | { type: 'FETCH_ERROR'; payload?: Error }
  | { type: 'FETCH_RESET' };

const fetchReducer = <Data>(state: FetchState<Data>, action: FetchAction<Data>): FetchState<Data> => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isPending: true, isError: false, isSuccess: false };
    case 'FETCH_SUCCESS':
      return { data: action.payload, isPending: false, isSuccess: true, isError: false };
    case 'FETCH_ERROR':
      return { ...state, isPending: false, isError: true, isSuccess: false };
    case 'FETCH_RESET':
      return { ...state, isPending: false, isError: false, isSuccess: false, data: undefined };
    default:
      return state;
  }
};

export function useFetchReducer<Data>(initialData?: Data): {
  state: FetchState<Data>;
  dispatch: React.Dispatch<FetchAction<Data>>;
};

export function useFetchReducer<Data>(initialState: FetchState<Data>): {
  state: FetchState<Data>;
  dispatch: React.Dispatch<FetchAction<Data>>;
};

export function useFetchReducer<Data>(initialDataOrState?: Data | FetchState<Data>) {
  // 초기 상태가 FetchState 타입인지 확인
  const isInitialState =
    initialDataOrState &&
    typeof initialDataOrState === 'object' &&
    ('isPending' in initialDataOrState || 'isSuccess' in initialDataOrState || 'isError' in initialDataOrState);

  // FetchState 타입이면 그대로 사용, 아니면 초기화
  const initialState: FetchState<Data> = isInitialState
    ? (initialDataOrState as FetchState<Data>)
    : {
        data: initialDataOrState as Data | undefined,
        isPending: !initialDataOrState,
        isSuccess: !!initialDataOrState,
        isError: false,
      };

  const [state, dispatch] = useReducer(fetchReducer<Data>, initialState);

  return { state, dispatch };
}

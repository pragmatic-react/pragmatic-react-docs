import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

import https from "./https";

type MutationOptions = {
  mutationFn: Function;
  onSuccess?: Function;
  onError?: Function;
  mutationKey: string;
};

function readPromiseState(promise) {
  switch (promise.status) {
    case "pending":
      return { status: "pending" };
    case "fulfilled":
      return { status: "fulfilled", value: promise.value };
    case "rejected":
      return { status: "rejected", reason: promise.reason };
    default:
      promise.status = "pending";
      promise.then((value) => {
        promise.status = "fulfilled";
        promise.value = value;
      });
      promise.catch((reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      });
      return readPromiseState(promise);
  }
}

export class MutationObserver {
  private cache: Map<string, any> = new Map();
  private listeners: Set<Function> = new Set();
  private mutateOptions;

  constructor(mutateOptions?: MutationOptions) {
    this.mutateOptions = mutateOptions;
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    // 구독 제거 함수 제공
    return () => this.listeners.delete(listener);
  }

  mutate<T>(variables, options?: MutationOptions): Promise<T> {
    this.mutateOptions = options ?? this.mutateOptions;

    const pendingState = { state: "pending" };
    this.cache.set(this.mutateOptions.mutationKey, pendingState);

    const notifyListeners = () => {
      // 실행하지 않기 위해 알림 지연
      // 렌더링 주기 중
      // https://reactjs.org/link/setstate-in-render
      setTimeout(() => {
        for (const callback of this.listeners) {
          callback();
        }
      }, 0);
    };

    const newPromise = new Promise(() => options?.mutationFn(variables))
      .then((data) => {
        this.cache.set(url, { status: "fulfilled", value: data });
        this.mutateOptions?.onSuccess();
      })
      .catch((error) => {
        this.cache.set(url, { status: "rejected", reason: error });
        this.mutateOptions?.onError();
      })
      .finally(() => {
        notifyListeners();
      });

    notifyListeners();

    return newPromise;
  }
}

export class FetchCacheManager {
  private cache: Map<string, any> = new Map();
  private listeners: Set<Function> = new Set();

  subscribe(listener: Function) {
    this.listeners.add(listener);
    // 구독 제거 함수 제공
    return () => this.listeners.delete(listener);
  }

  fetchUrl<T>(url, isRefetch) {
    const cachedData = this.cache.get(url);

    if (
      cachedData &&
      (!isRefetch || readPromiseState(cachedData).status === "pending")
    ) {
      return cachedData;
    }

    const pendingState = { state: "pending" };
    this.cache.set(url, pendingState);

    const notifyListeners = () => {
      // 실행하지 않기 위해 알림 지연
      // 렌더링 주기 중
      // https://reactjs.org/link/setstate-in-render
      setTimeout(() => {
        for (const callback of this.listeners) {
          callback();
        }
      }, 0);
    };

    const newPromise = https
      .get<T>(url)
      .then((data) => {
        this.cache.set(url, { status: "fulfilled", value: data });
      })
      .catch((error) => {
        this.cache.set(url, { status: "rejected", reason: error });
      })
      .finally(() => {
        notifyListeners();
      });

    this.cache.set(url, newPromise);

    // 보류중 알림
    notifyListeners();

    return newPromise;
  }
}

// Context 생성
const fetchCacheContext = createContext(null);

export const FetchCacheProvider = ({
  children,
  fetchCache,
  muationObserver,
}) => {
  const [, setEmptyState] = useState({});
  const rerender = useCallback(() => setEmptyState({}), []); // 의미없는 setState를 실행시켜서 리렌더를 촉발함.

  // 구독자를 fetchCache에 등록하는 이펙트
  useEffect(() => {
    const unsubscribe = fetchCache.subscribe(() => rerender());
    return unsubscribe;
  }, [fetchCache, rerender]);

  useEffect(() => {
    muationObserver.subscribe(() => rerender());
  }, [muationObserver]);

  return (
    <fetchCacheContext.Provider
      value={{
        fetchUrl: fetchCache.fetchUrl.bind(fetchCache),
        mutate: muationObserver.mutate.bind(muationObserver),
        // invalidate: fetchCache.invalidateCache(), // todo
      }}
    >
      {children}
    </fetchCacheContext.Provider>
  );
};

export const useMutation = ({
  mutationFn,
  onSuccess,
  onError,
  mutationKey,
}: MutationOptions) => {
  const context = useContext(fetchCacheContext);

  const mutate = (variables) => {
    const promise = context?.mutate(variables, {
      mutationFn,
      onSuccess,
      onError,
      mutationKey,
    });
    const state = readPromiseState(promise);

    const isPending = state.status === "pending";
    if (isPending) throw promise;

    const error = state.reason;
    if (error) throw error;

    const data = state.value;

    return data;
  };

  return { mutate };
};

export const useFetch = <T,>(
  url: string
): { data: T | null; reload: () => Promise<void> } => {
  const { fetchUrl } = useContext(fetchCacheContext);

  const promise = fetchUrl(url);
  const state = readPromiseState(promise);

  const isPending = state.status === "pending";
  if (isPending) throw promise;

  const error = state.reason;
  if (error) throw error;

  const data = state.value;

  // 데이터 새로 고침 허용
  const reload = () => fetchUrl(url, true);

  return { data, reload }; // 소비하는 컴포넌트는 에러 또는 보류를 고민하지 않아도 된다.
};

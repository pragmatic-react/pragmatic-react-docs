import { useCallback, useEffect, useRef } from 'react';

import { useFetchContext } from '@shared/providers';
import { useErrorBoundary } from '@shared/ui/error/error-boundary';
import { clearCache, getCachedData, getKeyString, hasCache, setCachedData } from '@shared/utils';

import { fetchCache } from './fetchCache';
import { NonSuspenseOptions, NonSuspenseResult, SuspenseOptions, SuspenseResult, UseFetchDataOptions } from './types';
import { useFetchReducer } from './useFetchReducer';

/**
 * Suspense 모드에서 데이터를 가져오는 훅
 * @typeparam Data 가져올 데이터 타입
 * @typeparam Params 선택적 파라미터 타입
 */
export function useFetchData<Data, Params = void>(options: SuspenseOptions<Data, Params>): SuspenseResult<Data>;

/**
 * 일반 모드에서 데이터를 가져오는 훅
 * @typeparam Data 가져올 데이터 타입
 * @typeparam Params 선택적 파라미터 타입
 */
export function useFetchData<Data, Params = void>(options: NonSuspenseOptions<Data, Params>): NonSuspenseResult<Data>;

/**
 * 데이터를 가져오고 캐싱하는 훅의 실제 구현
 * @typeparam Data 가져올 데이터 타입
 * @typeparam Params 선택적 파라미터 타입
 * @returns 데이터 상태와 관련 유틸리티 함수가 포함된 객체
 */
export function useFetchData<Data, Params = void>({
  fetchKey,
  fetchFunction,
  enabled = true,
  refetchInterval,
  shouldCache = true,
  suspense = false,
}: UseFetchDataOptions<Data, Params, boolean>): SuspenseResult<Data> | NonSuspenseResult<Data> {
  const key = getKeyString(fetchKey);
  const { refetchKey, resetKey, triggerRefetch, triggerReset } = useFetchContext();
  const { setError } = useErrorBoundary();

  // 에러 상태를 저장하기 위한 ref 추가
  const lastErrorRef = useRef<{ error: Error; shouldRetry: boolean } | null>(null);

  // Suspense 모드 처리
  if (suspense) {
    if (hasCache(key)) {
      return {
        data: getCachedData<Data>(key) as Data,
        isPending: false,
        isSuccess: true,
        isError: false,
        refetch: () => triggerRefetch(fetchKey),
        reset: () => triggerReset(fetchKey),
      };
    }

    // ✅ 수정: shouldRetry === false인 경우, 새로운 fetch를 막음
    if (lastErrorRef.current && !lastErrorRef.current.shouldRetry) {
      throw lastErrorRef.current.error;
    }

    if (!fetchCache.hasPromise(key) && !fetchCache.hasFetching(key)) {
      fetchCache.addFetching(key);

      const promise = (async () => {
        try {
          const data = await fetchFunction();
          setCachedData(key, data);
          fetchCache.deletePromise(key);
          fetchCache.deleteFetching(key);
          lastErrorRef.current = null;
          return data;
        } catch (error) {
          fetchCache.deletePromise(key);
          fetchCache.deleteFetching(key);

          const shouldRetry = !(error instanceof Error && (error as any).shouldRetry === false);
          const finalError = error instanceof Error ? error : new Error(String(error));
          (finalError as any).shouldRetry = shouldRetry;

          lastErrorRef.current = { error: finalError, shouldRetry };

          // ✅ 수정: shouldRetry가 false이면 fetchCache에 fetching 상태 유지
          if (!shouldRetry) {
            fetchCache.addFetching(key); // 다시 fetch되지 않도록 막음
          }

          throw finalError;
        }
      })();

      fetchCache.addPromise(key, promise);
    }

    const cachedPromise = fetchCache.getPromise(key);
    if (!cachedPromise) {
      throw new Error('No cached promise found');
    }

    throw cachedPromise;
  }

  // 비-suspense 모드 처리 - 캐시에서 초기 데이터 가져오기
  const initialData = shouldCache ? getCachedData<Data>(key) : undefined;

  // 상태 관리를 위한 리듀서 사용
  const { state, dispatch } = useFetchReducer<Data>({
    data: initialData,
    isPending: !initialData,
    isSuccess: !!initialData,
    isError: false,
  });

  /**
   * 외부 의존성 변경 없이 최신 함수 참조를 유지하기 위한 ref
   */
  const fetchFunctionRef = useRef(fetchFunction);

  /**
   * 주기적 갱신을 위한 타이머 참조
   */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 중복 요청 방지를 위한 페칭 상태 참조
   */
  const isFetchingRef = useRef(false);

  // 함수 참조 업데이트
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  /**
   * 데이터 페칭 함수 - 메모이제이션으로 성능 최적화
   * 중복 요청 방지 및 상태 관리를 처리
   */
  const fetchData = useCallback(async () => {
    // shouldRetry가 false인 마지막 에러가 있다면 fetch 중단
    if (lastErrorRef.current && !lastErrorRef.current.shouldRetry) {
      if (!suspense) {
        setError(lastErrorRef.current.error);
      }
      throw lastErrorRef.current.error;
    }

    // 이미 페칭 중이면 중복 요청 방지
    if (isFetchingRef.current || fetchCache.hasFetching(key)) return;

    // 페칭 상태 설정
    isFetchingRef.current = true;
    fetchCache.addFetching(key);
    dispatch({ type: 'FETCH_START' });

    try {
      // 데이터 가져오기
      const data = await fetchFunctionRef.current();

      // 성공 처리
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      lastErrorRef.current = null; // 성공 시 에러 상태 초기화

      // 필요시 캐시 저장
      if (shouldCache) {
        setCachedData(key, data);
      }

      return data;
    } catch (error) {
      // 오류 처리
      const shouldRetry = !(error instanceof Error && (error as any).shouldRetry === false);
      const finalError = error instanceof Error ? error : new Error(String(error));
      (finalError as any).shouldRetry = shouldRetry;

      // 에러 상태 저장
      lastErrorRef.current = {
        error: finalError,
        shouldRetry,
      };

      dispatch({
        type: 'FETCH_ERROR',
        payload: finalError,
      });

      if (!suspense && !shouldRetry) {
        setError(finalError);
      }

      // shouldRetry가 false인 경우 주기적 갱신 중지
      if (!shouldRetry && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      throw finalError; // Promise.reject 대신 직접 throw
    } finally {
      // 상태 정리
      isFetchingRef.current = false;
      fetchCache.deleteFetching(key);
    }
  }, [key, shouldCache, dispatch, suspense, setError]);

  /**
   * 컴포넌트 마운트, 키 변경, 옵션 변경 시 데이터 로드 및 주기적 갱신 설정
   */
  useEffect(() => {
    if (!enabled) return;

    let isErrorWithNoRetry = false;

    // 초기 로드 - 캐시에 없는 경우만
    if (!hasCache(key)) {
      fetchData().catch((error) => {
        if (error instanceof Error && (error as any).shouldRetry === false) {
          isErrorWithNoRetry = true;
          if (!suspense) {
            setError(error);
          }
        }
      });
    }

    // 주기적 갱신 설정 - 재시도하지 않아야 하는 에러가 아닌 경우에만
    if (refetchInterval && !isErrorWithNoRetry) {
      intervalRef.current = setInterval(() => {
        try {
          fetchData();
        } catch (error) {
          if (error instanceof Error && (error as any).shouldRetry === false) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            if (!suspense) {
              setError(error);
            }
          }
        }
      }, refetchInterval);
    }

    // 클린업 함수
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, refetchInterval, key, fetchData, suspense, setError]);

  /**
   * 외부 refetch 트리거 처리
   */
  useEffect(() => {
    if (refetchKey && key.startsWith(refetchKey)) {
      lastErrorRef.current = null;
      try {
        fetchData();
      } catch (error) {
        if (error instanceof Error && (error as any).shouldRetry === false) {
          if (!suspense) {
            setError(error);
          }
        }
      }
    }
  }, [refetchKey, key, fetchData, suspense, setError]);

  /**
   * 외부 reset 트리거 처리
   */
  useEffect(() => {
    if (resetKey && key.startsWith(resetKey)) {
      lastErrorRef.current = null; // reset error state
      dispatch({ type: 'FETCH_RESET' });
      clearCache(key);
    }
  }, [resetKey, key, dispatch]);

  // 결과 객체 구성
  const result: NonSuspenseResult<Data> = {
    ...state,
    refetch: () => {
      fetchData();
      triggerRefetch(fetchKey);
    },
    reset: () => {
      dispatch({ type: 'FETCH_RESET' });
      clearCache(key);
      triggerReset(fetchKey);
    },
  };

  return result;
}

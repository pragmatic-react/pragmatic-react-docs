import { useCallback, useEffect, useRef } from 'react';

import { useFetchContext } from '@shared/providers';
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

  // Suspense 모드 처리
  if (suspense) {
    // 캐시에 데이터가 있으면 바로 반환
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

    // 캐시된 데이터가 없고 현재 페칭 중이지 않으면 새로 페칭
    if (!fetchCache.hasPromise(key) && !fetchCache.hasFetching(key)) {
      fetchCache.addFetching(key);
      const promise = fetchFunction()
        .then((data: Data) => {
          // 성공 시 캐시 저장 및 정리
          setCachedData(key, data);
          fetchCache.deletePromise(key);
          fetchCache.deleteFetching(key);
          return data;
        })
        .catch((error) => {
          // 에러 시 캐시 정리
          fetchCache.deletePromise(key);
          fetchCache.deleteFetching(key);
          throw error;
        });

      fetchCache.addPromise(key, promise);
    }

    // React Suspense를 위한 프로미스 throw
    throw fetchCache.getPromise(key);
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

      // 필요시 캐시 저장
      if (shouldCache) {
        setCachedData(key, data);
      }

      return data;
    } catch (error) {
      // 오류 처리
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error : new Error(String(error)),
      });

      throw error;
    } finally {
      // 상태 정리
      isFetchingRef.current = false;
      fetchCache.deleteFetching(key);
    }
  }, [key, shouldCache, dispatch]);

  /**
   * 컴포넌트 마운트, 키 변경, 옵션 변경 시 데이터 로드 및 주기적 갱신 설정
   */
  useEffect(() => {
    if (!enabled) return;

    // 초기 로드 - 캐시에 없는 경우만
    if (!hasCache(key)) {
      fetchData();
    }

    // 주기적 갱신 설정
    if (refetchInterval) {
      intervalRef.current = setInterval(fetchData, refetchInterval);
    }

    // 클린업 함수
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, refetchInterval, key, fetchData]);

  /**
   * 외부 refetch 트리거 처리
   */
  useEffect(() => {
    if (refetchKey && key.startsWith(refetchKey)) {
      fetchData();
    }
  }, [refetchKey, key, fetchData]);

  /**
   * 외부 reset 트리거 처리
   */
  useEffect(() => {
    if (resetKey && key.startsWith(resetKey)) {
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

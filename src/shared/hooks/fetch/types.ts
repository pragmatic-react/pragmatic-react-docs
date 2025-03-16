import { FetchKey } from '@shared/utils';

import { FetchState } from './useFetchReducer';

/**
 * 데이터 페칭 관련 공통 옵션
 */
export type CommonFetchOptions<Data, Params = void> = {
  /** 데이터 식별을 위한 고유 키 */
  fetchKey: FetchKey;
  /** 데이터를 가져오는 함수 */
  fetchFunction: (params?: Params) => Promise<Data>;
  /** 컴포넌트 마운트 시 자동으로 데이터를 가져올지 여부 */
  enabled?: boolean;
  /** 주기적 갱신 간격 (ms) */
  refetchInterval?: number;
  /** 데이터 캐싱 여부 */
  shouldCache?: boolean;
};

/**
 * Suspense 모드 옵션 타입
 */
export type SuspenseOptions<Data, Params = void> = CommonFetchOptions<Data, Params> & {
  /** Suspense 모드 사용 (반드시 true) */
  suspense: true;
};

/**
 * 비-Suspense 모드 옵션 타입
 */
export type NonSuspenseOptions<Data, Params = void> = CommonFetchOptions<Data, Params> & {
  /** Suspense 모드 사용 (false 또는 미지정) */
  suspense?: false;
};

/**
 * useFetchData 훅의 통합 옵션 타입
 * T는 suspense 옵션의 boolean 타입을 결정
 */
export type UseFetchDataOptions<Data, Params = void, T extends boolean = false> = CommonFetchOptions<Data, Params> & {
  suspense?: T;
};

/**
 * refetch와 reset 기능을 제공하는 기본 결과 인터페이스
 */
export interface BaseResult {
  /** 데이터를 다시 가져오는 함수 */
  refetch: () => void;
  /** 상태를 초기화하는 함수 */
  reset: () => void;
  /** 재시도 중인지 여부 */
  isRetrying?: boolean;
}

/**
 * Suspense 모드에서 반환되는 결과 타입
 */
export type SuspenseResult<Data> = BaseResult & {
  /** 가져온 데이터 */
  data: Data;
  /** 데이터 로딩 중 여부 (항상 false) */
  isPending: false;
  /** 데이터 로드 성공 여부 (항상 true) */
  isSuccess: true;
  /** 오류 발생 여부 (항상 false) */
  isError: false;
};

/**
 * 일반 모드에서 반환되는 결과 타입
 */
export type NonSuspenseResult<Data> = FetchState<Data> & BaseResult;

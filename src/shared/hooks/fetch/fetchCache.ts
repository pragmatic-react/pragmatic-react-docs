/**
 * 데이터 페칭 상태 및 Promise를 관리하는 캐시
 * 이 인터페이스는 Suspense 모드에서 필요한 Promise 관리를 담당합니다.
 */
export interface FetchCacheManager {
  /** 프로미스 캐시 저장소 */
  promiseCache: Map<string, Promise<unknown>>;
  /** 페칭 중인 상태 저장소 */
  isFetchingSet: Set<string>;
  /** Promise를 가져옵니다 */
  getPromise: (key: string) => Promise<unknown> | undefined;
  /** Promise를 추가합니다 */
  addPromise: <T>(key: string, promise: Promise<T>) => void;
  /** Promise를 삭제합니다 */
  deletePromise: (key: string) => void;
  /** Promise 존재 여부를 확인합니다 */
  hasPromise: (key: string) => boolean;
  /** 페칭 중인 상태를 추가합니다 */
  addFetching: (key: string) => void;
  /** 페칭 중인 상태를 삭제합니다 */
  deleteFetching: (key: string) => void;
  /** 페칭 중인지 확인합니다 */
  hasFetching: (key: string) => boolean;
}

/**
 * 프로미스 캐시와 페칭 상태를 관리하는 싱글톤 객체
 * React Suspense와 함께 사용되어 데이터 로딩 상태 관리를 단순화합니다.
 */
export const fetchCache: FetchCacheManager = {
  promiseCache: new Map<string, Promise<unknown>>(),
  isFetchingSet: new Set<string>(),

  /**
   * 특정 키에 해당하는 Promise를 반환합니다.
   * @param key 캐시 키
   * @returns 저장된 Promise 또는 undefined
   */
  getPromise: (key: string) => fetchCache.promiseCache.get(key),

  /**
   * 특정 키로 Promise를 캐시에 저장합니다.
   * @param key 캐시 키
   * @param promise 저장할 Promise
   */
  addPromise: <T>(key: string, promise: Promise<T>) => {
    fetchCache.promiseCache.set(key, promise);
  },

  /**
   * 캐시에서 Promise를 제거합니다.
   * @param key 제거할 Promise의 캐시 키
   */
  deletePromise: (key: string) => {
    fetchCache.promiseCache.delete(key);
  },

  /**
   * 특정 키에 해당하는 Promise가 캐시에 있는지 확인합니다.
   * @param key 캐시 키
   * @returns Promise 존재 여부
   */
  hasPromise: (key: string) => fetchCache.promiseCache.has(key),

  /**
   * 특정 키를 페칭 중인 상태로 표시합니다.
   * @param key 캐시 키
   */
  addFetching: (key: string) => {
    fetchCache.isFetchingSet.add(key);
  },

  /**
   * 특정 키를 페칭 중인 상태에서 제거합니다.
   * @param key 캐시 키
   */
  deleteFetching: (key: string) => {
    fetchCache.isFetchingSet.delete(key);
  },

  /**
   * 특정 키가 현재 페칭 중인지 확인합니다.
   * @param key 캐시 키
   * @returns 페칭 중 여부
   */
  hasFetching: (key: string) => fetchCache.isFetchingSet.has(key),
};

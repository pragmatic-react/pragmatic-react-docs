// 캐시 저장소 - Map으로 관리하여 O(1) 접근 및 삭제 가능
const cacheStore = new Map<string, any>();

/**
 * 캐시된 데이터를 가져옵니다.
 * @param key 캐시 키
 * @returns 캐시된 데이터 또는 undefined
 */
export const getCachedData = <Data>(key: string): Data | undefined => {
  return cacheStore.get(key);
};

/**
 * 데이터를 캐시에 저장합니다.
 * @param key 캐시 키
 * @param data 저장할 데이터
 */
export const setCachedData = <Data>(key: string, data: Data): void => {
  cacheStore.set(key, data);
};

/**
 * 특정 키에 대한 캐시가 존재하는지 확인합니다.
 * @param key 캐시 키
 * @returns 캐시 존재 여부
 */
export const hasCache = (key: string): boolean => {
  return cacheStore.has(key);
};

/**
 * 특정 키에 대한 캐시를 삭제합니다.
 * @param key 캐시 키
 */
export const clearCache = (key: string): void => {
  cacheStore.delete(key);
};

/**
 * 특정 패턴으로 시작하는 모든 캐시를 삭제합니다.
 * @param pattern 캐시 키 패턴
 */
export const clearCacheByPattern = (pattern: string): void => {
  // 단일 루프로 최적화
  Array.from(cacheStore.keys()).forEach((cacheKey) => {
    if (cacheKey.startsWith(pattern)) {
      cacheStore.delete(cacheKey);
    }
  });
};

/**
 * 모든 캐시를 삭제합니다.
 */
export const clearAllCache = (): void => {
  cacheStore.clear();
};

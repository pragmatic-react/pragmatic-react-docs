/**
 * 데이터 요청을 식별하기 위한 키 타입
 * 키는 고유한 문자열로 변환될 수 있는 값들의 배열입니다.
 * 예: ['restaurants', 'list', 'italian'] 또는 ['user', '123']
 */
export type FetchKey = readonly (string | number | boolean | null | undefined)[];

/**
 * FetchKey 배열을 고유한 문자열 키로 변환합니다.
 * 이 문자열은 캐시 저장소의 키로 사용됩니다.
 *
 * @param key 데이터 요청 식별 키 배열
 * @returns 하이픈으로 구분된 문자열 키
 */
export const getKeyString = (key: FetchKey): string => key.join('-');

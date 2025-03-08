import { clearAllCache, clearCache, setCachedData } from './cache';

const fetchFunctionMap = new Map<string, () => Promise<any>>();

export const resetCache = (key?: string) => {
  if (key) {
    clearCache(key);
  } else {
    clearAllCache();
  }
};

export const refetchData = async (key: string) => {
  if (!fetchFunctionMap.has(key)) {
    throw new Error(`No fetch function registered for key: ${key}`);
  }

  const fetchFunction = fetchFunctionMap.get(key)!;
  const result = await fetchFunction();
  setCachedData(key, result);
  return result;
};

export const registerFetchFunction = (key: string, fetchFunction: () => Promise<any>) => {
  fetchFunctionMap.set(key, fetchFunction);
};

export const unregisterFetchFunction = (key: string) => {
  fetchFunctionMap.delete(key);
};

const globalCache = new Map<string, any>();

export const getCachedData = <Data>(key: string): Data | undefined => {
  return globalCache.get(key);
};

export const setCachedData = <Data>(key: string, data: Data): void => {
  globalCache.set(key, data);
};

export const hasCache = (key: string): boolean => {
  return globalCache.has(key);
};

export const clearCache = (key: string): void => {
  globalCache.delete(key);
};

export const clearAllCache = (): void => {
  globalCache.clear();
};

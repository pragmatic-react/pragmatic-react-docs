import { createContext, useContext } from "react";

class CacheManager {
  private cache: Map<string, any> = new Map();
  private listeners: Map<string, Set<Function>> = new Map();

  setCache<T>(key: string, data: T) {
    this.cache.set(key, data);
    this.notifyListeners(key);
  }

  getCache<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  removeCache(key: string) {
    this.cache.delete(key);
    this.listeners.delete(key);
  }

  updateCache<T>(key: string, data: T) {
    if (this.cache.has(key)) {
      this.cache.set(key, data);
      this.notifyListeners(key);
    }
  }

  subscribe(key: string, listener: Function) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)?.add(listener);
  }

  private notifyListeners(key: string) {
    const listeners = this.listeners.get(key);
    listeners?.forEach((listener) => listener(this.cache.get(key)));
  }
}

// Context 생성
const CacheContext = createContext<CacheManager | undefined>(undefined);

export const CacheProvider = ({ children }) => {
  const cacheManager = new CacheManager();
  console.log("cacheManager", cacheManager);

  return (
    <CacheContext.Provider value={cacheManager}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCacheManager = (): CacheManager => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCacheManager must be used within a CacheProvider");
  }
  return context;
};

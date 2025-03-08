import { useState, useEffect, useCallback } from "react";
import { useCacheManager } from "./CacheManager";
import https from "./https";

const useFetch = <T,>(
  url: string,
  method: string = "GET"
): [T | null, boolean, string | null, (bodyData?: object) => Promise<void>] => {
  const cacheManager = useCacheManager();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (bodyData: object = {}) => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (method === "GET") {
          const cachedData = cacheManager.getCache<T>(url);
          if (cachedData) {
            setData(cachedData);
            return;
          }
          response = await https.get<T>(url);
          cacheManager.setCache(url, response);
        } else if (method === "POST") {
          response = await https.post<T>(url, bodyData);
          cacheManager.removeCache(url);
        } else {
          throw new Error("지원하지 않는 HTTP 메서드입니다.");
        }

        setData(response);
      } catch (err) {
        setError(
          `에러 발생: ${err instanceof Error ? err.message : "알 수 없는 에러"}`
        );
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  useEffect(() => {
    if (method === "GET") {
      fetchData();
    }
  }, [url, method]);

  return [data, loading, error, fetchData];
};

export default useFetch;

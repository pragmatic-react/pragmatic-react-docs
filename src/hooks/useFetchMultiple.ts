import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import { isAxiosError } from "axios";
import { ApiError } from "../errors/type";

type Query<T> = {
  apiKey: string;
  fn: () => Promise<T[]>;
};
/**
 * @param queries 병렬 호출할 API 함수와 키를 담은 객체 배열
 * @returns data API 호출 결과를 담은 객체
 */
const useFetchMultiple = <T>(queries: Query<T>[]): Record<string, any> => {
  const { data, setData } = useGlobalContext<T>();
  const [error, setError] = useState<null | Error>(null);
  const keys = queries.map(({ apiKey }) => apiKey);

  const fetchData = async () => {
    try {
      await Promise.all(
        queries.map(async ({ apiKey, fn }) => {
          const result = await fn();
          setData((prevData) => ({ ...prevData, [apiKey]: result }));
        })
      );
    } catch (error) {
      if (isAxiosError(error)) {
        const apiError = error as ApiError;
        setError(apiError);
      } else {
        const genericError = new Error("An unknown error occurred");
        setError(genericError);
      }
    }
  };

  if (error) throw error;

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = Object.keys(data)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {} as Record<string, any>);

  return { data: filteredData, error };
};

export default useFetchMultiple;

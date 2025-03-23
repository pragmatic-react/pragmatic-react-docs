import { useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { ApiError } from "../errors/type";

const useFetch = <T, P>({
  apiKey,
  fn,
}: {
  apiKey: string;
  fn: (params?: P) => Promise<T[]>;
}) => {
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<T[]>([]);

  const fetch = async (params?: P) => {
    setError(null);

    try {
      const result = await fn(params);
      setData(result);
    } catch (err) {
      if (isAxiosError(err)) {
        const apiError = err as ApiError;
        apiError.apiKey = apiKey;
        setError(apiError);
      } else {
        const genericError = new Error("An unknown error occurred");
        setError(genericError);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (error) throw error;

  return { data, refetch: fetch };
};

export default useFetch;

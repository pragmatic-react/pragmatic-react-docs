import { useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { ApiError } from "../errors/type";
import { useGlobalContext } from "../context/useGlobalContext";

const useFetch = <T, P>({
  apiKey,
  fn,
  enabled = true,
}: {
  apiKey: string;
  fn: (params?: P) => Promise<T[]>;
  enabled?: boolean;
}) => {
  const [error, setError] = useState<null | Error>(null);
  const { data, setData } = useGlobalContext<T[]>();

  const fetch = async (params?: P) => {
    setError(null);

    try {
      const result = await fn(params);
      setData((prevData) => ({ ...prevData, [apiKey]: result }));
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
    if (enabled) {
      fetch();
    }
  }, [enabled]);

  if (error) throw error;

  return { data: data[apiKey], refetch: fetch };
};

export default useFetch;

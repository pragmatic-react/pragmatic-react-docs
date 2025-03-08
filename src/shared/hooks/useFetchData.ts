import { useEffect } from 'react';
import { useState } from 'react';

export const useFetchData = <Data, Params = void>({
  fetchFunction,
  enabled,
  refetchInterval,
}: {
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled: boolean;
  refetchInterval?: number;
}) => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    function handleFetchDataEffect() {
      if (!enabled) return;

      let intervalId: NodeJS.Timeout | null = null;

      const fetchData = async () => {
        setIsPending(true);
        setIsError(false);
        setIsSuccess(false);

        try {
          const result = await fetchFunction();
          setData(result);
          setIsSuccess(true);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsPending(false);
        }
      };

      fetchData();

      if (refetchInterval) {
        intervalId = setInterval(fetchData, refetchInterval);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    },
    [enabled, refetchInterval],
  );

  return { data, isPending, isSuccess, isError };
};

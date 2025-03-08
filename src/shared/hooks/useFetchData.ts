import { useCallback, useEffect, useState } from 'react';

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

  const fetchData = useCallback(async () => {
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
  }, [fetchFunction]);

  useEffect(
    function handleFetchDataEffect() {
      if (!enabled) return;

      let intervalId: NodeJS.Timeout | null = null;

      fetchData();

      if (refetchInterval) {
        intervalId = setInterval(fetchData, refetchInterval);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    },
    [enabled, refetchInterval, fetchData],
  );

  return { data, isPending, isSuccess, isError, refetch: fetchData };
};

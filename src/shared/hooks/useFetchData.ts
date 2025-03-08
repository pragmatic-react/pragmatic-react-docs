import { useCallback, useEffect, useRef, useState } from 'react';

export const useFetchData = <Data, Params = void>({
  fetchFunction,
  enabled = true,
  refetchInterval,
}: {
  fetchFunction: (params?: Params) => Promise<Data>;
  enabled?: boolean;
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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    function handleFetchDataEffect() {
      if (!enabled) return;

      fetchData();

      if (refetchInterval) {
        intervalRef.current = setInterval(fetchData, refetchInterval);
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    },
    [enabled, refetchInterval, fetchData],
  );

  return { data, isPending, isSuccess, isError, refetch: fetchData };
};

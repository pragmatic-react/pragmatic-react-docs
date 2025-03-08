import { useCallback, useState } from 'react';

interface UseMutationOptions<Data, Params> {
  mutationFunction: (params: Params) => Promise<Data>;
  onSuccess?: (data: Data) => void;
  onError?: (error: unknown) => void;
}

interface UseMutationResult<Data, Params> {
  mutate: (params: Params) => Promise<void>;
  isLoading: boolean;
}

export const useMutation = <Data, Params>({
  mutationFunction,
  onSuccess,
  onError,
}: UseMutationOptions<Data, Params>): UseMutationResult<Data, Params> => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const result = await mutationFunction(params);
        onSuccess?.(result);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFunction, onSuccess, onError],
  );

  return { mutate, isLoading };
};

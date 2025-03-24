import { useState } from "react";
import { isAxiosError } from "axios";
import { ApiError } from "../errors/type";

interface MutationResult<T> {
  mutate: (data: T) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const useMutation = <T, R>({
  fn,
}: {
  fn: (data: T) => Promise<R>;
}): MutationResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutate = async (data: T) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);

      await fn(data);
    } catch (err) {
      if (isAxiosError(err)) {
        const apiError = err as ApiError;
        setErrorMessage(apiError.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, isError, errorMessage };
};

export default useMutation;

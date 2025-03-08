import { useEffect } from "react";
import { fetchRestaurants } from "../api/restaurant";
import { useRestaurantContext } from "../context/useRestaurantContext";
import { ERROR_MESSAGES } from "../api/baseApi";

export const useRestaurants = () => {
  const {
    isLoading,
    isError,
    setRestaurants,
    setIsLoading,
    setIsError,
    restaurants,
    errorMessage,
    setErrorMessage,
  } = useRestaurantContext();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { restaurants, isLoading, isError, errorMessage };
};

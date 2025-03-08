import { useEffect } from "react";
import { fetchRestaurants } from "../api/restaurant";
import { useRestaurantContext } from "../context/useRestaurantContext";

export const useRestaurants = () => {
  const {
    isLoading,
    isError,
    setRestaurants,
    setIsLoading,
    setIsError,
    restaurants,
  } = useRestaurantContext();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { restaurants, isLoading, isError };
};

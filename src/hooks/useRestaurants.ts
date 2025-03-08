import { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/restaurant";
import { Restaurant } from "../types/restaurant";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

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

  return { restaurants, isLoading, isError, fetchData, setRestaurants };
};

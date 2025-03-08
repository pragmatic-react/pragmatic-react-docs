import { useState, useEffect, ReactNode, createContext } from "react";
import { fetchRestaurants } from "./api/restaurant";
import { Restaurant } from "./types/restaurant";
import { RestaurantContext } from "./api/useRestaurant";

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <RestaurantContext.Provider
      value={{ restaurants, isLoading, isError, refetch: fetchData }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

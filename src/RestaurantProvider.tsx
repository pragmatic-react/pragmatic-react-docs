import { createContext, ReactNode } from "react";
import { useAddRestaurant } from "./hooks/useAddRestaurant";
import { useRestaurants } from "./hooks/useRestaurants";
import { Restaurant } from "./types/restaurant";

interface RestaurantContextType {
  restaurants: Restaurant[];
  isLoading: boolean;
  isError: boolean;
  addNewRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const { restaurants, isLoading, isError, setRestaurants } = useRestaurants();
  const { addNewRestaurant } = useAddRestaurant(setRestaurants);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        isError,
        addNewRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

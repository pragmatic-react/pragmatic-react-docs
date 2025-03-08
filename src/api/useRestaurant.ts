import { createContext, useContext } from "react";

import { Restaurant } from "../types/restaurant";

interface RestaurantContextType {
  restaurants: Restaurant[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};

export { RestaurantContext, useRestaurant };

import { createContext, ReactNode, useState } from "react";

import { Restaurant } from "./types/restaurant";

interface RestaurantContextType {
  restaurants: Restaurant[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const RestaurantContext = createContext<
  RestaurantContextType | undefined
>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        isError,
        errorMessage,
        setRestaurants,
        setIsLoading,
        setIsError,
        setErrorMessage,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

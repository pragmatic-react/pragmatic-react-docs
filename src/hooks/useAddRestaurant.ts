import { useState } from "react";
import { Restaurant } from "../types/restaurant";
import { addRestaurant } from "../api/restaurant";

export const useAddRestaurant = (
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>
) => {
  const [isError, setIsError] = useState<boolean>(false);

  const addNewRestaurant = async (restaurant: Restaurant) => {
    try {
      setIsError(false);
      const newRestaurant = await addRestaurant(restaurant);
      setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    } catch (error) {
      setIsError(true);
    }
  };

  return { addNewRestaurant, isError };
};

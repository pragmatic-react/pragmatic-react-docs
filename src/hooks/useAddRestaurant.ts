import { Restaurant } from "../types/restaurant";
import { addRestaurant } from "../api/restaurant";
import { useRestaurantContext } from "../context/useRestaurantContext";

export const useAddRestaurant = () => {
  const { isError, setIsError, setErrorMessage, errorMessage, setRestaurants } =
    useRestaurantContext();

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

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
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        // setErrorMessage(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
      setIsError(true);
      // TODO: 에러 메세지가 반영되지 않아서 추가된 로직으로 개선 필요.
      throw error;
    }
  };

  return { addNewRestaurant, isError, errorMessage };
};

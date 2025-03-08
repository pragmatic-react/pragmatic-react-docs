import { useEffect, useState } from "react";
import { Restaurant, RestaurantSubmitType } from "../models";
import useFetch from "../utils/useFetch";

const useRestaurants = () => {
  const [data, loading, error, getData] = useFetch<Restaurant[]>("restaurants");
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
  const [d, l, e, postData] = useFetch<Restaurant[]>("restaurants", "POST");

  useEffect(() => {
    setRestaurant(
      data?.map(
        (restaurant) =>
          new Restaurant(
            restaurant.id,
            restaurant.name,
            restaurant.description,
            restaurant.category
          )
      ) ?? []
    );
  }, [data]);

  const addRestaurant = async (restaurant: RestaurantSubmitType) => {
    postData(restaurant).then(() => getData());
  };

  return {
    restaurants,
    addRestaurant,
    loading: loading,
    error: error,
  };
};
export default useRestaurants;

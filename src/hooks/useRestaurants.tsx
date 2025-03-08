import { useEffect, useState } from "react";
import { Restaurant, RestaurantSubmitType } from "../models";
import https from "../utils/https";

const fetchRestaurants = async () => {
  const restaurantData = (await https.get("restaurants")) as Restaurant[];
  const restaurants = restaurantData.map(
    (data) =>
      new Restaurant(data.id, data.name, data.description, data.category)
  );
  return restaurants;
};

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const addRestaurant = async (restaurant: RestaurantSubmitType) => {
    await https.post("restaurants", restaurant);
    // setRestaurants([...restaurants, restaurant]);
    fetchRestaurants().then((restaurants) => setRestaurants(restaurants));
  };

  useEffect(() => {
    fetchRestaurants().then((restaurants) => setRestaurants(restaurants));
  }, [fetchRestaurants]);

  return {
    restaurants,
    addRestaurant,
    refetch: fetchRestaurants,
  };
};
export default useRestaurants;

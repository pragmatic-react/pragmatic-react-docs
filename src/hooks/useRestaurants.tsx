import { useEffect, useState } from "react";
import { Restaurant } from "../models";

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    const fetchRetaurants = async () => {
      const response = await fetch("./db.json");
      const data = await response.json();
      const restaurantData = data["restaurants"] as Restaurant[];
      const restaurants = restaurantData.map(
        (data) =>
          new Restaurant(data.id, data.name, data.description, data.category)
      );
      setRestaurants(restaurants);
    };

    try {
      fetchRetaurants();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    restaurants,
  };
};
export default useRestaurants;

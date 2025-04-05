import { useMemo } from "react";
import { CategorySelectList } from "../../types/restaurant";
import { fetchRestaurants } from "../../api/restaurant";
import useFetch from "../../hooks/useFetch";

const useFilteredRestaurants = (selectedCategory: CategorySelectList) => {
  const { data: restaurants = [] } = useFetch({
    apiKey: "restaurants",
    fn: fetchRestaurants,
  });

  const filteredRestaurants = useMemo(() => {
    if (selectedCategory === "전체") {
      return restaurants;
    }

    return restaurants.filter(
      (restaurant) => restaurant.category === selectedCategory
    );
  }, [restaurants, selectedCategory]);

  return filteredRestaurants;
};

export default useFilteredRestaurants;

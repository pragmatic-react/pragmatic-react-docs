import { useEffect, useState } from "react";
import { Restaurant, RestaurantSubmitType } from "../models";
import { useFetch } from "../utils/FetchCacheManager";

const useRecommendMenus = ({ restaurantId }) => {
  const [data, reload] = useFetch<Restaurant[]>(
    `restaurants-recommends?id=${restaurantId}`
  );

  const [recommends, setRecommends] = useState<Menu[]>([]);

  return {
    recommends: data,
  };
};
export default useRestaurants;

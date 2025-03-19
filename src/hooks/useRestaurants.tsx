import { useEffect, useState } from "react";
import { Restaurant, RestaurantSubmitType } from "../models";
import { useFetch, useMutation } from "../utils/FetchCacheManager";
import https from "../utils/https";

const useRestaurants = () => {
  // const userInfo = (useSelector((state: RootState) => state.login) || {}) as ILoginStore;

  // const { data: starredRestaurants, reload: getStarredRestaurants } = useFetch<
  //   Restaurant[]
  // >(`starredRestaurants?userId=${userId}`);

  const { data: generalRestaurants, reload: getRestaurants } =
    useFetch<Restaurant[]>("restaurants");

  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);

  // 가게 등록
  const { mutate } = useMutation<Restaurant[]>({
    mutationKey: "restaurants",
    mutationFn: (restaurant: RestaurantSubmitType) => {
      https.post("/restaurants", restaurant);
    },
    onSuccess: () => {
      getRestaurants();
    },
    onError: (error) => {
      console.error("가게 등록 에러", error);
    },
  });

  useEffect(() => {
    setRestaurant(
      generalRestaurants?.map(
        (restaurant) =>
          new Restaurant(
            restaurant.id,
            restaurant.name,
            restaurant.description,
            restaurant.category
          )
      ) ?? []
    );
  }, [generalRestaurants]);

  const addRestaurant = async (restaurant: RestaurantSubmitType) => {
    mutate(restaurant);
  };

  // const getRecommendMenus = async (restaurant: RestaurantSubmitType) => {
  //   const recommendMenus = fetchRecommendMenus(restaurant.name);
  //   return recommendMenus;
  // };

  return {
    restaurants,
    addRestaurant,
    // getRecommendMenus,
    // recommends,
    // recommendMenuError,
  };
};
export default useRestaurants;

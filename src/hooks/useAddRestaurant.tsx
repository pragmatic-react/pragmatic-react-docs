import { useEffect, useState } from "react";
import { Restaurant, RestaurantSubmitType } from "../models";
import { useMutation } from "../utils/FetchCacheManager";
import https from "../utils/https";

const useAddRestaurant = () => {
  // const userInfo = (useSelector((state: RootState) => state.login) || {}) as ILoginStore;

  // 가게 등록
  const { mutate } = useMutation<Restaurant[]>({
    mutationKey: "restaurants",
    mutationFn: (restaurant: RestaurantSubmitType) => {
      https.post("restaurants", restaurant);
    },
    onSuccess: () => {
      // getRestaurants();
    },
    onError: (error) => {
      console.error("가게 등록 에러", error);
    },
  });

  const addRestaurant = async (restaurant: RestaurantSubmitType) => {
    mutate(restaurant);
  };

  return {
    addRestaurant,
    // getRecommendMenus,
    // recommends,
    // recommendMenuError,
  };
};
export default useAddRestaurant;

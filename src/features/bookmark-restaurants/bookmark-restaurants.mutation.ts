import {
  Restaurant,
  RestaurantSubmitType,
} from "../../entities/restaurant/restaurant.type";
import https from "../../utils/https";
import { useMutation } from "../../utils/FetchCacheManager";

export const useBookMarkRestaurant = ({ restaurant }) => {
  // const userInfo = (useSelector((state: RootState) => state.login) || {}) as ILoginStore;

  // 가게 등록
  const { mutate } = useMutation<Restaurant[]>({
    mutationKey: `bookmark-restaurant${restaurant.id}`,
    mutationFn: (restaurant: RestaurantSubmitType) => {
      https.post("bookmark-restaurant", {
        ...restaurant,
        isBookMarked: !restaurant.isBookMarked,
      });
    },
    onSuccess: () => {
      // getRestaurants();
    },
    onError: (error) => {
      console.error("북마크 애러", error);
    },
  });

  const toggleBookMark = async (restaurant: RestaurantSubmitType) => {
    mutate(restaurant);
  };

  return {
    toggleBookMark,
    // getRecommendMenus,
    // recommends,
    // recommendMenuError,
  };
};
export default useAddRestaurant;

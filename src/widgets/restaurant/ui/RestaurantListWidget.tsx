import { Category, Restaurant, useGetFavoriteRestaurantData, useGetRestaurantData } from '@entities/restaurant';
import { useGetUserInfo } from '@entities/user';

import { RestaurantList } from './RestaurantList';

export const RestaurantListWidget = ({
  category,
  handleCardClick,
}: {
  category: Category | null;
  handleCardClick: (restaurant: Restaurant) => () => void;
}) => {
  const { data: restaurantList } = useGetRestaurantData(category);
  useGetFavoriteRestaurantData(category);
  useGetUserInfo();

  return (
    <div>
      <RestaurantList data={restaurantList ?? []} handleCardClick={handleCardClick} />
    </div>
  );
};

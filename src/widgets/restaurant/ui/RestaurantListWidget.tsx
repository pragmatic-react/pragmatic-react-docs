import { useModal } from '@features/modal';

import { Category, Restaurant, useGetFavoriteRestaurantData, useGetRestaurantData } from '@entities/restaurant';
import { useGetUserInfo } from '@entities/user';

import { RestaurantList } from './RestaurantList';

export const RestaurantListWidget = ({
  category,
  setSelected,
}: {
  category: Category | null;
  setSelected: (restaurant: Restaurant) => void;
}) => {
  const { data: restaurantList } = useGetRestaurantData(category);
  const { openModal } = useModal();

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  return (
    <div>
      <RestaurantList data={restaurantList ?? []} handleCardClick={handleCardClick} />
    </div>
  );
};

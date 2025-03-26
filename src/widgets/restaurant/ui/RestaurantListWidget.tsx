import { useState } from 'react';

import { useModal } from '@features/modal';

import { Category, Restaurant, useGetFavoriteRestaurantData, useGetRestaurantData } from '@entities/restaurant';
import { useGetUserInfo } from '@entities/user';

import { RestaurantDetailDrawer } from './RestaurantDetailDrawer';
import { RestaurantList } from './RestaurantList';

export const RestaurantListWidget = ({ category }: { category: Category | null }) => {
  const { data: restaurantList } = useGetRestaurantData(category);
  const { openModal } = useModal();
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  return (
    <div>
      <RestaurantList data={restaurantList ?? []} handleCardClick={handleCardClick} />

      <RestaurantDetailDrawer selected={selected} />
    </div>
  );
};

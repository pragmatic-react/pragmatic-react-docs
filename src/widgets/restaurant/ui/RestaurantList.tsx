import { useEffect, useState } from 'react';

import { useModal } from '@features/modal';

import { Category, Restaurant, RestaurantCard, fetchRestaurantData } from '@entities/restaurant';

import { useFetchData } from '@shared/hooks';

type Props = { category: Category | null; setSelected: (restaurant: Restaurant) => void };

export const RestaurantList = ({ category, setSelected }: Props) => {
  const { openModal } = useModal();

  const { data } = useFetchData({
    fetchFunction: async () => {
      const data = await fetchRestaurantData();
      return data;
    },
  });

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  return (
    <ul className="restaurant-list-container">
      {data?.restaurants?.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick} />
      ))}
    </ul>
  );
};

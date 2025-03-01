import { useState } from 'react';

import { useModal } from '@features/modal';
import { RestaurantDetailDrawer } from '@features/restaurant';

import { Restaurant, RestaurantCard } from '@entities/restaurant';

import data from '../../../../db.json';

export const RestaurantList = () => {
  const { restaurants } = data as { restaurants: Restaurant[] };
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const { openModal } = useModal();

  const handleCardClick = (id: string) => () => {
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    if (restaurant) {
      setSelected(restaurant);
      openModal();
    }
  };

  return (
    <>
      <ul className="restaurant-list-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick} />
        ))}
      </ul>

      <RestaurantDetailDrawer selected={selected} />
    </>
  );
};

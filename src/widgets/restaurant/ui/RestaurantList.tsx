import { Restaurant, RestaurantCard } from '@entities/restaurant';

import data from '../../../../db.json';

export const RestaurantList = () => {
  const { restaurants } = data as { restaurants: Restaurant[] };

  return (
    <ul className="restaurant-list-container">
      {restaurants.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} onClick={() => {}} />
      ))}
    </ul>
  );
};

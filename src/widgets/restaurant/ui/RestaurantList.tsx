import { Category, Restaurant, RestaurantCard } from '@entities/restaurant';

import data from '../../../../db.json';

type Props = { handleCardClick: (restaurant: Restaurant) => () => void; category: Category | null };

export const RestaurantList = ({ handleCardClick, category }: Props) => {
  const { restaurants } = data as { restaurants: Restaurant[] };

  const filteredRestaurants =
    category === null ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);

  return (
    <ul className="restaurant-list-container">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick} />
      ))}
    </ul>
  );
};

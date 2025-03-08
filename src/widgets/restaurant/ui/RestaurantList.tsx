import { useModal } from '@features/modal';

import { Category, Restaurant, RestaurantCard } from '@entities/restaurant';

import data from '../../../../db.json';

type Props = { category: Category | null; setSelected: (restaurant: Restaurant) => void };

export const RestaurantList = ({ category, setSelected }: Props) => {
  const { restaurants } = data as { restaurants: Restaurant[] };
  const { openModal } = useModal();

  const filteredRestaurants =
    category === null ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);

  const handleCardClick = (restaurant: Restaurant) => () => {
    setSelected(restaurant);
    openModal();
  };

  return (
    <ul className="restaurant-list-container">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick} />
      ))}
    </ul>
  );
};

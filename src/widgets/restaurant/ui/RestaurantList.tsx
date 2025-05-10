import { RestaurantCard } from '@features/restaurant';

import { Restaurant } from '@entities/restaurant';

type Props = {
  data: Restaurant[];
  handleCardClick: (restaurant: Restaurant) => () => void;
  handleFavoriteToggle: (id: string) => void;
};

export const RestaurantList = ({ data, handleCardClick, handleFavoriteToggle }: Props) => {
  return (
    <ul className="restaurant-list-container">
      {data?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onClick={handleCardClick(restaurant)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ))}
    </ul>
  );
};

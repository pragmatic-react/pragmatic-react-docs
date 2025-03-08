import { Restaurant, RestaurantCard } from '@entities/restaurant';

import { RestaurantSkeleton } from '@shared/ui';

type Props = { data: Restaurant[]; isPending: boolean; handleCardClick: (restaurant: Restaurant) => () => void };

export const RestaurantList = ({ data, isPending, handleCardClick }: Props) => {
  if (isPending) {
    return <RestaurantSkeleton />;
  }

  return (
    <ul className="restaurant-list-container">
      {data?.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick(restaurant)} />
      ))}
    </ul>
  );
};

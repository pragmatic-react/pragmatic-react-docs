import { Category, Restaurant, RestaurantCard, fetchRestaurantData } from '@entities/restaurant';

import { useFetchData } from '@shared/hooks';

type Props = { category: Category | null; setSelected: (restaurant: Restaurant) => void };

export const RestaurantList = ({ category, setSelected }: Props) => {
  const { openModal } = useModal();

  const { data } = useFetchData({
    key: `restaurant-list-${category}`,
    fetchFunction: async () => {
      const data = await fetchRestaurantData({ category: category ?? undefined });
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

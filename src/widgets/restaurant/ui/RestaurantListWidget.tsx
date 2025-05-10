import { Category } from '@entities/restaurant';

import { useRestaurantList } from '../hooks';
import { RestaurantDetailDrawer } from './RestaurantDetailDrawer';
import { RestaurantList } from './RestaurantList';

type Props = {
  category: Category | null;
};

export const RestaurantListWidget = ({ category }: Props) => {
  const { restaurantList, selected, handleCardClick, handleFavoriteToggle } = useRestaurantList(category);

  return (
    <div>
      <RestaurantList
        data={restaurantList}
        handleCardClick={handleCardClick}
        handleFavoriteToggle={handleFavoriteToggle}
      />
      <RestaurantDetailDrawer selected={selected} />
    </div>
  );
};

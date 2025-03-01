import { CATEGORY_IMAGES } from '../constants';
import { Restaurant } from '../model';

type Props = Pick<Restaurant, 'category' | 'name'>;

export const RestaurantIcon = ({ category, name }: Props) => {
  return (
    <div className="restaurant__category">
      <img src={CATEGORY_IMAGES[category]} alt={name} className="category-icon" />
    </div>
  );
};

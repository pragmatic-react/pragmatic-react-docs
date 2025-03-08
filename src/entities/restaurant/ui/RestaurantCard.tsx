import { Restaurant } from '../model/types';
import { RestaurantIcon } from './RestaurantIcon';

type Props = {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => () => void;
};

export const RestaurantCard = ({ restaurant, onClick }: Props) => {
  const { category, name, description, id } = restaurant;

  return (
    <li className="restaurant cursor-pointer" onClick={onClick(restaurant)}>
      <RestaurantIcon category={category} name={name} />

      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{name}</h3>
        <p className="restaurant__description text-body">{description}</p>
      </div>
    </li>
  );
};

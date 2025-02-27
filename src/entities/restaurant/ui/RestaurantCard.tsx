import { Category, Restaurant } from '../model/types';

type Props = {
  restaurant: Restaurant;
  onClick: () => void;
};

const categoryImages: Record<Category, string> = {
  한식: '/assets/category-korean.png',
  중식: '/assets/category-chinese.png',
  일식: '/assets/category-japanese.png',
  양식: '/assets/category-western.png',
  아시안: '/assets/category-asian.png',
  기타: '/assets/category-etc.png',
};

export const RestaurantCard = ({ restaurant, onClick }: Props) => {
  const { category, name, description } = restaurant;
  return (
    <li className="restaurant" onClick={onClick}>
      <div className="restaurant__category">
        <img src={categoryImages[category]} alt={name} className="category-icon" />
      </div>
      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{name}</h3>
        <p className="restaurant__description text-body">{description}</p>
      </div>
    </li>
  );
};

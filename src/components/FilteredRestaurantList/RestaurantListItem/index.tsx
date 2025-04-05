import { Restaurant } from "../../../types/restaurant";

const RestaurantListItem = ({
  restaurant,
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  restaurant: Restaurant;
  onClick?: () => void;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <li
      key={restaurant.id}
      className="restaurant"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </li>
  );
};

export default RestaurantListItem;

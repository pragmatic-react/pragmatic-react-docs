import { Restaurant } from "../../types/restaurant";
import CategoryIcon from "./CategoryIcon";
import RestaurantInfo from "./RestaurantInfo";

const RestaurantListItem = ({
  restaurant,
  onClick,
}: {
  restaurant: Restaurant;
  onClick: () => void;
}) => {
  return (
    <li key={restaurant.id} className="restaurant" onClick={onClick}>
      <CategoryIcon category={restaurant.category} />

      <RestaurantInfo restaurant={restaurant} />
    </li>
  );
};

export default RestaurantListItem;

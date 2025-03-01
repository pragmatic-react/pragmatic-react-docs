import { Restaurant as RestaurantType } from "../../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantModal";

const Restaurant = ({
  restaurant,
  onClick,
}: {
  restaurant: RestaurantType;
  onClick: (data: RestaurantModalData) => void;
}) => {
  const onClickRestaurant = () => {
    onClick(restaurant);
  };

  return (
    <li className="restaurant" key={restaurant.id} onClick={onClickRestaurant}>
      <div className="restaurant__category">
        <img
          src={restaurant.getCategeryImgSrc()}
          alt={restaurant.category}
          className="category-icon"
        />
      </div>
      <div className="restaurant__info">
        <h3 className="restaurant__name text-subtitle">{restaurant.name}</h3>
        <p className="restaurant__description text-body">
          {restaurant.description}
        </p>
      </div>
    </li>
  );
};

export default Restaurant;

import { Restaurant } from "../../types/restaurant";

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className="restaurant__info">
      <h3 className="restaurant__name text-subtitle">{restaurant.name}</h3>
      <p className="restaurant__description text-body">
        {restaurant.description}
      </p>
    </div>
  );
};

export default RestaurantInfo;

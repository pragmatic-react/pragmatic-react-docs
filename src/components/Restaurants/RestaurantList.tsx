import useRestaurants from "../../hooks/useRestaurants";
import { Restaurant as RestaurantType } from "../../models";
import Restaurant from "./Restaurant";

const RestaurantList = ({
  openRestaurantModal,
}: {
  openRestaurantModal: (data: RestaurantType) => void;
}) => {
  const { restaurants } = useRestaurants();

  return (
    <ul className="restaurant-list">
      {restaurants &&
        restaurants.map((restaurant) => (
          <Restaurant
            restaurant={restaurant}
            key={restaurant.id}
            onClick={openRestaurantModal}
          />
        ))}
    </ul>
  );
};

export default RestaurantList;

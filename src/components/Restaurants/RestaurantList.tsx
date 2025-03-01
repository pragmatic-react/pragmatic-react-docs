import { Restaurant as RestaurantType } from "../../models";
import RestaurantModal, { RestaurantModalData } from "./RestaurantModal";
import Restaurant from "./Restaurant";

const RestaurantList = ({
  data,
  openRestaurantModal,
}: {
  data: RestaurantType[] | undefined;
  openRestaurantModal: (data: RestaurantModalData) => void;
}) => {
  return (
    <ul className="restaurant-list">
      {data &&
        data.map((restaurant) => (
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

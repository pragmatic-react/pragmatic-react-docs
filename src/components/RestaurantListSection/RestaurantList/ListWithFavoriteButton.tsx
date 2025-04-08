import { useState } from "react";
import RestaurantListItem from "../RestaurantList/ListItem";
import CategoryIcon from "../RestaurantList/ListItem/CategoryIcon";
import FavoriteButton from "../RestaurantList/ListItem/FavoriteButton";
import RestaurantInfo from "../RestaurantList/ListItem/RestaurantInfo";
import Description from "../RestaurantList/ListItem/RestaurantInfo/Description";
import Name from "../RestaurantList/ListItem/RestaurantInfo/Name";
import { Restaurant } from "../../../types/restaurant";
import RestaurantDetailModal from "../../RestaurantDetailModal";

const ListWithFavoriteButton = ({
  restaurants,
}: {
  restaurants: Restaurant[];
}) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  return (
    <>
      <ul className="restaurant-list" style={{ flex: 1 }}>
        {restaurants.map((restaurant) => (
          <RestaurantListItem
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            <CategoryIcon category={restaurant.category} />

            <RestaurantInfo>
              <div>
                <FavoriteButton />
                <Name name={restaurant.name} />
              </div>

              <Description description={restaurant.description} />
            </RestaurantInfo>
          </RestaurantListItem>
        ))}
      </ul>

      {selectedRestaurant && (
        <RestaurantDetailModal
          selectedRestaurant={selectedRestaurant}
          isOpen={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </>
  );
};

export default ListWithFavoriteButton;

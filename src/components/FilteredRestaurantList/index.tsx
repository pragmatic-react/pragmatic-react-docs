import { useState } from "react";
import { CategorySelectList } from "../../types/restaurant";

import { Restaurant } from "../../types/restaurant";
import RestaurantDetailModal from "../RestaurantDetailModal";
import RestaurantListItem from "./RestaurantListItem";
import useFilteredRestaurants from "./useRestaurantByFilter";

function RestaurantList({
  selectedCategory,
}: {
  selectedCategory: CategorySelectList;
}) {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const filteredRestaurants = useFilteredRestaurants(selectedCategory);

  if (filteredRestaurants?.length === 0)
    return <div>No restaurants available</div>;

  return (
    <>
      <section className="restaurant-list-container">
        <ul className="restaurant-list">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantListItem
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))}
        </ul>
      </section>

      {selectedRestaurant && (
        <RestaurantDetailModal
          selectedRestaurant={selectedRestaurant}
          isOpen={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </>
  );
}
export default RestaurantList;

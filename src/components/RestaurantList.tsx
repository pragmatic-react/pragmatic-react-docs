const CATEGORY_ICON: Record<Category, string> = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
};

import { useState } from "react";
import { Category, CategorySelectList } from "../types/restaurant";

import { Restaurant } from "../types/restaurant";
import RestaurantDetailModal from "./RestaurantDetailModal";
import { useRestaurant } from "../context/useRestaurant";

function RestaurantList({
  selectedCategory,
}: {
  selectedCategory: CategorySelectList;
}) {
  const { restaurants, isLoading, isError } = useRestaurant();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const filteredRestaurants =
    selectedCategory === "전체"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === selectedCategory
        );

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;

  return (
    <>
      <section className="restaurant-list-container">
        <ul className="restaurant-list">
          {filteredRestaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="restaurant"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="restaurant__category">
                <img
                  src={`./src/assets/${CATEGORY_ICON[restaurant.category]}`}
                  alt={restaurant.category}
                  className="category-icon"
                />
              </div>

              <div className="restaurant__info">
                <h3 className="restaurant__name text-subtitle">
                  {restaurant.name}
                </h3>
                <p className="restaurant__description text-body">
                  {restaurant.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {selectedRestaurant && (
        <RestaurantDetailModal
          selectedRestaurant={selectedRestaurant}
          open={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </>
  );
}
export default RestaurantList;

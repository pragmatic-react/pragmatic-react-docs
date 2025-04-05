import { useState } from "react";
import { CategorySelectList } from "../../types/restaurant";

import { Restaurant } from "../../types/restaurant";
import RestaurantDetailModal from "../RestaurantDetailModal";
import RestaurantListItem from "./RestaurantListItem";
import useFilteredRestaurants from "./useRestaurantByFilter";
import RestaurantInfo from "./RestaurantListItem/RestaurantInfo";
import FavoriteButton from "./RestaurantListItem/FavoriteButton";
import Name from "./RestaurantListItem/RestaurantInfo/Name";
import Description from "./RestaurantListItem/RestaurantInfo/Description";
import Coupon from "./RestaurantListItem/RestaurantInfo/Coupon";
import CategoryIcon from "./RestaurantListItem/CategoryIcon";

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
      <section
        className="restaurant-list-container"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        {/* 첫 번째 리스트 아이템: 즐겨찾기 버튼 있는 케이스  */}
        <ul className="restaurant-list" style={{ flex: 1 }}>
          {filteredRestaurants.map((restaurant) => (
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

        {/* 첫 번째 리스트 아이템: 쿠폰 정보와 마우스 이벤트가 있는 케이스  */}
        <ul className="restaurant-list" style={{ flex: 1 }}>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantListItem
              key={restaurant.id}
              restaurant={restaurant}
              onMouseEnter={() => console.log("Mouse entered!")}
              onMouseLeave={() => console.log("Mouse left!")}
            >
              <CategoryIcon category={restaurant.category} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <RestaurantInfo>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {restaurant.category}
                    <Coupon />
                  </div>
                  <Name name={restaurant.name} />
                </RestaurantInfo>

                <div>가게 이미지 목록</div>
                <div>가게 이미지 목록</div>
                <div>가게 이미지 목록</div>
              </div>
            </RestaurantListItem>
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

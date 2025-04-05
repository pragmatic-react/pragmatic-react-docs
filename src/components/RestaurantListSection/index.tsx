import { CategorySelectList } from "../../types/restaurant";
import ListWithCoupon from "./RestaurantList/ListWithCoupon";
import ListWithFavoriteButton from "./RestaurantList/ListWithFavoriteButton";

import useFilteredRestaurants from "./useFilteredRestaurants";

function RestaurantListSection({
  selectedCategory,
}: {
  selectedCategory: CategorySelectList;
}) {
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
        {/* 첫 번째 리스트 예시: 즐겨찾기 버튼과 디테일 모달 기능이 있는 케이스  */}
        <ListWithFavoriteButton restaurants={filteredRestaurants} />

        {/* 두 번째 리스트 예시: 쿠폰 정보와 마우스 이벤트 핸들링이 있는 케이스  */}
        <ListWithCoupon restaurants={filteredRestaurants} />
      </section>
    </>
  );
}
export default RestaurantListSection;

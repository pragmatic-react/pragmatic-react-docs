import { Restaurant } from "../../../types/restaurant";
import RestaurantListItem from "../RestaurantList/ListItem";
import CategoryIcon from "../RestaurantList/ListItem/CategoryIcon";
import RestaurantInfo from "../RestaurantList/ListItem/RestaurantInfo";
import Name from "../RestaurantList/ListItem/RestaurantInfo/Name";
import Coupon from "./ListItem/Coupon";

const ListWithCoupon = ({ restaurants }: { restaurants: Restaurant[] }) => {
  return (
    <ul className="restaurant-list" style={{ flex: 1 }}>
      {restaurants.map((restaurant) => (
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
  );
};

export default ListWithCoupon;

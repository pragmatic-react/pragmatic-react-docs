const CATEGORY_ICON = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
};

function RestaurantList({ restaurants, handleRestaurantClick }) {
  return (
    <section className="restaurant-list-container">
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="restaurant"
            onClick={() => handleRestaurantClick(restaurant)}
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
  );
}
export default RestaurantList;

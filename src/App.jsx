import { useState } from "react";
import "./App.css";

import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import RestaurantList from "./components/RestaurantList";
// import AddRestaurantModal from "./components/AddRestaurantModal";
import { restaurants } from "./restaurantData";

function App() {
  const [category, setCategory] = useState("전체");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const filteredRestaurants =
    category === "전체"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.category === category);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  return (
    <>
      <Header />

      <main>
        <CategoryFilter category={category} onChangeCategory={setCategory} />

        <RestaurantList
          restaurants={filteredRestaurants}
          handleRestaurantClick={handleRestaurantClick}
        />
      </main>

      <aside>
        {selectedRestaurant && (
          <RestaurantDetailModal
            selectedRestaurant={selectedRestaurant}
            open={!!selectedRestaurant}
            onClose={handleCloseModal}
          />
        )}
        {/* <AddRestaurantModal /> */}
      </aside>
    </>
  );
}

export default App;

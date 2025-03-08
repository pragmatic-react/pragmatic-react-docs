import { useState } from "react";
import "./App.css";

// import AddRestaurantModal from "./components/AddRestaurantModal";
import { restaurants } from "./restaurantData";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import { CategorySelectList, Restaurant } from "./types/restaurant";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelectList>("전체");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const filteredRestaurants =
    selectedCategory === "전체"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === selectedCategory
        );

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseModal = () => {
    setSelectedRestaurant(null);
  };

  return (
    <>
      <Header />

      <main>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
        />

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

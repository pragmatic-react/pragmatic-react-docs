import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import { CategorySelectList } from "./types/restaurant";
import RestaurantList from "./components/RestaurantList";
import { RestaurantProvider } from "./RestaurantProvider";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelectList>("전체");

  return (
    <RestaurantProvider>
      <Header />

      <main>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
        />

        <RestaurantList selectedCategory={selectedCategory} />
      </main>
    </RestaurantProvider>
  );
}

export default App;

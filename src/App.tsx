import { Suspense, useState, lazy } from "react";
import "./App.css";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import { CategorySelectList } from "./types/restaurant";

const FilteredRestaurantList = lazy(
  () => import("./components/FilteredRestaurantList")
);
import ApiErrorBoundary from "./errors/boundaries/ApiErrorBoundary";
import GlobalErrorBoundary from "./errors/boundaries/GlobalErrorBoundary";
import { GlobalProvider } from "./GlobalProvider";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelectList>("전체");

  return (
    <GlobalErrorBoundary>
      <GlobalProvider>
        <Header />

        <main>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
          />

          <ApiErrorBoundary>
            <Suspense fallback={<div>로딩중...</div>}>
              <FilteredRestaurantList selectedCategory={selectedCategory} />
            </Suspense>
          </ApiErrorBoundary>
        </main>
      </GlobalProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

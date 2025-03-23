import { Suspense, useState, lazy } from "react";
import "./App.css";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import { CategorySelectList } from "./types/restaurant";

const RestaurantList = lazy(() => import("./components/RestaurantList"));
import { RestaurantProvider } from "./RestaurantProvider";
import ApiErrorBoundary from "./errors/boundaries/ApiErrorBoundary";
import GlobalErrorBoundary from "./errors/boundaries/GlobalErrorBoundary";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelectList>("전체");

  return (
    <GlobalErrorBoundary>
      <RestaurantProvider>
        <Header />

        <main>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
          />

          <ApiErrorBoundary>
            <Suspense fallback={<div>로딩중...</div>}>
              <RestaurantList selectedCategory={selectedCategory} />
            </Suspense>
          </ApiErrorBoundary>
        </main>
      </RestaurantProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import Header from "./pages/Header";
import RestaurantPage from "./pages/RestaurantPage";
import {
  FetchCacheManager,
  FetchCacheProvider,
  MutationObserver,
} from "./utils/FetchCacheManager";

const fetchCache = new FetchCacheManager();
const mutationObserver = new MutationObserver();

function App() {
  return (
    <FetchCacheProvider
      fetchCache={fetchCache}
      muationObserver={mutationObserver}
    >
      <>
        <Header />
        <RestaurantPage />
      </>
    </FetchCacheProvider>
  );
}

export default App;

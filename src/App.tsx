import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
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
        <MainPage />
      </>
    </FetchCacheProvider>
  );
}

export default App;

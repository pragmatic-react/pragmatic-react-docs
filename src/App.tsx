import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import { CacheProvider } from "./utils/CacheManager";

function App() {
  return (
    <CacheProvider>
      <>
        <Header />
        <MainPage />
      </>
    </CacheProvider>
  );
}

export default App;

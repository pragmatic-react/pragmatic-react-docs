import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";

import { CacheProvider } from "./utils/CacheManager";

function App() {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  return (
    <CacheProvider>
      <>
        <Header setAddModalOpen={setAddModalOpen} />
        <MainPage
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      </>
    </CacheProvider>
  );
}

export default App;

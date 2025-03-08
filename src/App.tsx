import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
function App() {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <Header setAddModalOpen={setAddModalOpen} />
      <MainPage addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
    </>
  );
}

export default App;

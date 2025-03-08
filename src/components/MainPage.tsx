import Restaurants from "./Restaurants";

const MainPage = ({ addModalOpen, setAddModalOpen }) => {
  return (
    <main>
      <Restaurants
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
    </main>
  );
};

export default MainPage;

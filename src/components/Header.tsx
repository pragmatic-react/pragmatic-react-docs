import { useState } from "react";
import useRestaurants from "../hooks/useRestaurants";
import AddRestaurantModal from "../components/Restaurants/AddRestaurantModal";

const Header = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  return (
    <header className="gnb">
      <h1 className="gnb__title text-title">점심 뭐 먹지</h1>
      <button
        type="button"
        className="gnb__button"
        aria-label="음식점 추가"
        onClick={() => setAddModalOpen(true)}
      >
        <img src="./templates/add-button.png" alt="음식점 추가" />
      </button>
      <AddRestaurantModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </header>
  );
};

export default Header;

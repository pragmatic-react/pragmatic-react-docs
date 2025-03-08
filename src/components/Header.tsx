import { useState } from "react";
import AddRestaurantModal from "./AddRestaurantModal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <header className="gnb">
        <h1 className="gnb__title text-title">점심 뭐 먹지</h1>
        <button
          type="button"
          className="gnb__button"
          aria-label="음식점 추가"
          onClick={handleToggleModal}
        >
          <img src="src/assets/add-button.png" alt="음식점 추가" />
        </button>
      </header>

      {isModalOpen && (
        <AddRestaurantModal isOpen={isModalOpen} onClose={handleToggleModal} />
      )}
    </>
  );
}

export default Header;

import React from 'react';
import { useModal } from '../Modal/useModal';
import CreateRestaurantModal from '../Modal/CreateRestaurantModal';

function Header() {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <>
      {/* Header */}
      <header className='bg-orange flex justify-between px-4 py-[10px] text-white'>
        <h1>점심 뭐 먹지</h1>
        <button onClick={openModal}>
          <img src='./add-button.png' alt='add' />
        </button>
      </header>
      {/* Modal */}
      <CreateRestaurantModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Header;

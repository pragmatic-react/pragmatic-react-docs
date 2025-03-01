import React from 'react';
import { useModal } from '../Modal/useModal';
import Modal from '../Modal/Modal';

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
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Modal.Title>새로운 음식점</Modal.Title>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>음식점 이름</label>
          <input className='w-full rounded-md border-2 border-gray-300 p-2' type='text' id='name' />
          <label htmlFor='address'>주소</label>
          <input
            className='w-full rounded-md border-2 border-gray-300 p-2'
            type='text'
            id='address'
          />
          <label htmlFor='phone'>전화번호</label>
          <input
            className='w-full rounded-md border-2 border-gray-300 p-2'
            type='text'
            id='phone'
          />
          <label htmlFor='category'>카테고리</label>
          <input type='text' id='category' />
        </div>
        <Modal.Footer>
          <Modal.Button colorType='white' onClick={closeModal}>
            취소
          </Modal.Button>
          <Modal.Button colorType='orange' onClick={closeModal}>
            추가
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;

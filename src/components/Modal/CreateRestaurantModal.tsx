import React from 'react';
import Modal from './Modal';

function CreateRestaurantModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const onCreateRestaurant = () => {
    // TODO: 음식점 추가 기능 구현
    console.log('submit');
  };

  const onCancel = () => {
    closeModal();
  };

  return (
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
        <input className='w-full rounded-md border-2 border-gray-300 p-2' type='text' id='phone' />
        <label htmlFor='category'>카테고리</label>
        <input type='text' id='category' />
      </div>
      <Modal.Footer>
        <Modal.Button colorType='white' onClick={onCancel}>
          취소
        </Modal.Button>
        <Modal.Button colorType='orange' onClick={onCreateRestaurant}>
          추가
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRestaurantModal;

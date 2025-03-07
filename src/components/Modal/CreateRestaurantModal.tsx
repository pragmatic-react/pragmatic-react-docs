import React from 'react';
import Modal from './Modal';
import { Restaurant } from '../../interface/restaurant';

function CreateRestaurantModal({
  isOpen,
  closeModal,
  onAddRestaurant,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onAddRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
}) {
  const onCreateRestaurant = () => {
    // TODO: 음식점 데이터를 받아서 생성할 수 있게 구현
    onAddRestaurant({
      name: '맷돌 순두부 삼성점',
      address: '서울특별시 강남구 태스트길 123길 123 테스트빌딩 123층',
      phone: '02-123-123',
      category: '한식',
      description: '푸짐한 양에 국물이 일품인 순두부',
    });
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

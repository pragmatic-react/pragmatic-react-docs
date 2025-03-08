import React, { useState } from 'react';
import Modal from './Modal';
import { Restaurant } from '../../interface/restaurant';

function CreateRestaurantModal({
  isOpen,
  closeModal,
  onAddRestaurant,
  isFetching,
}: {
  isOpen: boolean;
  closeModal: () => void;
  onAddRestaurant: (restaurant: Omit<Restaurant, 'id'>) => Promise<void>;
  isFetching: boolean;
}) {
  const onCreateRestaurant = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // TODO: input을 이용해서 데이터를 받아오기
      await onAddRestaurant({
        name: '순두부 테스트점222',
        address: '서울특별시 강남구 태스트길 123길 123 테스트빌딩 123층',
        phone: '02-123-123',
        category: '한식',
        description: '푸짐한 양에 국물이 일품인 순두부',
      });
      closeModal();
    } catch (error) {
      console.error('레스토랑 생성 중 오류 발생:', error);
    }
  };

  const onCancel = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.Title>새로운 음식점</Modal.Title>
      <div className='flex flex-col gap-2'>
        <label htmlFor='name'>음식점 이름</label>
        <input
          className='w-full rounded-md border-2 border-gray-300 p-2'
          type='text'
          id='name'
          name='name'
        />
        <label htmlFor='address'>주소</label>
        <input
          className='w-full rounded-md border-2 border-gray-300 p-2'
          type='text'
          id='address'
          name='address'
        />
        <label htmlFor='phone'>전화번호</label>
        <input
          className='w-full rounded-md border-2 border-gray-300 p-2'
          type='text'
          id='phone'
          name='phone'
        />
        <label htmlFor='category'>카테고리</label>
        <input type='text' id='category' name='category' />
      </div>
      <Modal.Footer>
        <Modal.Button type='button' colorType='white' onClick={onCancel}>
          취소
        </Modal.Button>
        <Modal.Button type='button' colorType='orange' onClick={(e) => onCreateRestaurant(e)}>
          추가
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateRestaurantModal;

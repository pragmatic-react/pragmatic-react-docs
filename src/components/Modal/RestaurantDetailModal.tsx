import React from 'react';
import { Restaurant } from '../../interface/restaurant';
import Modal from './Modal';
import { CATEGORY_IMAGE_MAP } from '../../constants/resaurant';

function RestaurantDetailModal({
  isOpen,
  closeModal,
  selectedRestaurant,
}: {
  isOpen: boolean;
  closeModal: () => void;
  selectedRestaurant: Restaurant;
}) {
  const onDeleteRestaurant = () => {
    // TODO: 음식점 삭제 기능 구현
    console.log('delete');
  };

  const onClose = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='bg-orange10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full'>
            <img
              className='h-9 w-9'
              src={CATEGORY_IMAGE_MAP[selectedRestaurant.category]}
              alt={selectedRestaurant.category}
            />
          </div>
        </div>
        <div>
          <h3 className='text-lg font-bold'>{selectedRestaurant.name}</h3>
          <p className='text-black'>{selectedRestaurant.description}</p>
        </div>
      </div>
      <Modal.Footer>
        <Modal.Button onClick={onDeleteRestaurant} colorType='white'>
          삭제하기
        </Modal.Button>
        <Modal.Button onClick={onClose} colorType='orange'>
          닫기
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RestaurantDetailModal;

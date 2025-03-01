import React, { useState } from 'react';
import { Restaurant } from '../../interface/restaurant';
import Modal from '../Modal/Modal';
import { useModal } from '../Modal/useModal';

const CATEGORY_IMAGE_MAP = {
  한식: './category-korean.png',
  중식: './category-chinese.png',
  일식: './category-japanese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
};

function RestaurantCard({
  restaurant,
  onSelect,
}: {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}) {
  return (
    <div
      className='flex gap-4 px-2 py-4'
      onClick={() => {
        onSelect(restaurant);
      }}
    >
      <div className='bg-orange10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full'>
        <img
          className='h-9 w-9'
          src={CATEGORY_IMAGE_MAP[restaurant.category]}
          alt={restaurant.category}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-bold'>{restaurant.name}</h3>
        <p className='line-clamp-2'>{restaurant.description}</p>
      </div>
    </div>
  );
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    openModal();
  };

  return (
    <div className='divide-gray10 flex flex-col divide-y'>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onSelect={handleSelectRestaurant}
        />
      ))}

      {/* Modal */}
      {selectedRestaurant && (
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
            <Modal.Button onClick={closeModal} colorType='white'>
              삭제하기
            </Modal.Button>
            <Modal.Button onClick={closeModal} colorType='orange'>
              닫기
            </Modal.Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Restaurant } from '../../interface/restaurant';
import { useModal } from '../Modal/useModal';
import { CATEGORY_IMAGE_MAP } from '../../constants/resaurant';
import RestaurantDetailModal from '../Modal/RestaurantDetailModal';

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
    <div className='divide-gray10 flex h-screen flex-col divide-y overflow-y-auto pb-16'>
      {/* Restaurant List */}
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onSelect={handleSelectRestaurant}
        />
      ))}

      {/* Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          isOpen={isOpen}
          closeModal={closeModal}
          selectedRestaurant={selectedRestaurant}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Restaurant } from '../../interface/restaurant';
import { useModal } from '../Modal/useModal';
import RestaurantDetailModal from '../Modal/RestaurantDetailModal';
import RestaurantCard from '../RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    openModal();
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='flex h-screen flex-col divide-y divide-gray-200 overflow-y-auto pb-16'>
      {/* 레스토랑 목록 */}
      {restaurants.map((restaurant) => (
        <RestaurantCard.Container
          key={restaurant.id}
          restaurant={restaurant}
          onSelect={handleSelectRestaurant}
        >
          <RestaurantCard.CategoryIcon category={restaurant.category} />
          <div className='flex flex-grow flex-col'>
            <div className='flex w-full items-start justify-between'>
              <div className='flex flex-col'>
                <strong className='text-lg font-bold'>{restaurant.name}</strong>
                <p className='line-clamp-2'>{restaurant.description}</p>
              </div>
              <RestaurantCard.Favorite
                id={restaurant.id}
                isFavorite={!!favorites[restaurant.id]}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
            <span className='mt-1 text-sm text-orange-500'>{`캠퍼스부터 ${restaurant.distance}분 내`}</span>
          </div>
        </RestaurantCard.Container>
      ))}

      {/* 모달 */}
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

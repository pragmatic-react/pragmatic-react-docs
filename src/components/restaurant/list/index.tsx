import { restaurantListStore } from '@/stores';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import mockData from '@/mock/db.json';
import { Restaurant } from '@/types';
import { RestaurantItem } from './item';
import { RestaurantDetailModal } from '../modal';
import { useBooleanState } from '@/hooks';

const containerStyle = css`
  display: flex;
  flex-direction: column;

  padding: 0 16px;
  margin: 16px 0;
`;

export function RestaurantList() {
  const { restaurants, setRestaurants, selectedItem, setSelectedItem } = restaurantListStore();

  const [isOpen, toggleIsOpen] = useBooleanState();

  const onItemClick = (item: Restaurant) => {
    setSelectedItem(item);
    toggleIsOpen();
  };

  const onClose = () => {
    toggleIsOpen();
  };

  useEffect(() => {
    const storedData = localStorage.getItem('items');
    if (storedData) {
      const parsedData = JSON.parse(storedData) || [];
      setRestaurants(parsedData.items);

      return;
    }
    // localStorage에 데이터가 없다면, mock 데이터를 저장
    localStorage.setItem('items', JSON.stringify(mockData)); // localStorage에 저장
    setRestaurants(mockData.items as Restaurant[]);
  }, [setRestaurants]);

  return (
    <section css={containerStyle}>
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((item) => (
            <RestaurantItem key={item.id} item={item} onItemClick={onItemClick} />
          ))}
        </ul>
      ) : (
        <h3>
          아직 목록이 없어요. <br /> 업데이트를 기다려주세요...
        </h3>
      )}
      <RestaurantDetailModal item={selectedItem} isOpen={isOpen} onClose={onClose} />
    </section>
  );
}

import { css } from '@emotion/react';
import { useEffect } from 'react';
import { Restaurant } from '@/types';
import { useBooleanState } from '@/hooks';
import { restaurantListStore } from '@/stores';
import { getRestaurantList } from '@/api';

import { RestaurantItem } from './item';
import { RestaurantDetailModal } from '../modal';

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
    const fetchData = async () => {
      try {
        const data = await getRestaurantList();
        setRestaurants(data);
      } catch (error) {
        console.error("레스토랑 목록을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchData();
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

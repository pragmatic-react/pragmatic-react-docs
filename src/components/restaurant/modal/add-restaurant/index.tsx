import { useState } from 'react';
import { createRestaurant, getRestaurantList } from '@/api';
import { Button, CommonModalProps, Modal } from '@/components';
import { RestaurantCategory } from '@/types';
import { restaurantListStore } from '@/stores';
import { itemInfoStyle } from './style';

interface AddRestaurantModalProps extends CommonModalProps {}

export function AddRestaurantModal({ isOpen, onClose }: AddRestaurantModalProps) {
  const { setRestaurants } = restaurantListStore();
  
  // 예시 데이터
  const [newRestaurant, setNewRestaurant] = useState({
    name: '김밥지옥',
    distance: 15,
    description: '김밥천국과 양대산맥을 이루는 굉장한 맛집, 포부수 선정 0위',
    link: 'https://www.google.com',
    category: '한식' as RestaurantCategory,
    is_favorite: false,
  });

  const onAddClick = async () => {
    try {
      await createRestaurant(newRestaurant);

      const updatedRestaurants = await getRestaurantList();
      setRestaurants(updatedRestaurants);

      onClose?.();
    } catch (error) {
      console.error("음식점 추가에 실패했습니다:", error);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="bottom">
      <Modal.Header>새로운 음식점</Modal.Header>
      <Modal.Body css={itemInfoStyle}></Modal.Body>
      <Modal.Footer>
        <Button color="secondary" onClick={onClose}>
          취소하기
        </Button>
        <Button
          color="primary"
          onClick={onAddClick}
        >
          추가하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

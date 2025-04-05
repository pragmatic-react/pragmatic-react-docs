import React, { ReactNode, ReactElement } from 'react';
import CategoryIcon from './CategoryIcon';
import Favorite from './Favorite';
import { Restaurant } from '../../interface/restaurant';

// Container 컴포넌트 Props 정의
interface ContainerProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  children: ReactNode;
  className?: string;
}

/**
 * RestaurantCard의 Container 컴포넌트
 *
 * 다른 모든 RestaurantCard 컴포넌트들은 이 컴포넌트 내부에서 사용되어야 합니다.
 * React.Children.map을 사용해 자식 컴포넌트에 필요한 props를 전달합니다.
 */
const Container: React.FC<ContainerProps> = ({
  restaurant,
  onSelect,
  children,
  className = '',
}) => {
  return (
    <div className={`flex gap-4 px-2 py-4 ${className}`} onClick={() => onSelect(restaurant)}>
      {children}
    </div>
  );
};

// 컴파운드 컴포넌트 정의
const RestaurantCard = {
  Container,
  CategoryIcon,
  Favorite,
};

export default RestaurantCard;

// 개별 컴포넌트 export
export { Container, CategoryIcon, Favorite };

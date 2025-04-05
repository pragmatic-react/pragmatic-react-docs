import React from 'react';
import { Restaurant } from '../../interface/restaurant';

interface FavoriteProps {
  id: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

/**
 * 즐겨찾기 버튼 컴포넌트
 *
 * 레스토랑을 즐겨찾기에 추가/제거할 수 있는 버튼을 제공합니다.
 * isFavorite 상태에 따라 다른 아이콘을 표시합니다.
 */
const Favorite: React.FC<FavoriteProps> = ({ id, isFavorite, onToggleFavorite }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 상위 컴포넌트의 클릭 이벤트 전파 방지
    onToggleFavorite(id);
  };

  return (
    <button className='ml-auto' onClick={handleClick}>
      {isFavorite ? (
        <svg className='h-6 w-6 fill-current text-orange-500' viewBox='0 0 24 24'>
          <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
        </svg>
      ) : (
        <svg
          className='h-6 w-6 text-gray-400'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
          fill='none'
        >
          <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
        </svg>
      )}
    </button>
  );
};

export default Favorite;

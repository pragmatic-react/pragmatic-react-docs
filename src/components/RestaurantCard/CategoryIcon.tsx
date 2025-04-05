import React from 'react';
import { CATEGORY_IMAGE_MAP } from '../../constants/resaurant';

interface CategoryIconProps {
  customIcon?: string;
  className?: string;
  category?: string;
}

/**
 * 레스토랑 카테고리 아이콘 컴포넌트
 *
 * 기본적으로 category에 매핑된 아이콘을 표시하지만,
 * customIcon prop을 통해 커스텀 아이콘을 설정할 수 있습니다.
 */
const CategoryIcon: React.FC<CategoryIconProps> = ({
  customIcon,
  className,
  category = '기타',
}) => {
  return (
    <div
      className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-orange-200 ${className}`}
    >
      <img className='h-9 w-9' src={customIcon || CATEGORY_IMAGE_MAP[category]} alt={category} />
    </div>
  );
};

export default CategoryIcon;

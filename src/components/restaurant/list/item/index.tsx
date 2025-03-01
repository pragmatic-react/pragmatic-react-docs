import { Restaurant } from '@/types';
import { css } from '@emotion/react';
import { RestaurantCategoryIcon } from '../../category-icon';
import { descriptionStyle, distanceStyle, infoStyle, itemStyle, nameStyle } from './style';

interface RestaurantItemProps {
  item: Restaurant;
  onItemClick: (item: Restaurant) => void;
}

export function RestaurantItem({ item, onItemClick }: RestaurantItemProps) {
  const { name, category, description, distance } = item;

  // TODO: 북마크 아이콘 추가
  return (
    <li css={itemStyle} onClick={() => onItemClick(item)}>
      <RestaurantCategoryIcon category={category} />
      <div css={infoStyle}>
        <h3 css={nameStyle}>{name}</h3>
        <p css={distanceStyle}>캠퍼스로부터 {distance}분 내</p>
        <p css={descriptionStyle}>{description}</p>
      </div>
    </li>
  );
}

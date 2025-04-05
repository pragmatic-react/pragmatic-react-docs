import { Restaurant } from '@/types';
import { RestaurantCategoryIcon } from '../../category-icon';
import { descriptionStyle, distanceStyle, infoStyle, infoTextStyle, infoWrapperStyle, itemStyle, nameStyle } from './style';
import { FavoriteIcon } from '@/components/common';
import { useFavoriteToggle } from '@/hooks';

interface RestaurantItemProps {
  item: Restaurant;
  onItemClick: (item: Restaurant) => void;
}

export function RestaurantItem({ item, onItemClick }: RestaurantItemProps) {
  const { name, category, description, distance, is_favorite } = item;
 
  const { isFavorite, onClick, iconVisible } = 
    useFavoriteToggle({ isFavorite: is_favorite, iconVisible: true}); // iconVisible 을 변경해보세요!

  return (
    <li css={itemStyle} onClick={() => onItemClick(item)}>
      <RestaurantCategoryIcon category={category} />
      <div css={infoWrapperStyle}>
        <div css={infoStyle}>
          <div css={infoTextStyle}>
            <h3 css={nameStyle}>{name}</h3>
            <p css={distanceStyle}>캠퍼스로부터 {distance}분 내</p>
          </div>
          <FavoriteIcon visible={iconVisible} onClick={onClick} isFavorite={isFavorite} />
        </div>
        <p css={descriptionStyle}>{description}</p>
      </div>
    </li>
  );
}

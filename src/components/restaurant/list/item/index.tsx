import { Restaurant } from '@/types';
import { useFavoriteToggle } from '@/hooks';
import { RestaurantCard } from './card';
import { infoStyle, infoTextStyle } from '../../styles';

interface RestaurantItemProps {
  item: Restaurant;
  onItemClick: (item: Restaurant) => void;
}

export function RestaurantItem({ item, onItemClick }: RestaurantItemProps) {
  const { name, category, description, distance, is_favorite } = item;

  const { isFavorite, onClick, iconVisible } = useFavoriteToggle({
    isFavorite: is_favorite,
    iconVisible: true,
  });

  return (
    <RestaurantCard onClick={() => onItemClick(item)}>
      <RestaurantCard.Icon category={category} />
      <RestaurantCard.Info>
        <div css={infoStyle}>
          <div css={infoTextStyle}>
            <RestaurantCard.Name>{name}</RestaurantCard.Name>
            <RestaurantCard.Distance>{distance}</RestaurantCard.Distance>
          </div>
          <RestaurantCard.Favorite
            isFavorite={isFavorite}
            onClick={onClick}
            visible={iconVisible}
          />
        </div>
        <RestaurantCard.Description>{description}</RestaurantCard.Description>
      </RestaurantCard.Info>
    </RestaurantCard>
  );
}

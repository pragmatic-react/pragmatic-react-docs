import { Restaurant, RestaurantBadgeLabel, RestaurantCategory } from '@/types';
import { useFavoriteToggle } from '@/hooks';
import { RestaurantCard } from '../../card';
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

  // 서버에서 주는 데이터라고 가정 (item props 에 포함되는 ..)
  const metaInfo = {
    badges: ['new', 'ad'],
  };

  return (
    <RestaurantCard onClick={() => onItemClick(item)}>
      <RestaurantCard.Icon category={category as RestaurantCategory} />
      <RestaurantCard.Info>
        <div css={infoStyle}>
          <div css={infoTextStyle}>
            <RestaurantCard.Name>
              {name}
              {metaInfo.badges.length && (
                <RestaurantCard.Badges>
                  {metaInfo.badges.map((type) => (
                    <RestaurantCard.Badge type={type as RestaurantBadgeLabel} />
                  ))}
                </RestaurantCard.Badges>
              )}
            </RestaurantCard.Name>
            <RestaurantCard.Distance>{distance}</RestaurantCard.Distance>
          </div>
          <RestaurantCard.Favorite
            isFavorite={isFavorite}
            onClick={onClick}
            visible={iconVisible}
          />
        </div>
        <div>
          <RestaurantCard.Description>{description}</RestaurantCard.Description>
          <RestaurantCard.Meta>
            <RestaurantCard.MetaItem label="프리미엄" icon="premium" />
            <RestaurantCard.MetaItem label="★ 4.9" />
            <RestaurantCard.MetaItem label="리뷰 842" />
            <RestaurantCard.MetaItem label="배달 15~20분" />
          </RestaurantCard.Meta>
        </div>
      </RestaurantCard.Info>
    </RestaurantCard>
  );
}

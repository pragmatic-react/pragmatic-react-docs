import { Restaurant, RestaurantIcon } from '@entities/restaurant';

import { Icons } from '@shared/ui';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onClick: () => void;
  onFavoriteToggle?: (id: string) => void;
};

export const RestaurantCard = ({ restaurant, onClick, onFavoriteToggle }: RestaurantCardProps) => {
  const { category, name, description, id, isFavorite } = restaurant;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(id);
  };

  return (
    <li className="restaurant cursor-pointer" onClick={onClick}>
      <RestaurantIcon category={category} name={name} />
      <div className="restaurant__info flex-1">
        <div className="flex flex-1 items-center justify-between">
          <h3 className="restaurant__name text-subtitle">{name}</h3>
          {onFavoriteToggle && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            >
              <Icons.Star filled={isFavorite} />
            </button>
          )}
        </div>
        <p className="restaurant__description text-body">{description}</p>
      </div>
    </li>
  );
};

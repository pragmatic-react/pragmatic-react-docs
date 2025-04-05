import { Restaurant, RestaurantIcon } from '@entities/restaurant';

import { Icons } from '@shared/ui';

import { useFavorite } from '../hooks';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onClick: () => void;
  onFavoriteToggle?: (id: string) => void;
};

export const RestaurantCard = ({ restaurant, onClick, onFavoriteToggle }: RestaurantCardProps) => {
  const { category, name, description, id, isFavorite } = restaurant;

  const { toggle, label } = useFavorite(id, isFavorite, onFavoriteToggle);

  return (
    <li
      className="restaurant cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <RestaurantIcon category={category} name={name} />
      <div className="restaurant__info flex-1">
        <div className="flex flex-1 items-center justify-between">
          <h3 className="restaurant__name text-subtitle">{name}</h3>
          {onFavoriteToggle && (
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center"
              onClick={toggle}
              aria-label={label}
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

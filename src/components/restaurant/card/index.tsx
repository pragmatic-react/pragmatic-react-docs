import { ReactNode } from 'react';
import { RestaurantCategory } from '@/types';
import { FavoriteIcon } from '@/components/common';
import { RESTAURANT_CATEGORY_LABEL, RESTAURANT_CATEGORY } from '@/consts';

import {
  categoryIconStyle,
  categoryStyle,
  descriptionStyle,
  distanceStyle,
  infoStyle,
  infoTextStyle,
  infoWrapperStyle,
  itemStyle,
  nameStyle,
} from '../styles';
interface RestaurantCarProps {
  children: ReactNode;
  onClick?: () => void;
}

function RestaurantCard({ children, onClick }: RestaurantCarProps) {
  return (
    <li css={itemStyle} onClick={onClick}>
      {children}
    </li>
  );
}

function Icon({
  category,
  render,
}: {
  category: RestaurantCategory;
  render?: (category: RestaurantCategory) => React.ReactNode;
}) {
  if (render) {
    return <>{render(category)}</>;
  }

  return (
    <div css={categoryStyle}>
      <img
        css={categoryIconStyle}
        src={`/assets/category-${RESTAURANT_CATEGORY[category]}.png`}
        alt={category}
      />
    </div>
  );
}

function Info({ children }: { children: ReactNode }) {
  return <div css={infoWrapperStyle}>{children}</div>;
}

function Name({ children }: { children: ReactNode }) {
  return <h3 css={nameStyle}>{children}</h3>;
}

function Distance({ children }: { children: ReactNode }) {
  return <p css={distanceStyle}>캠퍼스로부터 {children}분 내</p>;
}

function Description({ children }: { children: ReactNode }) {
  return <p css={descriptionStyle}>{children}</p>;
}

function Favorite({
  isFavorite,
  onClick,
  visible,
}: {
  isFavorite: boolean;
  onClick: (event: React.MouseEvent) => void;
  visible: boolean;
}) {
  return (
    <div css={infoStyle}>
      <div css={infoTextStyle}></div>
      <FavoriteIcon visible={visible} onClick={onClick} isFavorite={isFavorite} />
    </div>
  );
}

function Badges({ children }: { children: ReactNode }) {
  return <div css={{ display: 'flex', gap: '4px' }}>{children}</div>;
}

function Badge({ type }: { type: 'new' | 'closed' | 'ad' }) {
  const colorMap = {
    new: '#4caf50',
    closed: '#f44336',
    ad: '#ff9800',
  };

  return (
    <span
      css={{
        background: colorMap[type],
        color: '#fff',
        padding: '2px 6px',
        fontSize: '12px',
        borderRadius: '4px',
      }}
    >
      {RESTAURANT_CATEGORY_LABEL[type]}
    </span>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return <div css={{ display: 'flex', gap: '8px', marginTop: '4px' }}>{children}</div>;
}

function MetaItem({ label, icon }: { label: ReactNode; icon?: string }) {
  return (
    <div css={{ display: 'flex', alignItems: 'center', fontSize: '13px', gap: '4px' }}>
      {icon && <img src={`/assets/${icon}.png`} alt="" style={{ width: '16px', height: '16px' }} />}
      <span>{label}</span>
    </div>
  );
}

RestaurantCard.Icon = Icon;
RestaurantCard.Info = Info;
RestaurantCard.Name = Name;
RestaurantCard.Distance = Distance;
RestaurantCard.Description = Description;
RestaurantCard.Favorite = Favorite;
RestaurantCard.Badges = Badges;
RestaurantCard.Badge = Badge;
RestaurantCard.Meta = Meta;
RestaurantCard.MetaItem = MetaItem;

export { RestaurantCard };

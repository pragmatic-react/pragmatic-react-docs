import { ReactNode } from 'react';
import { RestaurantCategory } from '@/types';
import { FavoriteIcon } from '@/components/common';

import {
  descriptionStyle,
  distanceStyle,
  infoStyle,
  infoTextStyle,
  infoWrapperStyle,
  itemStyle,
  nameStyle,
} from '../styles';
import { RestaurantCategoryIcon } from '../category-icon';

function SomeSpecialSvgIconFor({ icon }: { icon: string }) {
  return <div>custom {icon} ...</div>;
}

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

function Icon({ category }: { category: RestaurantCategory }) {
  return (
    <RestaurantCategoryIcon
      category={category}
      render={(exampleIcon) => <SomeSpecialSvgIconFor icon={exampleIcon} />}
    />
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
      <div css={infoTextStyle}>{/* 내부에 Name/Distance가 들어가야 함 */}</div>
      <FavoriteIcon visible={visible} onClick={onClick} isFavorite={isFavorite} />
    </div>
  );
}

RestaurantCard.Icon = Icon;
RestaurantCard.Info = Info;
RestaurantCard.Name = Name;
RestaurantCard.Distance = Distance;
RestaurantCard.Description = Description;
RestaurantCard.Favorite = Favorite;

export { RestaurantCard };

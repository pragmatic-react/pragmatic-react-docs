import { RESTAURANT_CATEGORY } from '@/consts';
import { RestaurantCategory } from '@/types';
import { css } from '@emotion/react';

interface RestaurantCategoryIconProps {
  category: RestaurantCategory;
  render?: (category: RestaurantCategory) => React.ReactNode;
}

const categoryStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: var(--lighten-color);
`;

const categoryIconStyle = css`
  width: 36px;
  height: 36px;
`;

export function RestaurantCategoryIcon({ category, render, ...props }: RestaurantCategoryIconProps) {
  return (
    <div css={categoryStyle} {...props}>
      <img
        css={categoryIconStyle}
        src={`/assets/category-${RESTAURANT_CATEGORY[category]}.png`}
        alt={category}
      />
    </div>
  );
}

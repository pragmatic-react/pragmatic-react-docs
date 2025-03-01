import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

interface FavoriteIconProps extends HTMLAttributes<HTMLImageElement> {
  isFavorite: boolean;
}

const iconStyle = css`
  width: 27px;
  height: 27px;
`;

export function FavoriteIcon({ isFavorite, ...props }: FavoriteIconProps) {
  return (
    <img
      alt={`${isFavorite ? '등록' : '해제'}된 북마크`}
      src={`/assets/star-${isFavorite ? 'filled' : 'outlined'}.png`}
      css={iconStyle}
      {...props}
    />
  );
}

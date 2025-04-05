import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

interface FavoriteIconProps extends HTMLAttributes<HTMLImageElement> {
  isFavorite: boolean;
  visible?: boolean;
  onToggle?: () => void;
}

const iconStyle = css`
  width: 27px;
  height: 27px;
`;

export function FavoriteIcon({ isFavorite, visible = true, onToggle, ...props }: FavoriteIconProps) {
  if (!visible) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onToggle) {
      onToggle();
    }
  };

  return (
    <img
      onClick={handleClick}
      alt={`${isFavorite ? '등록' : '해제'}된 북마크`}
      src={`/assets/star-${isFavorite ? 'filled' : 'outlined'}.png`}
      css={iconStyle}
      {...props}
    />
  );
}

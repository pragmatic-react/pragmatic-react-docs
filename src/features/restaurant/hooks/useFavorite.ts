import { MouseEventHandler } from 'react';

export const useFavorite = (id: string, isFavorite: boolean, onToggle?: (id: string) => void) => {
  const toggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onToggle?.(id);
  };

  const label = isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가';

  return { toggle, label };
};

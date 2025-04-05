import { useCallback } from 'react';
import { useBooleanState } from './use-boolean-state';

export function useFavoriteToggle(initialState: boolean) {
  const [isFavorite, toggleIsFavorite] = useBooleanState({ initialState });

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleIsFavorite();
  }, [toggleIsFavorite]);

  return { isFavorite, onClick };
}

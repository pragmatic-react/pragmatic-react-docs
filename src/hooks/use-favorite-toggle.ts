import { useCallback } from 'react';
import { useBooleanState } from './use-boolean-state';

interface InitialFavoriteToggleState {
  isFavorite?: boolean;
  iconVisible?: boolean;
}

export function useFavoriteToggle(initialState: InitialFavoriteToggleState) {
  const [isFavorite, toggleIsFavorite] = useBooleanState({ initialState: initialState.isFavorite });
  const [iconVisible, setIsIconVisible] = useBooleanState({ initialState: initialState.iconVisible });

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleIsFavorite();
  }, [toggleIsFavorite]);

  return { isFavorite, onClick, iconVisible, setIsIconVisible };
}

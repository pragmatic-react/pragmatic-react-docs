import { useCallback, useState } from 'react';

import { useModal } from '@features/modal';

import { Category, Restaurant, useGetRestaurantData } from '@entities/restaurant';

import { useMutation } from '@shared/hooks';
import { useFetchContext } from '@shared/providers';

export const useRestaurantList = (category: Category | null) => {
  const { data: restaurantList } = useGetRestaurantData(category);
  const { openModal } = useModal();
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const { triggerRefetch } = useFetchContext();

  const { mutate: toggleFavorite } = useMutation<void, { id: string }>({
    mutationFunction: async ({ id }) => {
      const response = await fetch(`/api/restaurants/${id}/favorite`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }
    },
  });

  const handleCardClick = useCallback(
    (restaurant: Restaurant) => () => {
      setSelected(restaurant);
      openModal();
    },
    [openModal],
  );

  const handleFavoriteToggle = useCallback(
    async (id: string) => {
      try {
        await toggleFavorite({ id });
        triggerRefetch(['restaurants']);
      } catch (error) {
        console.error('Failed to toggle favorite:', error);
        // TODO: 에러 처리 UI 추가
      }
    },
    [toggleFavorite, triggerRefetch],
  );

  return {
    restaurantList: restaurantList ?? [],
    selected,
    handleCardClick,
    handleFavoriteToggle,
  };
};

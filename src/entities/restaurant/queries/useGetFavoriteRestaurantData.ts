import { useFetchData } from '@shared/hooks';

import { fetchFavoriteRestaurantData } from '../api';
import { Category } from '../model';

export const useGetFavoriteRestaurantData = (category: Category | null) => {
  return useFetchData({
    fetchKey: ['favorite-restaurant', category],
    fetchFunction: async () => {
      const params = category ? { category } : undefined;
      const data = await fetchFavoriteRestaurantData(params);
      return data;
    },
  });
};

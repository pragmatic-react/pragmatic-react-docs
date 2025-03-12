import { useFetchData } from '@shared/hooks';

import { fetchRestaurantData } from '../api';
import { Category } from '../model';

export const useGetRestaurantData = (category: Category | null) => {
  return useFetchData({
    fetchKey: ['restaurant-list', category],
    fetchFunction: async () => {
      const params = category ? { category } : undefined;
      const data = await fetchRestaurantData(params);
      return data;
    },
  });
};

import { useFetchData } from '@shared/hooks';

import { fetchUserInfo } from '../api';

export const useGetUserInfo = () => {
  return useFetchData({
    fetchKey: ['user-info'],
    fetchFunction: async () => {
      const data = await fetchUserInfo();
      return data;
    },
    suspense: true,
  });
};

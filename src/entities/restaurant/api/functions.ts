import { fetcher } from '@shared/api';

import { Category, Restaurant } from '../model';

type Params = {
  category?: Category;
};

type FetchRestaurantData = {
  request: Params;
  response: Restaurant[];
};

export const fetchRestaurantData = async (
  params?: FetchRestaurantData['request'],
): Promise<FetchRestaurantData['response']> => {
  const data = await fetcher.get<FetchRestaurantData['response']>('/restaurants', {
    params,
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return data;
};

export type AddRestaurantData = {
  request: Omit<Restaurant, 'id'>;
};

export const addRestaurantData = async (body: AddRestaurantData['request']) => {
  const data = await fetcher.post('/restaurants', body);

  return data;
};

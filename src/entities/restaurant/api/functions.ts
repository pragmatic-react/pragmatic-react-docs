import { Category, Restaurant } from '../model';

type Params = {
  category?: Category;
};

type FetchRestaurantData = {
  request: Params;
  response: { restaurants: Restaurant[] };
};

export const fetchRestaurantData = async (
  params?: FetchRestaurantData['request'],
): Promise<FetchRestaurantData['response']> => {
  const response = await fetch('/db.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();

  if (params?.category) {
    return data.filter((restaurant: Restaurant) => restaurant.category === params.category);
  }
  return data;
};

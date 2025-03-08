import { Category, Restaurant } from '../model';

export const fetchRestaurantData = async ({
  params,
}: {
  params?: {
    category: Category;
  };
}): Promise<Restaurant[]> => {
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

import { RESTAURANT_CATEGORY } from '@/consts';

export type RestaurantCategory = keyof typeof RESTAURANT_CATEGORY;

export interface Restaurant {
  id: number;
  is_favorite: boolean;
  name: string;
  category: RestaurantCategory;
  description: string;
  distance: number;
  link: string;
}

export type NewRestaurant = Omit<Restaurant, 'id' | 'is_favorite'>;

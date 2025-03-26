import { Restaurant, RestaurantCategory } from '@/types';
import { create } from 'zustand';

interface Store {
  restaurants: Restaurant[];
  setRestaurants: (items: Restaurant[]) => void;
  selectedItem: Restaurant;
  setSelectedItem: (item: Restaurant) => void;
}

export const restaurantListStore = create<Store>((set) => ({
  restaurants: [],
  setRestaurants: (restaurants: Restaurant[]) => set({ restaurants }),
  selectedItem: {
    name: '',
    distance: 0,
    description: '',
    link: '',
    category: '' as RestaurantCategory,
    id: 0,
    is_favorite: false
  },
  setSelectedItem: (selectedItem: Restaurant) => set({ selectedItem }),
}));

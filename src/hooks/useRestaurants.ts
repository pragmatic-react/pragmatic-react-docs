import { useState, useCallback } from 'react';
import { Restaurant } from '../interface/restaurant';
import { restaurantAPI } from '../api/restaurants';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await restaurantAPI.getRestaurants();
      setRestaurants(data.restaurants);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('알 수 없는 에러가 발생했습니다'));
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addRestaurant = useCallback(async (restaurant: Omit<Restaurant, 'id'>) => {
    try {
      const { data } = await restaurantAPI.postRestaurant(restaurant);
      setRestaurants((prev) => [...prev, data.restaurant]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('알 수 없는 에러가 발생했습니다'));
      throw err;
    }
  }, []);

  return {
    restaurants,
    isLoading,
    error,
    fetchRestaurants,
    addRestaurant,
  };
}

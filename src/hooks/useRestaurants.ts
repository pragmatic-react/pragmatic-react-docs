import { useState, useCallback } from 'react';
import { Restaurant } from '../interface/restaurant';
import { restaurantAPI } from '../api/restaurants';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFetching, setIsFetching] = useState(false); // 데이터 페칭용 상태
  const [isAdding, setIsAdding] = useState(false); // 데이터 추가용 상태
  const [fetchingError, setFetchingError] = useState<Error | null>(null);
  const [addingError, setAddingError] = useState<Error | null>(null);

  const fetchRestaurants = useCallback(async () => {
    setIsFetching(true);
    try {
      const { data } = await restaurantAPI.getRestaurants();
      setRestaurants(data);
      setFetchingError(null);
    } catch (err) {
      setFetchingError(err instanceof Error ? err : new Error('알 수 없는 에러가 발생했습니다.'));
    } finally {
      setIsFetching(false);
    }
  }, []);

  const addRestaurantAction = useCallback(async (restaurant: Omit<Restaurant, 'id'>) => {
    setIsAdding(true);
    try {
      const { data } = await restaurantAPI.postRestaurant(restaurant);
      setRestaurants((prev) => [...prev, data]);
      setAddingError(null);
    } catch (err) {
      setAddingError(
        err instanceof Error ? err : new Error('레스토랑 추가 중 에러가 발생했습니다.'),
      );
    } finally {
      setIsAdding(false);
    }
  }, []);

  return {
    restaurants,
    isFetching,
    isAdding,
    fetchingError,
    addingError,
    fetchRestaurants,
    addRestaurantAction,
  };
};

import { Restaurant } from '../interface/restaurant';
import { client } from './axios';

// API 엔드포인트
const API_ENDPOINTS = {
  RESTAURANTS: '/restaurants',
} as const;

// API 응답 타입
interface GetRestaurantsResponse {
  restaurants: Restaurant[];
}

interface CreateRestaurantResponse {
  restaurant: Restaurant;
}

export const restaurantAPI = {
  /** 레스토랑 목록 조회 */
  getRestaurants: () => {
    return client.get<GetRestaurantsResponse>(API_ENDPOINTS.RESTAURANTS);
  },

  /** 레스토랑 생성 */
  postRestaurant: (restaurant: Omit<Restaurant, 'id'>) => {
    return client.post<CreateRestaurantResponse>(API_ENDPOINTS.RESTAURANTS, restaurant);
  },
};

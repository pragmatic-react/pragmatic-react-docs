import { Restaurant } from "./restaurant.type";

export function transformRestaurantDtoToRestaurant(
  restaurant: Restaurant
): Restaurant {
  return new Restaurant(
    restaurant.id,
    restaurant.name,
    restaurant.description,
    restaurant.category,
    restaurant.isBookMarked
  );
}

export function transformRestauranstDtoToRestaurant(
  restaurants?: Restaurant[]
): Restaurant[] {
  if (restaurants === null || restaurants === undefined) return [];
  return restaurants?.map((restaurant) =>
    transformRestaurantDtoToRestaurant(restaurant)
  );
}

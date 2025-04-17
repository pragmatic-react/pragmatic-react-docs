import {
  Restaurant,
  RestaurantDto,
  RestaurantStatus,
  RestaurantMetaInfo,
} from "./restaurant.type";

export function transformRestaurantDtoToRestaurant(
  restaurant: RestaurantDto
): Restaurant {
  const state: RestaurantStatus = Object.assign(
    {},
    {
      NEW_OPEN: restaurant.isNewOpen ?? false,
      CLOSED: restaurant.isClosed ?? false,
      DISCOUNT: restaurant.isDiscounted ?? false,
      FREE_DELIVERY: restaurant.isFreeDeliveryFee ?? false,
      ADVERTISED: restaurant.isAdvertised ?? false,
    }
  );
  const metaInfo: RestaurantMetaInfo = Object.assign(
    {},
    {
      reviewCount: restaurant.reviewCount ?? 0,
      rating: restaurant.rating ?? 0,
      deliveryTime: restaurant.deliveryTime,
    }
  );

  return new Restaurant(
    restaurant.id,
    restaurant.name,
    restaurant.description,
    restaurant.category,
    restaurant.isBookMarked,
    metaInfo,
    state
  );
}

export function transformRestauranstDtoToRestaurant(
  restaurants?: RestaurantDto[]
): Restaurant[] {
  if (restaurants === null || restaurants === undefined) return [];
  return restaurants?.map((restaurant) =>
    transformRestaurantDtoToRestaurant(restaurant)
  );
}

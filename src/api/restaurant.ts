import { Restaurant } from "../types/restaurant";
import baseApi from "./baseApi";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await baseApi.get("/restaurants");
  return response.data;
};

export const addRestaurant = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  const response = await baseApi.post("/restaurants", restaurant, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

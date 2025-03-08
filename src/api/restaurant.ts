import axios from "axios";
import { Restaurant } from "../types/restaurant";

const API_URL = "http://localhost:3000/restaurants";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addRestaurant = async (restaurant: Restaurant) => {
  const response = await axios.post(API_URL, restaurant, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error("Failed to add restaurant");
  }

  return response.data;
};

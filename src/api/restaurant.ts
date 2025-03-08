import axios from "axios";
import { Restaurant } from "../types/restaurant";

const API_URL = "http://localhost:3000/restaurants";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

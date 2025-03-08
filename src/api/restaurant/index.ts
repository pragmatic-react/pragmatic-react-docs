import { NewRestaurant, Restaurant } from "@/types";
import { getFetch, createFetch } from "../util";
import { RESTAURANT_API_URL } from "../url";

export const getRestaurantList = async (): Promise<Restaurant[]> => {
   return await getFetch<Restaurant[]>(RESTAURANT_API_URL);
}

export const createRestaurant = async (newRestaurant: NewRestaurant)  => { 
    return await createFetch(RESTAURANT_API_URL, newRestaurant);
};

import { AxiosRequestConfig } from "axios";
import { axios } from ".";
import { RestaurantItemType } from "./restaurantIType";

export default class RestaurantService {
  static ReadInfoList({ config }: { config?: AxiosRequestConfig<any> }) {
    return axios.get("/restaurants", config);
  }

  static CreateInfo({
    data,
    config,
  }: {
    data: RestaurantItemType & { id: number };
    config?: AxiosRequestConfig<any>;
  }) {
    return axios.post("/restaurants", JSON.stringify(data), {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });
  }
}

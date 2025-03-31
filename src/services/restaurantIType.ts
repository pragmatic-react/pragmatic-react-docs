export type RestaurantCategoryType =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";

export type RestaurantItemType = {
  name: string;
  category: RestaurantCategoryType;
  description?: string;
};

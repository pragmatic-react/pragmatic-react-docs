import { Category } from "../types/restaurant";

export const BASE_CATEGORY_OPTIONS = [
  { value: "한식", label: "한식" },
  { value: "중식", label: "중식" },
  { value: "일식", label: "일식" },
  { value: "양식", label: "양식" },
  { value: "아시안", label: "아시안" },
  { value: "기타", label: "기타" },
];

export const CATEGORY_ICON: Record<Category, string> = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
};

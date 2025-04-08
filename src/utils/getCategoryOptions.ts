import { BASE_CATEGORY_OPTIONS } from "../constants/categories";

interface CategoryOptionsConfig {
  includeEmpty?: boolean; // "선택해 주세요" 포함 여부
  includeAll?: boolean; // "전체" 포함 여부
}

export const getCategoryOptions = ({
  includeAll,
  includeEmpty,
}: CategoryOptionsConfig = {}) => {
  let options = [...BASE_CATEGORY_OPTIONS];

  if (includeEmpty) {
    options = [{ value: "", label: "선택해 주세요" }, ...options];
  }

  if (includeAll) {
    options = [{ value: "전체", label: "전체" }, ...options];
  }

  return options;
};

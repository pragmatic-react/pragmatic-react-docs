export const BASE_CATEGORY_OPTIONS = [
  { value: "한식", label: "한식" },
  { value: "중식", label: "중식" },
  { value: "일식", label: "일식" },
  { value: "양식", label: "양식" },
  { value: "아시안", label: "아시안" },
  { value: "기타", label: "기타" },
];

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

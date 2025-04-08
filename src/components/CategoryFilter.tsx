import { CategorySelectList } from "../types/restaurant";
import { getCategoryOptions } from "../utils/getCategoryOptions";
import Select from "./Select";

interface CategoryFilterProps {
  selectedCategory: string;
  onChangeCategory: (category: CategorySelectList) => void;
}

function CategoryFilter({
  selectedCategory,
  onChangeCategory,
}: CategoryFilterProps) {
  return (
    <section className="restaurant-filter-container">
      <Select
        name="category"
        id="category-filter"
        className="restaurant-filter"
        aria-label="음식점 카테고리 필터"
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value as CategorySelectList)}
        options={getCategoryOptions({ includeAll: true })}
      />
    </section>
  );
}

export default CategoryFilter;

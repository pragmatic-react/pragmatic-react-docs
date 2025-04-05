import { CATEGORY_ICON } from "../../../../constants/categories";
import { Category } from "../../../../types/restaurant";

const CategoryIcon = ({ category }: { category: Category }) => {
  return (
    <div className="restaurant__category">
      <img
        src={`./src/assets/${CATEGORY_ICON[category]}`}
        alt={category}
        className="category-icon"
      />
    </div>
  );
};

export default CategoryIcon;

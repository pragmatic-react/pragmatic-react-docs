import { forwardRef, useState } from "react";
import { CATEGORIES, CATEGORY_PLACEHOLDER } from "../../models";

const CategoryOption = ({ onChange, error }, ref) => {
  return (
    <div className="form-item">
      <label htmlFor="category">카테고리</label>
      <select
        name="category"
        id="category"
        onChange={onChange}
        ref={ref}
        defaultValue=""
      >
        <option value="" disabled hidden>
          {CATEGORY_PLACEHOLDER}
        </option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default forwardRef(CategoryOption);

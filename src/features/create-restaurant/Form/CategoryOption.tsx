import { forwardRef, useState } from "react";
import { CATEGORIES, CATEGORY_PLACEHOLDER } from "../../../models";

const CategoryOption = ({ onChange, error }, ref) => {
  return (
    <>
      <select
        name="category"
        id="category"
        onChange={onChange}
        ref={ref.ref}
        defaultValue={ref.value}
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
    </>
  );
};

export default forwardRef(CategoryOption);

import { forwardRef } from "react";

const Description = ({ onChange }, ref) => {
  return (
    <div className="form-item">
      <label htmlFor="description">설명</label>
      <textarea
        name="description"
        id="description"
        onChange={onChange}
        ref={ref}
      />
      {/* {error && <p className="error-text">{error}</p>} */}
    </div>
  );
};

export default forwardRef(Description);

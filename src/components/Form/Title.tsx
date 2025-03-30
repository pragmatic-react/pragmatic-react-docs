import { forwardRef } from "react";

const Title = ({ onChange, error }, ref) => {
  return (
    <div className="form-item">
      <label htmlFor="name">이름</label>
      <input
        type="text"
        name="name"
        id="name"
        // value={value}
        onChange={onChange}
        ref={ref}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default forwardRef(Title);

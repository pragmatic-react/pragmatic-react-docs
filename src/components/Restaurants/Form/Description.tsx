import { forwardRef } from "react";

const Description = ({ onChange, error }, ref) => {
  return (
    <>
      <textarea
        name="description"
        id="description"
        onChange={onChange}
        ref={ref.ref}
        defaultValue={ref.value}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default forwardRef(Description);

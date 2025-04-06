import { forwardRef } from "react";

const Title = ({ onChange, error }, ref) => {
  console.log("error");
  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        onChange={onChange}
        ref={ref.ref}
        defaultValue={ref.value}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default forwardRef(Title);

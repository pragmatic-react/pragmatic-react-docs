import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <p style={{ color: "red" }}>{children}</p>
    </div>
  );
};

export default ErrorMessage;

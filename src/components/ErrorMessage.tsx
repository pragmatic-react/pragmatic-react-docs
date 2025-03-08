import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{children}</p>
    </div>
  );
};

export default ErrorMessage;

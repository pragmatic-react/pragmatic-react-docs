import { ReactNode } from "react";

function ButtonContainer({ children }: { children: ReactNode }) {
  return <div className="button-container">{children}</div>;
}
export default ButtonContainer;

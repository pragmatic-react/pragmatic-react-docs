import { PropsWithChildren } from "react";

function ButtonContainer({ children }: PropsWithChildren) {
  return <div className="button-container">{children}</div>;
}
export default ButtonContainer;

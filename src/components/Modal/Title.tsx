import { PropsWithChildren } from "react";

function Title({ children }: PropsWithChildren) {
  return <h2 className="modal-title text-title">{children}</h2>;
}
export default Title;

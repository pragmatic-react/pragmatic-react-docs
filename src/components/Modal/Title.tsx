import { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
  return <h2 className="modal-title text-title">{children}</h2>;
}
export default Title;

import { ReactElement, ReactNode } from "react";

type SectionType = {
  children: ReactNode;
  className: string;
};

const Section = ({ children, className }: SectionType) => {
  return <section className={className}>{children}</section>;
};

export default Section;

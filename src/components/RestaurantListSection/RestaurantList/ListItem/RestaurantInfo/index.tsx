import { ReactNode } from "react";

const RestaurantInfo = ({ children }: { children: ReactNode }) => {
  return <div className="restaurant__info">{children}</div>;
};

export default RestaurantInfo;

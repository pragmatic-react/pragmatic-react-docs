import { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../GlobalProvider";

export const useGlobalContext = <T>() => {
  const context = useContext(
    GlobalContext as React.Context<GlobalContextType<T> | undefined>
  );

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a RestaurantProvider"
    );
  }
  return context;
};

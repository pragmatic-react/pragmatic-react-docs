import { createContext, PropsWithChildren, useState } from "react";

export interface GlobalContextType<T> {
  data: Record<string, T[]>;
  setData: React.Dispatch<React.SetStateAction<Record<string, T[]>>>;
}

export const GlobalContext = createContext<GlobalContextType<any> | undefined>(
  undefined
);

export const GlobalProvider = <T,>({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Record<string, T[]>>({});

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

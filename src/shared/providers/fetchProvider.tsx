import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { FetchKey, getKeyString } from '@shared/utils';

type FetchContextType = {
  refetchKey: string | null;
  resetKey: string | null;
  triggerRefetch: (key: FetchKey) => void;
  triggerReset: (key: FetchKey) => void;
};

const FetchContext = createContext<FetchContextType | null>(null);

export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [refetchKey, setRefetchKey] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState<string | null>(null);

  const triggerRefetch = useCallback((key: FetchKey) => {
    const baseKey = getKeyString(key);
    setRefetchKey(baseKey);
    setTimeout(() => setRefetchKey(null), 100);
  }, []);

  const triggerReset = useCallback((key: FetchKey) => {
    const baseKey = getKeyString(key);
    setResetKey(baseKey);
    setTimeout(() => setResetKey(null), 100);
  }, []);

  return (
    <FetchContext.Provider
      value={{
        refetchKey,
        resetKey,
        triggerRefetch,
        triggerReset,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error('useFetchContext must be used within a FetchProvider');
  }

  return context;
};

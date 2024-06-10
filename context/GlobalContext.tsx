'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
  query: string;
  setQuery: (query: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [query, setQuery] = useState<string>('');

  return (
    <GlobalContext.Provider value={{ query, setQuery }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextProps {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}

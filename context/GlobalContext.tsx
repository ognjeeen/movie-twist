'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface GlobalContextProps {
  query: string;
  setQuery: (query: string) => void;
  clickedIds: string[];
  setClickedIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  handleSelectMovie: (id: string) => void;
  animeMode: boolean;
  setAnimeMode: (animeMode: boolean) => void;
  toggleAnimeMode: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [query, setQuery] = useState<string>('');
  const [clickedIds, setClickedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [animeMode, setAnimeMode] = useState<boolean>(false);

  const handleSelectMovie = (id: string) => {
    if (clickedIds.includes(id)) {
      toast.error('Movie is already in the list');
    } else {
      setClickedIds((prevClickedIds) => [...prevClickedIds, id]);
      setSelectedId(id);
    }
  };

  function toggleAnimeMode() {
    setAnimeMode(!animeMode);
  }

  return (
    <GlobalContext.Provider
      value={{
        query,
        setQuery,
        clickedIds,
        setClickedIds,
        selectedId,
        setSelectedId,
        handleSelectMovie,
        animeMode,
        setAnimeMode,
        toggleAnimeMode,
      }}
    >
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

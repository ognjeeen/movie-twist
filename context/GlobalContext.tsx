/* 
'clickedMovieIdsList' - state stores the IDs of all movies that the user has clicked. It represents an array of selected movies from which random movies are selected,

'clickedMovieId' - state stores the ID of the movie clicked at the moment. clickedMovieId is added to the 'clickedMovieIdsList' and is also used to display the movie details card when the 'MORE DETAILS' button is clicked,
*/

'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface GlobalContextProps {
  query: string;
  setQuery: (query: string) => void;

  clickedMovieIdsList: string[];
  setClickedMovieIdsList: React.Dispatch<React.SetStateAction<string[]>>;

  clickedMovieId: string | null;
  setClickedMovieId: React.Dispatch<React.SetStateAction<string | null>>;

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
  const [clickedMovieIdsList, setClickedMovieIdsList] = useState<string[]>([]);
  const [clickedMovieId, setClickedMovieId] = useState<string | null>(null);
  const [animeMode, setAnimeMode] = useState<boolean>(false);

  const handleSelectMovie = (id: string) => {
    if (clickedMovieIdsList.includes(id)) {
      toast.error(`${animeMode ? 'Anime' : 'Movie'} is already in the list`);
    } else {
      setClickedMovieIdsList((prevClickedIds) => [...prevClickedIds, id]);
      setClickedMovieId(id);
      setQuery('');
    }
  };

  function toggleAnimeMode() {
    setAnimeMode((prev) => !prev);
    setQuery('');
  }

  return (
    <GlobalContext.Provider
      value={{
        query,
        setQuery,
        clickedMovieIdsList,
        setClickedMovieIdsList,
        clickedMovieId,
        setClickedMovieId,
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

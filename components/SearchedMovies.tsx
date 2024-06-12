'use client';

import { useEffect, useState, useRef } from 'react';
import Spinner from './Spinner';
import Movies from './Movies';
import ErrorMessage from './ErrorMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import SelectedMovies from './SelectedMovies';

const SearchedMovies = () => {
  const controllerRef = useRef<AbortController>();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { query } = useGlobalContext();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    async function fetchMovies() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=8654544c&s=${query}`,
          { signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies!');
        }

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            setError(error.message);
          }
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 2) {
      setMovies([]);
      setError('Start typing to search a movie');
      setLoading(false);
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <div className="relative min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner loading={loading} />
          </div>
        )}
        {!loading && !error && (
          <div className="absolute inset-0">
            <Movies
              movies={movies}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>

      {selectedId && (
        <SelectedMovies selectedId={selectedId} setSelectedId={setSelectedId} />
      )}
    </>
  );
};

export default SearchedMovies;

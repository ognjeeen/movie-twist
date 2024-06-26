'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useRef, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import SearchedMoviesList from './SearchedMoviesList';
import SelectedMovies from './SelectedMovies';
import Spinner from './Spinner';
import axios from 'axios';

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

const SearchedMovies = () => {
  const controllerRef = useRef<AbortController>();
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        const response = await axios.get(`/api/fetchMovies`, {
          params: { query },
          signal,
        });

        const data = response.data;
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else if (error instanceof Error) {
          setError(error.message);
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

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
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
            <SearchedMoviesList movies={movies} />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>

      <SelectedMovies movies={movies} />
    </>
  );
};

export default SearchedMovies;

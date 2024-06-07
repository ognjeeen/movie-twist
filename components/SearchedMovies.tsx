'use client';

import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import Movies from './Movies';
import ErrorMessage from './ErrorMessage';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
};

const SearchedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const query = 'interstellar';

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=8654544c&s=${query}`
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
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && !error && <Movies movies={movies} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default SearchedMovies;

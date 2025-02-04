"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import SearchedMoviesList from "./SearchedMoviesList";
import SelectedMovies from "./SelectedMovies";
import Spinner from "./Spinner";
import axios from "axios";

type MovieObject = {
  tmdbId: string;
  Title: string;
  Poster: string;
};

const SearchedMovies = () => {
  const controllerRef = useRef<AbortController>();
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { query } = useGlobalContext();

  // useEffect for fetching searched movies from query
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/api/fetchMovies`, {
          params: { query },
        });

        const data = response.data;
        if (data.results.length === 0) throw new Error("Movie not found");

        const transformedMovies = data.results
          .map((movie: any) => ({
            tmdbId: movie.id.toString(),
            Title: movie.title,
            Poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "N/A",
          }))
          .slice(0, 8);

        setMovies(transformedMovies);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 2) {
      setMovies([]);
      setError(
        "Search for movies, TV shows, and anime to add to your random picker list",
      );
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
            <SearchedMoviesList movies={movies} setError={setError} />
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

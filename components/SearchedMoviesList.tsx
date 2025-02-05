import React, { useEffect, useState } from "react";
import MovieSkeleton from "./MovieSkeleton";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import MovieCardInfo from "./MovieCardInfo";
import Spinner from "./Spinner";

type SearchedMoviesList = {
  tmdbId: string;
  mediaType: string;
  Title: string;
  Poster: string;
};

type SearchedMoviesListProps = {
  movies: SearchedMoviesList[];
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const SearchedMoviesList = ({ movies, setError }: SearchedMoviesListProps) => {
  const { handleSelectMovie } = useGlobalContext();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [selectedMovieDetailsId, setSelectedMovieDetailsId] = useState<
    string | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetching more movie information when clicked on 'MORE DETAILS'
  useEffect(() => {
    if (!selectedMovieDetailsId) return;

    const selectedMovie = movies.find(
      (movie) => movie.tmdbId === selectedMovieDetailsId,
    );

    if (!selectedMovie) {
      setError("Title not found");
      return;
    }

    async function fetchMoviesInfo() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`/api/fetchMoviesInfo`, {
          params: {
            selectedMovieDetailsId,
            mediaType: selectedMovie?.mediaType,
          },
        });

        const data = response.data;

        if (data.Response === "False") throw new Error("Title not found");

        setMovieInfo(data);
        setIsOpen(true);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else if (error instanceof Error) {
          setError("Information not found");
        } else {
          setError("An unknown error occurred");
        }
      }
    }

    fetchMoviesInfo();
  }, [selectedMovieDetailsId]);

  // Preventing page scrolling when a modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter(
    (movie) => movie.Poster !== "N/A" && movie.Poster !== "Not Found",
  );

  return (
    <div className="mx-auto overflow-hidden">
      <ul className="mt-10 flex flex-row gap-4 overflow-x-auto p-2 px-4 xl:justify-center xl:overflow-hidden">
        {/* Displaying list of searched movies */}
        {filteredMovies.map((movie) => (
          <li
            key={movie.tmdbId}
            className="flex w-36 flex-shrink-0 transform flex-col items-center transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-backgroundLight focus:outline-none xl:hover:scale-105"
          >
            <div
              className={`${
                imageLoaded ? "opacity-100" : "opacity-0"
              } relative transition-opacity duration-500 ease-in-out`}
            >
              <img
                className={`h-52 w-36 object-cover p-1 hover:transition-all ${
                  !imageLoaded && "hidden"
                }`}
                alt={movie.Title}
                src={movie.Poster}
                onLoad={() => setImageLoaded(true)}
                onClick={() => handleSelectMovie(movie.tmdbId)}
              />
              <h3
                className={`line-clamp-2 text-center text-white ${
                  !imageLoaded && "hidden"
                }`}
              >
                {movie.Title}
              </h3>

              {/* Button for more details about movie */}
              <button
                className="group absolute right-4 top-4 rounded-lg bg-background p-1 text-sm font-bold uppercase text-white"
                onClick={() => setSelectedMovieDetailsId(movie.tmdbId)}
              >
                <span className="hidden -translate-y-2 transform p-2 text-xs text-white opacity-0 transition-all duration-300 group-hover:inline-block group-hover:translate-y-0 group-hover:opacity-100">
                  more details
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="block size-6 group-hover:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
            </div>

            {/* If movie image(poster) is still not loaded while searching show loading skeleton */}
            {!imageLoaded && <MovieSkeleton />}
          </li>
        ))}
      </ul>

      {/* While loading searched movies show loading spinner */}
      {loading && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-11/12 rounded-lg bg-backgroundLight pt-10 md:w-3/4 lg:w-2/3 xl:w-2/3 2xl:w-2/5">
            <Spinner loading={loading} />
          </div>
        </div>
      )}

      {/* Conditional rendering for showing movie card information when clicked on 'MORE DETAILS' */}
      {!loading && isOpen && (
        <MovieCardInfo
          movieInfo={movieInfo}
          setSelectedMovieDetailsId={setSelectedMovieDetailsId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default SearchedMoviesList;

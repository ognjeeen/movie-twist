import React, { useEffect, useState } from 'react';
import MovieSkeleton from './MovieSkeleton';
import { useGlobalContext } from '@/context/GlobalContext';
import axios from 'axios';
import MovieCardInfo from './MovieCardInfo';
import Spinner from './Spinner';

type SearchedMoviesList = {
  imdbID: string;
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

    async function fetchMoviesInfo() {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`/api/fetchMoviesInfo`, {
          params: { selectedMovieDetailsId },
        });

        const data = response.data;
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovieInfo(data);
        setIsOpen(true);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchMoviesInfo();
  }, [selectedMovieDetailsId]);

  // Preventing page scrolling when a modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter((movie) => movie.Poster !== 'N/A');

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 gap-2 justify-start md:justify-start 2xl:justify-center">
        {/* Displaying list of searched movies */}
        {filteredMovies.map((movie) => (
          <li
            key={movie.imdbID}
            className="flex-shrink-0 w-36 flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer focus:outline-none active:animate-click"
          >
            <div
              className={`${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500 ease-in-out relative`}
            >
              <img
                className={`w-36 h-52 object-cover p-1 hover:p-2 hover:transition-all ${
                  !imageLoaded && 'hidden'
                }`}
                alt={movie.Title}
                src={movie.Poster}
                onLoad={() => setImageLoaded(true)}
                onClick={() => handleSelectMovie(movie.imdbID)}
              />
              <h3
                className={`text-center line-clamp-2 text-white ${
                  !imageLoaded && 'hidden'
                }`}
              >
                {movie.Title}
              </h3>

              {/* Button for more details about movie */}
              <button
                className="absolute top-4 right-4 bg-background text-sm text-white p-1 rounded-lg uppercase font-bold group"
                onClick={() => setSelectedMovieDetailsId(movie.imdbID)}
              >
                <span className="hidden group-hover:block text-xs text-white p-2 ">
                  more details
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 block group-hover:hidden"
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
        <div className="fixed inset-0 justify-center items-center flex bg-black bg-opacity-40 z-10">
          <div className="w-11/12 2xl:w-2/5 xl:w-2/3 lg:w-2/3 md:w-3/4 pt-10 bg-backgroundLight rounded-lg relative">
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

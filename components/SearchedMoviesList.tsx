import React, { useEffect, useState } from 'react';
import MovieSkeleton from './MovieSkeleton';
import { useGlobalContext } from '@/context/GlobalContext';
import axios from 'axios';
import MovieCardInfo from './MovieCardInfo';

type SearchedMoviesList = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SearchedMoviesListProps = {
  movies: SearchedMoviesList[];
};

const SearchedMoviesList = ({ movies }: SearchedMoviesListProps) => {
  const { handleSelectMovie } = useGlobalContext();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [selectedInfoId, setSelectedInfoId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedInfoId) return;

    async function fetchMoviesInfo() {
      setLoading(true);
      // setError('');

      try {
        const response = await axios.get(`/api/fetchMoviesInfo`, {
          params: { selectedInfoId },
        });

        const data = response.data;
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovieInfo(data);
        setIsOpen(true);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else if (error instanceof Error) {
          // setError(error.message);
        } else {
          // setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesInfo();
  }, [selectedInfoId]);

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter((movie) => movie.Poster !== 'N/A');

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 gap-2 justify-start md:justify-start 2xl:justify-center">
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
                className={`w-36 h-52 object-cover p-2 ${
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
              <button
                className="absolute top-4 right-4 bg-background text-sm text-white p-1 rounded-lg uppercase font-bold group"
                onClick={() => setSelectedInfoId(movie.imdbID)}
              >
                <span className="hidden group-hover:block text-xs text-white">
                  Click for movie details
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
            {!imageLoaded && <MovieSkeleton />}
          </li>
        ))}
      </ul>
      {movieInfo && isOpen && (
        <MovieCardInfo
          movieInfo={movieInfo}
          setSelectedInfoId={setSelectedInfoId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default SearchedMoviesList;

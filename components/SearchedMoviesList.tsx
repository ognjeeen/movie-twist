import React, { useState } from 'react';
import toast from 'react-hot-toast';
import MovieSkeleton from './MovieSkeleton';

type SearchedMoviesList = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SearchedMoviesListProps = {
  movies: SearchedMoviesList[];
  selectedId: string[];
  setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
};

const SearchedMoviesList = ({
  movies,
  selectedId,
  setSelectedId,
}: SearchedMoviesListProps) => {
  const handleSelectMovie = (id: string) => {
    if (selectedId.length >= 8) {
      toast(
        (t) => (
          <div className="flex flex-grow-1 text-sm lg:w-80 lg:text-base">
            <div className="flex justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-customRed font-bold flex justify-center text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span>Maximum movies able to select is 8</span>
            </div>
          </div>
        ),
        {
          style: {
            background: '#343a40',
            color: '#dee2e6',
          },
        }
      );

      return;
    }

    if (selectedId.includes(id)) {
      toast(
        (t) => (
          <div className="flex flex-grow-1 text-sm lg:w-80 lg:text-base">
            <div className="flex justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-customRed font-bold flex justify-center text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span>You cannot add the same movie twice</span>
            </div>
          </div>
        ),
        {
          style: {
            background: '#343a40',
            color: '#dee2e6',
          },
        }
      );

      return;
    } else {
      setSelectedId((prev) => [...prev, id]);
    }
  };

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter((movie) => movie.Poster !== 'N/A');

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 justify-start lg:justify-start xl:justify-center gap-2">
        {filteredMovies.map((movie) => (
          <li
            key={movie.imdbID}
            onClick={() => handleSelectMovie(movie.imdbID)}
            className="flex-shrink-0 w-36 flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer"
          >
            <div
              className={`${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500 ease-in-out`}
            >
              <img
                className={`w-36 h-52 object-cover p-2 ${
                  !imageLoaded && 'hidden'
                }`}
                alt={movie.Title}
                src={movie.Poster}
                onLoad={() => setImageLoaded(true)}
              />
              <h3
                className={`text-center line-clamp-2 text-white ${
                  !imageLoaded && 'hidden'
                }`}
              >
                {movie.Title}
              </h3>
            </div>
            {!imageLoaded && <MovieSkeleton />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedMoviesList;

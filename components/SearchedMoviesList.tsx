import React, { useEffect, useState } from 'react';
import MovieSkeleton from './MovieSkeleton';
import { useGlobalContext } from '@/context/GlobalContext';

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

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter((movie) => movie.Poster !== 'N/A');

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 justify-start lg:justify-start xl:justify-center gap-2">
        {filteredMovies.map((movie) => (
          <li
            key={movie.imdbID}
            className="flex-shrink-0 w-36 flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer focus:outline-none active:animate-click"
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
                onClick={() => handleSelectMovie(movie.imdbID)}
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

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
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchedMoviesList = ({
  movies,
  selectedId,
  setSelectedId,
}: SearchedMoviesListProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [clickedIds, setClickedIds] = useState<string[]>([]);

  const handleSelectMovie = (id: string) => {
    if (id === selectedId) {
      toast.error('Movie is already in the list');
    } else {
      if (!clickedIds.includes(id)) {
        setClickedIds((prevClickedIds) => [...prevClickedIds, id]);
        setSelectedId(id);
      } else {
        toast.error('Movie is already in the list');
      }
    }
  };

  // Movies without a poster are not included in a search list
  const filteredMovies = movies.filter((movie) => movie.Poster !== 'N/A');

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 justify-start lg:justify-start xl:justify-center gap-2">
        {filteredMovies.map((movie) => (
          <li
            key={movie.imdbID}
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

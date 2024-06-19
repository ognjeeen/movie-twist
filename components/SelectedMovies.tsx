'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SelectedMoviesProps = {
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  movies: MovieObject[];
};

const SelectedMovies = ({
  selectedId,
  setSelectedId,
  movies,
}: SelectedMoviesProps) => {
  const [pickedMovie, setPickedMovie] = useState<MovieObject | null>(null);
  const [selectedMovies, setSelectedMovies] = useState<MovieObject[]>([]);
  const [clickedIds, setClickedIds] = useState<string[]>([]);
  const [isRandomMovieAnimationActive, setRandomMovieAnimationActive] =
    useState(false);
  const [isButtonAnimationActive, setIsButtonAnimationActive] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState(200);
  const [isOpen, setIsOpen] = useState(false);
  const { setQuery } = useGlobalContext();
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (selectedId && clickedIds.includes(selectedId)) {
      toast.error('Movie is already in the list');
    } else if (selectedId) {
      const filter = movies.find((movie) => movie.imdbID === selectedId);

      if (filter) {
        const alreadySelected = selectedMovies.some(
          (movie) => movie.imdbID === filter.imdbID
        );

        if (!alreadySelected) {
          setSelectedMovies((prevSelectedMovies) => [
            ...prevSelectedMovies,
            filter,
          ]);
        }

        setClickedIds((prevClickedIds) => [...prevClickedIds, selectedId]);
      }
    }
  }, [selectedId]);

  const handleDeleteAll = () => {
    toast((t) => (
      <div className="text-base lg:text-lg">
        <span>Are you sure you want to remove all movies from list?</span>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => {
              setSelectedMovies([]);
              setSelectedId(null);
              setClickedIds([]);
              setQuery('');
              toast.dismiss(t.id);
            }}
            className="text-green-500 p-2 font-bold hover:text-green-600"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="text-red-500 p-2 font-bold hover:text-red-600"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handlePickRandomMovie = () => {
    setIsButtonAnimationActive(true);
    setRandomMovieAnimationActive(true);

    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * selectedMovies.length);
      setPickedMovie(selectedMovies[randomNumber]);
      setRandomMovieAnimationActive(false);
      setIsOpen(true);

      setNumberOfPieces(200);
      setTimeout(() => {
        setNumberOfPieces(0);
      }, 2000);
    }, 2000);

    setTimeout(() => {
      setIsButtonAnimationActive((prev) => !prev);
    }, 500);
  };

  if (selectedMovies.length === 0) return null;

  return (
    <>
      <div className="bg-backgroundLight w-3/5 mt-10 rounded-lg m-auto mb-10 relative drop-shadow-lg pt-6">
        <ul
          className={`flex flex-wrap justify-center ${
            isRandomMovieAnimationActive ? 'animate-merge' : ''
          }`}
        >
          {selectedMovies.map((movie) => (
            <li key={movie.imdbID} className="p-4">
              <div>
                <img
                  className="w-28 h-44 object-cover"
                  alt={movie.Title}
                  src={movie.Poster}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 justify-center pb-4 m-auto items-center text-sm lg:flex lg:flex-row lg:gap-4 lg:text-base font-Bungee text-textColor mt-10">
          <button
            onClick={handleDeleteAll}
            disabled={isRandomMovieAnimationActive}
            className="p-2 border-none rounded-lg bg-primary hover:bg-buttonHover w-4/5 lg:w-40 disabled:bg-buttonHover"
          >
            Clear All
          </button>
          <button
            onClick={handlePickRandomMovie}
            disabled={isRandomMovieAnimationActive}
            className={`button ${
              isButtonAnimationActive ? 'animate z-10' : ''
            } p-2 border-none rounded-lg bg-primary hover:bg-buttonHover w-4/5 lg:w-40 disabled:bg-buttonHover`}
          >
            Random Movie
          </button>
        </div>
      </div>

      {pickedMovie && isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={numberOfPieces}
          />
          <div className="pt-10 bg-backgroundLight rounded-lg relative max-w-lg w-full mx-4">
            <h1 className="text-primaryLight text-center pb-10 text-5xl font-Bungee">
              Go Watch
            </h1>
            <img
              className="w-48 h-72 object-cover mx-auto"
              alt={pickedMovie.Title}
              src={pickedMovie.Poster}
            />
            <h2 className="text-xl mb-4 text-center mt-2 pb-6">
              {pickedMovie.Title}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9 text-primary hover:text-primaryLight"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedMovies;

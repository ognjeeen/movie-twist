import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useGlobalContext } from '@/context/GlobalContext';

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SelectedMoviesProps = {
  movies: MovieObject[];
};

const SelectedMovies = ({ movies }: SelectedMoviesProps) => {
  const [pickedMovie, setPickedMovie] = useState<MovieObject | null>(null);
  const [selectedMovies, setSelectedMovies] = useState<MovieObject[]>([]);
  const [isRandomMovieAnimationActive, setRandomMovieAnimationActive] =
    useState(false);
  const [isButtonAnimationActive, setIsButtonAnimationActive] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState(200);
  const [isOpen, setIsOpen] = useState(false);
  const { setQuery, selectedId, setSelectedId, setClickedIds, animeMode } =
    useGlobalContext();
  const { width, height } = useWindowSize();
  const buttonColor = animeMode
    ? 'bg-animeBluePrimary hover:bg-animeBlueButtonHover disabled:bg-animeBlueButtonHover'
    : 'bg-primary hover:bg-buttonHover disabled:bg-buttonHover';

  useEffect(() => {
    if (selectedId) {
      const movieFilter = movies.find((movie) => movie.imdbID === selectedId);

      if (movieFilter) {
        const alreadySelected = selectedMovies.some(
          (movie) => movie.imdbID === movieFilter.imdbID
        );

        if (!alreadySelected) {
          setSelectedMovies((prevSelectedMovies) => [
            ...prevSelectedMovies,
            movieFilter,
          ]);
        }
      }
    }
  }, [selectedId, movies, selectedMovies]);

  const handleDeleteAll = () => {
    toast((t) => (
      <div className="text-base lg:text-lg">
        <span>
          Are you sure you want to remove all {animeMode ? 'anime' : 'movies'}{' '}
          from list?
        </span>
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

  const handleDeleteSelectedMovie = (id: string) => {
    setSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.imdbID !== id)
    );

    setClickedIds((prevClickedIds) =>
      prevClickedIds.filter((clickedId) => clickedId !== id)
    );

    setSelectedId(null);
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
                  className="w-28 h-44 object-cover hover:cursor-pointer"
                  alt={movie.Title}
                  src={movie.Poster}
                  onClick={() => handleDeleteSelectedMovie(movie.imdbID)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 justify-center pb-4 m-auto items-center text-sm lg:flex lg:flex-row lg:gap-4 lg:text-base font-Bungee text-textColor mt-10">
          <button
            onClick={handleDeleteAll}
            disabled={isRandomMovieAnimationActive}
            className={`${buttonColor} p-2 border-none rounded-lg w-4/5 lg:w-40 `}
          >
            Clear All
          </button>
          <button
            onClick={handlePickRandomMovie}
            disabled={isRandomMovieAnimationActive}
            className={`
              button ${isButtonAnimationActive ? 'animate z-10' : ''}
              ${animeMode ? 'dark-mode' : ''}
              p-2 border-none rounded-lg w-4/5 lg:w-40 ${buttonColor}`}
          >
            Random {animeMode ? 'Anime' : 'Movie'}
          </button>
        </div>
      </div>

      {pickedMovie && isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={numberOfPieces}
          />
          <div className="pt-10 bg-backgroundLight rounded-lg relative max-w-lg w-full mx-4">
            <h1
              className={`${
                animeMode ? 'text-animeBlueLight' : 'text-primaryLight'
              } text-center pb-10 text-5xl font-Bungee`}
            >
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
                className={`size-9 ${
                  animeMode
                    ? 'text-animeBluePrimary hover:text-animeBlueButtonHover'
                    : 'text-primary hover:text-primaryLight'
                }`}
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

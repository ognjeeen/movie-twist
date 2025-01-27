import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useGlobalContext } from '@/context/GlobalContext';
import clsx from 'clsx';

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SelectedMoviesProps = {
  movies: MovieObject[];
};

const SelectedMovies = ({ movies }: SelectedMoviesProps) => {
  const [randomPickedMovie, setRandomPickedMovie] =
    useState<MovieObject | null>(null);
  const [userSelectedMoviesList, setUserSelectedMoviesList] = useState<
    MovieObject[]
  >([]);
  const [isRandomMovieAnimationActive, setRandomMovieAnimationActive] =
    useState(false);
  const [isButtonAnimationActive, setIsButtonAnimationActive] = useState(false);
  const [numberOfConfettiPieces, setNumberOfConfettiPieces] = useState(200);
  const [isOpen, setIsOpen] = useState(false);
  const {
    setQuery,
    clickedMovieId,
    setClickedMovieId,
    setClickedMovieIdsList,
    animeMode,
  } = useGlobalContext();
  const { width, height } = useWindowSize();
  const buttonColor = animeMode
    ? 'bg-animeBluePrimary hover:bg-animeBlueButtonHover disabled:bg-animeBlueButtonHover transition-colors'
    : 'bg-primary hover:bg-buttonHover disabled:bg-buttonHover transition-colors';

  // useEffect checks if the 'clickedMovieId' is valid. If it is, it iterates through movies list to find a movie with the same ID as 'clickedMovieId'. If a match is found, the movie is added to the `userSelectedMoviesList`
  useEffect(() => {
    if (clickedMovieId) {
      const isMovieFound = movies.find(
        (movie) => movie.imdbID === clickedMovieId
      );

      if (isMovieFound) {
        const alreadySelected = userSelectedMoviesList.some(
          (movie) => movie.imdbID === isMovieFound.imdbID
        );

        if (!alreadySelected) {
          setUserSelectedMoviesList((prevSelectedMovies) => [
            ...prevSelectedMovies,
            isMovieFound,
          ]);
        }
      }
    }
  }, [clickedMovieId, movies, userSelectedMoviesList]);

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
              setUserSelectedMoviesList([]);
              setClickedMovieId(null);
              setClickedMovieIdsList([]);
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
    setUserSelectedMoviesList((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.imdbID !== id)
    );

    setClickedMovieIdsList((prevClickedIds) =>
      prevClickedIds.filter((clickedId) => clickedId !== id)
    );

    setClickedMovieId(null);
  };

  const handlePickRandomMovie = () => {
    setIsButtonAnimationActive(true);
    setRandomMovieAnimationActive(true);

    setTimeout(() => {
      const randomNumber = Math.floor(
        Math.random() * userSelectedMoviesList.length
      );
      setRandomPickedMovie(userSelectedMoviesList[randomNumber]);
      setRandomMovieAnimationActive(false);
      setIsOpen(true);

      setNumberOfConfettiPieces(200);
      setTimeout(() => {
        setNumberOfConfettiPieces(0);
      }, 2000);
    }, 2000);

    setTimeout(() => {
      setIsButtonAnimationActive((prev) => !prev);
    }, 500);
  };

  if (userSelectedMoviesList.length === 0) return null;

  return (
    <>
      <div className="bg-backgroundLight xl:w-[1150px] w-4/6 mt-10 rounded-lg m-auto mb-10 relative drop-shadow-lg pt-6 ">
        {/* Displaying list of selected (added) movies by user */}
        <ul
          className={`flex flex-wrap justify-center ${
            isRandomMovieAnimationActive ? 'animate-merge' : ''
          }`}
        >
          {userSelectedMoviesList.map((movie) => (
            <li key={movie.imdbID} className="p-4">
              <div>
                <img
                  className={`w-28 h-44 object-cover ${
                    !isRandomMovieAnimationActive
                      ? 'hover:cursor-pointer'
                      : 'hover:cursor-not-allowed'
                  }`}
                  title="Click to remove"
                  alt={movie.Title}
                  src={movie.Poster}
                  onClick={() => {
                    !isRandomMovieAnimationActive &&
                      handleDeleteSelectedMovie(movie.imdbID);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Clear All and Random Movie buttons */}
        <div className="flex flex-col gap-2 justify-center pb-4 m-auto items-center text-sm lg:flex lg:flex-row lg:gap-4 lg:text-base font-Bungee text-textColor mt-10">
          <button
            onClick={handleDeleteAll}
            disabled={isRandomMovieAnimationActive}
            className={`${buttonColor} p-2 border-none rounded-lg w-4/5 lg:w-40`}
          >
            Clear All
          </button>
          <button
            onClick={handlePickRandomMovie}
            disabled={isRandomMovieAnimationActive}
            className={clsx(
              buttonColor,
              {
                'animate z-10 button': isButtonAnimationActive,
                'dark-mode': animeMode,
              },
              'p-2 border-none rounded-lg w-4/5 lg:w-40'
            )}
          >
            Random {animeMode ? 'Anime' : 'Movie'}
          </button>
        </div>
      </div>

      {/* Card for displaying what application picked as a random movie */}
      {randomPickedMovie && isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={numberOfConfettiPieces}
          />
          <div className="pt-10 bg-backgroundLight rounded-lg relative max-w-lg w-full mx-4">
            <h1
              className={`${
                animeMode ? 'text-animeBlueLight' : 'text-primaryLight'
              } text-center pb-10 text-5xl font-Bungee`}
            >
              go watch
            </h1>
            <img
              className="w-48 h-72 object-cover mx-auto"
              alt={randomPickedMovie.Title}
              src={randomPickedMovie.Poster}
            />
            <h2 className="text-xl mb-4 text-center mt-2 font-Bungee pb-4">
              {randomPickedMovie.Title}
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
                    ? 'text-animeBluePrimary hover:text-animeBlueLight transition-colors'
                    : 'text-primary hover:text-primaryLight transition-colors'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="justify-center flex pb-4">
              <button
                onClick={() => {
                  setRandomPickedMovie(null);
                  setIsOpen((prev) => !prev);
                  handlePickRandomMovie();
                }}
                className={`${buttonColor} p-2 border-none rounded-lg w-4/5 lg:w-40 font-Bungee`}
              >
                Pick again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedMovies;

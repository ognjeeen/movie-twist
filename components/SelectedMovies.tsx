import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import useWindowSize from "react-use/lib/useWindowSize";
import { useGlobalContext } from "@/context/GlobalContext";
import clsx from "clsx";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

type MovieObject = {
  tmdbId: string;
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
    ? "bg-animeBluePrimary hover:bg-animeBlueButtonHover disabled:bg-animeBlueButtonHover transition-colors"
    : "bg-primary hover:bg-buttonHover disabled:bg-buttonHover transition-colors";

  // useEffect checks if the 'clickedMovieId' is valid. If it is, it iterates through movies list to find a movie with the same ID as 'clickedMovieId'. If a match is found, the movie is added to the `userSelectedMoviesList`
  useEffect(() => {
    if (clickedMovieId) {
      const isMovieFound = movies.find(
        (movie) => movie.tmdbId === clickedMovieId,
      );

      if (isMovieFound) {
        const alreadySelected = userSelectedMoviesList.some(
          (movie) => movie.tmdbId === isMovieFound.tmdbId,
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
          Are you sure you want to remove all {animeMode ? "anime" : "movies"}{" "}
          from list?
        </span>
        <div className="mt-2 flex gap-4">
          <button
            onClick={() => {
              setUserSelectedMoviesList([]);
              setClickedMovieId(null);
              setClickedMovieIdsList([]);
              setQuery("");
              toast.dismiss(t.id);
            }}
            className="p-2 font-bold text-green-500 hover:text-green-600"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="p-2 font-bold text-red-500 hover:text-red-600"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handleDeleteSelectedMovie = (id: string) => {
    setUserSelectedMoviesList((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.tmdbId !== id),
    );

    setClickedMovieIdsList((prevClickedIds) =>
      prevClickedIds.filter((clickedId) => clickedId !== id),
    );

    setClickedMovieId(null);
  };

  const handlePickRandomMovie = () => {
    setIsButtonAnimationActive(true);
    setRandomMovieAnimationActive(true);

    setTimeout(() => {
      const randomNumber = Math.floor(
        Math.random() * userSelectedMoviesList.length,
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
      <div className="relative m-auto mb-10 mt-10 w-4/6 rounded-lg bg-backgroundLight pt-6 drop-shadow-lg xl:w-[1150px]">
        {/* Displaying list of selected (added) movies by user */}
        <ul
          className={`flex flex-wrap justify-center ${
            isRandomMovieAnimationActive ? "animate-merge" : ""
          }`}
        >
          {userSelectedMoviesList.map((movie) => (
            <li key={movie.tmdbId} className="p-4">
              <div className="group relative h-48 w-32">
                {/* Slika filma */}
                <img
                  className={`h-full w-full object-cover`}
                  title="Click to remove"
                  alt={movie.Title}
                  src={movie.Poster}
                />

                {/* Dodatne informacije koje se pojavljuju na hover */}
                <div
                  onClick={() => {
                    !isRandomMovieAnimationActive &&
                      handleDeleteSelectedMovie(movie.tmdbId);
                  }}
                  className={`${
                    !isRandomMovieAnimationActive
                      ? "hover:cursor-pointer"
                      : "hover:cursor-not-allowed"
                  } absolute inset-0 mx-auto flex flex-col items-center justify-center bg-black bg-opacity-70 p-1 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                >
                  <h2 className={`${bungeeFont.className} font-bold`}>
                    {movie.Title}
                  </h2>
                  <p className="mt-1 text-sm">Click to remove</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Clear All and Random Movie buttons */}
        <div
          className={`${bungeeFont.className} m-auto mt-10 flex flex-col items-center justify-center gap-2 pb-4 text-sm text-textColor lg:flex lg:flex-row lg:gap-4 lg:text-base`}
        >
          <button
            onClick={handleDeleteAll}
            disabled={isRandomMovieAnimationActive}
            className={`${buttonColor} w-4/5 rounded-lg border-none p-2 transition-transform duration-300 ease-in-out lg:w-40 hover:lg:-translate-y-1`}
          >
            Clear All
          </button>
          <button
            onClick={handlePickRandomMovie}
            disabled={isRandomMovieAnimationActive}
            className={clsx(
              buttonColor,
              {
                "animate button z-10": isButtonAnimationActive,
                "dark-mode": animeMode,
              },
              "w-4/5 rounded-lg border-none p-2 transition-transform duration-300 ease-in-out lg:w-40 hover:lg:-translate-y-1",
            )}
          >
            Random {animeMode ? "Anime" : "Movie"}
          </button>
        </div>
      </div>

      {/* Card for displaying what application picked as a random movie */}
      {randomPickedMovie && isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={numberOfConfettiPieces}
          />
          <div className="relative mx-4 w-full max-w-lg rounded-lg bg-backgroundLight pt-10">
            <h1
              className={`${bungeeFont.className} ${
                animeMode ? "text-animeBlueLight" : "text-primaryLight"
              } pb-10 text-center text-5xl`}
            >
              go watch
            </h1>
            <img
              className="mx-auto h-72 w-48 object-cover"
              alt={randomPickedMovie.Title}
              src={randomPickedMovie.Poster}
            />
            <h2
              className={`${bungeeFont.className} mb-4 mt-2 pb-4 text-center text-xl`}
            >
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
                className={`size-9 transition-transform duration-300 ease-in-out hover:lg:scale-110 ${
                  animeMode
                    ? "text-animeBluePrimary transition-colors hover:text-animeBlueLight"
                    : "text-primary transition-colors hover:text-primaryLight"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex justify-center pb-4">
              <button
                onClick={() => {
                  setRandomPickedMovie(null);
                  setIsOpen((prev) => !prev);
                  handlePickRandomMovie();
                }}
                className={`${bungeeFont.className} ${buttonColor} w-4/5 rounded-lg border-none p-2 transition-transform duration-300 ease-in-out lg:w-40 hover:lg:-translate-y-1`}
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

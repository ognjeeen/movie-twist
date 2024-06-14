'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGlobalContext } from '@/context/GlobalContext';

type SelectedMoviesProps = {
  selectedId: string[];
  setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
};

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

const SelectedMovies = ({ selectedId, setSelectedId }: SelectedMoviesProps) => {
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [pickedMovie, setPickedMovie] = useState<MovieObject | null>(null);
  const [isRandomMovieAnimationActive, setRandomMovieAnimationActive] =
    useState(false);
  const [isButtonAnimationActive, setIsButtonAnimationActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { setQuery } = useGlobalContext();

  useEffect(() => {
    async function fetchMovies() {
      if (selectedId.length === 0) return;

      try {
        const fetchedMovies = await Promise.all(
          selectedId.map(async (id) => {
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=8654544c&i=${id}`
            );
            const data = await res.json();
            return data;
          })
        );

        const filteredMovies = fetchedMovies.filter(
          (movie) => movie.Poster && movie.Poster !== 'N/A'
        );

        setMovies(filteredMovies);
      } catch (error) {
        console.log('Error fetching movie data:', error);
      }
    }

    fetchMovies();
  }, [selectedId]);

  const handleDeleteAll = () => {
    toast(
      (t) => (
        <div className="text-base lg:text-lg">
          <span>Are you sure you want to remove all movies from list?</span>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => {
                setMovies([]);
                setSelectedId([]);
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
      ),
      {
        style: {
          background: '#343a40',
          color: '#dee2e6',
        },
      }
    );
  };

  const handlePickRandomMovie = () => {
    setIsButtonAnimationActive(true);
    setRandomMovieAnimationActive(true);

    // Animation duration for and while choosing random movie
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * movies.length);
      setPickedMovie(movies[randomNumber]);
      setRandomMovieAnimationActive(false);
      setIsOpen(true);
    }, 2000);

    // Button click effect duration
    setTimeout(() => {
      setIsButtonAnimationActive((prev) => !prev);
    }, 500);
  };

  if (movies.length === 0) return null;

  return (
    <>
      <div className="bg-backgroundLight w-3/5 mt-10 rounded-lg m-auto mb-10 relative">
        <ul
          className={`flex flex-wrap justify-center ${
            isRandomMovieAnimationActive ? 'animate-merge' : ''
          }`}
        >
          {movies.map((movie) => (
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

        {/* Clear All & Random Movie buttons */}
        <div className="flex flex-col gap-2 justify-center pb-4 m-auto items-center text-sm lg:flex lg:flex-row lg:gap-4 lg:text-base">
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

      {/* Picked random movie section */}
      {pickedMovie && isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="pt-10 bg-backgroundLight rounded-lg relative max-w-lg w-full mx-4">
            <img
              className="w-48 h-72 object-cover mx-auto"
              alt={pickedMovie.Title}
              src={pickedMovie.Poster}
            />
            <h2 className="text-xl mb-4 text-center mt-2 pb-2">
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
                className="size-8 text-primary "
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

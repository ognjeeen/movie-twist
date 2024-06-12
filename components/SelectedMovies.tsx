'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

  if (movies.length === 0) return null;

  return (
    <div className="bg-backgroundLight w-3/5 mt-10 rounded-lg m-auto mb-10">
      <ul className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <li key={movie?.imdbID} className="p-4">
            <div>
              <img
                className="w-28 h-44 object-cover"
                alt={movie?.Title}
                src={movie?.Poster}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 justify-center pb-2">
        <button
          onClick={handleDeleteAll}
          className="p-2 border-none rounded-lg bg-primary w-40"
        >
          Clear all
        </button>
        <button className="p-2 border-none rounded-lg bg-primary w-40">
          Random movie
        </button>
      </div>
    </div>
  );
};

export default SelectedMovies;

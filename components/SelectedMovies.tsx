'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

type SelectedMoviesProps = {
  selectedId: string[];
};

type MovieObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

const SelectedMovies = ({ selectedId }: SelectedMoviesProps) => {
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

  if (movies.length === 0) return null;

  return (
    <div className="bg-backgroundLight w-3/5 mt-10 rounded-lg m-auto">
      <ul className="flex flex-wrap justify-center p-2">
        {movies.map((movie) => (
          <li key={movie?.imdbID} className="p-4">
            <div>
              <Image
                alt={movie?.Title}
                src={movie?.Poster}
                width={100}
                height={150}
                priority={true}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedMovies;

import Image from 'next/image';
import { Bounce, toast } from 'react-toastify';

type MoviesObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type MoviesProps = {
  movies: MoviesObject[];
  selectedId: string[];
  setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
};

const Movies = ({ movies, selectedId, setSelectedId }: MoviesProps) => {
  const handleSelectMovie = (id: string) => {
    if (selectedId.includes(id)) {
      toast.error('You cannot add the same movie twice', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } else {
      setSelectedId((prev) => [...prev, id]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap md:justify-center m-auto mt-10 pl-4 lg:pl-0">
        {movies
          .slice(0, 8)
          .filter((movie) => movie.Poster !== 'N/A')
          .map((movie) => (
            <li
              onClick={() => handleSelectMovie(movie.imdbID)}
              key={movie.imdbID}
              className="flex-shrink-0 w-36 flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer"
            >
              <Image
                className="w-full p-4"
                alt={movie.Title}
                src={movie.Poster}
                width={100}
                height={150}
                priority={true}
              />
              <h3 className="text-center text-white">{movie.Title}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;

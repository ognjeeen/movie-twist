import Image from 'next/image';

type MoviesObject = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type MoviesProps = {
  movies: MoviesObject[];
};

const Movies = ({ movies }: MoviesProps) => {
  return (
    <ul className="grid grid-cols-3 xl:w-3/5 md:grid md:grid-cols-8 gap-4 justify-center m-auto mt-10">
      {movies
        .slice(0, 8)
        .filter((movie) => movie.Poster !== 'N/A')
        .map((movie) => (
          <li
            key={movie.imdbID}
            className="w-full flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer"
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
  );
};

export default Movies;

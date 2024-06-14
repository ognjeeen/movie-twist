import toast from 'react-hot-toast';

type SearchedMoviesList = {
  imdbID: string;
  Title: string;
  Poster: string;
};

type SearchedMoviesListProps = {
  movies: SearchedMoviesList[];
  selectedId: string[];
  setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
};

const SearchedMoviesList = ({
  movies,
  selectedId,
  setSelectedId,
}: SearchedMoviesListProps) => {
  const handleSelectMovie = (id: string) => {
    if (selectedId.includes(id)) {
      toast(
        (t) => (
          <div className="flex flex-grow-1 text-sm lg:w-80 lg:text-base">
            <div className="flex justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-customRed font-bold flex justify-center text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <span>You cannot add the same movie twice</span>
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
    } else {
      setSelectedId((prev) => [...prev, id]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <ul className="flex flex-nowrap m-auto mt-10 pl-4 lg:pl-0 justify-start lg:justify-start xl:justify-center">
        {movies
          .slice(0, 8)
          .filter((movie) => movie.Poster !== 'N/A')
          .map((movie) => (
            <li
              onClick={() => handleSelectMovie(movie.imdbID)}
              key={movie.imdbID}
              className="flex-shrink-0 w-36 flex flex-col items-center hover:bg-backgroundLight hover:cursor-pointer"
            >
              <img
                className="w-36 h-52 object-cover p-4"
                alt={movie.Title}
                src={movie.Poster}
              />
              <h3 className="text-center text-white line-clamp-2">
                {movie.Title}
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchedMoviesList;

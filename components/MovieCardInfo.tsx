import { useGlobalContext } from '@/context/GlobalContext';
import IMDbLogo from '@/public/IMDbLogo.png';
import MetacriticLogo from '@/public/MetacriticLogo.png';
import RottenTomatoesLogo from '@/public/RottenTomatoesLogo.png';
import Image, { StaticImageData } from 'next/image';

type Rating = {
  Source: string;
  Value: string;
};

type MovieInformation = {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: Rating[];
  BoxOffice: string;
};

type MovieCardInfo = {
  movieInfo: MovieInformation | null;
  setSelectedMovieDetailsId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MovieCardInfo = ({
  movieInfo,
  setSelectedMovieDetailsId,
  setIsOpen,
}: MovieCardInfo) => {
  const sourceToLogo: { [key: string]: StaticImageData } = {
    'Internet Movie Database': IMDbLogo,
    'Rotten Tomatoes': RottenTomatoesLogo,
    Metacritic: MetacriticLogo,
  };

  const { animeMode } = useGlobalContext();

  //Extracting the first two genres from the array of movie genres
  const movieGenre = movieInfo?.Genre.split(',').slice(0, 2);

  const handleCloseMovieInfo = () => {
    setSelectedMovieDetailsId(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 justify-center items-center flex bg-black bg-opacity-40 z-10">
      <div
        className={`${
          animeMode ? 'border-animeBluePrimary/50' : 'border-primary/50'
        } w-11/12 2xl:w-2/5 xl:w-2/3 lg:w-2/3 md:w-3/4 pt-10 bg-backgroundLight rounded-lg relative border`}
      >
        {/* Title, released date, runtime */}
        <div className="md:pb-2 pb-2">
          <h1
            className={`${
              animeMode ? 'text-animeBluePrimary' : 'text-primaryLight'
            } text-center m-auto md:text-5xl text-3xl font-Bungee truncate w-3/4`}
          >
            {movieInfo?.Title}
          </h1>
          <div className="text-center justify-center flex gap-4 text-sm md:text-lg">
            <span>{movieInfo?.Released}</span>
            <span>&#x2022;</span>
            <span>{movieInfo?.Runtime}</span>
          </div>
        </div>

        {/* Movie information section */}
        <div className="md:flex md:flex-row px-4">
          {/* Movie image, genre */}
          <div className="m-auto flex flex-col md:w-1/3 justify-center items-center">
            <img
              className="w-40 h-60 object-cover rounded-md hidden md:flex"
              alt={movieInfo?.Title}
              src={movieInfo?.Poster}
            />
            <div className="flex flex-row mt-2 mb-2 gap-2">
              {movieGenre?.map((genre, i) => (
                <span key={i} className="bg-background rounded-2xl text-sm p-2">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Actors, directors, boxOffice */}
          <div className="flex flex-col md:w-3/4">
            <div className="bg-background rounded-xl p-2">
              <div>
                <p className="text-lg font-bold">Actors</p>
                <span
                  className={`${
                    animeMode ? 'text-animeBluePrimary' : 'text-primaryLight'
                  } font-Bungee text-sm sm:text-base`}
                >
                  {movieInfo?.Actors}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Director</p>
                <span
                  className={`${
                    animeMode ? 'text-animeBluePrimary' : 'text-primaryLight'
                  } font-Bungee text-sm sm:text-base`}
                >
                  {movieInfo?.Director}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">BoxOffice</p>
                <span
                  className={`${
                    animeMode ? 'text-animeBluePrimary' : 'text-primaryLight'
                  } font-Bungee text-sm sm:text-base`}
                >
                  {!movieInfo?.BoxOffice ? 'N/A' : movieInfo?.BoxOffice}
                </span>
              </div>
            </div>

            {/* Rating logos */}
            <div className="p-2 bg-background mt-2 rounded-lg ">
              <div className="flex gap-10 text-center justify-center">
                {movieInfo?.Ratings.length === 0 ? (
                  <p className="font-Bungee">no ratings found</p>
                ) : (
                  movieInfo?.Ratings.map((rating, i) => (
                    <div key={i} className="justify-center flex flex-col ">
                      {sourceToLogo[rating.Source] ? (
                        <Image
                          src={sourceToLogo[rating.Source]}
                          alt={rating.Source}
                          className="w-7 h-auto mx-auto mb-1 md:w-10"
                        />
                      ) : (
                        <p className="text-lg font-bold">{rating.Source}</p>
                      )}
                      <p
                        className={`${
                          animeMode
                            ? 'text-animeBluePrimary'
                            : 'text-primaryLight'
                        } font-Bungee `}
                      >
                        {rating.Value}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Movie plot */}
        <div className="px-4 py-2">
          <div className="lg:overflow-hidden md:h-auto md:overflow-hidden md:text-base text-sm overflow-scroll h-20 p-3 text-justify bg-background rounded-xl">
            <span>{movieInfo?.Plot}</span>
          </div>
        </div>

        {/* Close movie details section button */}
        <button
          onClick={handleCloseMovieInfo}
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
      </div>
    </div>
  );
};

export default MovieCardInfo;

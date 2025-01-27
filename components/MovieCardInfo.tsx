import { useGlobalContext } from "@/context/GlobalContext";
import IMDbLogo from "@/public/IMDbLogo.png";
import MetacriticLogo from "@/public/MetacriticLogo.png";
import RottenTomatoesLogo from "@/public/RottenTomatoesLogo.png";
import Image, { StaticImageData } from "next/image";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

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
    "Internet Movie Database": IMDbLogo,
    "Rotten Tomatoes": RottenTomatoesLogo,
    Metacritic: MetacriticLogo,
  };

  const { animeMode } = useGlobalContext();

  //Extracting the first two genres from the array of movie genres
  const movieGenre = movieInfo?.Genre.split(",").slice(0, 2);

  const handleCloseMovieInfo = () => {
    setSelectedMovieDetailsId(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div
        className={`${
          animeMode ? "border-animeBluePrimary/25" : "border-primary/25"
        } relative rounded-lg border bg-backgroundLight pt-10 xl:max-w-[800px]`}
      >
        {/* Title, released date, runtime */}
        <div className="pb-2 md:pb-2">
          <h1
            className={`${bungeeFont.className} ${
              animeMode ? "text-animeBluePrimary" : "text-primaryLight"
            } m-auto w-3/4 truncate text-center text-3xl md:text-5xl`}
          >
            {movieInfo?.Title}
          </h1>
          <div className="flex justify-center gap-4 text-center text-sm md:text-lg">
            <span>{movieInfo?.Released}</span>
            <span>&#x2022;</span>
            <span>{movieInfo?.Runtime}</span>
          </div>
        </div>

        {/* Movie information section */}
        <div className="px-4 md:flex md:flex-row">
          {/* Movie image, genre */}
          <div className="m-auto flex flex-col items-center justify-center md:w-1/3">
            <img
              className="hidden h-60 w-40 rounded-md object-cover md:flex"
              alt={movieInfo?.Title}
              src={movieInfo?.Poster}
            />
            <div className="mb-2 mt-2 flex flex-row gap-2">
              {movieGenre?.map((genre, i) => (
                <span key={i} className="rounded-2xl bg-background p-2 text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Actors, directors, boxOffice */}
          <div className="flex flex-col md:w-3/4">
            <div className="rounded-xl bg-background p-2">
              <div>
                <p className="text-lg font-bold">Actors</p>
                <span
                  className={`${bungeeFont.className} ${
                    animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                  } text-sm sm:text-base`}
                >
                  {movieInfo?.Actors}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Director</p>
                <span
                  className={`${bungeeFont.className} ${
                    animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                  } text-sm sm:text-base`}
                >
                  {movieInfo?.Director}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">BoxOffice</p>
                <span
                  className={`${bungeeFont.className} ${
                    animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                  } text-sm sm:text-base`}
                >
                  {!movieInfo?.BoxOffice ? "N/A" : movieInfo?.BoxOffice}
                </span>
              </div>
            </div>

            {/* Rating logos */}
            <div className="mt-2 rounded-lg bg-background p-2">
              <div className="flex justify-center gap-10 text-center">
                {movieInfo?.Ratings.length === 0 ? (
                  <p className={`${bungeeFont.className}`}>no ratings found</p>
                ) : (
                  movieInfo?.Ratings.map((rating, i) => (
                    <div key={i} className="flex flex-col justify-center">
                      {sourceToLogo[rating.Source] ? (
                        <Image
                          src={sourceToLogo[rating.Source]}
                          alt={rating.Source}
                          className="mx-auto mb-1 h-auto w-7 md:w-10"
                        />
                      ) : (
                        <p className="text-lg font-bold">{rating.Source}</p>
                      )}
                      <p
                        className={`${bungeeFont.className} ${
                          animeMode
                            ? "text-animeBluePrimary"
                            : "text-primaryLight"
                        }`}
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
          <div className="h-20 overflow-scroll rounded-xl bg-background p-3 text-justify text-sm md:h-auto md:overflow-hidden md:text-base lg:overflow-hidden">
            <span>{movieInfo?.Plot}</span>
          </div>
        </div>

        {/* Close movie details section button */}
        <button
          onClick={handleCloseMovieInfo}
          className="absolute right-0 top-0 p-2 transition duration-300 ease-in-out hover:lg:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-9 ${
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
      </div>
    </div>
  );
};

export default MovieCardInfo;

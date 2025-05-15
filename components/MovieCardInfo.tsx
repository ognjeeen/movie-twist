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
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm ${animeMode ? "dark-mode" : ""}`}
    >
      <div
        className={`${
          animeMode ? "border-animeBluePrimary/25" : "border-primary/25"
        } relative m-4 max-h-[90vh] w-full overflow-hidden rounded-xl border bg-backgroundLight shadow-2xl transition-all sm:w-[90%] md:w-[85%] lg:w-[80%] xl:max-w-[900px]`}
      >
        {/* Movie backdrop overlay with poster image */}
        <div className="relative">
          {" "}
          {/* Poster as background with gradient overlay */}
          <div className="absolute inset-0 h-[200px] w-full overflow-hidden opacity-20 md:h-[250px]">
            {movieInfo?.Poster && movieInfo.Poster !== "N/A" && (
              <img
                src={movieInfo.Poster}
                alt="backdrop"
                className="h-full w-full object-cover blur-sm"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-backgroundLight/90 to-backgroundLight"></div>
          </div>
          {/* Title, year, runtime section */}
          <div className="relative z-[1] px-4 pt-12 text-center md:pt-16">
            <h1
              className={`${bungeeFont.className} ${
                animeMode ? "text-animeBluePrimary" : "text-primaryLight"
              } m-auto line-clamp-2 w-full px-8 text-3xl md:w-3/4 md:text-5xl`}
            >
              {movieInfo?.Title}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-3 pb-3 text-center text-sm md:text-lg">
              <span className="font-medium">{movieInfo?.Released}</span>
              <span className="hidden md:inline">&#x2022;</span>
              <span className="font-medium">{movieInfo?.Runtime}</span>
              <span className="hidden md:inline">&#x2022;</span>
              <span className="font-medium">{movieInfo?.Year}</span>
            </div>
          </div>
          {/* Genre tags floating over the top part */}
          <div className="relative z-[1] mt-1 flex flex-wrap justify-center gap-2 px-4">
            {movieGenre?.map((genre, i) => (
              <span
                key={i}
                className={`rounded-full px-3 py-1 text-xs font-medium md:text-sm ${
                  animeMode
                    ? "bg-animeBluePrimary/20 text-animeBluePrimary"
                    : "bg-primary/20 text-primaryLight"
                }`}
              >
                {genre === "N/A" ? "Genre Unknown" : genre.trim()}
              </span>
            ))}
          </div>
        </div>
        {/* Content container with scrollable area */}
        <div className="custom-scrollbar mt-4 max-h-[calc(90vh-250px)] overflow-y-auto p-4 md:mt-8 md:max-h-[calc(90vh-300px)] md:p-6">
          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {" "}
            {/* Left column - Poster */}
            <div className="flex justify-center md:col-span-1">
              <div className="relative h-[300px] w-[180px] overflow-hidden rounded-lg md:h-[350px] md:w-[220px]">
                {movieInfo?.Poster && movieInfo.Poster !== "N/A" ? (
                  <img
                    src={movieInfo.Poster}
                    alt={movieInfo?.Title}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-lg bg-background ${
                      animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                    }`}
                  >
                    <span className={`${bungeeFont.className} text-center`}>
                      No Poster Available
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Right column - Movie details */}
            <div className="md:col-span-2">
              {" "}
              {/* Plot section */}
              <div className="mb-6">
                <h2
                  className={`${bungeeFont.className} mb-2 text-xl ${
                    animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                  }`}
                >
                  Synopsis
                </h2>{" "}
                <div className="custom-scrollbar h-[100px] overflow-y-auto rounded-xl bg-background/80 p-4 shadow-inner md:h-[120px]">
                  {movieInfo?.Plot === "N/A" ? (
                    <p
                      className={`${bungeeFont.className} flex h-full items-center justify-center text-center opacity-70`}
                    >
                      No synopsis available
                    </p>
                  ) : (
                    <p className="text-justify text-sm leading-relaxed md:text-base">
                      {movieInfo?.Plot}
                    </p>
                  )}
                </div>
              </div>
              {/* Cast & Crew section */}
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h2
                    className={`${bungeeFont.className} mb-2 text-xl ${
                      animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                    }`}
                  >
                    Cast
                  </h2>{" "}
                  <div className="custom-scrollbar h-[80px] overflow-y-auto rounded-xl bg-background/80 p-4 shadow-inner">
                    {movieInfo?.Actors === "N/A" ? (
                      <p className="flex h-full items-center justify-center text-center text-sm opacity-70">
                        No cast information available
                      </p>
                    ) : (
                      <p className="text-sm md:text-base">
                        {movieInfo?.Actors}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h2
                    className={`${bungeeFont.className} mb-2 text-xl ${
                      animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                    }`}
                  >
                    Director
                  </h2>{" "}
                  <div className="custom-scrollbar h-[80px] overflow-y-auto rounded-xl bg-background/80 p-4 shadow-inner">
                    {movieInfo?.Director === "N/A" ? (
                      <p className="flex h-full items-center justify-center text-center text-sm opacity-70">
                        No director information available
                      </p>
                    ) : (
                      <p className="text-sm md:text-base">
                        {movieInfo?.Director}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Box Office & Ratings in a row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Box Office */}
                <div>
                  <h2
                    className={`${bungeeFont.className} mb-2 text-xl ${
                      animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                    }`}
                  >
                    Box Office
                  </h2>
                  <div className="flex h-[80px] items-center justify-center rounded-xl bg-background/80 p-4 shadow-inner">
                    <p
                      className={`${bungeeFont.className} text-center text-lg ${
                        animeMode
                          ? "text-animeBluePrimary"
                          : "text-primaryLight"
                      }`}
                    >
                      {movieInfo?.BoxOffice === "N/A"
                        ? "Not Available"
                        : movieInfo?.BoxOffice}
                    </p>
                  </div>
                </div>{" "}
                {/* Ratings section */}
                <div>
                  <h2
                    className={`${bungeeFont.className} mb-2 text-xl ${
                      animeMode ? "text-animeBluePrimary" : "text-primaryLight"
                    }`}
                  >
                    Ratings
                  </h2>
                  <div className="flex h-[80px] items-center justify-center overflow-hidden rounded-xl bg-background/80 p-4 shadow-inner">
                    {movieInfo?.Ratings.length === 0 ? (
                      <p className="text-center opacity-70">
                        No ratings available
                      </p>
                    ) : (
                      <div className="custom-scrollbar flex w-full flex-wrap items-center justify-around gap-2 overflow-y-auto px-1 md:gap-4">
                        {movieInfo?.Ratings.map((rating, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center py-1"
                          >
                            {sourceToLogo[rating.Source] ? (
                              <Image
                                src={sourceToLogo[rating.Source]}
                                alt={rating.Source}
                                className="mb-1 h-auto w-6 md:w-8"
                                width={32}
                                height={32}
                              />
                            ) : (
                              <p className="text-xs font-bold md:text-sm">
                                {rating.Source}
                              </p>
                            )}
                            <p
                              className={`${bungeeFont.className} text-sm md:text-lg ${
                                animeMode
                                  ? "text-animeBluePrimary"
                                  : "text-primaryLight"
                              }`}
                            >
                              {rating.Value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Close button - now with circular background */}
        <button
          type="button"
          onClick={handleCloseMovieInfo}
          aria-label="Close movie details"
          className={`absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
            animeMode
              ? "bg-animeBluePrimary/10 text-animeBluePrimary hover:bg-animeBluePrimary/20"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
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

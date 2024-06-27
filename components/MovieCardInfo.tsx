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
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  BoxOffice: string;
};

type MovieCardInfo = {
  movieInfo: MovieInformation;
  setSelectedInfoId: React.Dispatch<React.SetStateAction<string | null>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MovieCardInfo = ({
  movieInfo,
  setSelectedInfoId,
  isOpen,
  setIsOpen,
}: MovieCardInfo) => {
  const modifiedRatings = movieInfo.Ratings.map((rating) => {
    if (rating.Source === 'Internet Movie Database') {
      return {
        ...rating,
        Source: 'IMDb',
      };
    } else {
      return rating;
    }
  });

  const handleCloseMovieInfo = () => {
    setSelectedInfoId(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 justify-center items-center flex bg-black bg-opacity-40 z-10">
      <div className="2xl:w-1/3 xl:w-2/3 lg:w-2/3 md:w-3/4 pt-10 bg-backgroundLight rounded-lg relative mx-4">
        <div>
          <h1 className="text-primaryLight text-center md:pb-10 pb-6 text-5xl font-Bungee">
            {movieInfo.Title}
          </h1>
        </div>

        {/* Picture, director, actors, ratings */}
        <div className="flex flex-row p-2">
          <div className="w-1/3 justify-center items-center md:flex hidden">
            <img
              className="w-40 h-68 object-cover rounded-md"
              alt={movieInfo.Title}
              src={movieInfo.Poster}
            />
          </div>

          <div>
            <div className="text-center justify-center flex gap-4 text-lg">
              <span>{movieInfo.Released}</span>
              <span>&#x2022;</span>
              <span>{movieInfo.Runtime}</span>
            </div>
            <div className="mt-6 mb-6 text-center justify-center items-center m-auto w-full">
              <div>
                <p className="text-xl font-bold">Director</p>
                <span className="font-Bungee text-primaryLight">
                  {movieInfo.Director}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xl font-bold">Actors</p>
                <span className="font-Bungee text-primaryLight">
                  {movieInfo.Actors}
                </span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex gap-6 text-center justify-center">
                {modifiedRatings.map((rating, i) => (
                  <div key={i}>
                    <p className="text-lg font-bold">{rating.Source}</p>
                    <p className="font-Bungee text-xl text-primaryLight">
                      {rating.Value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movie plot */}
        <div className="p-2 md:p-4">
          <div className="lg:overflow-hidden md:h-auto overflow-auto h-40 p-2 text-justify bg-background rounded-xl">
            <span>{movieInfo.Plot}</span>
          </div>
        </div>

        {/* Close button */}
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
            className={'size-9 text-primary hover:text-primaryLight'}
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

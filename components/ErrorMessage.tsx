import { useGlobalContext } from "@/context/GlobalContext";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { animeMode } = useGlobalContext();

  const animeErrorText = animeMode
    ? message.includes("movie")
      ? "Search for movies, TV shows, and anime to add to your random picker list"
      : "anime not found"
    : message
      ? message === "movie not found"
        ? "movie not found"
        : message
      : "movie not found";

  return (
    <div className={`${bungeeFont.className} flex items-center justify-center`}>
      <p className="justify-center text-balance text-center text-sm md:text-lg">
        {animeErrorText}
      </p>
    </div>
  );
};

export default ErrorMessage;

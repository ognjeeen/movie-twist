import { useGlobalContext } from '@/context/GlobalContext';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { animeMode } = useGlobalContext();

  const animeErrorText = animeMode
    ? message.includes('movie')
      ? 'Search for movies, TV shows, and anime to add to your random picker list'
      : 'anime not found'
    : message
    ? message === 'movie not found'
      ? 'movie not found'
      : message
    : 'movie not found';

  return (
    <div className="flex items-center justify-center font-Bungee">
      <p className="justify-center text-center text-sm md:text-lg text-balance">
        {animeErrorText}
      </p>
    </div>
  );
};

export default ErrorMessage;

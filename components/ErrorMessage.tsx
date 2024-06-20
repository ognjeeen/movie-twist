import { useGlobalContext } from '@/context/GlobalContext';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { animeMode } = useGlobalContext();

  const animeErrorText = animeMode
    ? message.includes('movie')
      ? 'start typing to search an anime'
      : 'anime not found'
    : message
    ? message === 'movie not found'
      ? 'movie not found'
      : message
    : 'movie not found';

  return (
    <div className="flex items-center justify-center font-Bungee">
      <p className="justify-center text-center md:text-xl">{animeErrorText}</p>
    </div>
  );
};

export default ErrorMessage;

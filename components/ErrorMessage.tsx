type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center font-Bungee">
      <p className="justify-center text-center md:text-xl">
        <span>⛔</span> {message}
      </p>
    </div>
  );
};

export default ErrorMessage;

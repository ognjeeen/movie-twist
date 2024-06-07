type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="justify-center text-center mt-16 md:text-xl md:mt-28">
      <span>⛔</span> {message}
    </p>
  );
};

export default ErrorMessage;

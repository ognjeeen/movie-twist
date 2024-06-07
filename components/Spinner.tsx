import MoonLoader from 'react-spinners/MoonLoader';

type SpinnerProps = {
  loading: boolean;
};

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <MoonLoader
      color="#C59658"
      loading={loading}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;

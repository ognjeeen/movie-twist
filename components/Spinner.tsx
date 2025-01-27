import { useGlobalContext } from "@/context/GlobalContext";
import MoonLoader from "react-spinners/MoonLoader";

type SpinnerProps = {
  loading: boolean;
};

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }: SpinnerProps) => {
  const { animeMode } = useGlobalContext();

  const spinnerColor = animeMode ? "#399a99" : "#C59658";

  return (
    <MoonLoader
      color={spinnerColor}
      loading={loading}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;

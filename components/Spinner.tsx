import { useGlobalContext } from "@/context/GlobalContext";

type SpinnerProps = {
  loading: boolean;
};

const Spinner = ({ loading }: SpinnerProps) => {
  const { animeMode } = useGlobalContext();

  const spinnerColor = animeMode ? "#399a99" : "#C59658";

  if (!loading) return null;

  return (
    <div
      className="flex items-center justify-center"
      style={{ margin: "100px auto" }}
    >
      <div
        className="animate-spin rounded-full border-4 border-transparent"
        style={{
          borderTopColor: spinnerColor,
          width: "50px",
          height: "50px",
        }}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;

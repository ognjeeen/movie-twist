"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

const MovieTwistTitle = () => {
  const { animeMode } = useGlobalContext();

  const applicationTitleColor = animeMode
    ? "text-animeBlueLight"
    : "text-primaryLight";

  const applicationTitleText = animeMode ? "Anime" : "Movie";

  return (
    <h1
      className={`${bungeeFont.className} ${applicationTitleColor} m-auto select-none text-center text-4xl lg:text-6xl`}
    >
      <span>{applicationTitleText}</span>
      <span
        className="inset-0 z-[-1] text-transparent"
        style={{
          WebkitTextStroke: `2px ${animeMode ? "#95d2d3" : "#e1ab65"}`,
          content: "Twist",
        }}
      >
        Twist
      </span>
    </h1>
  );
};

export default MovieTwistTitle;

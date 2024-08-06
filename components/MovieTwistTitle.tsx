'use client';

import { useGlobalContext } from '@/context/GlobalContext';

const MovieTwistTitle = () => {
  const { animeMode } = useGlobalContext();

  const applicationTitleColor = animeMode
    ? 'text-animeBlueLight'
    : 'text-primaryLight';

  const applicationTitleText = animeMode ? 'Anime' : 'Movie';

  return (
    <h1
      className={`${applicationTitleColor} lg:text-6xl text-4xl text-center m-auto font-Bungee select-none`}
    >
      <span>{applicationTitleText}</span>
      <span
        className="inset-0 z-[-1] text-transparent"
        style={{
          WebkitTextStroke: `2px ${animeMode ? '#95d2d3' : '#e1ab65'}`,
          content: 'Twist',
        }}
      >
        Twist
      </span>
    </h1>
  );
};

export default MovieTwistTitle;

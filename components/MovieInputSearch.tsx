'use client';
import { useGlobalContext } from '@/context/GlobalContext';

const MovieInputSearch = () => {
  const { query, setQuery, animeMode } = useGlobalContext();

  const inputStyle = animeMode ? 'bg-animeBluePrimary' : 'bg-primary';
  const placeholder = animeMode
    ? 'Search for an anime...'
    : 'Search for movie...';

  return (
    <input
      className={`${inputStyle} md:p-4 md:px-6 md:text-xl transition-all duration-300 flex md:w-2/3 lg:w-2/3 xl:w-1/3 placeholder-textColor focus:-translate-y-2 outline-none rounded-xl p-3 px-4 font-Bungee`}
      placeholder={placeholder}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default MovieInputSearch;

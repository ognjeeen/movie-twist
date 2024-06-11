'use client';
import { useGlobalContext } from '@/context/GlobalContext';

const MovieInputSearch = () => {
  const { query, setQuery } = useGlobalContext();

  return (
    <input
      className="bg-primary md:p-4 md:px-6 md:text-xl transition-all duration-300 flex md:w-2/3 lg:w-2/3 xl:w-1/3 placeholder-textColor focus:-translate-y-2 outline-none rounded-xl p-3 px-4"
      placeholder="Search for movie..."
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default MovieInputSearch;

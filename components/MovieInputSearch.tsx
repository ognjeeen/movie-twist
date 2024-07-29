'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useRef, useState } from 'react';

const MovieInputSearch = () => {
  const { query, setQuery, animeMode } = useGlobalContext();

  const passedPlaceholder = animeMode ? 'Chainsaw Man' : 'Interstellar';
  const [placeholderText, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    if (!isFocused) {
      intervalRef.current = setInterval(() => {
        setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
        if (placeholderIndex + 1 > passedPlaceholder.length) {
          setPlaceholderIndex(0);
        } else {
          setPlaceholderIndex(placeholderIndex + 1);
        }
      }, 170);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setPlaceholder('');
    }
  }, [isFocused, placeholderIndex]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPlaceholderIndex(0);
  };

  const inputStyle = animeMode ? 'bg-animeBluePrimary' : 'bg-primary';

  return (
    <input
      className={`${inputStyle} md:p-4 md:px-6 md:text-xl transition-all duration-300 flex md:w-2/3 lg:w-2/3 xl:w-1/3 placeholder-textColor focus:-translate-y-2 outline-none rounded-xl p-3 px-4 font-Bungee`}
      placeholder={placeholderText}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      maxLength={20}
      style={{
        maxHeight: '60px',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
      }}
    />
  );
};

export default MovieInputSearch;

"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useRef, useState } from "react";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

const MovieInputSearch = () => {
  const { query, setQuery, animeMode } = useGlobalContext();

  const passedPlaceholder = animeMode ? "Chainsaw Man" : "Interstellar";
  const [placeholderText, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery("");
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
      }, 150);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setPlaceholder("");
    }
  }, [isFocused, placeholderIndex]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPlaceholderIndex(0);
  };

  const inputStyle = animeMode ? "bg-animeBluePrimary" : "bg-primary";

  return (
    <input
      className={`${bungeeFont.className} ${inputStyle} flex w-[300px] rounded-xl p-3 px-4 placeholder-textColor outline-none transition-all duration-300 focus:-translate-y-2 sm:w-[500px] md:w-[570px] md:p-4 md:px-6 md:text-xl xl:w-[650px]`}
      placeholder={placeholderText}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      maxLength={20}
      style={{
        maxHeight: "60px",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
      }}
    />
  );
};

export default MovieInputSearch;

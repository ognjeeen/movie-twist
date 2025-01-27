'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';

const Footer = () => {
  const { toggleAnimeMode } = useGlobalContext();

  return (
    <footer className="bg-gray bottom-0 w-full pb-4 2xl:fixed font-Bungee select-none text-sm md:text-base">
      <div className="md:flex md:justify-between items-center m-auto justify-center w-11/12">
        <div className="flex gap-6 justify-center items-center">
          <div>Anime mode</div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              onChange={toggleAnimeMode}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-2 text-sm font-medium dark:text-gray-300">
              Toggle me
            </span>
          </label>
        </div>
        <Link href="/faq" className="flex justify-center pt-2">
          FAQ
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import { Bungee } from "next/font/google";

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  const { toggleAnimeMode } = useGlobalContext();

  return (
    <footer
      className={`${bungeeFont.className} bg-gray bottom-0 w-full select-none pb-4 text-sm md:text-base 2xl:fixed`}
    >
      <div className="m-auto w-11/12 items-center justify-center md:flex md:justify-between">
        <div className="flex items-center justify-center gap-6">
          <div>Anime mode</div>
          <label className="inline-flex cursor-pointer items-center">
            <input
              onChange={toggleAnimeMode}
              type="checkbox"
              value=""
              className="peer sr-only"
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
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

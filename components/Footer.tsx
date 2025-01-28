"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import { Bungee } from "next/font/google";
import pumpaj from "@/public/pumpaj.png";
import Image from "next/image";
import { useState, useEffect } from "react"; // Dodajte useEffect

const bungeeFont = Bungee({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  const { toggleAnimeMode } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <footer
      className={`${bungeeFont.className} bg-gray bottom-0 w-full select-none pb-4 text-sm md:text-base 2xl:fixed`}
    >
      <div className="m-auto flex w-11/12 flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        {/* Sekcija za Anime mode */}
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

        {/* FAQ Link */}
        <Link href="/faq" className="flex justify-center">
          FAQ
        </Link>

        {/* Sekcija za sliku */}
        <div className="relative flex items-center justify-center">
          {/* Prikaz modala */}
          <div
            className="group relative"
            onClick={() => {
              if (isMobile) {
                setIsModalOpen(!isModalOpen);
              }
            }}
          >
            <Image src={pumpaj.src} alt="Pumpaj" width={50} height={50} />

            {/* Modal za hover (desktop) */}
            {!isMobile && (
              <div className="pointer-hover:block absolute -top-16 left-1/2 hidden w-40 -translate-x-1/2 transform rounded-lg bg-backgroundLight p-4 text-center text-red-500 shadow-lg group-hover:block">
                PUMPAJ!
              </div>
            )}

            {/* Modal za klik (mobilni) */}
            {isMobile && (
              <div
                key={isModalOpen ? "open" : "closed"}
                className={`absolute -top-16 left-1/2 w-40 -translate-x-1/2 transform rounded-lg bg-backgroundLight p-4 text-center text-red-500 shadow-lg transition-opacity duration-300 ${
                  isModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                PUMPAJ!
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import { useEffect, useRef } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is this application?",
    answer:
      "Movie Twist is a web application built with Next.js, TailwindCSS, and TypeScript. It helps you decide which movie to watch by randomly selecting one from your list of chosen movies.",
  },
  {
    question: "How do I use this application?",
    answer: `Movie Twist helps you decide what to watch by choosing a random movie for you. You can search for movies by their full name and add them to your selected movie list. Once you've found a movie you'd like to add, just click on it, and it will be automatically included in your list. After building your list, simply click the 'Random Movie' button, and the application will pick a random title for you to watch.`,
  },
  {
    question: "Is Movie Twist only available for movies?",
    answer:
      "No. With Movie Twist, you can also search for tv series, short movies, anime series, as well as anime movies.",
  },
  {
    question: "What is anime mode?",
    answer: `Well, you need to try it out and see for yourself. Maybe it will spawn an emo girl or emo boy next to you if you turn this option on 😆. Jokes aside, it's just a theme.`,
  },
  {
    question: "Can I give contribution to Movie Twist?",
    answer: `Yes! Any help would mean a lot. You can support me in two ways: by contributing to the development or through donations. If you find this application useful, feel free to buy me a coffee on <a href="https://ko-fi.com/ognjeeen" target="_blank" rel="noopener noreferrer" style="color: #e1ab65; font-weight:bold">Ko-fi</a> 😊. In either case, you can contact me on Discord at M0xei (m0xei). My main priority is to upgrade the API so it can support more requests per day, which costs from 1€-25€ per month.`,
  },
  {
    question: "What API does Movie Twist use?",
    answer:
      'Movie Twist uses combination of <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" style="color: #e1ab65; font-weight:bold">The Movie Database (TMDB)</a> API and <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" style="color: #e1ab65; font-weight:bold">OMDB</a> API. <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.04 35.4"><defs><style>.cls-1{fill:url(#linear-gradient);}</style><linearGradient id="linear-gradient" y1="17.7" x2="489.04" y2="17.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#90cea1"/><stop offset="0.56" stop-color="#3cbec9"/><stop offset="1" stop-color="#00b3e5"/></linearGradient></defs><title>TMDB</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M293.5,0h8.9l8.75,23.2h.1L320.15,0h8.35L313.9,35.4h-6.25Zm46.6,0h7.8V35.4h-7.8Zm22.2,0h24.05V7.2H370.1v6.6h15.35V21H370.1v7.2h17.15v7.2H362.3Zm55,0H429a33.54,33.54,0,0,1,8.07,1A18.55,18.55,0,0,1,443.75,4a15.1,15.1,0,0,1,4.52,5.53A18.5,18.5,0,0,1,450,17.8a16.91,16.91,0,0,1-1.63,7.58,16.37,16.37,0,0,1-4.37,5.5,19.52,19.52,0,0,1-6.35,3.37A24.59,24.59,0,0,1,430,35.4H417.29Zm7.81,28.2h4a21.57,21.57,0,0,0,5-.55,10.87,10.87,0,0,0,4-1.83,8.69,8.69,0,0,0,2.67-3.34,11.92,11.92,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9,9,0,0,0-2.62-3.18,11.68,11.68,0,0,0-3.88-1.88,17.43,17.43,0,0,0-4.67-.62h-4.6ZM461.24,0h13.2a34.42,34.42,0,0,1,4.63.32,12.9,12.9,0,0,1,4.17,1.3,7.88,7.88,0,0,1,3,2.73A8.34,8.34,0,0,1,487.39,9a7.42,7.42,0,0,1-1.67,5,9.28,9.28,0,0,1-4.43,2.82v.1a10,10,0,0,1,3.18,1,8.38,8.38,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.42,9.42,0,0,1-3.1,3,13.38,13.38,0,0,1-4.27,1.65,23.11,23.11,0,0,1-4.73.5h-14.5ZM469,14.15h5.65a8.16,8.16,0,0,0,1.78-.2A4.78,4.78,0,0,0,478,13.3a3.34,3.34,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8,3.22,3.22,0,0,0-.47-1.82,3.33,3.33,0,0,0-1.23-1.13,5.77,5.77,0,0,0-1.7-.58,10.79,10.79,0,0,0-1.85-.17H469Zm0,14.65h7a8.91,8.91,0,0,0,1.83-.2,4.78,4.78,0,0,0,1.67-.7,4,4,0,0,0,1.23-1.3,3.71,3.71,0,0,0,.47-2,3.13,3.13,0,0,0-.62-2A4,4,0,0,0,479,21.45,7.83,7.83,0,0,0,477,20.9a15.12,15.12,0,0,0-2.05-.15H469Zm-265,6.53H271a17.66,17.66,0,0,0,17.66-17.66h0A17.67,17.67,0,0,0,271,0H204.06A17.67,17.67,0,0,0,186.4,17.67h0A17.66,17.66,0,0,0,204.06,35.33ZM10.1,6.9H0V0H28V6.9H17.9V35.4H10.1ZM39,0h7.8V13.2H61.9V0h7.8V35.4H61.9V20.1H46.75V35.4H39ZM80.2,0h24V7.2H88v6.6h15.35V21H88v7.2h17.15v7.2h-25Zm55,0H147l8.15,23.1h.1L163.45,0H175.2V35.4h-7.8V8.25h-.1L158,35.4h-5.95l-9-27.15H143V35.4h-7.8Z"/></g></g></svg>',
  },
];

const FAQSection = () => {
  const { setAnimeMode } = useGlobalContext();

  useEffect(() => {
    setAnimeMode(false);
  }, []);

  return (
    <section className="h-full w-full flex-col md:flex md:flex-row">
      <div className="flex items-center justify-center pr-4 md:justify-end md:pr-0 lg:w-3/6">
        <div className="mb-10 flex flex-col pt-4 text-center text-primaryLight">
          <h2 className="text-4xl font-bold">FAQ</h2>
          <span>Scroll to see all FAQ</span>
          <Link href="/">&larr; Go back</Link>
        </div>
      </div>
      <div className="m-auto h-full w-full snap-y md:w-5/6 md:overflow-y-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-10 flex flex-col items-center justify-center p-4 md:min-h-screen"
          >
            <h3 className="mb-2 text-center text-lg font-bold text-primaryLight md:text-2xl">
              {faq.question}
            </h3>
            <p className="text-pretty text-center text-base sm:w-2/3 sm:text-center md:w-3/4 md:text-lg lg:w-4/6">
              <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

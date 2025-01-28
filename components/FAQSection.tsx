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

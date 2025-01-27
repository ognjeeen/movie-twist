'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import { useEffect } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is this application?',
    answer:
      'Movie Twist is a web application built with Next.js, TailwindCSS, and TypeScript. It helps you decide which movie to watch by randomly selecting one from your list of chosen movies.',
  },
  {
    question: 'How do I use this application?',
    answer: `Movie Twist helps you decide what to watch by choosing a random movie for you. You can search for movies by their full name and add them to your selected movie list. Once you've found a movie you'd like to add, just click on it, and it will be automatically included in your list. After building your list, simply click the 'Random Movie' button, and the application will pick a random title for you to watch.`,
  },
  {
    question: 'Is Movie Twist only available for movies?',
    answer:
      'No. With Movie Twist, you can also search for tv series, short movies, anime series, as well as anime movies.',
  },
  {
    question: 'What is anime mode?',
    answer: `Well, you need to try it out and see for yourself. Maybe it will spawn an emo girl or emo boy next to you if you turn this option on 😆. Jokes aside, it's just a theme,`,
  },
  {
    question: 'Can I give contribution to Movie Twist?',
    answer: `Yes! Any help would mean a lot. You can support me in two ways: by contributing to the development or through donations. If you find this application useful, feel free to buy me a coffee on <a href="https://ko-fi.com/ognjeeen" target="_blank" rel="noopener noreferrer" style="color: #e1ab65; font-weight:bold">Ko-fi</a> 😊. In either case, you can contact me on Discord at M0xei (m0xei). My main priority is to upgrade the API so it can support more requests per day, which costs from 1-25€ per month.`,
  },
];

const FAQSection = () => {
  const { setAnimeMode } = useGlobalContext();

  useEffect(() => {
    setAnimeMode(false);
  }, []);

  return (
    <div className="h-full w-full flex-col md:flex md:flex-row">
      <div className="items-center pr-4 flex justify-center lg:w-3/6 md:justify-end md:pr-0">
        <div className="flex flex-col text-center text-primaryLight pt-4 mb-10">
          <h1 className="text-4xl font-bold">FAQ</h1>
          <span>Scroll to see all FAQ</span>
          <Link href="/">&larr; Go back</Link>
        </div>
      </div>
      <div className="h-full w-full m-auto snap-y md:overflow-y-auto md:snap-mandatory md:w-5/6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 mb-10 md:min-h-screen md:snap-start"
          >
            <h1 className="text-primaryLight text-lg font-bold mb-2 text-center md:text-2xl">
              {faq.question}
            </h1>
            <p className="text-base text-justify sm:text-center md:text-lg sm:w-2/3 md:w-3/4 lg:w-4/6">
              <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is this application?',
    answer:
      'Movie Twist is an application built using Next.js with TailwindCSS and TypeScript. Movie Twist helps you decide what movie you should watch from your provided list of selected movies,',
  },
  {
    question: 'How do I use this application?',
    answer: `You can use this application by searching for movies (using their full name) and adding them to the selected list. When you find a movie you want to add to the selected list, just click on it and it will be automatically selected. After that, all you have to do is click on the 'Random Movie' button and wait for the application to give you a random movie from the list you created,`,
  },
  {
    question: 'Is Movie Twist only available for movies?',
    answer:
      'No. With Movie Twist, you can also search for tv series, short movies, anime series, as well as anime movies.',
  },
  {
    question: 'What is anime mode?',
    answer: `Well, you need to try it out and see for yourself :). Maybe it will spawn an emo girl or boy next to you if you turn this option on. Jokes aside, it's just a theme :),`,
  },
  {
    question: 'Can I give contribution to Movie Twist?',
    answer: `Yes! Any help is really appreciated. You can help me in two ways: first, by assisting with development, and second, through donations. I would say to buy me a coffee only if you find this application useful ;). In either case, you can contact me on Discord at M0xei (m0xei) or buy me a coffee at <a href="https://ko-fi.com/ognjeeen" target="_blank" rel="noopener noreferrer" style="color: #e1ab65; font-weight:bold">Ko-fi</a>. My main priority is to upgrade the API so it can support more requests per day, which costs from 1-25€ per month.`,
  },
];

const FAQSection = () => {
  return (
    <div className="h-full w-full md:flex flex-col md:flex-row">
      <div className="items-center pr-4 flex justify-center md:justify-end lg:w-3/6 md:pt-0">
        <div className="flex flex-col text-center text-primaryLight pt-4">
          <h1 className="text-4xl font-bold">FAQ</h1>
          <span>Scroll to see all FAQ</span>
          <Link href="/">&larr; Go back</Link>
        </div>
      </div>
      <div className="overflow-y-auto h-full w-full md:w-5/6 snap-y snap-mandatory m-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-h-screen p-4 snap-start"
          >
            <h1 className="text-primaryLight text-3xl font-bold mb-4">
              {faq.question}
            </h1>
            <p className="text-lg md:w-2/3 break-words text-justify">
              <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

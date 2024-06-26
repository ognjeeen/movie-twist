'use client';

import Link from 'next/link';

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

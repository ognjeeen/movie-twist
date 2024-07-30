import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import { Toaster } from 'react-hot-toast';
import GoogleAnalytics from '@/GoogleAnalytics';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Twist',
  description:
    'Enjoy easy browsing of movies, TV shows, and anime. Add your favorites to a list and let Movie Twist make the decision for you when you’re unsure of what to watch.',
  keywords: 'movie, find movie, random movie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <html lang="en" className="bg-background text-textColor">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="title" content="Movie Twist" />
          <meta
            name="description"
            content="Enjoy easy browsing of movies, TV shows, and anime. Add your favorites to a list and let Movie Twist make the decision for you when you’re unsure of what to watch."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://movie-twist.vercel.app/" />
          <meta property="og:title" content="Movie Twist" />
          <meta
            property="og:description"
            content="Enjoy easy browsing of movies, TV shows, and anime. Add your favorites to a list and let Movie Twist make the decision for you when you’re unsure of what to watch
"
          />
          <meta property="og:image" content="https://i.imgur.com/DELmYeE.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://movie-twist.vercel.app/" />
          <meta name="twitter:title" content="Movie Twist" />
          <meta
            name="twitter:description"
            content="Enjoy easy browsing of movies, TV shows, and anime. Add your favorites to a list and let Movie Twist make the decision for you when you’re unsure of what to watch."
          />
          <meta
            name="twitter:image"
            content="https://i.imgur.com/DELmYeE.png"
          />
        </head>
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster
            toastOptions={{
              style: { background: '#343a40', color: '#dee2e6' },
            }}
          />
        </body>
        <GoogleAnalytics />
      </html>
    </GlobalProvider>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Twist',
  description: 'Get random movie',
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
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalProvider>
  );
}

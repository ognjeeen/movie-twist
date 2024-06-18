import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen justify-center items-center flex">
      <div className="text-primaryLight font-bold text-center">
        <h1 className="text-6xl">Page not found!</h1>
        <Link href={'/'} className="underline text-2xl">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    const { protocol, hostname, port } = window.location;
    setLoginUrl(`${protocol}//app.${hostname}:${port}/login`);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">HOME INDEX</span>
      </h1>
      <Link href={loginUrl}>
        <a className="block xl:inline">LOGIN</a>
      </Link>
    </>
  );
};

export default Home;

import Head from 'next/head';
import Link from 'next/link';
import Loader from '../components/Loader';

export default function Home() {
  return (
    <div>
      <Link
        prefetch={false}
        href={{
          pathname: '/[username]',
          query: { username: 'adammm' },
        }}
      >
        <a className="text-5xl">Adam's Profile</a>
      </Link>
      
      <Loader show />
    </div>
  );
}

import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { Navbar } from '../components';
import { UserContext } from '../lib/context';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <Head>
        <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        <link rel='icon' href='/favico.ico' type='image/png' />
      </Head>

      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;

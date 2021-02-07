import Container from '@material-ui/core/Container';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import 'fontsource-roboto';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Container maxWidth='sm'>
        <Component {...pageProps} />
      </Container>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;

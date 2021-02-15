import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Navbar } from '../components';
import { UserContext } from '../lib/context';
import '../styles/normalize.css';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';
import theme from '../lib/theme';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${({theme}) => theme.colors.bg};
    color: ${({theme}) => theme.colors.fg};
  }
`;
const PageWrapper = styled.div`
`;
const ContentWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 2rem;
  justify-content: center;
  max-width: 1200px;
`;

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
        <ThemeProvider theme={theme} >
          <GlobalStyle />
          <PageWrapper>
            <Navbar />
            <ContentWrapper>
              <Component {...pageProps} />
            </ContentWrapper>
            <Toaster />
          </PageWrapper>
        </ThemeProvider>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;

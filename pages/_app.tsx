import '../styles/globals.css';
import { store } from '@store/index';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

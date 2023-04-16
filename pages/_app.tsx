import '../styles/globals.css';
import { store } from '@store/index';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;

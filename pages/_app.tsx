import '../styles/globals.css';
import { store } from '@store/index';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;

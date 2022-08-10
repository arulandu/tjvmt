import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext } from 'react';
import { SessionProvider } from '@/components/SessionProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      < Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp

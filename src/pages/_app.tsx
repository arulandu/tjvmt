import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext } from 'react';
import { SessionProvider } from '@/components/SessionProvider';
import { ToastProvider } from '@/components/ToastProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SessionProvider>
  );
}
export default MyApp

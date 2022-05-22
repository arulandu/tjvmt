import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      options={{ // refetch session every 30 mins
        clientMaxAge: 30 * 60, 
        keepAlive: 30 * 60
      }}
      session={pageProps.session}
    >
      < Component {...pageProps} />
    </Provider>
  );
}
export default MyApp

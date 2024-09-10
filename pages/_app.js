import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

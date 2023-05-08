import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { SEO } from 'constants/seo';

import '../styles/globals.css';
import { Sidebar } from 'components/Sidebar';
import { auth } from 'src/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && router.pathname !== '/signin') {
        router.push('/signin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

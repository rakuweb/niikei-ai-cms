import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

import { SEO } from 'constants/seo';

import '../styles/globals.css';
import { Sidebar } from 'components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ChakraProvider>
        <Sidebar />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

import { AuthProtected } from 'components/AuthProtected';

import { SEO } from 'constants/seo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ChakraProvider>
        <AuthProtected>
          <Component {...pageProps} />
        </AuthProtected>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

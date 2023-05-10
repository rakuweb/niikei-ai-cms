import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { SEO } from 'constants/seo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

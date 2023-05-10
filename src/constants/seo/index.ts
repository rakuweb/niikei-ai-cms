// import layer
import { DefaultSeoProps } from 'next-seo';

// constant layer

// default seo
export const SEO: DefaultSeoProps = {
  title: '',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'ja',
    url: '',
    site_name: '',
    images: [
      {
        url: `/img/ogp.png`,
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
  twitter: { cardType: 'summary_large_image' },
};

// import layer
import { FC } from 'react';
import Script from 'next/script';

// type layer
export type GoogleTagManagerId = `GTM-${string}`;
export type StyleProps = Record<string, unknown>;
export type DataProps = { googleTagManagerId?: GoogleTagManagerId };
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ googleTagManagerId }) => {
  if (googleTagManagerId) {
    return <></>;
  }

  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${googleTagManagerId}');
      `,
      }}
    />
  );
};

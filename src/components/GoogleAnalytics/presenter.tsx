// import layer
import { FC } from 'react';
import Script from 'next/script';

import { existsGaId } from 'lib/gtag';
import { GA_ID } from 'constants/parameters';

// type layer
export type StyleProps = Record<string, unknown>;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  return (
    <>
      {existsGaId && (
        <>
          <Script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" defer strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      )}
    </>
  );
};

import { GA_ID } from 'constants/parameters';

// type layer

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== '';

// PVを測定する
export const pageview = (path: string): void => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

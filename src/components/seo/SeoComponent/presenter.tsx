// import layer
import { FC } from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

import { SEO } from 'constants/seo';

// type layer
export type StyleProps = Record<string, unknown>;
export type DataProps = NextSeoProps;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  return <NextSeo {...SEO} {...props} />;
};

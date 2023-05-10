import { RouterContext } from 'next/dist/shared/lib/router-context';

import './__mock/NextImage';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    asPath: '/',
    query: {},
    push() {},
  },
};

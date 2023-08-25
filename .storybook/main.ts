import type { StorybookConfig } from '@storybook/nextjs';
const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-styling',
    'storycap',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config?.resolve?.alias ?? {}),
          // '@emotion/core': toPath('node_modules/@emotion/react'),
          // '@emotion/styled': toPath('node_modules/@emotion/styled'),
          // 'emotion-theming': toPath('node_modules/@emotion/react'),
          '~': toPath('src'),
          components: toPath('src/components'),
          templates: toPath('src/components/templates'),
        },
      },
    };
  },
  staticDirs: ['../public'],
  refs: {
    '@chakra-ui/react': { disable: true },
  },
};
export default config;

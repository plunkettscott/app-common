import { Configuration } from '@nuxt/types';
import { IconPreset } from '@nuxtjs/vuetify/dist/icons';

const Config: Configuration = {
  modules: ['@nuxtjs/axios', '@responseams/app-initializer'],
  plugins: [],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  head: {
    title: 'Lavra Response',
    titleTemplate: '%s - Lavra Response',
  },
  axios: {
    proxy: true,
    retry: {
      retries: 3,
    },
  },
  proxy: {},
  build: {
    babel: {
      sourceType: 'unambiguous',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      presets({ isServer }): Array<any> {
        const targets = isServer ? { node: 'current' } : { ie: 11 };
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]];
      },
    },
    transpile: [],
  },
  vuetify: {
    customVariables: [],
    defaultAssets: {
      font: {
        family: 'Roboto',
      },
      icons: 'mdi' as IconPreset,
    },
    optionsPath: undefined,
    treeShake: process.env.NODE_ENV === 'production',
  },
};

export default Config;

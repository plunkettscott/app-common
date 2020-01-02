/* eslint-disable @typescript-eslint/camelcase */
import { Configuration } from '@nuxt/types';
import { IconPreset } from '@nuxtjs/vuetify/dist/icons';

require('dotenv').config();

const Config: Configuration = {
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/pwa'],
  plugins: [],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/dotenv'],
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
      /* istanbul ignore next */
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
  auth: {
    localStorage: false,
    fullPathRedirect: true,
    redirect: {
      login: '/auth/login',
      logout: '/auth/logout',
      callback: '/auth/login/finish',
      home: '/',
    },
    strategies: {
      response: {
        _scheme: 'oauth2',
        _name: 'response',
        authorization_endpoint: `/api/oauth/authorize`,
        token_endpoint: `/api/oauth/token`,
        token_key: 'access_token',
        token_type: 'Bearer',
        response_type: 'code',
        grant_type: 'authorization_code',
        scope: '*',
      },
    },
  },
  router: {
    middleware: ['auth'],
  },
};

export default Config;

import { Configuration } from '@nuxt/types';

export default class ConfigBuilder {
  /** The Nuxt Config object. */
  private config: Configuration;

  /** Constructor */
  public constructor() {
    this.config = {
      modules: ['@nuxtjs/axios'],
      plugins: [],
      buildModules: ['@nuxtjs/typescript'],
      head: {
        title: 'Lavra Response',
        titleTemplate: '%s - Lavra Response',
      },
      axios: {},
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
    };
  }

  /**
   * Specifies the Response API URL to use for the data to be
   * fetched in the App.
   *
   * @param apiUrl The API URL
   */
  public withApiURL(baseURL: string, debug = false): ConfigBuilder {
    this.config.axios = {
      baseURL,
      proxy: true,
      debug,
      retry: {
        retries: 3,
      },
    };

    this.config.proxy = {
      '/api/': baseURL,
    };

    return this;
  }

  /**
   * Specifies an additional proxy endpoint off of the App domain. This is useful
   * to prevent CORS issues. The request will be proxied through the Node server running
   * the App. You can call this multiple times to proxy additional paths.
   *
   * @param proxyFrom The route to proxy from.
   * @param proxyTo The full URL that should receive the proxies request.
   */
  public withProxy(proxyFrom: string, proxyTo: string): ConfigBuilder {
    if (proxyFrom.indexOf('api') > -1) {
      throw new Error(
        'You cannot provide a proxy on the /api/ path. Use another path.',
      );
    }

    this.config.proxy[proxyFrom] = proxyTo;

    return this;
  }

  /**
   * Update the template string used to display page titles. This can be updated to
   * add things like your community name in the title template. You must ensure your
   * template string contains `%s` to replace each page title.
   *
   * @param template The template, which must contain `%s` for replacing with the page title.
   */
  public withTitleTemplate(template: string): ConfigBuilder {
    if (template.indexOf('%s') === -1) {
      throw new Error(
        'You must provide a replacement key for the template. Use `%s` in your string.',
      );
    }

    if (!this.config.head) {
      this.config.head = {};
    }

    this.config.head.titleTemplate = template;

    return this;
  }

  /**
   * Validates that all of the necessary configuration options have been
   * provided to the ConfigBuilder instance.
   */
  public validateConfig(): void {
    if (!this.config.axios.baseURL) {
      throw new Error(
        'You must call `withApiURL` to set the URL to your Response API instnace.',
      );
    }
  }

  /**
   * Returns a Nuxt confgiuration object built using the ConfigBuilder
   * instnace.
   *
   * @return Configuration The Configuration object to be provided to Nuxt.
   */
  public getObject(): Configuration {
    this.validateConfig();

    return this.config;
  }
}

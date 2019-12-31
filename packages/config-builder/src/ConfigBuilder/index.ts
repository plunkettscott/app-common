import { Configuration } from '@nuxt/types';
import { Options } from '@nuxtjs/vuetify/dist';
import defaults from './defaults';
import merge from 'lodash.merge';

export interface ProxyPathRewrite {
  [match: string]: string;
}

export default class ConfigBuilder {
  /** The Nuxt Config object. */
  private config: Configuration;

  /** Constructor */
  public constructor() {
    this.config = defaults;
  }

  /**
   * Specifies the Response API URL to use for the data to be
   * fetched in the App.
   *
   * @param apiUrl The API URL
   */
  public withApiURL(
    baseURL: string,
    stripPath: boolean | ProxyPathRewrite = false,
    debug = false,
  ): ConfigBuilder {
    this.config.axios = {
      baseURL,
      debug,
    };

    this.config.proxy = {
      '/api/': {
        target: baseURL,
      },
    };

    if (typeof stripPath === 'boolean' && stripPath === true) {
      this.config.proxy['/api/'].pathRewrite = { '^/api/': '' };
    }

    if (typeof stripPath === 'object') {
      this.config.proxy['/api/'].pathRewrite = stripPath;
    }

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
  public withProxy(
    proxyFrom: string,
    proxyTo: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pathRewrite?: any,
  ): ConfigBuilder {
    if (proxyFrom.indexOf('api') > -1) {
      throw new Error(
        'You cannot provide a proxy on the /api/ path. Use another path.',
      );
    }

    this.config.proxy[proxyFrom] = { target: proxyTo, pathRewrite };

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
   * Merges the provided theme configuration for Vuetify with our defaults,
   * allowing you to override anything, including the default colors.
   *
   * @param themeConfig The Options to provide the underlying Vuetify instance.
   */
  public withCustomizedTheme(themeConfig: Options): ConfigBuilder {
    this.config.vuetify = merge(this.config.vuetify, themeConfig);

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

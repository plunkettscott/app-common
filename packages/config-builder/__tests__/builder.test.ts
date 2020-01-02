'use strict';

import ConfigBuilder from '../src';
import { IconPreset } from '@nuxtjs/vuetify/dist/icons';
import { NuxtConfigurationModule } from '@nuxt/types/config/module';

function testExtensionExists(
  modules: NuxtConfigurationModule[],
  test: NuxtConfigurationModule,
): void {
  const index = modules.findIndex((v, i, obj) => {
    if (v.length == 2 && obj[i] === test) {
      return i;
    }

    return -1;
  });

  expect(index).toBeGreaterThan(-1);
}

describe('Config Builder', () => {
  it('properly initializes a ConfigBuilder instance', () => {
    expect(new ConfigBuilder()).toBeInstanceOf(ConfigBuilder);
  });

  it('throws an error if the ConfigBuilder object is requested without an API URL.', () => {
    try {
      new ConfigBuilder().getObject();
    } catch (e) {
      expect(e.message).toBe(
        'You must call `withApiURL` to set the URL to your Response API instnace.',
      );
    }
  });

  it('has the API URL when `withApiURL`is called', () => {
    expect(new ConfigBuilder().withApiURL('test').getObject()).toMatchObject({
      axios: {
        baseURL: 'test',
      },
    });
  });

  it('accepts and and honors request to do path rewrite of the default path', () => {
    expect(
      new ConfigBuilder().withApiURL('http://api', true).getObject(),
    ).toMatchObject({
      proxy: {
        '/api/': { target: 'http://api', pathRewrite: { '^/api/': '' } },
      },
    });
  });

  it('accepts and and honors request to do path rewrite of a specific path', () => {
    expect(
      new ConfigBuilder()
        .withApiURL('http://api/api/other/path', { '^/api/other/path/': '' })
        .getObject(),
    ).toMatchObject({
      proxy: {
        '/api/': {
          target: 'http://api/api/other/path',
          pathRewrite: { '^/api/other/path/': '' },
        },
      },
    });
  });

  it('accepts and honors request for HTTP debugging when debug is set to true', () => {
    expect(
      new ConfigBuilder().withApiURL('http://api', false, true).getObject(),
    ).toMatchObject({
      axios: {
        baseURL: 'http://api',
        debug: true,
      },
    });
  });

  it('throws an error when trying to proxy on the /api/ path.', () => {
    try {
      new ConfigBuilder().withProxy('/api/', 'http://test');
    } catch (e) {
      expect(e.message).toBe(
        'You cannot provide a proxy on the /api/ path. Use another path.',
      );
    }
  });

  it('creates a proxy without error when does not contain /api/', () => {
    const builder = new ConfigBuilder()
      .withApiURL('http://api')
      .withProxy('/other/', 'http://other');

    expect(builder.getObject()).toMatchObject({
      proxy: { '/other/': { target: 'http://other' } },
    });

    expect(builder.getObject()).toMatchObject({
      proxy: {
        '/api/': { target: 'http://api' },
        '/other/': { target: 'http://other' },
      },
    });
  });

  it('creates a proxy without error when does not contain /api/ and includes pathRewrite', () => {
    const builder = new ConfigBuilder()
      .withApiURL('http://api')
      .withProxy('/other/', 'http://other', { '^/other/': '' });

    expect(builder.getObject()).toMatchObject({
      proxy: {
        '/other/': { target: 'http://other', pathRewrite: { '^/other/': '' } },
      },
    });

    expect(builder.getObject()).toMatchObject({
      proxy: {
        '/api/': { target: 'http://api' },
        '/other/': { target: 'http://other', pathRewrite: { '^/other/': '' } },
      },
    });
  });

  it('throws an error if attempting to create a title template string without %s', () => {
    try {
      new ConfigBuilder().withTitleTemplate('test');
    } catch (e) {
      expect(e.message).toBe(
        'You must provide a replacement key for the template. Use `%s` in your string.',
      );
    }
  });

  it('creates the title string if it contains %s', () => {
    const builder = new ConfigBuilder()
      .withApiURL('http://api')
      .withTitleTemplate('%s - My Community CAD');

    expect(builder).toBeInstanceOf(ConfigBuilder);

    expect(builder.getObject()).toMatchObject({
      head: {
        titleTemplate: '%s - My Community CAD',
      },
    });
  });

  it('merges theme config with existing theme config', () => {
    const builder = new ConfigBuilder()
      .withApiURL('http://api')
      .withCustomizedTheme({
        defaultAssets: {
          icons: 'fa' as IconPreset,
        },
      });

    expect(builder.getObject()).toMatchObject({
      vuetify: {
        defaultAssets: {
          // this is a default, we'll use it for testing the
          // defaultAssets object is properly merged without
          // overriding anything not specified.
          font: {
            family: 'Roboto',
          },
          icons: 'fa',
        },
      },
    });
  });

  it('adds a single extension', () => {
    const object = new ConfigBuilder()
      .withApiURL('http://api')
      .withExtension('name', {})
      .getObject();

    if (object.modules === undefined) {
      expect(false).toBe(true);

      return;
    }

    testExtensionExists(object.modules, ['name', {}]);
  });

  it('adds many extensions', () => {
    const object = new ConfigBuilder()
      .withApiURL('http://api')
      .withExtensions([
        {
          name: 'name',
          config: {},
        },
        {
          name: 'other',
          config: {},
        },
      ])
      .getObject();

    if (object.modules === undefined) {
      object.modules = [];
    }

    testExtensionExists(object.modules, ['name', {}]);
    testExtensionExists(object.modules, ['other', {}]);
  });
});

'use strict';

import ConfigBuilder from '../src';

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

  it('accepts and honors request for HTTP debugging when debug is set to true', () => {
    expect(
      new ConfigBuilder().withApiURL('http://api', true).getObject(),
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
      proxy: { '/other/': 'http://other' },
    });

    expect(builder.getObject()).toMatchObject({
      proxy: { '/api/': 'http://api', '/other/': 'http://other' },
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
});

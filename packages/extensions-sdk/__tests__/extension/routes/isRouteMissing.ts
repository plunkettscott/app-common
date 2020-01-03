import { isRouteMissing } from '../../../src';

describe('isRouteMissing', () => {
  it('correctly validates that a route is not missing from the route list', () => {
    expect(isRouteMissing([{ path: '/test' }], { path: '/test' })).toBe(true);
  });

  it('correctly validates that a route is missing from the route list', () => {
    expect(isRouteMissing([], { path: '/test' })).toBe(false);
  });
});

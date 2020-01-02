import { isMissing } from '../../../src/module/routes';

describe('isMissing routeUtility', () => {
  it('correctly validates that a route is not missing from the route list', () => {
    expect(isMissing([{ path: '/test' }], { path: '/test' })).toBe(true);
  });

  it('correctly validates that a route is missing from the route list', () => {
    expect(isMissing([], { path: '/test' })).toBe(false);
  });
});

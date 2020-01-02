import { NuxtRouteConfig } from '@nuxt/types/config/router';
import isEqual from 'lodash.isequal';

export default function isMissing(
  routes: NuxtRouteConfig[],
  routeTest: NuxtRouteConfig,
): boolean {
  let exists = false;
  routes.forEach((route: NuxtRouteConfig) => {
    if (isEqual(route, routeTest)) {
      exists = true;
    }
  });

  return exists;
}

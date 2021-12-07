import { removeFromLast } from './utils';
import { RouteItem } from '../types';

// @ts-expect-error ts-migrate(2366) FIXME: Function lacks ending return statement and return ... Remove this comment to see the full error message
export function findRouteByPath(path: string, routes: RouteItem[]): RouteItem {
  // eslint-disable-next-line
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, '.') === path) {
      return route;
    }
    const childPath = route.routes && findRouteByPath(path, route.routes);
    if (childPath) return childPath;
  }
}

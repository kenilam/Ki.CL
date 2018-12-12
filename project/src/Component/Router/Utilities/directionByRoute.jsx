import { view } from 'content/resources';

const routeIndex = { current: -1, previous: -1 };

const directionByRoute = ({ currentRoute }) => {
  let direction = '';

  routeIndex.current = Object.keys(view)
    .map(route => `/${route.split('/')[0]}`)
    .indexOf(`/${currentRoute.split('/')[1]}`);

  if (routeIndex.previous >= 0) {
    if (routeIndex.current > routeIndex.previous) {
      direction = 'transition-forward';
    }

    if (routeIndex.current < routeIndex.previous) {
      direction = 'transition-backward';
    }
  }

  routeIndex.previous = routeIndex.current;

  return direction;
};

export default directionByRoute;

import { Transition } from '@/Component'
import React, { FunctionComponent } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  HashRouter as Provider,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Spec from './spec';

const body = document.querySelector('body');

const getDataRoutes = (pathname: string) =>
  pathname.substr(1).replace('/', '.') || 'home';

function useUrlParams<T extends string>(names: T[]) {
  const { search } = useLocation();
  let result = {} as Spec.UrlParams<T>;

  search
    .slice(search.indexOf('?') + 1)
    .split('&')
    .filter((hash) => names.includes(hash.split('=')[0] as T))
    .forEach((hash) => {
      const [name, value] = hash.split('=');

      let params: Spec.UrlParam = Number(value) ? Number(value) : value;

      if (params === 'true') {
        params = true;
      }

      if (params === 'false') {
        params = false;
      }

      result = { ...result, [name]: params };
    });

  return result;
}

const Router: FunctionComponent<Spec.Props> = ({
  children: Component,
  onEnter: enterHandler,
  onExit: exitHandler,
  routeIndex,
  ...props
}) => {
  const location = useLocation();

  const onEnter: Spec.Enter = (node, isAppearing) => {
    if (enterHandler) {
      enterHandler(node, isAppearing);
    }

    body.dataset.enteredRoutes = getDataRoutes(pathname);
  };

  const onExit: Spec.Exit = (node) => {
    if (exitHandler) {
      exitHandler(node);
    }

    body.dataset.exitedRoutes = getDataRoutes(pathname);
  };

  const children = <Switch location={location}>{Component}</Switch>;

  const { pathname } = location;

  const transitionKey = pathname.split('/')[routeIndex + 1];

  return Transition({
    ...props,
    children,
    onEnter,
    onExit,
    transitionKey,
  });
};

export {
  Redirect,
  Route,
  Switch,
  Provider,
  useUrlParams,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
};

export default Router;

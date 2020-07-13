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
import { Enter, Exit, Props, UrlParams, UrlParam } from './spec';

const body = document.querySelector('body');

const getDataRoutes = (pathname: string) =>
  pathname.substr(1).replace('/', '.') || 'home';

function useUrlParams<T extends string>(names: T[]) {
  const { search } = useLocation();
  let result = {} as UrlParams<T>;

  search
    .slice(search.indexOf('?') + 1)
    .split('&')
    .filter((hash) => names.includes(hash.split('=')[0] as T))
    .forEach((hash) => {
      const [name, value] = hash.split('=');

      let params: UrlParam = Number(value) ? Number(value) : value;

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

const Router: FunctionComponent<Props> = ({
  children: Component,
  onEnter: enterHandler,
  onExit: exitHandler,
  routeIndex,
  transitionType: type,
  ...props
}) => {
  const location = useLocation();
  
  const { pathname } = location;

  const onEnter: Enter = (node, isAppearing) => {
    if (enterHandler && node) {
      enterHandler(node, isAppearing);
    }

    if (body.dataset.enteredRoutes) {
      body.dataset.exitedRoutes = body.dataset.enteredRoutes;
    }
    
    body.dataset.enteredRoutes = getDataRoutes(pathname);
  };

  const onExit: Exit = (node) => {
    if (exitHandler && node) {
      exitHandler(node);
    }

    body.dataset.exitedRoutes = getDataRoutes(pathname);
  };

  const children = <Switch location={location}>{Component}</Switch>;

  const transitionKey = pathname.split('/')[routeIndex + 1];

  return Transition({
    ...props,
    children,
    onEnter,
    onExit,
    transitionKey,
    type,
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

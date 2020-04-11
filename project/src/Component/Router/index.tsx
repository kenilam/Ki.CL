import resources from '$/resources';
import Transition from '@/Component/Transition';
import React from 'react';
import {
  HashRouter as Provider,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import IRouter from './spec';

const { view } = resources;

function useUrlParams<T>(): T {
  const { search } = useLocation();
  let result = {};

  search
    .slice(search.indexOf('?') + 1)
    .split('&')
    .forEach((hash) => {
      const [name, value]: IRouter.UrlParam[] = hash.split('=');

      let params: boolean | number | string = parseInt(value, 10)
        ? parseInt(value, 10)
        : value;

      if (params === 'true') {
        params = true;
      }

      if (params === 'false') {
        params = false;
      }

      result = { ...result, [name]: params };
    });

  return result as T;
}

const Router: React.FunctionComponent<IRouter.Props> = ({
  children,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  routeIndex,
  transitionType: type,
}) => {
  const childNodes = React.Children.map(
    children as IRouter.ChildNode,
    ({ props: { children } }) => children
  );

  const location = useLocation();

  const routes =
    location.pathname === view.home.path
      ? view.home.name.toLowerCase()
      : location.pathname.substr(1).replace(/\//g, '.');

  const EnterEvent = new Event(`${routes}.enter`);
  const EnteringEvent = new Event(`${routes}.entering`);
  const EnteredEvent = new Event(`${routes}.entered`);

  const ExitEvent = new Event(`${routes}.exit`);
  const ExitingEvent = new Event(`${routes}.exiting`);
  const ExitedEvent = new Event(`${routes}.exited`);

  const enterHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
    childNodes.forEach(({ props: { onEnter } }) => {
      if (onEnter) {
        onEnter(node, isAppearing);
      }
    });

    window.dispatchEvent(EnterEvent);
  };

  const enteringHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;

    if (onEntering) {
      onEntering(node, isAppearing);
    }

    childNodes.forEach(({ props: { onEntering } }) => {
      if (onEntering) {
        onEntering(node, isAppearing);
      }
    });

    window.dispatchEvent(EnteringEvent);
  };

  const enteredHandler: IRouter.OnEnter = (node, isAppearing) => {
    if (onEntered) {
      onEntered(node, isAppearing);
    }

    childNodes.forEach(({ props: { onEntered } }) => {
      if (onEntered) {
        onEntered(node, isAppearing);
      }
    });

    window.dispatchEvent(EnteredEvent);
  };

  const exitHandler: IRouter.OnExit = (node) => {
    document.body.dataset.exitedRoutes = routes;

    if (onExit) {
      onExit(node);
    }

    childNodes.forEach(({ props: { onExit } }) => {
      if (onExit) {
        onExit(node);
      }
    });

    window.dispatchEvent(ExitEvent);
  };

  const exitingHandler: IRouter.OnExit = (node) => {
    document.body.dataset.exitedRoutes = routes;

    if (onExiting) {
      onExiting(node);
    }

    childNodes.forEach(({ props: { onExiting } }) => {
      if (onExiting) {
        onExiting(node);
      }
    });

    window.dispatchEvent(ExitingEvent);
  };

  const exitedHandler: IRouter.OnExit = (node) => {
    if (onExited) {
      onExited(node);
    }

    childNodes.forEach(({ props: { onExited } }) => {
      if (onExited) {
        onExited(node);
      }
    });

    window.dispatchEvent(ExitedEvent);
  };

  return (
    <Transition
      onEnter={enterHandler}
      onEntering={enteringHandler}
      onEntered={enteredHandler}
      onExit={exitHandler}
      onExiting={exitingHandler}
      onExited={exitedHandler}
      key={location.pathname.split('/')[routeIndex] || '/'}
      type={type}
    >
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
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

import resources from '$/resources';
import {Transition} from '@/Component';
import React from 'react';
import {
  HashRouter as Provider,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch
} from 'react-router-dom';
import IRouter from './spec';

const {view} = resources;

const Router: React.FunctionComponent<IRouter.Props> = (
  {
    children,
    onEnter,
    onExit,
    routeIndex,
    transitionStyle,
    ...props
  }
) => {
  const location = useLocation();
  
  const routes = location.pathname === view.home.path
    ? view.home.name.toLowerCase()
    : location.pathname.substr(1).replace(/\//g, '.');
  
  const enterHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEnter && onEnter(node, isAppearing);
  };
  
  const exitHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExit && onExit(node);
  };
  
  return (
    <Transition
      {...props}
      transitionKey={location.pathname.split('/')[routeIndex + 1] || '/'}
      onEnter={enterHandler}
      onExit={exitHandler}
      classNames='keni'
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
  useHistory,
  useLocation,
  useRouteMatch
};

export default Router;

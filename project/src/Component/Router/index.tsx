import resources from '$/resources';
import {Transition} from '@/Component';
import * as History from 'history';
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
  const history = useHistory();
  const location = useLocation();
  
  const routes = location.pathname === view.home.path
    ? view.home.name.toLowerCase()
    : location.pathname.substr(1).replace(/\//g, '.');
  
  const onEnterHandler: IRouter.OnEnter = (node, done) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEnter && onEnter(node, done);
  };
  
  const onExitHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExit && onExit(node);
  };
  
  const style = transitionStyle instanceof Function
    ? transitionStyle({history, location})
    : transitionStyle;
  
  return (
    <Transition
      onEnter={onEnterHandler}
      onExit={onExitHandler}
      transitionKey={location.pathname.split('/')[routeIndex + 1] || '/'}
      transitionStyle={style}
      {...props}
    >
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
};

export {
  History,
  Redirect,
  Route,
  Switch,
  Provider,
  useHistory,
  useLocation,
  useRouteMatch
};

export default Router;

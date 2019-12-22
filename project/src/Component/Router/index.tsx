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
  useRouteMatch
} from 'react-router-dom';
import IRouter from './spec';

const {view} = resources;

const Router: React.FunctionComponent<IRouter.Props> = (
  {
    children,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    routeIndex,
    transitionStyle,
    ...props
  }
) => {
  const childNodes = React.Children.map(
    (
      children as IRouter.ChildNode
    ),
    ({props: {children}}) => children
  );
  
  const location = useLocation();
  
  const routes = location.pathname === view.home.path
    ? view.home.name.toLowerCase()
    : location.pathname.substr(1).replace(/\//g, '.');
  
  const enterHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEnter && onEnter(node, isAppearing);
    
    childNodes.forEach(
      ({props}) => {
        props.onEnter && props.onEnter(node, isAppearing);
      }
    );
  };
  
  const enteringHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEntering && onEntering(node, isAppearing);
    
    childNodes.forEach(
      ({props}) => {
        props.onEntering && props.onEntering(node, isAppearing);
      }
    );
  };
  
  const enteredHandler: IRouter.OnEnter = (node, isAppearing) => {
    childNodes.forEach(
      ({props}) => {
        props.onEntered && props.onEntered(node, isAppearing);
      }
    );
  };
  
  const exitHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExit && onExit(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExit && props.onExit(node);
      }
    );
  };
  
  const exitingHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExiting && onExiting(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExiting && props.onExiting(node);
      }
    );
  };
  
  const exitedHandler: IRouter.OnExit = node => {
    onExited && onExited(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExited && props.onExited(node);
      }
    );
  };
  
  return (
    <Transition
      {...props}
      onEnter={enterHandler}
      onEntering={enteringHandler}
      onEntered={enteredHandler}
      onExit={exitHandler}
      onExiting={exitingHandler}
      onExited={exitedHandler}
      transitionKey={location.pathname.split('/')[routeIndex + 1] || '/'}
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

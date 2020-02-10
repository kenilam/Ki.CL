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

const {view} = resources;

function getUrlParams<T>(): T {
  const {search} = useLocation();
  let result = {};
  
  search.slice(search.indexOf('?') + 1).split('&')
    .forEach(hash => {
      let [name, value]: IRouter.UrlParam[] = hash.split('=');
      
      value = parseInt(value) ? parseInt(value) : value;
      
      if (value === 'true') {
        value = true;
      }
      
      if (value === 'false') {
        value = false;
      }
  
      result = Object.assign(result, { [name]: value });
    });
  
  return result as T;
}

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
  
  const EnterEvent = new Event(`${routes}.enter`);
  const EnteringEvent = new Event(`${routes}.entering`);
  const EnteredEvent = new Event(`${routes}.entered`);
  
  const ExitEvent = new Event(`${routes}.exit`);
  const ExitingEvent = new Event(`${routes}.exiting`);
  const ExitedEvent = new Event(`${routes}.exited`);
  
  const enterHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEnter && onEnter(node, isAppearing);
    
    childNodes.forEach(
      ({props}) => {
        props.onEnter && props.onEnter(node, isAppearing);
      }
    );
    
    window.dispatchEvent(EnterEvent);
  };
  
  const enteringHandler: IRouter.OnEnter = (node, isAppearing) => {
    document.body.dataset.enteredRoutes = routes;
    
    onEntering && onEntering(node, isAppearing);
    
    childNodes.forEach(
      ({props}) => {
        props.onEntering && props.onEntering(node, isAppearing);
      }
    );
  
    window.dispatchEvent(EnteringEvent);
  };
  
  const enteredHandler: IRouter.OnEnter = (node, isAppearing) => {
    childNodes.forEach(
      ({props}) => {
        props.onEntered && props.onEntered(node, isAppearing);
      }
    );
  
    window.dispatchEvent(EnteredEvent);
  };
  
  const exitHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExit && onExit(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExit && props.onExit(node);
      }
    );
  
    window.dispatchEvent(ExitEvent);
  };
  
  const exitingHandler: IRouter.OnExit = node => {
    document.body.dataset.exitedRoutes = routes;
    
    onExiting && onExiting(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExiting && props.onExiting(node);
      }
    );
  
    window.dispatchEvent(ExitingEvent);
  };
  
  const exitedHandler: IRouter.OnExit = node => {
    onExited && onExited(node);
    
    childNodes.forEach(
      ({props}) => {
        props.onExited && props.onExited(node);
      }
    );
  
    window.dispatchEvent(ExitedEvent);
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
  getUrlParams,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
};

export default Router;

import resources from '$/resources';
import {Transition} from '@/Component';
import * as History from 'history';
import React from 'react';
import {HashRouter as Provider, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import IRouter from './spec';

const {view} = resources;

let cache: IRouter.Cache;

const Router: React.FunctionComponent<IRouter.Props> = (
  {
    appear,
    classNames,
    children,
    component,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExiting,
    onExited,
    routeIndex,
    transitionIn,
    transitionStyle,
    unmountOnExit,
  }
) => {
  const Component: React.FunctionComponent<IRouter.Component> = (
    {
      children, ...props
    }
  ) => {
    let enterFrame: number;
    let exitFrame: number;
    
    const {history: {location: {pathname}}, location} = props;
    
    const routes = pathname === view.home.path
      ? view.home.name.toLowerCase()
      : pathname.substr(1).replace(/\//g, '.');
    
    const onEnterHandler: IRouter.OnEnter = (node, done) => {
      document.body.dataset.enteredRoutes = routes;
      
      window.cancelAnimationFrame(enterFrame);
      
      if (!onEnter) {
        return;
      }
      
      enterFrame = window.requestAnimationFrame(
        () => {
          onEnter(node, done);
        }
      );
    };
    
    const onExitHandler: IRouter.OnExit = node => {
      document.body.dataset.exitedRoutes = routes;
      
      window.cancelAnimationFrame(exitFrame);
      
      if (!onExit) {
        return;
      }
      
      exitFrame = window.requestAnimationFrame(
        () => {
          onExit(node);
        }
      );
    };
    
    const style = transitionStyle instanceof Function ? transitionStyle(props, cache) : transitionStyle;
    
    cache = props;
    
    return (
      <Transition
        appear={appear}
        classNames={classNames}
        component={component}
        onEnter={onEnterHandler}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExitHandler}
        onExiting={onExiting}
        onExited={onExited}
        transitionIn={transitionIn}
        transitionKey={location.pathname.split('/')[routeIndex + 1] || '/'}
        transitionStyle={style}
        unmountOnExit={unmountOnExit}
      >
        <Switch location={location}>{children}</Switch>
      </Transition>
    );
  };
  
  const Instance = withRouter(Component);
  
  return (
    <Provider>
      <Instance>{children}</Instance>
    </Provider>
  );
};

export {History, Redirect, Route, Switch, Provider, withRouter};

export default Router;

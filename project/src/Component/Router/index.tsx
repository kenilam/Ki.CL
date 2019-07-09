import resources from '$/resources';
import {Transition} from '@/Component';
import React from 'react';
import {HashRouter as Provider, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import * as IRouter from './spec';

const {view} = resources;

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
    transitionStyle
  }
) => {
  const Component: React.FunctionComponent<IRouter.Component> = (
    {
      children, history: {location: {pathname}}, location
    }
  ) => {
    let enterFrame: number;
    let exitFrame: number;
    
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
        transitionStyle={transitionStyle}
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

export {Redirect, Route, Switch, Provider, withRouter};

export default Router;

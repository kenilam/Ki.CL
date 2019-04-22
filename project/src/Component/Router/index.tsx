import {Transition} from '@Component';
import React from 'react';
import {HashRouter as RouterProvider, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {IComponent, IProps} from './spec';

const Router: React.FC<IProps> = ({
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
}) => {
  const Component: React.FC<IComponent> = ({
    children, location
  }) => {
    return (
      <Transition
        appear={appear}
        classNames={classNames}
        component={component}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
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
    <RouterProvider>
      <Instance>{children}</Instance>
    </RouterProvider>
  );
};

export {Redirect, Route, Switch, RouterProvider, withRouter};

export default Router;

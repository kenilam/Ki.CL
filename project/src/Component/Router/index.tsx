import {Transition} from '@Component';
import React from 'react';
import {HashRouter as Provider, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import * as IRouter from './spec';

const Router: React.FC<IRouter.Props> = ({
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
  const Component: React.FC<IRouter.Component> = ({
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
    <Provider>
      <Instance>{children}</Instance>
    </Provider>
  );
};

export {Redirect, Route, Switch, Provider, withRouter};

export default Router;

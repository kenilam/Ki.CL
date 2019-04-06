import {Transition} from '@Component';
import * as React from 'react';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {IComponent, IProps} from './spec';

const Router: React.FunctionComponent<IProps> = ({
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
  transitionIn
}) => {
  const Component: React.FunctionComponent<IComponent> = ({
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
      >
        <Switch location={location}>{children}</Switch>
      </Transition>
    );
  };
  
  const Instance = withRouter(Component);
  
  return (
    <HashRouter>
      <Instance>{children}</Instance>
    </HashRouter>
  );
};

export {Redirect, Route, Switch, HashRouter as Router};

export default Router;

import * as React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

import { Transition } from '@Component';

import { IComponent, IProps } from './spec';
import { bodyAttribute } from './Utility';

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
  routeIndex = 0,
  transitionIn
}) => {
  const Component: React.FunctionComponent<IComponent> = ({
    children,
    location
  } ) => {
    const onEnterHandler: EnterHandler = ( node, isAppearing ) => {
      bodyAttribute.add( 'enter', location );

      onEnter && onEnter( node, isAppearing );
    };
    const onExitHandler: ExitHandler = ( node ) => {
      bodyAttribute.add( 'exit', location );

      onEnter && onExit( node );
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
        transitionKey={location.pathname.split( '/' )[routeIndex + 1] || '/'}
      >
        <Switch location={location}>{children}</Switch>
      </Transition>
    );
  }

  const Instance = withRouter(Component);

  return (
    <HashRouter>
      <Instance>{children}</Instance>
    </HashRouter>
  );
};

export { Route, Switch };

export default Router;

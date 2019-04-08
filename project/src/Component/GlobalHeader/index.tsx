import {view} from '$resources/data.json';
import {CSSTransition, Logo} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import {RouterProvider, withRouter} from '@Component/Router';
import * as React from 'react';
import {IComponent, IProps} from './spec';
import Style from './Style';

const {home: {path}} = view;

const Component: React.FC<IComponent> = ({
  location
}) => (
  <CSSTransition
    transitionIn={location.pathname !== path}
    transitionStyle={TransitionStyleName.slideUp}
  >
    <header role='banner' className={Style.globalHeader}>
      <Logo />
    </header>
  </CSSTransition>
);

const Instance = withRouter(Component);

const GlobalHeader: React.FC<IProps> = () => (
  <RouterProvider>
    <Instance />
  </RouterProvider>
);

export default GlobalHeader;

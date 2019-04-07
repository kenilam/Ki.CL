import {view} from '$resources/data.json';
import {CSSTransition, Logo} from '@Component';
import {RouterProvider, withRouter} from '@Component/Router';
import * as React from 'react';
import {IComponent, IProps} from './spec';
import Style from './Style';

const {home: {path}} = view;

const Component: React.FC<IComponent> = ({
  location
}) => (
  <RouterProvider>
    <CSSTransition transitionIn={location.pathname !== path} transitionStyle='slideUp'>
      <header role='banner' className={Style.globalHeader}>
        <Logo />
      </header>
    </CSSTransition>
  </RouterProvider>
);

const Instance = withRouter(Component);

const GlobalHeader: React.FC<IProps> = () => (
  <RouterProvider>
    <Instance />
  </RouterProvider>
);

export default GlobalHeader;

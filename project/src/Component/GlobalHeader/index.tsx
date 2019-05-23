import {CSSTransition, Logo} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import {Provider, withRouter} from '@Component/Router';
import React from 'react';
import * as IGlobalHeader from './spec';
import Style from './Style';

const Component: React.FunctionComponent<IGlobalHeader.Component> = ({
  location,
  transitionInPaths
}) => (
  <CSSTransition
    transitionIn={transitionInPaths.indexOf(location.pathname) > -1}
    transitionStyle={TransitionStyleName.slideDown}
  >
    <header role='banner' data-component={Style.default}>
      <Logo />
    </header>
  </CSSTransition>
);

const Instance = withRouter(Component);

const GlobalHeader: React.FunctionComponent<IGlobalHeader.Props> = ({transitionInPaths}) => (
  <Provider>
    <Instance transitionInPaths={transitionInPaths} />
  </Provider>
);

export default GlobalHeader;

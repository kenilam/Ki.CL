import {CSSTransition, Logo} from '@Component';
import {TransitionStyleName} from '@Component/CSSTransition';
import {Provider, withRouter} from '@Component/Router';
import React from 'react';
import * as IGlobalHeader from './spec';
import Style from './Style';

const Component: React.FC<IGlobalHeader.Component> = ({
  location,
  transitionInPaths
}) => (
  <CSSTransition
    transitionIn={transitionInPaths.indexOf(location.pathname) > -1}
    transitionStyle={TransitionStyleName.slideUp}
  >
    <header role='banner' className={Style.globalHeader}>
      <Logo />
    </header>
  </CSSTransition>
);

const Instance = withRouter(Component);

const GlobalHeader: React.FC<IGlobalHeader.Props> = ({transitionInPaths}) => (
  <Provider>
    <Instance transitionInPaths={transitionInPaths} />
  </Provider>
);

export default GlobalHeader;

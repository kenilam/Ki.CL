// @flow
import React from 'react';

import State, { Connector } from 'State';
import View from 'View';

import { GlobalHeader } from 'Component';

import './style.scss';

type Style = { paddingTop: Number };

type UpdateStyle = { height: Number };

type Props = {
  style?: Style,
  updateStyle?: (props: UpdateStyle) => void
};

const Component = ({ style, updateStyle }: Props) => {
  const resizeHandler = ({ height } = {}) => {
    updateStyle({ paddingTop: height });
  }

  return (
    <React.Fragment>
      <GlobalHeader resizeHandler={ resizeHandler } />
      <View style={ style } />
    </React.Fragment>
  )
};

Component.defaultProps = {
  style: { paddingTop : 0 },
  updateStyle: () => {}
}

const Instance = Connector(Component);

const App = () => (
  <State>
    <Instance />
  </State>
);

const appRoot = document.querySelector('[app-root]');

export { appRoot };
export default App;

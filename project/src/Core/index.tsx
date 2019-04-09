import * as React from 'react';
import {lifecycle, methods, staticMethods} from './Method';
import {loadPolyfill} from './Polyfill';
import {IProps} from './spec';
import State from './State';
import './Style';

@lifecycle(methods)
class Core extends React.PureComponent<IProps> {
  static getDerivedStateFromError = staticMethods.getDerivedStateFromError;
  
  render() {
    const {children} = this.props;
    return (
      <State>{children}</State>
    );
  }
}

export {loadPolyfill};
export default Core;

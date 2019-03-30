import { IProps, IState } from '@Core/typings';

import * as React from 'react';

import State from './State';
import { loadPolyfill } from './Polyfill';

import './Style';

class Core extends React.PureComponent<IProps, IState> {
  public static getDerivedStateFromError(errors: any) {
    return { errors };
  }

  public componentDidCatch(errors: any, info: any) {
    console.error(errors, info);
  }

  public render() {
    const { children } = this.props;
    return <State>{children}</State>;
  }
}
export { loadPolyfill };
export default Core;

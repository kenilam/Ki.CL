import * as React from 'react';
import History from './History';
import {loadPolyfill} from './Polyfill';
import {IProps, IState} from './spec';
import State from './State';
import './Style';

class Core extends React.PureComponent<IProps, IState> {
  public static getDerivedStateFromError(error: Error) {
    return {error};
  }
  
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }
  
  public componentDidMount(): void {
    History.create();
  }
  
  public componentWillUnmount(): void {
    History.remove();
  }
  
  public render() {
    const {children} = this.props;
    
    return <State>{children}</State>;
  }
}

export {loadPolyfill};
export default Core;

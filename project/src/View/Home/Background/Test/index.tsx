import autobind from "autobind-decorator";
import React from 'react';
import {Node} from '@/Component/WebGL';
import ITest from './spec';
import Shader from './Shader';

class Index extends React.PureComponent<ITest.Props, ITest.State> {
  public state: ITest.State = {
    blue: 0,
    increment: true
  };
  
  private setBlueFrame: number;
  
  @autobind
  private updateBlue() {
    this.setState(
      ({blue, increment}: ITest.State) => ({
        blue: blue + ((increment? 1 : -1) * 0.001)
      }),
      this.shouldIncrement
    );
    
    this.setBlueFrame = window.requestAnimationFrame(this.updateBlue);
  }
  
  private shouldIncrement() {
    const {blue} = this.state;
    
    if (blue <= 0) {
      this.setState({increment: true});
    }
    
    if (blue >= 1) {
      this.setState({increment: false});
    }
  }
  
  public componentDidMount(): void {
    this.updateBlue();
  }
  
  public componentWillUnmount(): void {
    window.cancelAnimationFrame(this.setBlueFrame);
  }
  
  public render() {
    const {blue} = this.state;
    
    return (
      <Node
        shader={Shader.helloBlue}
        uniforms={{blue}}
      />
    );
  }
}

export default Index;

import autobind from "autobind-decorator";
import React from 'react';
import {Node} from '@/Component/WebGL';
import ITest from './spec';
import Shader from './Shader';

class Index extends React.PureComponent<ITest.Props, ITest.State> {
  public state: ITest.State = {
    time: 0,
    increment: true
  };
  
  private setBlueFrame: number;
  
  @autobind
  private updateBlue() {
    this.setState(
      ({time, increment}: ITest.State) => ({
        time: time + (increment? 1 : -1)
      }),
      this.shouldIncrement
    );
    
    this.setBlueFrame = window.requestAnimationFrame(this.updateBlue);
  }
  
  private shouldIncrement() {
    const {time} = this.state;
    const {
      innerHeight: height,
      innerWidth: width
    } = window;
    
    const limit = height > width ? width : height;
    
    if (time <= 0) {
      this.setState({increment: true});
    }
    
    if (time >= limit) {
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
    const {time} = this.state;
    
    const colors = [
      [ Math.cos(0.002*time), Math.sin(0.002*time), 0.2, 1 ],
      [ Math.sin(0.002*time), -Math.cos(0.002*time), 0.1, 1 ],
      [ 0.3, Math.sin(3+0.002*time), Math.cos(1+0.003*time), 1 ]
    ];
    
    const particles = [
      [ 0.3, 0.3 ],
      [ 0.7, 0.5 ],
      [ 0.4, 0.9 ]
    ];
    
    return (
      <Node
        shader={Shader.gradients}
        uniforms={{colors, particles}}
      />
    );
  }
}

export default Index;

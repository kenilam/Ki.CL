import autobind from "autobind-decorator";
import React from 'react';
import {Shaders, Node, GLSL} from '@/Component/WebGL';

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

interface State {
  blue: number,
  increment: boolean
}

interface Props {

}

class Test extends React.PureComponent<Props, State> {
  public state: State = {
    blue: 0,
    increment: true
  };
  
  private setBlueFrame: number;
  
  @autobind
  private updateBlue() {
    this.setState(
      ({blue, increment}: State) => ({
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
        shader={shaders.helloBlue}
        uniforms={{blue}}
      />
    );
  }
}

export default Test;

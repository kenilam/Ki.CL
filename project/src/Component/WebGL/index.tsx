import autobind from "autobind-decorator";
import {WebGLRendererParameters} from "three";
import * as IWebGL from './spec';
import React, {createRef} from 'react';
import * as THREE from 'three';
import Style from './Style';

const FAR = 10000;
const FOV = 35;
const NEAR = 0.1;
const RENDERER: WebGLRendererParameters = {
  alpha: true,
  antialias: true
};

class WebGL extends React.PureComponent<IWebGL.Props> {
  private ref = createRef<HTMLCanvasElement>();
  
  private animateFrame: number;
  private get aspect() {
    const {height, width} = this.props;
    
    return width / height;
  }
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  
  @autobind
  private animate() {
    const {height, scenes, width} = this.props;
  
    this.componentWillUnmount();
  
    this.camera = new THREE.PerspectiveCamera(FOV, this.aspect,  NEAR,  FAR);
    this.camera.position.set( 0, 0, 500 );
    
    this.scene = new THREE.Scene();
    this.scene.autoUpdate = true;
    
    if (scenes) {
      this.scene.add(...scenes.map(({graphic}) => graphic));
  
      scenes.forEach(
        ({render}) => {
          render && render();
        }
      );
    }
    
    this.renderer.setSize(width, height);
    this.renderer.render(this.scene, this.camera);
    
    this.animateFrame = window.requestAnimationFrame(this.animate);
  }
  
  public componentDidMount(): void {
    const {current: canvas} = this.ref;
    
    this.renderer = new THREE.WebGLRenderer({ ...RENDERER, canvas });
    this.renderer.autoClear = true;
    
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    this.animate();
  }
  
  
  public componentWillUnmount(): void {
    if (this.scene) {
      this.scene.dispose();
    }
    
    this.renderer.state.reset();
    this.renderer.renderLists.dispose();
    
    window.cancelAnimationFrame(this.animateFrame);
  }
  
  public render() {
    return (
      <canvas data-component={Style.default} ref={this.ref} />
    )
  }
}

export {THREE};
export default WebGL;


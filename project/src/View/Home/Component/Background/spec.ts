import {gsap} from "@Component/WebGL";
import * as IWebGL from "@Component/WebGL/spec";

declare module IBackground {
  interface ClassName extends IClassNames, PIXI.TextStyle {
    default: string;
  }
  
  module Animator {
    type Alpha = number;
    type Height = number;
    type Radius = number;
    type Width = number;
    type X = number;
    type Y = number;
    
    type Generator = (updateHandler: UpdateHandler) => Sequence;
    
    type Sequence = IWebGL.TweenSequence;
    
    type UpdateHandler = (props: Values) => void;
    
    interface Values extends gsap.TweenConfig {
      alpha: Alpha;
      height: Height;
      radius: Radius;
      width: Width;
      x: X;
      y: Y;
    }
  }
  
  type DrawGraphics = (values: Animator.Values) => void;
  
  type Renderer = IWebGL.RendererState;
  
  interface Props {
    onCompleteHandler?: () => void;
    zoomIn: boolean;
  }
}

export = IBackground;

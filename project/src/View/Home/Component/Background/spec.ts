import { gsap } from "@Component/WebGL";
import * as IWebGL from "@Component/WebGL/spec";

declare module IBackground {
  type Alpha = number;
  type Height = number;
  type Radius = number;
  type Width = number;
  type X = number;
  type Y = number;

  interface Values extends gsap.TweenConfig {
    alpha: Alpha;
    height: Height;
    radius: Radius;
    width: Width;
    x: X;
    y: Y;
  }

  interface ClassName extends IClassNames, PIXI.TextStyle {
    default: string;
  }

  module Animator {

    type Generator = (props: GeneratorProps) => Sequence;

    interface ValuesProps {
      onComplete?: Handler,
      onStart?: Handler,
      onUpdate?: Handler,
    }

    interface GeneratorProps {
      onUpdate: Handler,
      onZoomInComplete?: Handler,
      onZoomInStart?: Handler,
      onZoomInUpdate?: Handler,
      onZoomOutComplete?: Handler,
      onZoomOutStart?: Handler,
      onZoomOutUpdate?: Handler,
    }

    type Sequence = IWebGL.TweenSequence;

    type Handler = (props: Values) => void;
  }

  module Graphics {
    type Props = (values: Values) => void;
  }

  type Renderer = IWebGL.RendererState;

  interface Props {
    onComplete?: () => void;
    zoomIn: boolean;
  }
}

export = IBackground;

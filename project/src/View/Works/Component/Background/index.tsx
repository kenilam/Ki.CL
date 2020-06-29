import WebGL, { GLSL, Node, Shaders } from '@/Component/WebGL';
import React, { FunctionComponent } from 'react';
import Spec from './spec';
import { WindowSizes } from '@/Hook';

const { graphic } = Shaders.create({
  graphic: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float blue;
      void main() {
        gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
      }
    `
  }
});

const uniforms = { blue: 0.5 };

const Background: FunctionComponent<Spec.Props> = () => {
  const { sizes: { height, width } } = WindowSizes();
  
  return (
    <WebGL height={height} width={width}>
      <Node shader={graphic} uniforms={uniforms}/>
    </WebGL>
  );
}

export default Background;

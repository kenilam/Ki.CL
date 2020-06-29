import WebGL, { GLSL, Node, Shaders } from '@/Component/WebGL';
import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import Spec from './spec';
import { WindowSizes } from '@/Hook';
import { RandomNumber } from '@/Helper';

const RATE = 0.001;

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

const Background: FunctionComponent<Spec.Props> = () => {
  const [ blue, setBlue ] = useState(RandomNumber() / 100);
  const [ plus, shouldAdd ] = useState(true); 
  const { sizes: { height, width } } = WindowSizes();

  let timer: number;

  const update = useCallback(
    () => {
      if (plus) {
        setBlue(
          last => last + RATE
        );

        return;
      }
      
      setBlue(
        last => last - RATE
      );
    },
    [ plus ]
  );

  useEffect(
    () => {
      if (blue >= 1) {
        shouldAdd(false);
      }

      if (blue <= 0) {
        shouldAdd(true);
      }
    },
    [ blue ]
  );

  useEffect(
    () => {
      timer = window.setInterval(update, 20);

      return () => {
        window.clearInterval(timer);
      }
    }
  );
  
  const uniforms = { blue };
  
  return (
    <WebGL height={height} width={width}>
      <Node shader={graphic} uniforms={uniforms}/>
    </WebGL>
  );
}

export default Background;

import WebGL, { GLSL, Node, Shaders } from '@/Component/WebGL';
import React, { FunctionComponent, useCallback, useState, useEffect } from 'react';
import { Props } from './spec';
import { useWindowSizes } from '@/Hook';
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

const Background: FunctionComponent<Props> = () => {
  const [ blue, setBlue ] = useState(RandomNumber() / 100);
  const [ plusBlue, increaseBlue ] = useState(true); 
  const { sizes: { height, width } } = useWindowSizes();

  let timer: number;

  const update = useCallback(
    () => {
      if (plusBlue) {
        setBlue(
          last => last + RATE
        );

        return;
      }
      
      setBlue(
        last => last - RATE
      );
    },
    [ plusBlue ]
  );

  useEffect(
    () => {
      if (blue >= 1) {
        increaseBlue(false);
      }

      if (blue <= 0) {
        increaseBlue(true);
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

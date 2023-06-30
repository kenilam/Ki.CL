/* eslint-disable react/no-unknown-property */
import React from 'react';

// Three
import { a, useSpring } from '@/Three';

const FRICTION = 20;

const POSITION = 0;

const SPRING = {
  up: {
    position: [POSITION, POSITION, POSITION],
    config: { friction: FRICTION },
  },
  default: {
    position: [POSITION, POSITION, -1],
    config: { friction: FRICTION },
  },
};

const Shadow: React.FunctionComponent = () => {
  const [spring] = useSpring(() => SPRING.default);

  return (
    <a.mesh {...spring} receiveShadow>
      <planeBufferGeometry args={[100, 100, 1, 1]} />
      <meshPhongMaterial transparent opacity={1} depthWrite={false} />
    </a.mesh>
  );
};

export default Shadow;

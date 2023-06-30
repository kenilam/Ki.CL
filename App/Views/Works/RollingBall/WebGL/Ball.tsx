/* eslint-disable react/no-unknown-property */
import React from 'react';

// Three
import { a, useGesture, useSpring, useThree } from '@/Three';

const FRICTION = 15;

const POSITION = 0;

const ROTATION = 0;

const SCALE = 0.5;
const SCALE_UP = 0.8;

const SPRING = {
  up: {
    scale: SCALE_UP,
    position: [POSITION, POSITION, -1 + SCALE_UP / SCALE],
  },
  default: {
    scale: SCALE,
    position: [POSITION, POSITION, POSITION],
    rotation: [ROTATION, ROTATION, ROTATION],
    config: { friction: FRICTION },
  },
};

const Ball: React.FunctionComponent = () => {
  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => SPRING.default);

  const bind = useGesture({
    onDrag({ hovering, offset: [x, y] }) {
      set({
        position: [
          x / aspect,
          -y / aspect,
          SPRING[hovering ? 'up' : 'default'].position[2],
        ],
        rotation: [y / aspect, x / aspect, 0],
      });
    },
    onHover({ hovering }) {
      const position = spring.position.animation.to;

      set({
        position: [
          position[0],
          position[1],
          SPRING[hovering ? 'up' : 'default'].position[2],
        ],
        scale: SPRING[hovering ? 'up' : 'default'].scale,
      });
    },
  });

  return (
    <a.mesh {...spring} {...bind()} castShadow>
      <dodecahedronBufferGeometry args={[2, 5]} />
      <meshNormalMaterial wireframe vertexColors transparent />
    </a.mesh>
  );
};

export default Ball;

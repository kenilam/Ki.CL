import React, { useMemo } from 'react';

// Three
import { Drei } from '@/three';

// Stage
import {
  DEPTH,
  toX,
  type Span,
} from '@/views/experiments/kinetic-light/stage/layout';
import type { Palette } from '@/views/experiments/kinetic-light/stage/palette';

type Props = {
  palette: Palette;
  span: Span;
};

const OCTAVE = 12;
const MARGIN = 20;
const LINE = 0.015;
const HIT_GLOW = 2;

const Highway: React.FunctionComponent<Props> = ({ palette, span }) => {
  const lanes = useMemo(() => {
    const first = Math.ceil(span.low / OCTAVE) * OCTAVE;

    return Array.from(
      { length: Math.floor((span.high - first) / OCTAVE) + 1 },
      (_, index) => toX(first + index * OCTAVE, span)
    );
  }, [span]);
  const hit = useMemo(
    () => palette.hit.clone().multiplyScalar(HIT_GLOW),
    [palette]
  );

  return (
    <>
      <mesh position={[0, -0.01, -DEPTH / 2]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[span.width + MARGIN * 2, DEPTH + MARGIN]} />
        <Drei.MeshReflectorMaterial
          blur={[300, 80]}
          color={palette.paper}
          depthScale={1}
          maxDepthThreshold={1.2}
          metalness={0.6}
          minDepthThreshold={0.3}
          mirror={0.6}
          mixBlur={1}
          mixStrength={20}
          resolution={512}
          roughness={1}
        />
      </mesh>
      {[...new Set([...lanes, -span.width / 2, span.width / 2])].map((x) => (
        <mesh key={x} position={[x, 0.001, -DEPTH / 2]}>
          <boxGeometry args={[LINE, LINE / 10, DEPTH]} />
          <meshBasicMaterial color={palette.lane} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[span.width, LINE, LINE * 3]} />
        <meshBasicMaterial color={hit} toneMapped={false} />
      </mesh>
    </>
  );
};

export { Highway };

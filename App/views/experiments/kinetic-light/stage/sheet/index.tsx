import React, { useEffect, useMemo, useRef } from 'react';

// Libraries
import {
  SVGLoader,
  type StrokeStyle,
} from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import { readPalette } from '@/views/experiments/kinetic-light/stage/palette';
import {
  SCALE,
  localOf,
  roundOf,
  widthOf,
} from '@/views/experiments/kinetic-light/stage/playhead';

type Style = StrokeStyle & { fill?: string; stroke?: string };

const LIFT = 0.002;
const ROUNDS = [-1, 0];
const FADE_SECONDS = 1.2;

type Copy = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;

const toGeometry = (svg: string): THREE.BufferGeometry | null => {
  const { paths } = new SVGLoader().parse(svg);
  const pieces = paths.flatMap((path) => {
    const style = path.userData.style as Style;
    const { fill, stroke } = style;
    const filled =
      fill && fill !== 'none'
        ? SVGLoader.createShapes(path).map(
            (shape) => new THREE.ShapeGeometry(shape)
          )
        : [];
    const stroked =
      stroke && stroke !== 'none'
        ? path.subPaths.map((subPath) =>
            SVGLoader.pointsToStroke(subPath.getPoints(), style)
          )
        : [];

    return [...filled, ...stroked];
  });

  const flat = pieces.flatMap((piece) => {
    const plain = piece.index ? piece.toNonIndexed() : piece;
    const position = plain.getAttribute('position');

    if (!position?.count) {
      return [];
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', position);

    return [geometry];
  });

  return flat.length ? mergeGeometries(flat) : null;
};

const Sheet: React.FunctionComponent = () => {
  const { clock, sheet, timing } = useStageContext();
  const { gl } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const geometry = useMemo(() => toGeometry(sheet.svg), [sheet]);
  const copies = useRef<THREE.Group>(null);

  useEffect(() => () => geometry?.dispose(), [geometry]);

  Fiber.useFrame(() => {
    const now = clock();
    const round = roundOf(now, timing);
    const entering =
      round === 0
        ? 1
        : Math.min(1, (localOf(now, timing) + timing.descent) / FADE_SECONDS);

    copies.current?.children.forEach((child, index) => {
      const copy = child as Copy;
      const shown = round + ROUNDS[index];
      let opacity = 0;

      if (shown >= 0 && shown < round) {
        opacity = 1;
      }

      if (shown === round) {
        opacity = entering;
      }

      copy.position.x = shown * widthOf(sheet);
      copy.material.opacity = opacity;
      copy.visible = opacity > 0;
    });
  });

  if (!geometry) {
    return null;
  }

  return (
    <group ref={copies}>
      {ROUNDS.map((round) => (
        <mesh
          geometry={geometry}
          key={round}
          position-y={LIFT}
          rotation-x={Math.PI / 2}
          scale={SCALE}
        >
          <meshBasicMaterial
            color={palette.ink}
            side={THREE.DoubleSide}
            toneMapped={false}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
};

export { Sheet };

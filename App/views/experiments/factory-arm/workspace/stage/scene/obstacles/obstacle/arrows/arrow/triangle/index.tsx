import React from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Partials
import { useLook } from './use-look';
import { useNudge } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/use-nudge';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Constants
import { WAYS } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/arrows/ways';

/** A triangle pointing along +x from its base at the origin, flat in the xy plane. */
const TRIANGLE = new THREE.ShapeGeometry(
  new THREE.Shape().moveTo(0, -0.1).lineTo(0.18, 0).lineTo(0, 0.1).closePath()
);

type Props = Pick<Solid, 'id'> & Pick<(typeof WAYS)[number], 'axis'>;

/** A translucent grey triangle, green while the obstacle moves its way. Clicking it moves it a step. */
const Triangle: React.FunctionComponent<Props> = ({ axis, id }) => {
  const nudge = useNudge();
  const material = useLook(id, axis);
  const { rotation, way } = WAYS.find((each) => {
    return each.axis === axis;
  })!;

  return (
    <mesh
      geometry={TRIANGLE}
      material={material}
      onClick={(event: Fiber.ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        nudge(id, way);
      }}
      onPointerOut={() => (document.body.style.cursor = '')}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      rotation={rotation}
    />
  );
};

export { Triangle };

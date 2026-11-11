import React from 'react';

// Three
import { THREE } from '@/three';

// Partials
import { ALERT, useSight } from './use-sight';

// Constants
import {
  CONE,
  RANGE,
  SENSORS,
  type Sensor,
} from '@/views/experiments/factory-arm/engine/sensors';

const UP = new THREE.Vector3(0, 1, 0);

type Props = Pick<Sensor, 'id'>;

/**
 * One sensor, as a small puck facing the way it looks. While it sees
 * something it lights red and shows its reach as a faint half sphere.
 */
const Mount: React.FunctionComponent<Props> = ({ id }) => {
  const { direction, position } = SENSORS.find((sensor) => sensor.id === id)!;
  const { puck, view } = useSight(id);

  return (
    <group
      position={position}
      quaternion={new THREE.Quaternion().setFromUnitVectors(
        UP,
        new THREE.Vector3(...direction).normalize()
      )}
    >
      <mesh material={puck}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 20]} />
      </mesh>
      <mesh ref={view} visible={false}>
        <sphereGeometry args={[RANGE, 24, 12, 0, Math.PI * 2, 0, CONE]} />
        <meshBasicMaterial
          color={ALERT}
          depthWrite={false}
          opacity={0.08}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
    </group>
  );
};

export { Mount };

import React, { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { CONE, RANGE, SENSORS, type Sensor } from './constants';

const IDLE = new THREE.Color('#1c1c1c');
const ALERT = new THREE.Color('#e5412a');

const UP = new THREE.Vector3(0, 1, 0);

type Props = Pick<Sensor, 'link'>;

/**
 * The sensors on one link, placed in that link's frame. Each is a small puck
 * facing the way it looks. While it sees something it lights red and shows
 * its reach as a faint half sphere.
 */
const Mounts: React.FunctionComponent<Props> = ({ link }) => {
  const { seeing } = useFactoryArmContext();

  const here = useMemo(
    () => SENSORS.filter((sensor) => sensor.link === link),
    [link]
  );
  const pucks = useMemo(
    () =>
      here.map(
        () => new THREE.MeshStandardMaterial({ color: IDLE, emissive: IDLE })
      ),
    [here]
  );
  const views = useRef<(THREE.Mesh | null)[]>([]);

  Fiber.useFrame(() => {
    here.forEach(({ id }, index) => {
      const on = seeing.current.has(id);

      pucks[index].emissive.copy(on ? ALERT : IDLE);

      const view = views.current[index];

      if (view) {
        view.visible = on;
      }
    });
  });

  return (
    <>
      {here.map(({ direction, id, position }, index) => (
        <group
          key={id}
          position={position}
          quaternion={new THREE.Quaternion().setFromUnitVectors(
            UP,
            new THREE.Vector3(...direction).normalize()
          )}
        >
          <mesh material={pucks[index]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 20]} />
          </mesh>
          <mesh
            ref={(mesh) => {
              views.current[index] = mesh;
            }}
            visible={false}
          >
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
      ))}
    </>
  );
};

export { Mounts };

import React, { useEffect, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Stage
import type { Hits } from '@/views/experiments/kinetic-light/stage/hits';

type Props = {
  hits: Hits;
};

type Ripple = { age: number; life: number; reach: number };

const POOL = 48;
const START = 0.1;
const SIZE = 256;
const PLANE = new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2);

const toRing = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const center = SIZE / 2;

  canvas.width = SIZE;
  canvas.height = SIZE;

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    center
  );

  gradient.addColorStop(0.6, 'rgb(255 255 255 / 0)');
  gradient.addColorStop(0.88, 'rgb(255 255 255 / 1)');
  gradient.addColorStop(1, 'rgb(255 255 255 / 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, SIZE, SIZE);

  return new THREE.CanvasTexture(canvas);
};

const RING = toRing();

const lerp = THREE.MathUtils.lerp;

const Ripples: React.FunctionComponent<Props> = ({ hits }) => {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const ripples = useRef<(Ripple | null)[]>(
    Array.from({ length: POOL }, () => null)
  );
  const next = useRef(0);

  useEffect(
    () =>
      hits.on(({ color, velocity, x }) => {
        const index = next.current;
        const mesh = meshes.current[index];
        const strength = THREE.MathUtils.clamp(velocity, 0.1, 1);

        next.current = (index + 1) % POOL;

        if (!mesh) {
          return;
        }

        mesh.position.x = x;
        mesh.scale.setScalar(START);
        mesh.visible = true;
        (mesh.material as THREE.MeshBasicMaterial).color
          .copy(color)
          .multiplyScalar(lerp(0.8, 2, strength));
        ripples.current[index] = {
          age: 0,
          life: lerp(0.6, 1.4, strength),
          reach: lerp(0.8, 2.6, strength),
        };
      }),
    [hits]
  );

  Fiber.useFrame((_, delta) => {
    ripples.current.forEach((ripple, index) => {
      const mesh = meshes.current[index];

      if (!ripple || !mesh) {
        return;
      }

      ripple.age += delta;

      const t = ripple.age / ripple.life;

      if (t >= 1) {
        ripples.current[index] = null;
        mesh.visible = false;

        return;
      }

      mesh.scale.setScalar(START + ripple.reach * (1 - (1 - t) ** 2));
      (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - t) ** 2;
    });
  });

  return Array.from({ length: POOL }, (_, index) => (
    <mesh
      geometry={PLANE}
      key={index}
      position={[0, 0.02, 0]}
      ref={(mesh) => {
        meshes.current[index] = mesh;
      }}
      visible={false}
    >
      <meshBasicMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={RING}
        toneMapped={false}
        transparent
      />
    </mesh>
  ));
};

export { Ripples };

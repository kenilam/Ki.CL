import React, { useEffect, useRef, useState } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Stage
import type { Hit, Hits } from '@/views/experiments/kinetic-light/stage/hits';

type Props = {
  hits: Hits;
};

const COUNT = 1500;
const GRAVITY = -9.8;
const HIDDEN = -100;
const GLOW = 1.2;
const SIZE = 64;

const lerp = THREE.MathUtils.lerp;

const toDot = (): THREE.CanvasTexture => {
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

  gradient.addColorStop(0, 'rgb(255 255 255 / 1)');
  gradient.addColorStop(0.35, 'rgb(255 255 255 / 0.5)');
  gradient.addColorStop(1, 'rgb(255 255 255 / 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, SIZE, SIZE);

  return new THREE.CanvasTexture(canvas);
};

const DOT = toDot();

const hidden = (): Float32Array => {
  const positions = new Float32Array(COUNT * 3);

  for (let index = 0; index < COUNT; index += 1) {
    positions[index * 3 + 1] = HIDDEN;
  }

  return positions;
};

const Particles: React.FunctionComponent<Props> = ({ hits }) => {
  const points = useRef<THREE.Points>(null);
  const pending = useRef<Hit[]>([]);
  const velocities = useRef(new Float32Array(COUNT * 3));
  const lives = useRef(new Float32Array(COUNT));
  const next = useRef(0);
  const [positions] = useState(hidden);
  const [colors] = useState(() => new Float32Array(COUNT * 3));

  useEffect(
    () =>
      hits.on((hit) => {
        pending.current.push(hit);
      }),
    [hits]
  );

  Fiber.useFrame((_, delta) => {
    const geometry = points.current?.geometry;

    if (!geometry) {
      return;
    }

    const { color: tint, position } = geometry.attributes;
    const speeds = velocities.current;
    const remaining = lives.current;

    pending.current.splice(0).forEach(({ color, velocity, x }) => {
      const strength = THREE.MathUtils.clamp(velocity, 0.1, 1);
      const spread = lerp(1, 3, strength);
      const lift = lerp(2.5, 6, strength);
      const sparks = Math.round(lerp(10, 35, strength));

      for (let spark = 0; spark < sparks; spark += 1) {
        const index = next.current;

        next.current = (index + 1) % COUNT;
        position.setXYZ(index, x + (Math.random() - 0.5) * 0.2, 0.05, 0);
        tint.setXYZ(index, color.r * GLOW, color.g * GLOW, color.b * GLOW);
        speeds.set(
          [
            (Math.random() - 0.5) * spread,
            (Math.random() * 0.7 + 0.3) * lift,
            (Math.random() - 0.5) * spread,
          ],
          index * 3
        );
        remaining[index] = Math.random() + 0.5;
      }
    });

    for (let index = 0; index < COUNT; index += 1) {
      if (remaining[index] <= 0) {
        continue;
      }

      remaining[index] -= delta;

      if (remaining[index] <= 0) {
        position.setY(index, HIDDEN);
        continue;
      }

      speeds[index * 3 + 1] += GRAVITY * delta;
      position.setXYZ(
        index,
        position.getX(index) + speeds[index * 3] * delta,
        position.getY(index) + speeds[index * 3 + 1] * delta,
        position.getZ(index) + speeds[index * 3 + 2] * delta
      );
    }

    position.needsUpdate = true;
    tint.needsUpdate = true;
  });

  return (
    <points frustumCulled={false} ref={points}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach='attributes-position' />
        <bufferAttribute args={[colors, 3]} attach='attributes-color' />
      </bufferGeometry>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={DOT}
        size={0.24}
        toneMapped={false}
        transparent
        vertexColors
      />
    </points>
  );
};

export { Particles };

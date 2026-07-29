import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { Drei, Fiber } from '@/Three';

/**
 * Animated emphasis for the two nodes that carry meaning beyond their place
 * in the tree: the one you are looking at, and the origin of life.
 *
 * `active` is a sonar ripple — two rings expanding and fading out of phase,
 * the same idiom v14 used for selection, so the language carries over.
 * `origin` is deliberately different in character: a slow, steady breath
 * rather than a pulse, so the root reads as permanent rather than as
 * something demanding attention.
 *
 * Rings are billboarded so they stay circular from any camera angle, and
 * opted out of raycasting so they never intercept a click meant for a node.
 */

export type AuraVariant = 'active' | 'origin';

const RIPPLE_PERIOD_MS = 2600;
const ORIGIN_PERIOD_MS = 5200;

/** Ripple travel, as a multiple of the node's own radius. */
const RIPPLE_FROM = 1.15;
const RIPPLE_TO = 2.6;
const RIPPLE_PEAK_OPACITY = 0.6;

const ORIGIN_RING_FROM = 1.35;
const ORIGIN_RING_TO = 1.62;
const ORIGIN_HALO_SCALE = 2.1;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

type Props = {
  variant: AuraVariant;
  /** World radius of the node body this decorates. */
  radius: number;
  color: string;
  /** Enter/exit growth, so the aura never outlives its node. */
  scale?: () => number;
};

const NodeAura: React.FunctionComponent<Props> = ({
  variant,
  radius,
  color,
  scale,
}) => {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const reduced = useMemo(prefersReducedMotion, []);

  Fiber.useFrame(({ clock }) => {
    const present = scale ? Math.min(1, Math.max(0, scale())) : 1;
    if (present <= 0.01) {
      [ringA, ringB, halo].forEach((ref) => {
        if (ref.current) {
          ref.current.visible = false;
        }
      });
      return;
    }

    const elapsed = reduced ? 0 : clock.getElapsedTime() * 1000;

    if (variant === 'active') {
      // Two ripples, half a period apart, so one is always mid-travel.
      [ringA, ringB].forEach((ref, index) => {
        const mesh = ref.current;
        if (!mesh) {
          return;
        }
        const phase =
          ((elapsed + index * (RIPPLE_PERIOD_MS / 2)) % RIPPLE_PERIOD_MS) /
          RIPPLE_PERIOD_MS;
        const spread = RIPPLE_FROM + (RIPPLE_TO - RIPPLE_FROM) * phase;

        mesh.visible = true;
        mesh.scale.setScalar(radius * spread * present);
        const material = mesh.material as THREE.MeshBasicMaterial;
        // Fade out as it travels; ease so it lingers near the node.
        material.opacity = RIPPLE_PEAK_OPACITY * (1 - phase) ** 1.6 * present;
      });
      return;
    }

    // origin — one slow breath, no travel.
    const breath =
      (Math.sin((elapsed / ORIGIN_PERIOD_MS) * Math.PI * 2) + 1) / 2;

    if (ringA.current) {
      ringA.current.visible = true;
      ringA.current.scale.setScalar(
        radius *
          (ORIGIN_RING_FROM + (ORIGIN_RING_TO - ORIGIN_RING_FROM) * breath) *
          present
      );
      (ringA.current.material as THREE.MeshBasicMaterial).opacity =
        (0.3 + 0.28 * breath) * present;
    }

    if (halo.current) {
      halo.current.visible = true;
      halo.current.scale.setScalar(radius * ORIGIN_HALO_SCALE * present);
      (halo.current.material as THREE.MeshBasicMaterial).opacity =
        (0.1 + 0.08 * (1 - breath)) * present;
    }
  });

  const material = (
    <meshBasicMaterial
      color={color}
      transparent
      opacity={0}
      // Purely decorative: must not occlude or be occluded by the tree.
      depthWrite={false}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );

  return (
    <Drei.Billboard>
      {variant === 'origin' ? (
        <mesh ref={halo} raycast={() => null}>
          <circleGeometry args={[1, 48]} />
          {material}
        </mesh>
      ) : null}

      <mesh ref={ringA} raycast={() => null}>
        <ringGeometry args={[0.84, 1, 64]} />
        {material}
      </mesh>

      {variant === 'active' ? (
        <mesh ref={ringB} raycast={() => null}>
          <ringGeometry args={[0.84, 1, 64]} />
          {material}
        </mesh>
      ) : null}
    </Drei.Billboard>
  );
};

export default NodeAura;

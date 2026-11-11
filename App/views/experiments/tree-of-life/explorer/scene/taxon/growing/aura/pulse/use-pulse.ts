import { useMemo, useRef } from 'react';

import { THREE, Fiber } from '@/three';

// Constants
import {
  ORIGIN_HALO_SCALE,
  ORIGIN_PERIOD_MS,
  ORIGIN_RING_FROM,
  ORIGIN_RING_TO,
  RIPPLE_FROM,
  RIPPLE_PEAK_OPACITY,
  RIPPLE_PERIOD_MS,
  RIPPLE_TO,
  RIPPLE_WHITEN,
} from '@/views/experiments/tree-of-life/explorer/scene/taxon/growing/aura/constants';

// Context
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

// Motion
import { prefersReducedMotion } from '@/views/experiments/tree-of-life/explorer/scene/prefers-reduced-motion';

// Hooks
import { useVariant } from '@/views/experiments/tree-of-life/explorer/scene/taxon/growing/aura/use-variant';

// Helpers
import { tokenColor } from '@/helper';

/**
 * `active` is two rings travelling out of phase, so one is always mid-flight.
 * `origin` is a slow breath that doesn't travel, so the two never compete.
 */
const usePulse = () => {
  const { bodyRadius: radius, color, grown: present } = useTaxonContext();
  const variant = useVariant();
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const reduced = useMemo(prefersReducedMotion, []);

  Fiber.useFrame(({ clock }) => {
    const grown = Math.min(1, Math.max(0, present.get()));

    if (grown <= 0.01) {
      [ringA, ringB, haloRef].forEach((ref) => {
        if (ref.current) {
          ref.current.visible = false;
        }
      });

      return;
    }

    // Frozen at phase zero when motion is unwelcome, but still drawn.
    const elapsed = reduced ? 0 : clock.getElapsedTime() * 1000;

    if (variant === 'active') {
      [ringA, ringB].forEach((ref, index) => {
        const mesh = ref.current;

        if (!mesh) {
          return;
        }

        // Half a period apart, so the pair never rests together.
        const phase =
          ((elapsed + index * (RIPPLE_PERIOD_MS / 2)) % RIPPLE_PERIOD_MS) /
          RIPPLE_PERIOD_MS;

        mesh.visible = true;
        mesh.scale.setScalar(
          radius * (RIPPLE_FROM + (RIPPLE_TO - RIPPLE_FROM) * phase) * grown
        );

        // Eased so it lingers near the body and thins as it leaves.
        (mesh.material as THREE.MeshBasicMaterial).opacity =
          RIPPLE_PEAK_OPACITY * (1 - phase) ** 1.6 * grown;
      });

      return;
    }

    const breath =
      (Math.sin((elapsed / ORIGIN_PERIOD_MS) * Math.PI * 2) + 1) / 2;

    if (ringA.current) {
      ringA.current.visible = true;
      ringA.current.scale.setScalar(
        radius *
          (ORIGIN_RING_FROM + (ORIGIN_RING_TO - ORIGIN_RING_FROM) * breath) *
          grown
      );
      (ringA.current.material as THREE.MeshBasicMaterial).opacity =
        (0.4 + 0.3 * breath) * grown;
    }

    if (haloRef.current) {
      haloRef.current.visible = true;
      haloRef.current.scale.setScalar(radius * ORIGIN_HALO_SCALE * grown);
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        (0.14 + 0.1 * (1 - breath)) * grown;
    }
  });

  // The ripple burns toward white; the origin's breath keeps the taxon's colour.
  const tint = useMemo(
    () =>
      variant === 'active'
        ? `#${new THREE.Color(color)
            .lerp(new THREE.Color(tokenColor('white-pure')), RIPPLE_WHITEN)
            .getHexString()}`
        : color,
    [variant, color]
  );

  return { haloRef, ringA, ringB, tint, variant };
};

export { usePulse };

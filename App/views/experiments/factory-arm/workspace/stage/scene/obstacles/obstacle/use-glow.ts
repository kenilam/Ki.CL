import { useMemo } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';

// Helpers
import { tokenColor } from '@/helper';

const GREY = new THREE.Color(tokenColor('black-200'));
const GLOW = new THREE.Color(tokenColor('orange-400'));
const DARK = new THREE.Color(tokenColor('black-pure'));

/** How long an obstacle stays lit after it last stood in the way, in milliseconds. */
const LIT = 2500;

/**
 * The obstacle's material. It's grey, and lights up orange while it stands
 * in the way of a move, and for as long as a case waits because of it.
 */
const useGlow = (id: string) => {
  const { obstructing, parked } = useKnowledgeContext();

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREY,
        emissive: DARK,
        roughness: 0.6,
      }),
    []
  );

  Fiber.useFrame(() => {
    const since = performance.now() - (obstructing.current.get(id) ?? -LIT);
    // Lit while a case waits on it, so what's in the way stays plain.
    const waited = [...parked.current.values()].some((across) =>
      across.includes(id)
    );

    material.emissive.copy(since < LIT || waited ? GLOW : DARK);
  });

  return material;
};

export { useGlow };

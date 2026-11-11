import { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';

// Helpers
import { tokenColor } from '@/helper';

const IDLE = new THREE.Color(tokenColor('black-500'));
const ALERT = new THREE.Color(tokenColor('red-600'));

/** The puck's material, red while the sensor sees something, and its reach, shown only then. */
const useSight = (id: string) => {
  const { seeing } = useKnowledgeContext();

  const puck = useMemo(
    () => new THREE.MeshStandardMaterial({ color: IDLE, emissive: IDLE }),
    []
  );
  const view = useRef<THREE.Mesh>(null);

  Fiber.useFrame(() => {
    const on = seeing.current.has(id);

    puck.emissive.copy(on ? ALERT : IDLE);

    if (view.current) {
      view.current.visible = on;
    }
  });

  return { puck, view };
};

export { ALERT, useSight };

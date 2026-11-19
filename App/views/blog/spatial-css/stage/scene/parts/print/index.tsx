import React, { useEffect, useMemo } from 'react';

// Three
import { THREE } from '@/three';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';

const SIZE = 256;
const RADIUS = 0.55;

const Print: React.FunctionComponent = () => {
  const { ink, paper } = useColours();
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = SIZE;
    canvas.height = SIZE;

    if (context) {
      const shade = context.createRadialGradient(
        SIZE * 0.36,
        SIZE * 0.32,
        SIZE * 0.04,
        SIZE / 2,
        SIZE / 2,
        SIZE / 2
      );

      shade.addColorStop(0, '#ffffff');
      shade.addColorStop(0.4, paper);
      shade.addColorStop(1, ink);
      context.fillStyle = shade;
      context.beginPath();
      context.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      context.fill();
    }

    const printed = new THREE.CanvasTexture(canvas);

    printed.colorSpace = THREE.SRGBColorSpace;

    return printed;
  }, [ink, paper]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[RADIUS, 64]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export { Print };

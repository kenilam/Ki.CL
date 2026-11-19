import { THREE } from '@/three';

const roundedRect = <Outline extends THREE.Path>(
  path: Outline,
  width: number,
  height: number,
  radius: number
) => {
  const x = -width / 2;
  const y = -height / 2;

  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);

  return path;
};

export { roundedRect };

// Libraries
import {
  SVGLoader,
  type StrokeStyle,
} from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Three
import { THREE } from '@/three';

type Style = StrokeStyle & { fill?: string; stroke?: string };

const toGeometry = (svg: string): THREE.BufferGeometry | null => {
  const { paths } = new SVGLoader().parse(svg);
  const pieces = paths.flatMap((path) => {
    const style = path.userData.style as Style;
    const { fill, stroke } = style;
    const filled =
      fill && fill !== 'none'
        ? SVGLoader.createShapes(path).map(
            (shape) => new THREE.ShapeGeometry(shape)
          )
        : [];
    const stroked =
      stroke && stroke !== 'none'
        ? path.subPaths.map((subPath) =>
            SVGLoader.pointsToStroke(subPath.getPoints(), style)
          )
        : [];

    return [...filled, ...stroked];
  });

  const flat = pieces.flatMap((piece) => {
    const plain = piece.index ? piece.toNonIndexed() : piece;
    const position = plain.getAttribute('position');

    if (!position?.count) {
      return [];
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', position);

    return [geometry];
  });

  return flat.length ? mergeGeometries(flat) : null;
};

export { toGeometry };

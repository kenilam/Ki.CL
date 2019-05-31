import * as IGeometry from './spec';

const DEFAULT_DENSITY = 720;
const DEFAULT_RADIUS = 0;

const circle: IGeometry.Circle = ({density = DEFAULT_DENSITY, x, y, radius}) => (
  [].concat(
    ...Array.from(new Array(density * window.devicePixelRatio)).map(
      (value, degree) =>
        !value && [
          x + (radius * Math.cos(degree)),
          y + (radius * Math.sin(degree))
        ]
    )
  )
);

const rect = ({height, width, x, y, radius = DEFAULT_RADIUS}: IGeometry.RectProps) => {
  const bottomLeft = [x + radius, y + height - radius];
  const bottomRight = [x + width - radius, y + height - radius];
  const topLeft = [x + radius, y + radius];
  const topRight = [x + width - radius, y + radius];
  
  return [].concat(
    ...topLeft,
    ...topRight,
    ...bottomRight,
    ...bottomLeft
  );
};

export {circle, rect};


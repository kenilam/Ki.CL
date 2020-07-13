import { SurfaceProps } from 'gl-react-dom';

export type ClassName = ClassNames<'default'>;

export type Graphic = unknown;
export type Render = () => void;

// interface Scene {
//   graphic: Graphic;
//   render?: Render;
// }

export type Props = SurfaceProps & {
  className?: string;
};

// interface Props extends Sizes {
//   scenes?: Scene[];
// }

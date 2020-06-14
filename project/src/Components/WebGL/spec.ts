import { SurfaceProps } from "gl-react-dom";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type Graphic = any;
  type Render = () => void;

  // interface Scene {
  //   graphic: Graphic;
  //   render?: Render;
  // }

  type Props = SurfaceProps & {
    className?: string;
  };

  // interface Props extends Sizes {
  //   scenes?: Scene[];
  // }
}

export default Spec;

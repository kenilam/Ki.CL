import { IWindowSizes } from '@View/Home/State/spec';
import { IRenderProps } from '@Component/WebGL/spec';

export interface IProps extends IWindowSizes {
}

export interface IBackground extends PIXI.DisplayObject {
  height?: number;
  render: IRenderProps
  width?: number;
}

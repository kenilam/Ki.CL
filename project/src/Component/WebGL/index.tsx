import * as IWebGL from "@/Component/WebGL/spec";
import React from 'react';
import { Surface } from 'gl-react-dom';
import {GLSL, Node, Shaders} from 'gl-react';
import Style from './Style';

const WebGL = ({
  className,
  children,
  height,
  width
}: IWebGL.Props) => (
  <div className={className} data-component={Style.default}>
    <Surface
      height={height}
      width={width}
    >
      {children}
    </Surface>
  </div>
);

export {GLSL, Node, Shaders}
export default WebGL;

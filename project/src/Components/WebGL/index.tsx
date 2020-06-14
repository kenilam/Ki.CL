import { GLSL, Node, Shaders } from "gl-react";
import { Surface } from "gl-react-dom";
import React from "react";
import Style from "./Style";
import Spec from "./spec";

const WebGL = ({ className, children, height, width }: Spec.Props) => (
  <div className={className} data-component={Style.default}>
    <Surface height={height} width={width}>
      {children}
    </Surface>
  </div>
);

export { GLSL, Node, Shaders };
export default WebGL;

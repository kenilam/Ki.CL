import {Container, Stage, Text, withPixiApp} from '@inlet/react-pixi'
import * as React from "react";
import {IProps} from "./spec";

const {devicePixelRatio} = window;

const options = {
  antialias: true,
  autoDensity: true,
  autoResize: true,
  forceFXAA: true,
  resolution: devicePixelRatio,
  transparent: true
};

const GraphicLayer: React.FC<IProps> = ({children, height, width}) => (
  <Stage height={height} width={width} options={options}>
    <Container>
      {children}
    </Container>
  </Stage>
);

export {Text, withPixiApp};
export default GraphicLayer;

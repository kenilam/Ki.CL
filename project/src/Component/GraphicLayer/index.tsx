import { Container, Graphics, Sprite, Stage, Text } from 'react-pixi-fiber';
import React from "react";
import { IProps } from "./spec";
import * as PIXI from 'pixi.js';

const { devicePixelRatio } = window;

const options = {
  antialias: true,
  autoDensity: true,
  autoResize: true,
  forceFXAA: true,
  resolution: devicePixelRatio,
  transparent: true
};

const GraphicLayer: React.FC<IProps> = ({ children, height, width }) => (
  <Stage height={height} width={width} options={options}>
    <Container>
      {children}
    </Container>
  </Stage>
);

const anchor = {
  bottom: new PIXI.ObservablePoint(null, null, 0.5, 0),
  center: new PIXI.ObservablePoint(null, null, 0.5, 0.5),
  left: new PIXI.ObservablePoint(null, null, 1, 0.5),
  right: new PIXI.ObservablePoint(null, null, 0, 0.5),
  top: new PIXI.ObservablePoint(null, null, 0.5, 1),
}

const preset = {
  anchor
}

const method = new PIXI.Graphics();

export { preset, method, Container, Graphics, Sprite, Text };
export default GraphicLayer;

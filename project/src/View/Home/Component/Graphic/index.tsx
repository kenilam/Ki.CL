import {view} from '$resources/data.json';
import {IHomeContent} from "$resources/spec";
import GraphicLayer, {Text} from '@Component/GraphicLayer';
import {connector} from '@View/Home/State';
import * as React from 'react';
import {IProps} from './spec';
import Style from './Style';

const {content: {heading}} = view.home as IHomeContent;

const Graphic: React.FC<IProps> = ({windowSizes: {height, width}}) => (
  <GraphicLayer height={height} width={width}>
    <Text
      anchor={[0.5, 0.5]}
      style={Style.text}
      text={heading}
      x={width / 2}
      y={height / 2}
    />
  </GraphicLayer>
);

const Component = connector(Graphic);

export default Component;

import WebGL from '@Component/WebGL';
import { connector } from '@View/Home/State';
import React from 'react';
import { IProps } from './spec';
import { IRenderProps } from '@Component/WebGL/spec';

const Graphic: React.FC<IProps> = ({ windowSizes: { height, width } }) => {
  const render = async ({ app }: IRenderProps) => {
    const asset = await app.assetLoader({
      name: 'background',
      url: '/asset/image/london.whitechapel.jpg'
    });

    const background = PIXI.Sprite.fromImage(asset.url);

    background.anchor.x = 0;
    background.anchor.y = 0;

    background.position.x = 0;
    background.position.y = 0;

    app.stage.addChild(background);
  }

  return (
    <WebGL
      height={height}
      render={render}
      width={width}
    />
  );
}

const Component = connector(Graphic);

export default Component;

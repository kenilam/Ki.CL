import WebGL, { IRenderProps } from '@Component/WebGL';
import React from 'react';
import { IProps } from './spec';

const Graphic: React.FC<IProps> = ({ height, width }) => {
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

export default Graphic;

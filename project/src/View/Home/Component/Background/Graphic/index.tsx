import { Engine, Tween } from '@Component/WebGL';
import * as IBackgorund from "@View/Home/Component/Background/spec";
import Index from './Backfill';
import Image from './Image';
import Mask from './Mask';
import Slogan from './Slogan';

const container = new Engine.Container();

const backfill = new Index();
const image = new Image();
const mask = new Mask();
const slogan = new Slogan();

let staticValues: IBackgorund.Values = {
  alpha: 0,
  height: 0,
  radius: 0,
  width: 0,
  x: 0,
  y: 0
}

const draw: IBackgorund.Graphics.Props = ({ alpha, height, radius, width, x, y }) => {
  backfill.update({ height, radius, width, x, y });
  image.update({ height, width, x, y });
  mask.update({ height, radius, width, x, y });
  slogan.update({ alpha: staticValues.alpha, height, width, x, y });

  container.alpha = alpha;
};

const onZoomInStart: IBackgorund.Graphics.Props = () => {
  Tween.killTweensOf(staticValues);
}

const onZoomInComplete: IBackgorund.Graphics.Props = ({ alpha, height, radius, width, x, y }) => {
  staticValues = { alpha: 0, height, radius, width, x, y };

  Tween.to(staticValues, 1, {
    alpha, height, radius, width, x, y, onUpdate: () => {
      slogan.update(staticValues);
    }
  });
}

container.mask = mask;

container.addChild(backfill);
container.addChild(image);
container.addChild(slogan);

export { container, draw, onZoomInComplete, onZoomInStart };

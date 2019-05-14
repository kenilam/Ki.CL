import {Engine} from '@Component/WebGL';
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

const draw: IBackgorund.DrawGraphics = ({alpha, x, y, width, height, radius}) => {
  backfill.update({x, y, width, height, radius});
  image.update({x, y, width, height});
  mask.update({x, y, width, height, radius});
  slogan.update({x, y, width, height});
  
  container.alpha = alpha;
};

container.mask = mask;

container.addChild(backfill);
container.addChild(image);
container.addChild(slogan);

export {container, draw};

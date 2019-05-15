import {Engine} from '@Component/WebGL';
import {generator} from "@View/Home/Component/Background/Animator";
import Index from './Backfill';
import Image from './Image';
import Mask from './Mask';
import Slogan from './Slogan';

const container = new Engine.Container();

const backFill = new Index();
const image = new Image();
const mask = new Mask();
const slogan = new Slogan();

const updater = ({alpha, height, radius, width, x, y}) => {
  backFill.update({height, radius, width, x, y});
  image.update({height, width, x, y});
  mask.update({height, radius, width, x, y});
  
  container.alpha = alpha;
};

const draw = () => generator({
  delay: 1,
  onUpdate: updater,
  onZoomInComplete() {
    secondDraw().restart(true);
  }
});

const secondDraw = () => generator({
  duration: 2,
  onUpdate(props) {
    slogan.update(props);
  }
});

container.mask = mask;
container.addChild(backFill);
container.addChild(image);
container.addChild(slogan);

export {container, draw, updater};

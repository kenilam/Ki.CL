import Custom from '@/Component/CSSTransition/Core';
import IStyle from '@/Component/CSSTransition/Style/spec';
import Fade, { className as fadeClassName } from './Fade';
import SlideDown, { className as slideDownClassName } from './SlideDown';
import SlideFromLeft, {
  className as slideFromLeftClassName,
} from './SlideFromLeft';
import SlideFromRight, {
  className as slideFromRightClassName,
} from './SlideFromRight';
import SlideUp, { className as slideUpClassName } from './SlideUp';
import ZoomIn, { className as zoomInClassName } from './ZoomIn';
import ZoomOut, { className as zoomOutClassName } from './ZoomOut';

const Styles: IStyle.Styles = {
  Custom,
  Fade,
  SlideDown,
  SlideFromLeft,
  SlideFromRight,
  SlideUp,
  ZoomIn,
  ZoomOut,
};

const ClassNames = {
  custom: 'css-transition-custom',
  fade: fadeClassName,
  slideDown: slideDownClassName,
  slideFromLeft: slideFromLeftClassName,
  slideFromRight: slideFromRightClassName,
  slideUp: slideUpClassName,
  zoomIn: zoomInClassName,
  zoomOut: zoomOutClassName,
};

export { ClassNames };
export default Styles;

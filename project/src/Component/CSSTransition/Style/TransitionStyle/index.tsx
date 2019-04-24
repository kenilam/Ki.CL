import * as ICSSTransition from '@Component/CSSTransition/spec';
import './custom.scss';
import './fade.scss';
import './slide-up.scss';
import value from './value.scss';

const TransitionStyleName: Partial<ICSSTransition.TransitionStyle> = {};

Object.keys(value).forEach(
  name => {
    TransitionStyleName[name] = name;
  }
);

export {TransitionStyleName};
export default value as ICSSTransition.TransitionStyle;

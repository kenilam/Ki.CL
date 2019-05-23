import * as ICSSTransition from '@Component/CSSTransition/spec';
import './style.scss';
import value from './value.scss';

const TransitionStyleName: Partial<ICSSTransition.TransitionStyle> = {};

Object.keys(value).forEach(
  name => {
    TransitionStyleName[name] = name;
  }
);

export {TransitionStyleName};
export default value as ICSSTransition.TransitionStyle;

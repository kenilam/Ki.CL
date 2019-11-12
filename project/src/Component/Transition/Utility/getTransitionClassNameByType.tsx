import {TransitionClassName} from '@/Component/CSSTransition';
import CSSTransitionStyle from '@/Component/CSSTransition/Core/Style';
import ICSSTransition from '@/Component/CSSTransition/spec';
import TransitionStyle from '@/Component/Transition/Style';

const getTransitionClassNameByType = (type: ICSSTransition.Type) => (
  TransitionClassName[type] ? TransitionClassName[type].replace(
    CSSTransitionStyle.default, TransitionStyle.default
  ) : ''
);

export default getTransitionClassNameByType;

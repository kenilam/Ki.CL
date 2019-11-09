import {TransitionStyle} from '@/Component/CSSTransition';
import ICSSTransition from '@/Component/CSSTransition/spec';
import IStyle from '@/Component/CSSTransition/Style/spec';

const getTransitionStyleByType = (type: ICSSTransition.Type) => (
  TransitionStyle[`${
    type[0].toUpperCase()
  }${
    type.substr(1)
  }` as IStyle.Component]
);

export default getTransitionStyleByType;

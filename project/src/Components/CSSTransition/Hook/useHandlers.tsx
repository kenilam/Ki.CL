import Spec from '@/Components/CSSTransition/spec';
import Style from '../Style';
import * as Types from '../Type';

const DEFAULT_CLASS_LISTS = [
  Style.default,
  Style.appear,
  Style.appearDone,
  Style.enter,
  Style.enterDone,
  Style.exit,
  Style.exitDone,
  Style.standalone,
];

const useHandlers: Spec.UseHandlers = ({
  addEndListener,
  onEntered: enteredHandler,
  onExited: exitedHandler,
  type,
}) => {
  const { classNames } = Types;
  const className = classNames[type];

  const onEntered: Spec.Enter = (node, isAppearing) => {
    if (node && !addEndListener) {
      node.classList.remove(...DEFAULT_CLASS_LISTS, className);
    }

    if (enteredHandler) {
      enteredHandler(node, isAppearing);
    }
  };

  const onExited: Spec.Exit = (node) => {
    if (node && !addEndListener) {
      node.classList.remove(...DEFAULT_CLASS_LISTS, className);
    }

    if (exitedHandler) {
      exitedHandler(node);
    }
  };

  return { onEntered, onExited };
};

export default useHandlers;

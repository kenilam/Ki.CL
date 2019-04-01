import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import classnames from 'classnames';

import { className, enterDoneClassName, exitDoneClassName } from '@Component/CSSTransition/Style';

const addDefault = (
  node: Element,
  additionalClassNames: string | CSSTransitionClassNames
) => {
  node.classList.add( className);

  if (!additionalClassNames) {
    return;
  }

  node.classList.add(classnames(additionalClassNames));
};

const removeDone = (node: Element) => {
  node.classList.remove(enterDoneClassName);
  node.classList.remove(exitDoneClassName);
};

export default { addDefault, removeDone };

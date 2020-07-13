import { AddEndListener } from '@/Component/CSSTransition/spec';
import duration from './duration';

const addEndListener: AddEndListener = (node, done) => {
  const waitTime = duration(node);

  node.ontransitionend = null;
  node.ontransitionrun = null;

  if (waitTime === 0) {
    done();
    return;
  }

  window.setTimeout(done, waitTime);
};

export default addEndListener;

import { EndHandler } from 'react-transition-group/Transition';
import duration from './duration';

const { setTimeout } = window;

const addEndListener: EndHandler = (node, done) => {
  const waitTime = duration(node);

  if (waitTime === 0) {
    done();
    return;
  }

  setTimeout(done, duration(node));
};

export default addEndListener;

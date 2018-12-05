import duration from './duration';

const addEndListener = endListenerTimer => (node, done) => {
  const { clearTimeout, setTimeout } = window;

  const time = duration(node);

  if (time === 0) {
    done();
  }

  clearTimeout(endListenerTimer);
  endListenerTimer = setTimeout(done, time);
};

export default addEndListener;

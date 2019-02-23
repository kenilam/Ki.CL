import { debounce, duration } from 'Helper';

const addEndListener = async (node, done) => {
  await debounce(duration(node));

  done();
};

export default addEndListener;

import {
  resolve
} from './production';

resolve.alias['react-dom'] = '@hot-loader/react-dom';

export default {
  resolve,
};

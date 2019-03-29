import {
  images,
  use
} from './development';

const name = '[hash].[ext]';

use[0].options.name = name;

images.use = use;

export default {
  module: {
    rules: [images],
  },
};

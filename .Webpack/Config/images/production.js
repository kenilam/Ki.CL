import { images, use } from './development';

const name = 'asset/[fullhash].[ext]';

use[0].options.name = name;

images.use = use;

export default {
  module: {
    rules: [images],
  },
};

import {
  fonts,
  use
} from './development';

const name = '[hash].[ext]';

use[0].options.name = name;

fonts.use = use;

export default {
  module: {
    rules: [fonts],
  },
};

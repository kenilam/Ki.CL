import {
  path as root
} from 'app-root-path';

import CleanWebpackPlugin from 'clean-webpack-plugin';

import {
  Args
} from '!/Utilities';

import {
  srcRoot as outputSrcRoot,
  tmpRoot
} from './output';

const cleaner = new CleanWebpackPlugin([tmpRoot, outputSrcRoot], {
  allowExternal: false,
  beforeEmit: false,
  verbose: Args.verbose,

  root,
});

export default {
  plugins: [cleaner],
};

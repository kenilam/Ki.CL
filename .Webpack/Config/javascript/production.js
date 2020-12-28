import { Loaders, plugins } from './development';

delete Loaders[0].use[0].options.plugins;

delete Loaders[1].use[0].options.plugins;

const rules = Loaders;

export default {
  module: {
    rules,
  },
  plugins,
};

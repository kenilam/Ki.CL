const Loaders = {
  test: /\.(glsl|vert|frag)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'glsl-template-loader',
    },
  ],
};

const rules = [Loaders];

export default {
  module: {
    rules,
  },
};

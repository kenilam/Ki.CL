const name = 'asset/[name].[ext]';

const use = [
  {
    loader: 'file-loader',
    options: {
      name,
    },
  },
  {
    loader: 'image-webpack-loader',
  },
];

const images = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use,
};

export { images, use };
export default {
  module: {
    rules: [images],
  },
};

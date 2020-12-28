const name = 'asset/[name].[ext]';

const use = [
  {
    loader: 'file-loader',
    options: {
      name,
    },
  },
];

const fonts = {
  test: /\.(eot|ttf|woff)$/i,
  use,
};

export { fonts, use };
export default {
  module: {
    rules: [fonts],
  },
};

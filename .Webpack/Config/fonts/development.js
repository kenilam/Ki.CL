const name = '[path][name].[ext]';

const use = [{
  loader: 'file-loader',
  options: {
    name
  }
}];

const fonts = {
  test: /\.(eot|ttf|woff|svg)$/i,
  exclude: /node_modules/,
  use
};

export {
  fonts,
  use
};
export default {
  module: {
    rules: [fonts]
  }
};

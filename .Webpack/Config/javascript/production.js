// import formatter from 'eslint-friendly-formatter';

const BabelLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheIdentifier: true
      }
    }
  ]
};

const EsLintLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: true,
    fix: true,
    quite: true
  }
};

const config = {
  module: {
    rules: [BabelLoader, EsLintLoader]
  }
};

export { EsLintLoader, BabelLoader };

export default config;

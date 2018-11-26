import { path as appRoot } from 'app-root-path';

const CSSloaders = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: {
        path: `${appRoot}/.postcssrc.js`
      }
    }
  }
];

const SCSSloaders = [].concat(
  CSSloaders,
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [
        `${appRoot}/node_modules`,
        `${appRoot}/project`,
        `${appRoot}/project/src`
      ]
    }
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: `${appRoot}/project/**/_*.scss`
    }
  }
);

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: CSSloaders
      },
      {
        test: /\.scss$/,
        use: SCSSloaders
      }
    ]
  }
};

export { CSSloaders, SCSSloaders };
export default config;

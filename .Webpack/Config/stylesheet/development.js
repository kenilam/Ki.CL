import { context, contextRoot } from '!/Config/entry'

import { path as appRoot } from 'app-root-path'
import glob from 'glob'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'

const CSSLoaders = [{
  loader: 'style-loader'
},
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: `${appRoot}/.postcssrc.js`
      },
      sourceMap: true,
    },
  },
]

const SCSSLoaders = [].concat(CSSLoaders, {
  loader: 'sass-loader',
  options: {
    includePaths: [`${appRoot}/node_modules`, contextRoot, context],
    sourceMap: true,
  },
})

const resources = [
  `${appRoot}/node_modules/sass-{*}/**/_*.scss`,
  `${contextRoot}/**/_*.scss`,
]

const rules = [{
  test: /\.css$/,
  use: CSSLoaders
},
  {
    test: /\.scss$/,
    use: SCSSLoaders
  },
]

const plugins = [
  new StyleLintPlugin({
    files: ['**/*.scss'],
    context: contextRoot,
    fix: true,
  }),
  new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: 'style.[id].css',
  })
]

const hasInitialResources = resources.some(path => glob.sync(path).length > 0)

if (hasInitialResources) {
  SCSSLoaders.push({
    loader: 'sass-resources-loader',
    options: {
      sourceMap: true,
      resources
    },
  })
}

export {
  CSSLoaders,
  SCSSLoaders
}
export default {
  module: {
    rules
  },
  plugins,
}

// import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import { CSSLoaders, SCSSLoaders } from './development'

const fallback = 'style-loader'

const loaders = loaders => [].concat(
  fallback,
  // {
  //   loader: ExtractCssChunks.loader,
  //   options: {
  //     hot: true,
  //     reloadAll: true,
  //   }
  // },
  loaders
  .filter(({
    loader
  }) => loader !== fallback)
  .map(loader => Object.assign(
    loader,
    {
      options: Object.assign(
        loader.options,
        { sourceMap: false }
      )
    }
  ))
)

const rules = [{
  test: /\.css$/,
  use: loaders(CSSLoaders)
},
  {
    test: /\.scss$/,
    use: loaders(SCSSLoaders)
  },
]

const plugins = [
  // new ExtractCssChunks(
  //   {
  //     filename: 'style.css',
  //     chunkFilename: 'style.[id].css',
  //     orderWarning: true
  //   }
  // )
]

export default {
  module: {
    rules
  },
  plugins
}

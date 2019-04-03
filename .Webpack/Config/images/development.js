const name = '[path][name].[ext]'

const use = [{
  loader: 'file-loader',
  options: {
    name
  },
},]

const images = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  exclude: /node_modules/,
  use,
}

export {
  images,
  use
}
export default {
  module: {
    rules: [images],
  },
}

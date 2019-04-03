const optimization = {
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name (module) {
          // npm package names are URL-safe, but some servers don't like @ symbols
          return `npm.${
            module.context
            .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            .replace('@', '')
          }`
        },
      },
    }
  }
}

export {
  optimization
}

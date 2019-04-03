module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 4
    },
    'autoprefixer': {
      browsers: ['last 2 versions', '> 5%']
    }
  },
}

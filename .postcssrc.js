const postcssImport= require('postcss-import');
const postcssURL= require('postcss-url');
const postcssPresetEnv= require('postcss-preset-env');
const autoprefixer= require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      cascade: false,
      flexbox: 'no-2009',
      grid: 'autoplace'
    }),
    postcssImport,
    postcssURL,
    postcssPresetEnv({ stage: 4 })
  ]
}

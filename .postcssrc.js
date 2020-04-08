const postcssImport = require('postcss-import');
const postcssURL = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      cascade: false,
      flexbox: 'no-2009',
      grid: 'autoplace',
    }),
    postcssImport,
    postcssURL,
    postcssPresetEnv({ stage: 4 }),
  ],
};

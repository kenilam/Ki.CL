const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssURL = require('postcss-url');

module.exports = {
  plugins: [
    autoprefixer,
    postcssImport,
    postcssURL,
    postcssPresetEnv({ stage: 4 }),
  ],
};

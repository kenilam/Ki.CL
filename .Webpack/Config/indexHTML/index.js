import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

import { Uuid, IsProd } from '!/Utilities';

const htmlInline = new ScriptExtHtmlWebpackPlugin({
  custom: {
    test: /\.js$/,
    attribute: "nonce",
    value: IsProd ? Uuid.nonce : ""
  }
})

const html = new HtmlWebpackPlugin({
  filename: 'index.html',

  inject: 'body',

  template: './Template/index.html',

  minify: {
    caseSensitive: true,
    collapseWhitespace: true,
    sortAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeScriptTypeAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeComments: true,
    quoteCharacter: `'`,

    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  },

  multiStep: false,

  xhtml: true,
});

export default {
  plugins: [html, htmlInline],
};

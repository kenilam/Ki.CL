import HtmlWebpackPlugin from 'html-webpack-plugin'

const html = new HtmlWebpackPlugin( {
  filename: 'index.html',
  
  inject: 'body',
  
  template: 'Template/index.html',
  
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
  
  xhtml: true,
} );

export default {
  plugins: [ html ],
}

import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',

            inject: 'body',

            template: './index.html',

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
                minifyURLs: true
            },

            xhtml: true
        })
    ]
};

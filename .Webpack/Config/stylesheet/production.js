import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { CSSloaders, SCSSloaders } from './development';

const extractLoaders = loaders =>
    loaders.filter(({ loader }) => loader !== 'style-loader');

const extractText = new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true
});

const css = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: extractLoaders(CSSloaders),
        fallback: 'style-loader'
    })
};

const scss = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: extractLoaders(SCSSloaders),
        fallback: 'style-loader'
    })
};

const rules = [css, scss];

export default {
    module: { rules },
    plugins: [extractText]
};

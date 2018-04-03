import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { CSSloaders, SCSSloaders } from './development';

const config = {
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ['webpack-extract-css-hot-reload'].concat(
                    ExtractTextPlugin.extract({
                        use : CSSloaders.filter( ( { loader } ) => loader !== 'style-loader' ),
                        fallback : 'style-loader'
                    })
                )
            },
            {
                test : /\.scss$/,
                use : ['webpack-extract-css-hot-reload'].concat(
                    ExtractTextPlugin.extract({
                        use : SCSSloaders.filter( ( { loader } ) => loader !== 'style-loader' ),
                        fallback : 'style-loader'
                    })
                )
            }
        ]
    },
    plugins : [
        new ExtractTextPlugin({
            filename : 'resources/[name]/styles.css',
            allChunks : true
        })
    ]
}

export default config;

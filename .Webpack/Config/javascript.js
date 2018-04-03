const config = {
    module: {
        rules : [
            {
                test : /\.(jsx|js)$/,
                enforce : 'pre',
                exclude : /node_modules/,
                use : [
                    {
                        loader : 'babel-loader',
                        options : {
                            cacheDirectory : true,
                            cacheIdentifier : true,
                            plugins: [
                                'react-hot-loader/babel'
                            ]
                        }
                    }
                ]
            },
            {
                test : /\.(jsx|js)$/,
                enforce : 'pre',
                exclude : /node_modules/,
                loader : 'eslint-loader',
                options : {
                    quite : true,
                    fix : true,
                },
            }
        ]
    }
};

export default config;

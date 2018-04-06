const config = {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name() {
                                if (process.env.NODE_ENV === 'development') {
                                    return '[path][name].[ext]';
                                }

                                return '[hash].[ext]';
                            }
                        }
                    }
                ]
            }
        ]
    }
};

export default config;

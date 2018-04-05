const config = {
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|svg)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
};

export default config;

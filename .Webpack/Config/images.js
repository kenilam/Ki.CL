const config = {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
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

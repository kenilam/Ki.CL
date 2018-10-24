import webpack from 'webpack';

const config = {
    plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])]
};

export default config;

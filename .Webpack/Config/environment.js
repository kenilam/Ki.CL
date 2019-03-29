import webpack from 'webpack';

import {
  api
} from '^/ki-cl.config';

process.env.API_URL = api.host[process.env.NODE_ENV];

const env = new webpack.EnvironmentPlugin(['API_URL', 'NODE_ENV']);

export default {
  plugins: [env],
};

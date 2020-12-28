import Dotenv from 'dotenv-webpack';

/**
 * See https://github.com/mrsteele/dotenv-webpack for usages
 */

const environment = new Dotenv({
  // load this now instead of the ones in '.env'
  path: `.env.${process.env.NODE_ENV || 'development'}`,

  // Allows your variables to be "expanded" for reusability within your .env file.
  expand: true,

  // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
  safe: true,

  // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
  allowEmptyValues: true,

  // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
  systemvars: true,

  // hide any errors
  silent: true,

  // load '.env.defaults' as the default values if empty.
  defaults: false
});

export default {
  plugins: [environment],
};
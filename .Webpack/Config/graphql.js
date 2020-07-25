const Loaders = [
  {
    test: /\.(gql|graphql)?$/,
    exclude: [/node_modules\/\*\*/],
    use: [
      {
        loader: 'webpack-graphql-loader',
        options: {
          removeUnusedFragments: process.env.NODE_ENV === 'production'

          // Validate the imported document against your specified schema file

          // validate: true,
          // schema: "./path/to/schema.json",
        }
      },
    ],
  }
];

const rules = Loaders;

export { Loaders };

export default {
  module: {
    rules,
  },
};

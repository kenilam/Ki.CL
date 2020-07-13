const optimization = {
  namedModules: true,
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
  },
};

export default { optimization };

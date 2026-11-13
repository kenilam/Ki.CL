const SOURCE = `federation({
  name: 'api',
  filename: 'remoteEntry.js',
  exposes: {
    './provider': './src/index.ts',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
    '@apollo/client': { singleton: true, requiredVersion: '^4.0.0' },
  },
});`;

export { SOURCE };

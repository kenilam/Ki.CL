const SOURCE = `federation({
  name: 'kicl',
  remotes: {
    api: { type: 'module', name: 'api', entry: '/client/remoteEntry.js' },
    design: { type: 'module', name: 'design', entry: '/design/remoteEntry.js' },
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, eager: true, requiredVersion: '^19.0.0' },
    '@apollo/client': { singleton: true, eager: true, requiredVersion: '^4.0.0' },
    'react-router-dom': { singleton: true, eager: true, requiredVersion: '^7.0.0' },
    'react-hook-form': { singleton: true, requiredVersion: '^7.0.0' },
    i18next: { singleton: true, eager: true, requiredVersion: '^26.0.0' },
    'react-i18next': { singleton: true, eager: true, requiredVersion: '^17.0.0' },
  },
});`;

export { SOURCE };

const SOURCE = `federation({
  name: 'design',
  filename: 'remoteEntry.js',
  exposes: {
    './components': './src/components/index.ts',
    './core': './src/core/index.ts',
    './core/constants': './src/core/constants.ts',
    './docs': './src/docs/index.tsx',
    './helper': './src/helper/index.ts',
    './hooks': './src/hooks/index.ts',
    './icons': './src/icons/index.ts',
    './router': './src/router/index.tsx',
    './status': './src/status/index.ts',
    './widgets': './src/widgets/index.ts',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
    'react-hook-form': { singleton: true, requiredVersion: '^7.0.0' },
    i18next: { singleton: true, requiredVersion: '^26.0.0' },
    'react-i18next': { singleton: true, requiredVersion: '^17.0.0' },
  },
});`;

export { SOURCE };

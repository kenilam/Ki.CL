import appRoot from 'app-root-path';

import * as nodePath from 'path';

import { glob } from 'glob';

import { defineConfig, UserConfig } from 'vite';

import checker from 'vite-plugin-checker';
import oxlint from 'vite-plugin-oxlint';
import dynamicImport from 'vite-plugin-dynamic-import';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import tsconfigPaths from 'vite-tsconfig-paths';
import terser from '@rollup/plugin-terser';
import { federation } from '@module-federation/vite';

import * as dotenv from 'dotenv';

import { getAlias } from './Helper';

import configJSON from '../app.config.json';
import tsconfigJSON from '../tsconfig.json';

dotenv.config({ path: `${appRoot.path}/.env` });

const OPEN = `https://${configJSON.host}.${configJSON.domain}:${process.env.PORT}`;

const BACKEND_URL = process.env.KICL_BACKEND_URL || 'http://localhost:3100';
// Same-origin via Vite proxy — avoids mixed-content (HTTPS host → HTTP remote)
// and CORS on ES module loads. Override with absolute URL in production if needed.
const API_REMOTE_ENTRY =
  process.env.KICL_API_REMOTE_ENTRY || '/client/remoteEntry.js';

const imports = {
  scss: glob
    .sync(`${appRoot.path}/App/**/_*.scss`.replace(/\\/g, '/'), {
      ignore: [`${appRoot.path}/node_modules/**/*.scss`.replace(/\\/g, '/')],
    })
    .map((file) => {
      const basename = nodePath.basename(file);
      const dirname = nodePath
        .dirname(file)
        .replace(`${appRoot.path}/App`, '@');

      return `@use '${dirname}/${basename}' as *;`;
    }),
};

type PreviewServer = Exclude<
  UserConfig['preview'] | UserConfig['server'],
  undefined
>;
type Proxy = PreviewServer['proxy'];
type Open = PreviewServer['open'];

type Props = {
  config?: typeof configJSON;
  open?: Open;
  proxy?: Proxy;
  root?: string;
  tsconfig?: typeof tsconfigJSON;
};

const DEFAULT: Omit<Required<Props>, 'proxy' | 'open'> = {
  config: configJSON,
  root: appRoot.path,
  tsconfig: tsconfigJSON,
};

const getConfig = ({
  config = DEFAULT.config,
  root = DEFAULT.root,
  proxy,
  tsconfig = DEFAULT.tsconfig,
}: Props = DEFAULT) =>
  defineConfig(async (env) => {
    const production = env.mode === 'production';

    console.log(`Running in ${env.mode} mode`);

    const backendProxy: Proxy = {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/graphql': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/client': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    };

    const plugins: UserConfig['plugins'] = [
      // Federation must run early so shared virtual modules exist before dep optimize
      federation({
        name: 'kicl',
        // Client SPA host — avoid pulling Node SSR entry loaders into the browser graph.
        target: 'web',
        moduleParseIdleTimeout: 60,
        remotes: {
          api: {
            type: 'module',
            name: 'api',
            entry: API_REMOTE_ENTRY,
          },
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: '^19.0.0' },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: '^19.0.0',
          },
          '@apollo/client': { singleton: true, requiredVersion: '^3.11.0' },
        },
        dts: {
          consumeTypes: true,
        },
      }),
      dynamicImport(),
      inspect(),
      react(),
      tsconfigPaths({
        // Runtime Vite aliases only — `api/*` stays a TS path to `@mf-types`
        // and must not shadow the Module Federation remote.
        projects: [`${appRoot.path}/App/tsconfig.vite.json`],
      }),
    ];

    if (!production) {
      plugins.push(
        checker({
          root: `${appRoot.path}/App`,
          typescript: true,
        }),
        oxlint(),
        mkcert({
          hosts: [configJSON.host, `${configJSON.host}.${configJSON.domain}`],
        }),
        stylelint({
          build: true,
          configBasedir: appRoot.path,
          cwd: `${appRoot.path}`,
          fix: true,
          lintInWorker: false,
          test: true,
        })
      );
    }

    const result: UserConfig = {
      assetsInclude: ['**/*.glb', '**/*.mov', '**/*.png', '**/*.md'],
      base: '/',
      build: {
        cssCodeSplit: true,
        commonjsOptions: {
          exclude: [
            'node_modules/lodash-es/**',
            'node_modules/@types/lodash-es/**',
          ],
          ignoreDynamicRequires: false,
          requireReturnsDefault: 'auto',
          sourceMap: true,
          transformMixedEsModules: true,
        },
        minify: production,
        outDir: 'build',
        reportCompressedSize: true,
        rollupOptions: {
          external: ['reactjs-social-login'],
          input: {
            [config.name]: `${root}/${config.name}/index.html`,
          },
          preserveEntrySignatures: 'allow-extension',
          plugins: [
            // App-local variable dynamic imports only — MF's ssrEntryLoader uses
            // `import(/* @vite-ignore */ id)` which this plugin cannot analyze.
            dynamicImportVars({
              exclude: [/node_modules/],
              warnOnError: true,
            }),
            terser({
              compress: {
                global_defs: {
                  exports: 'document',
                  module: 'document',
                  process: JSON.stringify(process.env || {}),
                },
              },
            }),
          ],
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            },
            minifyInternalExports: production,
            preserveModules: false,
            preserveModulesRoot: `${root}/${config.name}`,
            sourcemap: true,
          },
        },
        sourcemap: true,
        target: 'esnext',
        // Any non-null `build.watch` puts `vite build` into watch mode and the
        // process can exit before Rollup finishes (especially with
        // chokidar.persistent: false). Only enable when `--watch` is passed.
        watch: process.argv.includes('--watch')
          ? {
              clearScreen: false,
            }
          : null,
      },
      clearScreen: false,
      css: {
        devSourcemap: !production,
        modules: {
          scopeBehaviour: 'global',
          exportGlobals: true,
        },
        preprocessorOptions: {
          scss: {
            additionalData(source: string, filename: string) {
              const extname = nodePath.extname(filename);

              if (extname !== '.scss') {
                return source;
              }

              const content = `@use 'sass:color';@use 'sass:list';@use 'sass:math';${imports.scss.join(' ')}${source}`;

              return content;
            },
          },
        },
      },
      envDir: appRoot.path,
      define: {
        'process.env': process.env,
      },
      logLevel: 'error',
      // Shared MF packages must not be prebundled — esbuild would bake in
      // virtual:mf loadShare imports that then fail at runtime from .vite/deps.
      optimizeDeps: {
        exclude: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          '@apollo/client',
        ],
      },
      plugins,
      preview: {
        open: OPEN,
        port: Number(process.env.PORT),
        proxy: {
          ...backendProxy,
          ...proxy,
        },
      },
      publicDir: './Public',
      resolve: {
        alias: getAlias(tsconfig),
      },
      server: {
        host: `${config.host}.${config.domain}`,
        hmr: {
          protocol: 'wss',
          host: `${config.host}.${config.domain}`,
          port: Number(process.env.PORT),
          clientPort: Number(process.env.PORT),
        },
        open: OPEN,
        port: Number(process.env.PORT),
        proxy: {
          ...backendProxy,
          ...proxy,
        },
        strictPort: true,
        watch: {
          alwaysStat: true,
          persistent: false,
          usePolling: true,
        },
      },
    };

    return result;
  });

export { getConfig };
export default {};

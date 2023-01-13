import { path as appRoot } from 'app-root-path';

import * as nodePath from 'path';

import { glob } from 'glob';

import { defineConfig, splitVendorChunkPlugin, UserConfig } from 'vite';

import dynamicImport from 'vite-plugin-dynamic-import';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import eslint from 'vite-plugin-eslint';
// import federation from '@originjs/vite-plugin-federation';
import inspect from 'vite-plugin-inspect';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import tsconfigPaths from 'vite-tsconfig-paths';
import { terser } from 'rollup-plugin-terser';

import configJSON from '../app.config.json';
import tsconfigJSON from '../tsconfig.json';
import {
  getAlias,
  // getExposes,
  getRemotes,
} from './Helper';

const CACHE_DIR = '.Caches';

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
  remoteGlob?: Parameters<typeof getRemotes>[number];
  root?: string;
  tsconfig?: typeof tsconfigJSON;
};

const DEFAULT: Omit<Required<Props>, 'proxy'> = {
  config: configJSON,
  open: false,
  remoteGlob: `${appRoot}/App/**/app.config.json`,
  root: appRoot,
  tsconfig: tsconfigJSON,
};

const getConfig = ({
  config = DEFAULT.config,
  open = DEFAULT.open,
  // remoteGlob = DEFAULT.remoteGlob,
  root = DEFAULT.root,
  proxy,
  tsconfig = DEFAULT.tsconfig,
}: Props = DEFAULT) =>
  defineConfig((env) => {
    const result: ReturnType<typeof defineConfig> = {
      base: '/',
      build: {
        dynamicImportVarsOptions: {},
        cssCodeSplit: env.mode === 'development' || undefined,
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
        minify: env.mode === 'production',
        outDir: 'build',
        reportCompressedSize: true,
        rollupOptions: {
          preserveEntrySignatures: 'allow-extension',
          plugins: [
            dynamicImportVars(),
            terser({
              compress: {
                global_defs: {
                  exports: 'document',
                  module: 'document',
                  process: '{}',
                },
              },
            }),
          ],
          input: {
            [config.name]: `${root}/${config.name}/index.html`,
          },
          output: {
            minifyInternalExports: false,
            preserveModules: false,
            preserveModulesRoot: `${root}/${config.name}`,
            sourcemap: true,
            validate: true,
          },
        },
        sourcemap: true,
        target: 'esnext',
        watch: {
          clearScreen: false,
          chokidar: {
            alwaysStat: true,
            persistent: false,
            usePolling: true,
          },
        },
        write: true,
      },
      cacheDir: CACHE_DIR,
      clearScreen: false,
      css: {
        devSourcemap: true,
        preprocessorOptions: {
          scss: {
            additionalData: glob
              .sync(`${appRoot}/App/**/_*.scss`, {
                ignore: [`${appRoot}/node_modules/**/*.scss`],
              })
              .map((file) => {
                const basename = nodePath.basename(file);
                const dirname = nodePath
                  .dirname(file)
                  .replace(`${appRoot}/App`, '@');

                return `@import '${dirname}/${basename}';`;
              })
              .join(' '),
          },
          // scss: { additionalData: `@import "${pathSrc}/scss/variables";` },
        },
      },
      envDir: appRoot,
      esbuild: {
        sourcemap: true,
        target: ['esnext'],
        treeShaking: true,
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
        minifyWhitespace: false,
        minifyIdentifiers: false,
      },
      define: {
        'process.env': process.env,
        'process.env.NODE_ENV': JSON.stringify(env.mode),
      },
      logLevel: 'error',
      optimizeDeps: {
        esbuildOptions: {
          keepNames: true,
        },
      },
      plugins: [
        dynamicImport(),
        eslint({
          cache: true,
          failOnError: true,
          failOnWarning: true,
          emitError: true,
          emitWarning: true,
          fix: true,
          exclude: ['**/node_modules/**', '**/Prototype/**'],
        }),
        // federation({
        //   name: config.name,
        //   exposes: getExposes({ config, root }),
        //   remotes: getRemotes(remoteGlob),
        // }),
        inspect(),
        react({
          jsxRuntime: 'classic',
        }),
        splitVendorChunkPlugin(),
        stylelint({
          cache: true,
          cacheLocation: `${root}/${config.name}/.Caches`,
          emitError: true,
          emitErrorAsWarning: false,
          emitWarning: true,
          emitWarningAsError: false,
        }),
        tsconfigPaths({
          root: appRoot,
        }),
      ],
      preview: {
        open,
        port: config.port,
        proxy,
      },
      publicDir: 'Public',
      resolve: {
        alias: getAlias(tsconfig),
      },
      server: {
        hmr: true,
        open,
        port: config.port,
        proxy,
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

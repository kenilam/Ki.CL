import appRoot from 'app-root-path';

import * as nodePath from 'path';

import { glob } from 'glob';

import { defineConfig, UserConfig } from 'vite';

import checker from 'vite-plugin-checker';
import dynamicImport from 'vite-plugin-dynamic-import';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginRadar } from 'vite-plugin-radar';
import { terser } from 'rollup-plugin-terser';

import * as dotenv from 'dotenv';

import { getAlias } from './Helper';

import configJSON from '../app.config.json';
import tsconfigJSON from '../tsconfig.json';

dotenv.config({ path: `${appRoot.path}/.env` });

const OPEN = `https://${configJSON.host}.${configJSON.domain}:${process.env.PORT}`;

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

    const plugins: UserConfig['plugins'] = [
      dynamicImport(),
      inspect(),
      react(),
      tsconfigPaths({
        root: `${appRoot.path}/App`,
      }),
      VitePluginRadar({
        // Google Analytics tag injection
        analytics: {
          id: String(process.env.GA_TRACKING_CODE),
        },
      }),
    ];

    if (!production) {
      plugins.push(
        checker({
          root: `${appRoot.path}/App`,
          eslint: {
            lintCommand: `eslint '${appRoot.path}/App/**/*.{js,jsx,ts,tsx}'`,
            useFlatConfig: true,
            dev: {
              overrideConfig: {
                fix: true,
              },
            },
          },
        }),
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

    const result: ReturnType<typeof defineConfig> = {
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
            dynamicImportVars(),
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
      esbuild: {
        sourcemap: !production,
        target: ['esnext'],
        treeShaking: true,
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
        minifyWhitespace: env.mode === 'production',
        minifyIdentifiers: env.mode === 'production',
      },
      define: {
        'process.env': process.env,
      },
      logLevel: 'error',
      plugins,
      preview: {
        open: OPEN,
        port: Number(process.env.PORT),
        proxy,
      },
      publicDir: './Public',
      resolve: {
        alias: getAlias(tsconfig),
      },
      server: {
        hmr: true,
        open: OPEN,
        port: Number(process.env.PORT),
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

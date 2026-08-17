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
import terser from '@rollup/plugin-terser';
import { federation } from '@module-federation/vite';

import * as dotenv from 'dotenv';

import { getAlias, getStyleLayer, LAYER_ORDER } from './Helper';

import configJSON from '../app.config.json';
import tsconfigJSON from '../tsconfig.json';

dotenv.config({ path: `${appRoot.path}/.env` });

const OPEN = `https://${configJSON.host}.${configJSON.domain}:${process.env.PORT}`;

const BACKEND_URL = process.env.KICL_BACKEND_URL || 'http://localhost:3100';
// Same-origin via Vite proxy - avoids mixed-content (HTTPS host → HTTP remote)
// and CORS on ES module loads. Override with absolute URL in production if needed.
const API_REMOTE_ENTRY =
  process.env.KICL_API_REMOTE_ENTRY || '/client/remoteEntry.js';

/*
 * Kept in step with `App/.Server/Proxy` - the two run the same site and have
 * to agree on which paths belong to the API.
 *
 * These are URL segments, not bucket names: the API maps each to a bucket, so
 * `static` can be served from a bucket called something else entirely.
 */
const ASSET_SEGMENTS = ['taxon-visual', 'static'];

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
      /*
       * Narrowed to the individual segments rather than all of `/assets`,
       * because a production build emits the site's own bundles there too.
       * Forwarding the whole prefix sent the application's JavaScript to an
       * API that has never heard of it, so `vite preview` served a blank page
       * and 404'd its own bootstrap - the same trap `App/.Server/Proxy`
       * already sprang.
       *
       * The prefix itself cannot move: image URLs are stored in the database
       * as `/assets/taxon-visual/*`.
       */
      ...Object.fromEntries(
        ASSET_SEGMENTS.map((segment) => [
          `/assets/${segment}`,
          {
            target: BACKEND_URL,
            changeOrigin: true,
            secure: false,
          },
        ])
      ),
    };

    const plugins: UserConfig['plugins'] = [
      // Federation must run early so shared virtual modules exist before dep optimize
      federation({
        name: 'kicl',
        // Client SPA host - avoid pulling Node SSR entry loaders into the browser graph.
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
          '@apollo/client': { singleton: true, requiredVersion: '^4.0.0' },
        },
        dts: {
          consumeTypes: {
            /*
             * Pointed at the remote directly, and absolutely.
             *
             * The runtime entry above is deliberately relative so the browser
             * loads it same-origin through the Vite proxy, avoiding mixed
             * content and CORS. But type consumption runs in Node, where a
             * path with no origin cannot be fetched at all - which is why this
             * step failed silently on every start, logging only
             * `dynamic-remote-type-hints-plugin err: [object Event]`, and left
             * `App/@mf-types` frozen at whatever it last contained.
             *
             * The file names are the remote's, not the plugin defaults: its
             * own config sets `typesFolder: 'types'`, so it emits `types.zip`
             * and `types.d.ts` rather than `@mf-types.zip` and `apis.d.ts`.
             */
            remoteTypeUrls: {
              api: {
                alias: 'api',
                api: `${BACKEND_URL}/client/types.d.ts`,
                zip: `${BACKEND_URL}/client/types.zip`,
              },
            },
          },
        },
      }),
      dynamicImport(),
      inspect(),
      react(),
      tsconfigPaths({
        // Runtime Vite aliases only - `api/*` stays a TS path to `@mf-types`
        // and must not shadow the Module Federation remote.
        projects: [`${appRoot.path}/App/tsconfig.vite.json`],
      }),
    ];

    if (!production) {
      plugins.push(
        checker({
          root: `${appRoot.path}/App`,
          /*
           * Both run through the one checker rather than a second plugin - it
           * has native oxlint support and reports them together.
           *
           * This version takes a `lintCommand`, not the `fix`/`quiet`/
           * `configFile` options documented against later releases. `--fix`
           * matches what the eslint arm did in dev; `.oxlintrc.json` is found
           * by default.
           */
          oxlint: {
            lintCommand: 'oxlint --fix',
            /*
             * Errors only in the overlay. `exhaustive-deps` is deliberately a
             * warning - several of its findings are intentional - and the
             * default logLevel includes warnings, which put a blocking panel
             * over the app for something we have already decided about. They
             * still print to the terminal.
             */
            dev: {
              logLevel: ['error'],
            },
          },
          typescript: true,
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
            // App-local variable dynamic imports only - MF's ssrEntryLoader uses
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

              const prelude = `@use 'sass:color';@use 'sass:list';@use 'sass:math';${imports.scss.join(' ')}`;

              /*
               * Partials come back null - they define mixins and functions
               * rather than rules, and a `@layer` block would scope those
               * away from the files that `@use` them.
               */
              const layer = getStyleLayer(filename);

              if (!layer) {
                return `${prelude}${source}`;
              }

              /*
               * The `@use` prelude has to stay first - Sass rejects it after
               * any other rule - but it compiles to nothing, so the emitted
               * CSS still opens with the layer order statement.
               */
              const content = `${prelude}${LAYER_ORDER}@layer ${layer} {${source}}`;

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
      // Shared MF packages must not be prebundled - esbuild would bake in
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

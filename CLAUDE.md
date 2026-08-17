# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Yarn 4 (Berry) workspace repo. Top-level workspace is `App`, which itself is a nested Yarn workspace of `.Client`, `.Server`, `Analytic`, `API`, `Router`, `Views`, `Widgets`. Node >=24 required. Prefer the `make` targets (thin wrappers over the `yarn run` scripts):

```bash
make install            # yarn install
make run                # development: clean build dir, then vite --host --debug
make run.production     # clean build dir, build client, then vite preview
make build               # vite build --debug (client bundle only)
make server              # build:server → runs the Express static/SSR-ish server (App/.Server)
make test                # npx jest
make deploy              # build:client, then FTP deploy (temporary, being replaced by GitHub auto-deploy)
make codegen             # run codegen (type generation)
make start               # yarn install + development (one-step bootstrap)
```

Other scripts not wrapped by `make`: `yarn lint:oxlint` (oxlint `--fix`), `yarn lint:stylelint` (`App/**/*.{css,scss} --fix`), `yarn lint:staged` (husky pre-commit, prettier+oxlint+stylelint via `lint-staged`). Single test file: `npx jest App/path/to/File.test.tsx`.

## Architecture

### Two apps in one repo: Client (Vite/React) + Server (Express)
- **`App/.Client`** — Vite config factory (`getConfig` in `App/.Client/index.ts`), consumed by `App/vite.config.ts`. Produces the SPA build (`App/build`).
- **`App/.Server`** — a small Express server (`App/.Server/index.ts`) that serves the built `App/build` static output in production, with custom range-request handling for video and content-type sniffing for images. Not a dev server — `make run` uses Vite's own dev server directly.
- **`App/Env/*`** — per-concern config modules (each exports `{ path, middleware, proxy }`-shaped config); `.Client`/`.Server` both fold `Object.values(Env)` to collect proxy rules / Express middleware from one place rather than hardcoding per-feature wiring in the server or vite config.

### Module Federation consumes the Backend's GraphQL client
This app does not talk to GraphQL directly — it consumes the **Backend** repo's federated `Client` package as a Module Federation remote named `api` (see `App/.Client/index.ts`'s `federation()` plugin config). `KiclProvider`, typed hooks, and generated types (`useKicl_TaxonVisual`, `TaxonVisualStatus`, etc.) all come from `import ... from 'api/provider'` / `'api'` at runtime — resolved via `KICL_API_REMOTE_ENTRY` (defaults to `/client/remoteEntry.js`, proxied same-origin to the Backend's `/client` route to avoid CORS/mixed-content). Types for `api/*` come from `App/@mf-types/api` (declared in `tsconfig.json` `paths`, generated separately — not a Vite alias, since aliasing it would shadow the real federated runtime remote). React/react-dom/@apollo/client are shared singletons between host and remote — don't add a second copy of these as direct deps in a way that could desync versions.

`App.tsx` lazy-loads `KiclProvider` from the remote and gates rendering behind `EnvProvider` (client-side env/config context) and a `Suspense`/`Spinner` fallback, wrapping `LocalStorageProvider` → `View`.

### Path aliases
`@/*` → `App/*`, `api`/`api/*` → federated remote (types only, see above), `^/*` → repo root. Same-folder `./` is fine. Rewrite reachable `../` climbs to `@/...` when editing a file (`.cursor/rules/ts-path-aliases.mdc`). Exception: `App/.Client` and `App/.Server` bootstrap files may keep relative imports for config loaded before aliases exist (e.g. `getAlias.ts` importing `../../tsconfig.json`).

### Design system discipline (enforced by Cursor rules, apply the same bar here)
- **Components over raw DOM**: use the shared `@/Components` (`Text`, `Heading`, `Button`, `Badge`, `Card`+subparts, `List`/`ListItem`, `Layout` for grid/flex, `Image`, `Skeleton`, `Status`, `Spinner`, `Form*`, `Input*`, `Textarea`, `Checkbox`, `RadioGroup*`, `Select*`, `DatePicker`, `Switch`, `Details`+`Summary`) instead of hand-rolled markup. `Layout` owns stacking/gaps/alignment — view SCSS should not hand-roll `display: grid|flex` + `gap`/align/justify.
- **Utility classes over SCSS** for color/fill/type/position: `kicl-color-*`, `kicl-position-*` (never `position:` in SCSS), `kicl-inline-size-*`, `kicl-font-size*`, `kicl-font-*`/`kicl-line-height-*`/`kicl-text-align-*`/`kicl-text-transform-*` (capitalize | lowercase | uppercase | none).
- **Design tokens over magic numbers**: `var(--kicl-gutter-*)`, `var(--kicl-size-*)` for padding/margin/inset/border-radius/border-width — never invented `calc(var(--kicl-*) * n)` scales. Component SCSS defines its own `--kicl--components--{name}--*` vars on `:root`, overridden per modifier.
- **Single quotes** in TS/JS/JSX/JSDoc (Prettier `singleQuote`/`jsxSingleQuote`); use template literals for strings needing nested quotes rather than escaping.
- When touching UI that violates these, migrate it in the same change rather than leaving it inconsistent with neighboring code.

### Federated remote types housekeeping
`App/@mf-types/api` is generated (Module Federation `dts.consumeTypes`) — don't hand-edit it. If Backend's GraphQL schema changes, those types need regenerating from the Backend side (its `Codegen` workspace), not here.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Yarn 4 (Berry) workspace repo. Top-level workspace is `App`, which itself is a nested Yarn workspace of `.client`, `.server`, `views`. Node >=24 required. Prefer the `make` targets (thin wrappers over the `yarn run` scripts):

```bash
make install            # yarn install
make run                # development: frees the dev port from .env, then vite --host --debug
make run.production     # clean build dir, build client, then vite preview
make build               # vite build --debug (client bundle only)
make server              # build:server → runs the Express static/SSR-ish server (App/.server)
make test                # npx jest
make codegen             # run codegen (type generation)
make start               # yarn install + development (one-step bootstrap)
make client-token.keys   # once: Ed25519 pair, private key in ~/.kicl, prints KICL_CLIENT_PUBLIC_KEY
make client-token SUB=jane@example.com DAYS=14   # a client token for running a federated module against dev
make gcp.analytics TYPE=click SINCE=7d   # analytics events from the production logs (pageview by default)
make gcp.analytics.source                # the same for one region: .source or .second, named in gcp/.env
```

Other scripts not wrapped by `make`: `yarn lint:oxlint` (oxlint `--fix`), `yarn lint:stylelint` (`App/**/*.{css,scss} --fix`), `yarn lint:staged` (husky pre-commit, prettier+oxlint+stylelint via `lint-staged`). Single test file: `npx jest App/path/to/File.test.tsx`.

## Architecture

### Two apps in one repo: Client (Vite/React) + Server (Express)

- **`App/.client`** - Vite config factory (`getConfig` in `App/.client/index.ts`), consumed by `App/vite.config.ts`. Produces the SPA build (`App/build`).
- **`App/.server`** - a small Express server (`App/.server/index.ts`) that serves the built `App/build` static output in production, with custom range-request handling for video and content-type sniffing for images. Not a dev server - `make run` uses Vite's own dev server directly.
- **`App/env/*`** - per-concern config modules (each exports `{ path, middleware, proxy }`-shaped config); `.client`/`.server` both fold `Object.values(Env)` to collect proxy rules / Express middleware from one place rather than hardcoding per-feature wiring in the server or vite config.

### Module Federation: the design system remote

Components, core styles, icons, widgets, the theme/responsive/resize hooks and the HTTP status pages live in the [Ki.CL-design-system](https://github.com/kenilam/Ki.CL-design-system) repo, served as the remote `design` (`design/components`, `design/core`, `design/hooks`, `design/icons`, `design/router`, `design/status`, `design/widgets`). It is proxied same-origin at `/design`: in development Vite proxies to `KICL_DESIGN_URL` (default `http://localhost:3200`, run the design system with `make run` there), and in production `App/.server/proxy` forwards it with an ID token, like the API. Types come from `App/@mf-types/design`, pulled from the running remote. Routing comes from `design/router` (`Router`, `Route`, `MatchedRoute`, `useLocation`, …), never from `react-router-dom` directly. Icon sets are not exposed: import them from `react-icons` directly (`import * as Ri from 'react-icons/ri'`). Changing a component, a token or a utility is a change in that repo, not here.

### Module Federation consumes the Backend's GraphQL client

This app does not talk to GraphQL directly - it consumes the **Backend** repo's federated `Client` package as a Module Federation remote named `api` (see `App/.client/index.ts`'s `federation()` plugin config). `KiclProvider`, the typed documents and types it generates (`Kicl_TaxonVisualDocument`, `TaxonVisualStatus`, etc.) and Apollo's hooks all come from `import ... from 'api/provider'` / `'api'` at runtime - resolved via `KICL_API_REMOTE_ENTRY` (defaults to `/client/remoteEntry.js`, proxied same-origin to the Backend's `/client` route to avoid CORS/mixed-content). Types for `api/*` come from `App/@mf-types/api` (declared in `tsconfig.json` `paths`, generated separately - not a Vite alias, since aliasing it would shadow the real federated runtime remote). There are no per-operation hooks: pass the document to Apollo's hook, `useQuery(Kicl_TaxonVisualDocument, { variables })`, and it infers the result and variable types. Import `useQuery`, `useMutation`, `useSubscription` and `skipToken` from `api/provider`, not `@apollo/client`, so they run against the remote's client. React/react-dom/@apollo/client are shared singletons between host and remote - don't add a second copy of these as direct deps in a way that could desync versions.

`App.tsx` lazy-loads `KiclProvider` from the remote and gates rendering behind `EnvProvider` (client-side env/config context) and a `Suspense`/`Spinner` fallback, wrapping `LocalStorageProvider` → `View`.

### Path aliases

`@/*` → `App/*`, `api`/`api/*` → federated remote (types only, see above), `^/*` → repo root. Same-folder `./` is fine. Rewrite reachable `../` climbs to `@/...` when editing a file (`.cursor/rules/ts-path-aliases.mdc`). Exception: `App/.client` and `App/.server` bootstrap files may keep relative imports for config loaded before aliases exist (e.g. `get-alias.ts` importing `../../tsconfig.json`).

### Design system discipline (enforced by Cursor rules, apply the same bar here)

- **Semantic markup first, to W3C standards**: pick the element that means the thing (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `button` for actions, `a` for navigation, headings in order, lists for lists, `details`/`dialog` for disclosure and dialogs). Pass it through the `is` prop of `@/components` where they take one. Reach for ARIA only when no element fits. Markup must validate.
- **CSS over JS**: if CSS can do it (state via `:hover`/`:focus-visible`/`:has()`/`[open]`, scroll-driven and view-timeline animation, anchor positioning, container queries, `prefers-*` media), do it in CSS. Use JS only for what CSS cannot express.
- **No custom CSS unless nothing else can do it**: before writing any SCSS, look in `design/components` (`popover`, `animation`, `dialog`, `card`, …) and the design system's `core/styles` for the behaviour. Build from component props (`variant`, `size`, `is`), `Layout`/`List` props and `kicl-*` utilities. View `styles.scss` must not restyle, animate, position or reset what a component or utility already does. If something is truly missing, add it to the shared component or as a utility in the design system's `core/styles` (and move any existing copy there); never patch it in a view. If view CSS is unavoidable, say why in the PR.
- **No extra wrappers**: put classes on the element that already exists. Do not add a `div`, `span` or extra `Layout` just to carry classes, spacing or positioning. An icon takes `kicl-position-absolute` and inset classes itself, a component's root takes the page-width classes, a section takes its own padding instead of a gap `Layout` around siblings. Keep a wrapper only when it does a job nothing else can (a clipping box, a shared coordinate space, a semantic element).
- **Rethink before layering**: when changing code that already exists, find the one place that should own the behaviour and change that. A flag that swaps two class sets, a sibling component that patches an earlier choice, or the same value derived in two views means the shared source is wrong: fix the component prop, the frame token or the utility instead. Prefer deleting code to adding it.
- **Components over raw DOM**: use the shared `design/components` (`Text`, `Heading`, `Button`, `Badge`, `Card`+subparts, `List`/`ListItem`, `Layout` for grid/flex, `Image`, `Skeleton`, `Status`, `Spinner`, `Form*`, `Input*`, `Textarea`, `Checkbox`, `RadioGroup*`, `Select*`, `DatePicker`, `Switch`, `Details`+`Summary`) instead of hand-rolled markup. `Layout` owns stacking/gaps/alignment - view SCSS should not hand-roll `display: grid|flex` + `gap`/align/justify.
- **Utility classes over SCSS** for color/fill/type/position: `kicl-color-*`, `kicl-position-*` (never `position:` in SCSS), `kicl-inline-size-*`, `kicl-font-size*`, `kicl-font-*`/`kicl-line-height-*`/`kicl-text-align-*`/`kicl-text-transform-*` (capitalize | lowercase | uppercase | none).
- **Widths come from the 12-column scale** (the design system's `core/styles/columns.scss`): pages use 12 columns (80rem) through `kicl-max-inline-size-columns-12` or `var(--kicl-columns-12)`, and narrower blocks use a smaller span (`Card size={1…12}`, or `Layout columns` with `span` on its children). No hand-picked `rem`/`ch` widths.
- **Design tokens over magic numbers**: `var(--kicl-gutter-*)`, `var(--kicl-size-*)` for padding/margin/inset/border-radius/border-width - never invented `calc(var(--kicl-*) * n)` scales. Component SCSS defines its own `--kicl--components--{name}--*` vars on `:root`, overridden per modifier.
- **Infer types, don't restate them**: derive props from the element or component they come from (`React.ComponentProps<'nav'>`, `React.ComponentPropsWithoutRef<'button'>`, `Pick<ListProps, 'is'>`, `Parameters<typeof fn>[0]`) instead of writing inline shapes like `{ className?: string }`.
- **Single quotes** in TS/JS/JSX/JSDoc (Prettier `singleQuote`/`jsxSingleQuote`); use template literals for strings needing nested quotes rather than escaping.
- When touching UI that violates these, migrate it in the same change rather than leaving it inconsistent with neighboring code.

### Federated remote types housekeeping

`App/@mf-types/api` is generated (Module Federation `dts.consumeTypes`) - don't hand-edit it. If Backend's GraphQL schema changes, those types need regenerating from the Backend side (its `Codegen` workspace), not here.

## Structure

Views are folders of small parts, not one long file. Follow `App/views/experiments/tree-of-life/home` and `App/views/experiments/home`:

- A route folder has `index.tsx` (the `<Route>`), `contents.tsx` (what it renders) and `constants.ts` (paths, class root, copy that is shared).
- Every visual section is its own folder with `index.tsx` and `styles.scss`: `home/stage`, `home/stage/screen`, `home/more`. Nest a folder inside the part that owns it.
- No wrapper components for shared markup. Each section writes its own markup from `design/components`; what they share goes in tokens (`styles.scss` custom properties) and `constants.ts`, not in a component with props.
- File and folder names are lowercase with dashes (`hyper-link/use-url-status.tsx`, `styles.scss`). Component names inside stay PascalCase.
- Named exports only, no `export default`. `React.lazy` maps the name with `async`/`await`: `lazy(async () => { const { Contents } = await import('./contents'); return { default: Contents }; })`. Tool configs that must default-export (`vite.config.ts`) are the exception.
- Keep `index.tsx` short: composition at the top, one component per file, under about 80 lines. If a file grows past that, split it.
- Each part styles only its own elements, under its own class root (`kicl--views--…__part`), reading shared tokens from the root folder's `styles.scss`.

## Writing

Everything written here is read by people: UI copy, comments, commit messages, README text. Write it the way a good colleague would, not the way a model tends to.

- Say the thing. One plain sentence beats a crafted one. Cut adjectives, metaphors and flourishes ("a breath of the accent", "the words stand above every plate").
- No rhythm tricks: no triplets for effect, no "not X but Y", no sentence that ends on a reveal, no colon-then-punchline.
- No narrating what the reader can see. A comment says why, in one or two lines; the code says what.
- UI copy is short and concrete. "See the experience", "Bookmark this page", "More to come". Never explain a feature inside the UI.
- Commit messages: first line what changed, body why, in normal sentences. No manifesto.
- README: facts, decisions, how to run it. Skip the story of how it was built unless it explains a decision.
- If a sentence would sound odd said out loud to a teammate, rewrite it.

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
make test                # Node's test runner through tsx, every *.test.ts under App
make codegen             # run codegen (type generation)
make start               # yarn install + development (one-step bootstrap)
make client-token.keys   # once: Ed25519 pair, private key in ~/.kicl, prints KICL_CLIENT_PUBLIC_KEY
make client-token SUB=jane@example.com DAYS=14   # a client token for running a federated module against dev
make gcp.analytics TYPE=click SINCE=7d   # analytics events from the production logs (pageview by default)
make gcp.analytics.source                # the same for one region: .source or .second, named in gcp/.env
make resume.pdf          # the public resume PDF, printed from the site running locally and uploaded to the static bucket
make resume.pdf.private OUT=~/Desktop/resume   # every version, Letter and A4, with the phone number from .env
```

Other scripts not wrapped by `make`: `yarn lint:oxlint` (oxlint `--fix`), `yarn lint:stylelint` (`App/**/*.{css,scss} --fix`), `yarn lint:staged` (husky pre-commit, prettier+oxlint+stylelint via `lint-staged`). Single test file: `yarn workspace app.server exec tsx --test $PWD/App/path/to/file.test.ts`.

## Architecture

### Two apps in one repo: Client (Vite/React) + Server (Express)

- **`App/.client`** - Vite config factory (`getConfig` in `App/.client/index.ts`), consumed by `App/vite.config.ts`. Produces the SPA build (`App/build`).
- **`App/.server`** - a small Express server (`App/.server/index.ts`) that serves the built `App/build` static output in production, with custom range-request handling for video and content-type sniffing for images. Not a dev server - `make run` uses Vite's own dev server directly.
- **`App/env/*`** - per-concern config modules (each exports `{ path, middleware, proxy }`-shaped config); `.client`/`.server` both fold `Object.values(Env)` to collect proxy rules / Express middleware from one place rather than hardcoding per-feature wiring in the server or vite config.

### Module Federation: the design system remote

Components, core styles, icons, widgets, the theme/responsive/resize hooks and the HTTP status pages live in the [Ki.CL-design-system](https://github.com/kenilam/Ki.CL-design-system) repo, served as the remote `design` (`design/components`, `design/core`, `design/hooks`, `design/icons`, `design/router`, `design/status`, `design/widgets`). It is proxied same-origin at `/design`: in development Vite proxies to `KICL_DESIGN_URL` (default `http://localhost:3200`, run the design system with `make run` there), and in production `App/.server/proxy` forwards it with an ID token, like the API. Types come from `App/@mf-types/design`, pulled from the running remote. Routing comes from `design/router` (`Router`, `Route`, `MatchedRoute`, `useLocation`, …), never from `react-router-dom` directly. Libraries that every repo shares come from one place, the remote that owns them, never from the package itself: forms (`useForm`, `useFormContext`, `useFormState`, `useWatch`, `valibotResolver` and the form types) from `design/components`, `useTranslation` and `TFunction` from `design/hooks`, `IconType` from `design/icons`, and Apollo from `api/client`. Only `App/language`, which creates the i18next instance, imports `i18next` and `react-i18next` itself. A valibot schema still imports `valibot`. Icon sets are not exposed, since re-exporting a namespace ships every icon: import them from `react-icons` directly. Every icon on the site comes from Tabler Icons (`import * as Tb from 'react-icons/tb'`), so they look alike across repos. Changing a component, a token or a utility is a change in that repo, not here.

### Module Federation consumes the Backend's GraphQL client

This app does not talk to GraphQL directly - it consumes the **Backend** repo's federated `Client` package as a Module Federation remote named `api` (see `App/.client/index.ts`'s `federation()` plugin config). `Provider`, the typed documents and types it generates (`Kicl_TaxonVisualDocument`, `TaxonVisualStatus`, etc.) and Apollo's hooks all come from `import ... from 'api/client'` / `'api'` at runtime - resolved via `KICL_API_REMOTE_ENTRY` (defaults to `/client/remoteEntry.js`, proxied same-origin to the Backend's `/client` route to avoid CORS/mixed-content). Types for `api/*` come from `App/@mf-types/api` (declared in `tsconfig.json` `paths`, generated separately - not a Vite alias, since aliasing it would shadow the real federated runtime remote). There are no per-operation hooks: pass the document to Apollo's hook, `useQuery(Kicl_TaxonVisualDocument, { variables })`, and it infers the result and variable types. Import `useQuery`, `useMutation`, `useSubscription` and `skipToken` from `api/client`, not `@apollo/client`, so they run against the remote's client. React/react-dom/@apollo/client are shared singletons between host and remote - don't add a second copy of these as direct deps in a way that could desync versions.

`App.tsx` lazy-loads `Provider` from the remote and gates rendering behind `EnvProvider` (client-side env/config context) and a `Suspense`/`Spinner` fallback, wrapping `LocalStorageProvider` → `View`.

### Notifications

The bell is a remote of its own, `notification` from [Ki.CL-notifications](https://github.com/kenilam/Ki.CL-notifications), loaded lazily beside the `Outlet` on every page (`App/views/shell/main/page/outlet`) as `<Notification />`. It brings its own queries, runs them through the host's Apollo client, and translates each notification with the namespace the sender names, so the host keeps no list of kinds of work, links or icons. It is proxied same-origin at `/notification` to `KICL_NOTIFICATION_URL` (`http://localhost:3401` locally), like the design system. A view that starts work needs to do nothing for it: the bell reads the list again on navigation and when the page regains focus, and keeps a socket open only while something is still running.

### Experiments with a service of their own

An experiment that has moved out of core, such as Color swatches from [Ki.CL-experiment-color-swatches](https://github.com/kenilam/Ki.CL-experiment-color-swatches), is a service and a remote the host doesn't build in. `App/views/experiments/federated` mounts `experiments/:name/*` after the experiments the host still has: it registers the remote `<name>` at runtime from `/experiments/<name>/client/remoteEntry.js` and renders the `Experiment` its `./client` exports, with routes relative to that mount. One that can't be loaded fails only its own page. The experiments page and the home page show its `Preview`, from `./preview`, through `FederatedPreview`; a preview that can't load draws nothing. The server (`App/.server/proxy/experiments.ts`) reads the registry named by `KICL_REGISTRY`, a bucket or a local directory, every 30 seconds, and forwards each record's mount, `client/` and `files/`, to its service with an identity token; the dev server reads a local directory once. A new experiment needs no host release, though its card and words in `App/views/routes.ts` and `common` still do.

### Writing comes from the database, through i18next

UI copy is not written in components. It lives in `App/locales/en-US/<namespace>.json` and belongs to [Ki.CL-i18n](https://github.com/kenilam/Ki.CL-i18n), the service and remote that own every language on the site. The host's build sends those files to it before deploying (the `Words` step in `cloudbuild.yaml`), one row for each string. `App/language` sets up i18next with the `i18n` remote's `backend`, which reads each namespace from that service. Components read it with `useTranslation()` from `design/hooks`.

- `common` holds what renders outside a route's own `Suspense`: the header, navigation, session gate and dialogs. It loads before the app mounts. A view names its own namespace, `useTranslation('resume')`, and suspends into its route's fallback. Never use a view namespace outside that route's `Suspense`.
- Dynamic copy goes through `t` too, with the values passed in: `t('review.left', { count })`, `t('sent_to', { email })`, `t('placeholder', { context: kind })`. Plurals are `_one`/`_other`/`_zero` keys and variants are `_<context>` keys. A line with bold text, code or a link in it is written as inline Markdown and rendered with `Markdown` from `design/components`: `<Text><Markdown>{t('summary')}</Markdown></Text>`. Inline code takes its look in braces after it, `` `IDLE`{confirm} `` or `` `/play`{secondary} ``, and a link whose target is computed is templated, `[v1]({{v1}})`. A value that comes from anywhere else (an email, a name, a number the code holds, a path) is always templated into the string. Never build a sentence by joining strings or JSX fragments, and never write a plural with a ternary.
- A route's namespace follows the same rules as `common` for its headings and buttons: flat keys, grouped by context. In `resume`, `title_summary` with `t('title', { context: 'summary' })` and `action_download` with `t('action', { context: 'download' })`. Only content with a structure of its own is nested, like the resume's lines (`experience.apple.points.lead`). A variant is a context there too, never a path: the manager resume's wording of that line is `experience.apple.points.lead_manager`, and a line with no variant is read by every version. No `copy.` prefix, and the route's name is not repeated in the key.
- A name used on more than one route (an employer, a product) is not written in each route's namespace. It goes in `common` as one key per context, `organisation_apple`, read with `t('organisation', { context: 'apple' })`.
- Write a phrase once. A page that needs words another namespace already has reads them from there (`common('resume')`), and a string that carries another refers to it: `Code is at $t(links.github).` Two strings that only read alike but say different things stay separate.
- `common` is flat: every key is a short name for the phrase, at the top level, with no groups. Phrases of one kind share a base and are read by context: `action_print` with `t('action', { context: 'print' })`, `session_failed` with `t('session', { context: 'failed' })`, `sign_out_confirm`, `organisation_apple`. A word on its own is a plain key: `resume`, `account`. The key says what the words are, not where they are used.
- Keys are lower case with underscores, never camel case: `send_message`, `react_native`. A key must not end in `_one`, `_other`, `_zero`, `_two`, `_few` or `_many` unless it is a plural form, because i18next reads those endings as plurals.
- Keys are typed from the JSON files in `App/types/i18next.d.ts`. Add a new namespace there.
- After adding or changing a key, seed your local database before you look at the page, since the site shows the key itself until the database has it: `make translations.seed DIR=../Ki.CL/App/locales` in Ki.CL-i18n. A deploy sends the English itself. Dev translates it, and production copies dev's translations, so a release reaches dev first.
- `seed` never removes a key. Remove dead keys with `make translations.prune` in Ki.CL-i18n one release later. A string whose placeholders change gets a new key.
- `common.json` is also bundled, and used only when the API cannot be reached.
- Only English is written in files. Ki.CL-i18n translates the other languages into the database. A language is used only once every string is translated; until then the API answers in the visitor's next accepted language, then `en-US`, so i18next has no `fallbackLng`.
- The language travels in the `Accept-Language` header and never in a query's variables. On start, `App/language` sends the remembered choice or `navigator.language` first and takes the language the API answered in, from `Content-Language`; `common.json` is its fallback when the API can't answer. The header's switcher is the remote's `LanguageSelect`, placed by `App/views/language`. It reads `i18nAcceptLanguagesUpdated` through the host's Apollo client: complete languages can be picked, and the others are disabled with a note, or busy while they are translated. Picking one remembers it in `localStorage`. After each namespace loads, the remote's backend switches to the language in `Content-Language` if the API answered in another one, so the switcher always shows the page's language. `<html lang>` and `dir` follow i18next's language, and the API client sends `<html lang>` first, then `navigator.languages`, as `Accept-Language`.
- What the server writes itself is in the `server` namespace: the shell's title and site name in `App/index.html`, the web manifest's name, the gate's page and the plain error bodies. Those files ask for a string by `{{key}}`, and `App/middleware/texts` fills it in on each request (Vite does the same while developing). A build keeps the braces.
- Names are writing too: the site owner's name and email, the profile addresses (`url_github`), an experiment's name, a track's title. None is a constant in a component.

### Path aliases

`@/*` → `App/*`, `api`/`api/*` → federated remote (types only, see above), `^/*` → repo root. Same-folder `./` is fine. Rewrite reachable `../` climbs to `@/...` when editing a file (`.cursor/rules/ts-path-aliases.mdc`). `App/.server` and the scripts it runs (`views/resume/export/cli.ts`) use `@/` too, since tsx loads `App/.server/tsconfig.json`, which extends the App config. The exception is `App/.client`, the Vite config, which loads before any alias exists (`get-alias.ts` imports `../../tsconfig.json`). The remotes import themselves by their federation names (see the root `CLAUDE.md`).

### Design system discipline (enforced by Cursor rules, apply the same bar here)

- **Semantic markup first, to W3C standards**: pick the element that means the thing (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `button` for actions, `a` for navigation, headings in order, lists for lists, `details`/`dialog` for disclosure and dialogs). Pass it through the `is` prop of `@/components` where they take one. Reach for ARIA only when no element fits. Markup must validate.
- **HTML and CSS before JS, always**: an element the browser already has (`details`, `dialog`, `popover`, a `fieldset` with its `legend`, a form control) and a selector that reads its state come first; a `div` that only carries classes and a React state that mirrors what the DOM already knows are both wrong. JS is the last resort, for what no element or selector can do.
- **CSS over JS**: if CSS can do it (state via `:hover`/`:focus-visible`/`:has()`/`[open]`, scroll-driven and view-timeline animation, anchor positioning, container queries, `prefers-*` media), do it in CSS. Use JS only for what CSS cannot express.
- **Browser support**: a feature that not every current engine ships goes behind `@supports` in CSS (or a feature check in JS), with a fallback that gives the same result without it. Examples are `calc-size()`, `appearance: base-select`, `field-sizing`, and `position-area` with `anchor()`. The fallback has to work in Safari, not only degrade. Playwright's WebKit is newer than the Safari people use, so check the real Safari (through `safaridriver`) before calling a fix done. The popover's width in `design/components/popover/content/styles.scss` is the pattern: `calc-size()` where it's supported, `max-content` with the same cap elsewhere.
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

Views are folders of small parts, not one long file. The aim is a modular architecture, the same idea as the federated remotes and the API's modules at a smaller scale. A part owns its data access and its words, other code reaches it only through its folder's `index`, and it can move to another layout, or out into a remote, without changing what's around it. Follow `App/views/experiments/tree-of-life/home`, `App/views/experiments/home` and the music visualiser's `groups/types/track/chrome/controls`.

Folders and files:

- A route folder has `index.tsx` (the `<Route>`), `contents.tsx` (what it renders) and `constants.ts` (paths, class root, copy that is shared).
- Every visual section is its own folder with `index.tsx` and `styles.scss`: `home/stage`, `home/stage/screen`, `home/more`. Nest a folder inside the part that owns it.
- Keep every file short: composition at the top, one component per file, under about 80 lines. If a file grows past that, split it into parts or move its logic into a `use-*.ts` hook beside it.
- File and folder names are lowercase with dashes (`hyper-link/use-url-status.tsx`, `styles.scss`). Component names inside stay PascalCase.
- Named exports only, no `export default`. `React.lazy` maps the name with `async`/`await`: `lazy(async () => { const { Contents } = await import('./contents'); return { default: Contents }; })`. Tool configs that must default-export (`vite.config.ts`) are the exception.
- No cross imports. A component never imports from a sibling's folder. A part used by one component lives inside it; a part two siblings share moves up to their parent, and both import it from there. Run the check before a change is done: nothing may reach into a sibling. Each experiment's preview for the experiments page is gathered in `App/views/experiments/previews.ts`.
- `App/views/constants.ts` holds what several views share and imports nothing. `App/views/routes.ts` composes the views' own path constants into the site's pages, top routes, experiments, workshop topics and notification links; only components and `App/middleware/crawl` import it, so nothing cycles back.
- `robots.txt`, `sitemap.xml` and `llms.txt` are built on each request by `App/middleware/crawl`, from `routes.ts` and the English locale files, in development and on the server. A new top route, experiment or workshop topic is listed without any change there. A page outside those lists (like `/resume`) or a new private page is added to `crawl/pages.ts`, and a new section of `llms.txt` to `crawl/llms.ts`.
- Link previews come from the same place. The shell's `{{page.*}}` tags (description, Open Graph, `twitter:card`) are filled from the page's entry in `crawl/previews.ts`, and its card is drawn on request at `/og/<path>.png` (`/og.png` for home) with satori and resvg. Experiments, workshop topics and posts get an entry without any change. A new top page needs its own entry, or it shares the home page's. A path inside a page (`/experiments/kinetic-light/<id>`) takes that page's words and card, with its own URL.

Breaking a component into parts. Length is not the test, a short component splits too:

- One part per control or slot. The player's controls are `pause/`, `next/`, `progress/`, `volume/`, `share/` and `clip/`, and the parent only places them. The start-over dialog in factory-arm's `workspace/panel/confirm` places `title/`, `message/`, `cancel/` and `proceed/`, and only owns `open` and `onClose`. A part that always sits in a list renders its own `ListItem`; a part that each layout places differently renders only its content, and the layout wraps it.
- A provider never has markup written inside it. The provider is its own part that builds the value and renders it around `children`, and the component that uses it only composes. Kinetic Light's `backdrop` is `<Provider><Picture /></Provider>`: `context/` builds the stage value, and `picture/` draws it, with `lens/` inside because only the picture uses it.
- A context is one folder, `context/`, and its `index.tsx` holds `createContext`, the `Provider` and the read hook, like the design system's `components/breadcrumb/context/index.tsx`. Parts import the hook from `…/context`, and the component that composes imports `Provider` from `./context`. A context that sibling folders share sits at their common parent.
- A context that bundles separate concerns splits into small contexts, each its own `context/` folder inside the part that owns it, so a part reads only what it uses and doesn't re-render for the rest.
- A layout that differs by screen is a version, not breakpoint CSS. A folder named after the breakpoint where the layout breaks and `default/` compose the same parts, picked with that breakpoint's `useResponsive()` flag (`narrowest/` with `isNarrowest` for the player's controls, `narrow/` with `isNarrow` for the navigation) from a `VERSIONS` map of `React.lazy` imports behind `Suspense` with `<Spinner position='inline' />`, like `App/views/navigation/index.tsx`. The parts stay in the parent folder.
- No wrapper components for shared markup. Each section writes its own markup from `design/components`; what they share goes in tokens (`styles.scss` custom properties) and `constants.ts`, not in a component with props.

Lists. Every list rendered with `.map` splits into a plural part that maps and a singular part for one item, whatever the list comes from: a query, a hook, a context, state, a prop, a constants array of Three.js meshes, or translation contexts in an article. The image agent's `past/` places `threads/`, which maps the matches to `threads/thread/`; an article's steps are `steps/` → `steps/step/`.

- The item takes only the field that identifies it, the same one used as its `key` (`id`, or `to`, a slug or the value itself when that's what identifies it, as in `<Board z={z} key={z} />`), and finds its entry in the same owner. Never an `index`: a position points at a different item once the list is filtered, reordered or refetched.
- The item reads with the default cache-first policy, so mounting an item never fetches. The section that owns the list does the fetch.
- Per-item work belongs in the item: a hook that maps a list into per-item values keeps only the list, and per-item state (open, editing) lives in the item.
- A `.map` that only builds data stays as it is.
- Some design-system components read their children, so those children stay as the component expects, even inside a list. `Button` gives a button the icon-only look unless a child is text. `Segmented` finds the chosen item's label through each `SegmentedItem`'s `value` and children. `Select` adds its own trigger unless a direct child is a `SelectTrigger`. `FormItem` looks for `FormDescription`, and `SelectGroup` for `SelectLabel`. So a list maps straight to `<SegmentedItem key={v} value={v}>{t('kind', { context: v })}</SegmentedItem>`, with the text written in it, and a custom trigger is `<SelectTrigger><Face /></SelectTrigger>`, with the part inside. Wrapping these in a part broke the docs pickers and the header's language select in the 2026-11-11 release.

Data, without prop drilling. A part reads what it needs from its owner and builds its own value:

- The owners, in order: the route (`useParams`, `useMatch`), the Apollo cache (`useQuery` on a document a parent already fetched reads the cache, it doesn't refetch), i18next (`useTranslation` in the part that shows the words, never a `t` or a string passed down), and as a last resort a context that the route or the owning component provides.
- A part takes no props except its identifying field and `children`. A parent never assembles a value for a child, never passes a callback down only so a child can change the parent's state, and never spreads props or a hook's result into a child.
- A component doesn't open with a run of hook calls, context reads or `useState`s. Each value moves into the part that uses it, and what the component itself still needs goes into one `use-*.ts` beside it.
- A `useState` lives in the part that reads and sets it. State two parts share goes to its owner: the URL, then the Apollo cache, then a context. State that bundles separate concerns splits, and a `useState` that copies what an owner or the DOM already knows is deleted.

Class names and styles:

- More than one class is always `classNames('a', 'b')`, never a space-separated string or a template literal. One class is a plain string. A class that depends on state is `classNames({ 'is-revolving': recording })`.
- Each part styles only its own elements, under its own class root (`kicl--views--…__part`), reading shared tokens from the root folder's `styles.scss`.

## Writing

Everything written here is read by people: UI copy, comments, commit messages, README text. Write it the way a good colleague would, not the way a model tends to.

- Say the thing. One plain sentence beats a crafted one. Cut adjectives, metaphors and flourishes ("a breath of the accent", "the words stand above every plate").
- No rhythm tricks: no triplets for effect, no "not X but Y", no sentence that ends on a reveal, no colon-then-punchline.
- No narrating what the reader can see. A comment says why, in one or two lines; the code says what.
- UI copy is short and concrete. "See the experience", "Bookmark this page", "More to come". Never explain a feature inside the UI.
- Link what the copy names, so a reader can open it. A page on this site gets its path, `[$t(common:experiment_kinetic_light)](/experiments/kinetic-light)`, never the domain. A source, a spec, a tool, a file format or a CSS or HTML feature with a page of its own gets that page: the spec, the project's site, MDN for web features. Link the first mention in an article, not every one, and open each address before adding it. This applies to every article, docs page and paragraph rendered with `Markdown`, new or edited. Headings, titles and buttons stay plain text.
- Commit messages: first line what changed, body why, in normal sentences. No manifesto.
- README: facts, decisions, how to run it. Skip the story of how it was built unless it explains a decision.
- If a sentence would sound odd said out loud to a teammate, rewrite it.
- The About page is the one exception. Its chapters are written as a story about the author, so a title can name a theme ("An education in making") and a metaphor from the author's own history can stay ("code could be another kind of canvas"). The facts in it stay concrete: the employer, the place, the thing built, the number.

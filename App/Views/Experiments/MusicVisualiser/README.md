# Music Visualiser

An experiment, built from scratch, step by step. Nothing here yet but this
note, which carries the context from the session that scoped it so the next
session can pick up without repeating the research.

## Where it goes

- This folder, `App/Views/Experiments/MusicVisualiser`.
- Wired as a route under Experiments the way `TreeOfLife` is, in
  `App/Views/Experiments/index.tsx`.
- Follows `CLAUDE.md`: `@/Components` over raw DOM, `kicl-*` utility classes,
  design tokens over magic numbers, single quotes, `@/` path aliases.

## Where the music comes from

Research done in the previous session, September 2026. The constraint that
decides everything: an `<audio>` element plays almost anything, but the Web
Audio analyser can only read a stream whose server sends
`Access-Control-Allow-Origin`, or one proxied through our own origin.

Recommended, in order:

1. **Audius**. Free, open API, no key needed to read or stream. Base
   `https://api.audius.co/v1`, pass `app_name`. Endpoints for search,
   trending, playlists, and a stream endpoint that redirects to an MP3 with
   range support. Catalogue is independent artists, not Creative Commons;
   fine for playback. Hosting is decentralised, so expect the odd slow node.
2. **Jamendo**. Free for non-commercial use, needs a `client_id` from the
   developer portal, 35,000 requests a month. Returns MP3 URLs per track and
   the licence field. The terms require showing attribution and the licence
   in the UI. CORS on the audio host is undocumented.

Usable but second tier: Internet Archive (huge free catalogue, hotlinking
allowed, but no CORS on search and inconsistent on downloads), Openverse
(discovery only, files live elsewhere), ccMixter (CORS undocumented).

Ruled out: SomaFM (terms forbid third-party embedding, even non-commercial),
Free Music Archive (API shut down, hotlinking prohibited), radio-browser.info
streams (third-party Icecast, no CORS), Spotify, Deezer and Apple (previews
only, terms).

## Design decisions already taken

- Route provider audio through a same-origin `/music/*` proxy using the
  existing `App/Env` module pattern, where each module exports
  `{ path, middleware, proxy }` and both `.Client` (Vite) and `.Server`
  (Express) fold them in. That takes CORS off the table.
- Put the provider behind an adapter so Jamendo can be added after Audius.
- First step in the next session: live-check CORS headers on
  `api.audius.co` and `*.storage.jamendo.com` streams. See the blocked
  attempt below before trying again.

## Blocked: egress to Audius and Jamendo

Attempted in a cloud session, 20 September 2026. No headers were read.

- Every request to `api.audius.co`, `discoveryprovider.audius.co`,
  `api.jamendo.com` and `prod-1.storage.jamendo.com` failed at the egress
  proxy with a 403 on the CONNECT tunnel. The providers never answered.
- The proxy itself was healthy: `registry.npmjs.org` returned 200 through
  it, and WebFetch reported `EGRESS_BLOCKED` for `api.audius.co`.
- The previous session believed the allowlist already included these hosts.
  This container did not see that. Either the change did not save, it was
  made to a different environment, or the container predates it.

Before retrying: add the hosts to the environment's network policy and
start a fresh session, since the policy is read at container start. Audius
discovery nodes have many hostnames, so allow `*.audius.co` rather than
naming nodes. Jamendo streams come from `*.storage.jamendo.com`. Then the
check is a few curls, sending an `Origin` header and reading
`Access-Control-Allow-Origin` from the response, one on the API and one on
a stream URL after following its redirect.

## Running the app in a cloud session

What it took last time; none of it is in the repo.

- The container ships Node 22 and both repos need 24 or newer:
  `source /opt/nvm/nvm.sh && nvm install 24`.
- Yarn 4 through corepack fails on its default host:
  `COREPACK_NPM_REGISTRY=https://registry.npmjs.org corepack enable`.
- `vite-plugin-mkcert` cannot download its binary through the proxy. Fetch
  it with curl to `~/.vite-plugin-mkcert/mkcert` and `chmod +x` it before
  `make run`.
- The frontend needs a local `.env`: `NODE_ENV=development` and
  `PORT=3001`. The site is at `https://localhost.kicl.com:3001`; the
  hostname is already in `/etc/hosts`. Curl it with `--noproxy '*'`.
- The backend needs `MONGODB_ATLAS_URI` in `Ki.CL-back/.env`, which is
  gitignored and not in the clone. Without it the backend will not boot.
- Workaround that renders the site without Mongo: the host's Module
  Federation runtime blocks all rendering if `/client/remoteEntry.js` 502s.
  In `Ki.CL-back`, run `yarn codegen` then
  `yarn workspace @ki-cl/client run build`, and serve `Client/dist` at
  `/client` from a tiny Express static server on port 3100 (also map
  `/client/@mf-types.zip` to `types.zip`, and answer `/api` with a 503).
  Restart Vite once it is up so `App/@mf-types` gets generated, which
  clears the TypeScript checker overlay.
- Screenshots: Playwright with `executablePath: '/opt/pw-browsers/chromium'`,
  a proxy bypass for `localhost.kicl.com`, and for WebGL the flags
  `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.

## What shipped just before this

PR #358, merged into `develop`: the home page background is a WebGL
dither-gradient shader at `App/Views/Home/Background/`. Palette, cell size
and tone count are custom properties on the canvas, set per theme in its
stylesheet.

Noted and not fixed: React 19 warns that the `commandFor` prop on invoker
buttons should be lowercase `commandfor`. It appears in `Dialog`, the
mobile `GlobalHeader` navigation, the Portfolio SystemDesign sections and
the TreeOfLife `Figure`.

---
name: cloud-session
description: Run, verify and screenshot the Ki.CL frontend inside a Claude Code on the web container - what the SessionStart hook already did, how to start Vite, how to render the site when the backend cannot boot, and how to take a WebGL screenshot with the preinstalled Chromium. Use when asked to run the app, check a change in the browser, or when `make run` fails in a cloud session.
---

# Ki.CL in a cloud session

The SessionStart hook (`.claude/hooks/session-start.sh`) has already run when a
web session opens. It installed Node 24, enabled Yarn 4 through the npm
registry, ran `yarn install`, built `mkcert` from source with Go, added
`localhost.kicl.com` to `/etc/hosts`, and wrote a `.env` with
`NODE_ENV=development` and `PORT=3001`. If any of that looks missing, run
the hook by hand:

```bash
CLAUDE_CODE_REMOTE=true ./.claude/hooks/session-start.sh
```

## Start the site

```bash
make run          # vite --host --debug, https://localhost.kicl.com:3001
```

Curl it with the proxy bypassed, and accept the mkcert certificate:

```bash
curl -sk --noproxy '*' https://localhost.kicl.com:3001/ | head
```

## The backend is not available here

`Ki.CL-back` refuses to start without `MONGODB_ATLAS_URI`, which is
gitignored and never in a cloud clone. Without a backend the host's Module
Federation runtime cannot load `/client/remoteEntry.js` and blocks all
rendering, so the page stays blank.

The workaround is to serve the backend's built Client package on the port
the host expects (`3100`, the `KICL_BACKEND_URL` default). The backend's own
SessionStart hook has already run codegen and built `Client/dist`, so:

```bash
node .claude/skills/cloud-session/serve-remote.mjs &   # serves ../Ki.CL-back/Client/dist
make run
```

Pass a different dist path or port as arguments if the clone lives
elsewhere. Anything under `/api` answers 503, so views that need GraphQL
show their loading or error state, but the shell, Home and static views
render.

Start the stand-in before Vite. On start Vite pulls `types.d.ts` and
`types.zip` from the remote into `App/@mf-types`, which is what the
TypeScript checker overlay needs. If Vite came up first, restart it once the
stand-in is listening.

## Screenshots

Playwright is installed globally and Chromium lives at
`/opt/pw-browsers/chromium`. Never run `playwright install`. Bypass the
egress proxy for the dev host, and for anything WebGL (the Home background
is a shader) use SwiftShader:

```js
import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: [
    '--ignore-certificate-errors',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
  proxy: {
    server: process.env.HTTPS_PROXY,
    bypass: 'localhost.kicl.com,localhost,127.0.0.1',
  },
});
const page = await browser.newPage({ ignoreHTTPSErrors: true });
await page.goto('https://localhost.kicl.com:3001/', { waitUntil: 'networkidle' });
await page.waitForTimeout(8000); // entrance animations; earlier is a blank page
await page.screenshot({ path: 'home.png', fullPage: true });
await browser.close();
```

Playwright is under the container's Node 22 tree, and ESM ignores
`NODE_PATH`, so import it by path from a script run with Node 24:
`import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'`.

Expect a failed request for `use.typekit.net` unless that host is on the
network policy: the brand fonts fall back, nothing else is affected. The
two 503s on `/api` are the stand-in answering for the backend.

## Egress

Only hosts on the environment's network policy are reachable, and the
policy is read at container start: a host added mid-session needs a fresh
session. GitHub releases are blocked (hence mkcert from source); the npm
registry, nodejs.org and the Go module proxy are open.

## Checks

There is no test suite. What a contributor runs before pushing:

```bash
yarn lint:oxlint                       # oxlint --fix over the repo
yarn lint:stylelint                    # App/**/*.{css,scss}
npx oxlint App/path/to/File.tsx        # one file
```

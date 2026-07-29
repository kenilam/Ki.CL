# Patches and version holds

Everything in both repos tracks latest except what is listed here. Each entry
says what blocks it and what to re-check, so these do not quietly become
permanent. Re-check on any dependency sweep.

Backend keeps its own copy of this file — the two must agree on the shared
singletons (`graphql`, `@apollo/client`, `graphql-ws`, `react`, `react-dom`),
because Module Federation shares them at runtime and a split fails in the
browser rather than at build.

---

## Patch: `@graphql-codegen/typescript-react-apollo` 4.4.2

`Backend/.yarn/patches/@graphql-codegen-typescript-react-apollo-npm-4.4.2-*.patch`
(the patch lives in Backend, which owns codegen; it is listed here because the
hooks it generates are what this repo consumes through the `api` remote)

**What:** `(node.variableDefinitions ?? []).reduce(...)` in `_buildHooksJSDoc`,
in both the `esm` and `cjs` builds.

**Why:** graphql 17 leaves `variableDefinitions` `undefined` on an operation
that declares no variables, where graphql 16 always supplied an empty array.
The plugin calls `.reduce` on it unguarded, so codegen dies with
`Cannot read properties of undefined (reading 'reduce')`. Four of our
operations take no variables — `kicl_Me`, `kicl_ExchangeToken`,
`kicl_RefreshToken`, `kicl_SignOut` — so this is not an edge case for us.

**Re-check:** 4.4.2 was the latest as of this writing and its peer range still
caps at graphql `^16`. Drop the patch once a release declares `^17` and
generates without it: remove the `patch:` protocol from `Codegen/package.json`,
delete the patch file, then `yarn codegen` and confirm
`Client/src/generated/hooks.ts` is written.

---

## Hold: `typescript` at 6.0.3, not 7.x

**Why:** TypeScript 7 is the native port. `typescript-eslint` refuses it by
explicit version check — `typescript-eslint does not support TS 7.0` — thrown
from `@typescript-eslint/parser` and `eslint-plugin` before any linting starts,
so lint is lost entirely on both repos. Its peer range is `>=4.8.4 <6.1.0`,
which 6.0.3 satisfies.

TS 7 itself is fine for us: typechecking both repos on 7.0.2 gave the same zero
errors as 6.0.3. Only the lint toolchain blocks it.

**The documented side-by-side workaround does not work with our layout.** It
aliases eslint's `typescript` to the `@typescript/typescript6` compat package
(which is published, at 6.0.2) while `tsc` runs 7. But `typescript` is a *peer*
dependency of the typescript-eslint packages, so with Yarn's node-modules
linker it resolves to the hoisted root copy — `resolutions` entries targeting
`@typescript-eslint/*/typescript` are ignored, and the parser still loads 7.0.2.
Verified, not assumed.

**Re-check:** typescript-eslint issue #10940 tracks support for TS >= 7.1. When
a release lands, bump `typescript` to 7 in both repos and confirm `yarn lint`
runs. Until then 6.0.3 is the newest version the whole toolchain accepts.

---

## Peer warnings that are expected

`yarn install` reports these; they are known and harmless.

- **`graphql` 17 vs `@apollo/server` peer `^16.11.0`** — Apollo Server 5.5.1 is
  the latest and has no 17 range. Verified working: the server boots, and both
  introspection and execution succeed against 17. Re-check when Apollo Server 6
  ships.
- **`graphql` 17 vs `@graphql-codegen/typescript-react-apollo` peer `^16`** —
  the same package the patch above covers.
- **`graphql` 17 vs `graphql-tag` (via `@apollo/client`) peer `^16.3.0`** —
  Apollo Client 4 itself accepts `^16 || ^17`; only its bundled `graphql-tag`
  lags.

---

## Ahead of the runtime: `@types/node` 26 on Node 24

`.nvmrc` and `engines` both say Node 24 (24.3.0 locally), but the types are on
26 because the sweep took everything to latest.

This does not fail a build — it is a risk, not a break. The types describe APIs
the running Node does not have, so a call that typechecks can still be
`undefined` at runtime. Nothing in either repo currently uses anything that new,
which is why both typecheck clean.

**Re-check:** either move the runtime to Node 26 and update `.nvmrc`/`engines`
together, or pin the types back to `^24` to match. Whichever, the two should
agree — this is the one place in the sweep where latest and correct differ.

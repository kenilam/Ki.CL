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

## Resolved: TypeScript 7, by moving to Oxlint

Both repos run TypeScript 7.0.2. This was blocked while ESLint was in use —
`typescript-eslint` refuses TS 7 by explicit version check, throwing before any
linting starts, and the documented side-by-side workaround does not work with
this layout: `typescript` is a *peer* dependency of the typescript-eslint
packages, so under Yarn's node-modules linker it resolves to the hoisted root
copy and `resolutions` targeting `@typescript-eslint/*/typescript` are ignored.
Verified, not assumed.

Oxlint does not use the TypeScript compiler API, so the constraint disappears.
The migration was cheap because neither repo used type-aware rules — both
configs were on the plain `recommended` sets, and the only hand-configured
rules were `no-unused-vars` options and `no-namespace: allowDeclarations`.

**What Oxlint does not do:** type-aware rules such as `no-floating-promises`.
`oxlint-tsgolint` is the upstream work for that and is still early. If a
type-aware rule is ever needed, the options are to wait for it or to reintroduce
ESLint for a type-checked subset — which would reintroduce the TS 7 conflict.

**Two rules are deliberately relaxed** in `.oxlintrc.json`, both in the
Frontend:

- `jsx-a11y/prefer-tag-over-role` is off. It wants native elements instead of
  ARIA roles, which is wrong for headless components — Select, Checkbox,
  RadioGroup, Popover, Spinner and Calendar all use roles on non-semantic
  elements by design.
- `react-hooks/exhaustive-deps` is a warning, not an error. Several of the
  dependencies it objects to are deliberate and documented — `Context.tsx`
  lists `data` and the lazy result purely as change signals, never reading
  them, which the rule reports as unnecessary.

**Frozen archives are ignored.** `TreeOfLife/v1`–`v14` and `v15-broken` are kept
as references and are not maintained; Oxlint's stricter default rule set found
40 findings in them against 18 in live code.

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

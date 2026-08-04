const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/ssrEntryLoader-CmdDGa16.js',
      'assets/ssrEntryLoader-BUD1-3Z2-CD9UkcYe.js',
      'assets/vite-preload-helper-BpIsQ93C.js',
    ])
) => i.map((i) => d[i]);
import {
  i as e,
  o as t,
  t as n,
} from './_virtual_mf-localSharedImportMap___mfe_internal__kicl__mf_owner__1-C5T_TTRp.js';
import { t as r } from './vite-preload-helper-BpIsQ93C.js';
t.global;
var i = t.share;
(t.utils,
  typeof __VUE_HMR_RUNTIME__ > `u` &&
    (globalThis.__VUE_HMR_RUNTIME__ = {
      createRecord() {},
      rerender() {},
      reload() {},
    }));
var a = `__mf_init__virtual:mf:__mfe_internal__kicl__mf_owner__1__mf_v__runtimeInit__mf_v__.js__`,
  o = globalThis[a];
if (!o) {
  let e,
    t,
    n = new Promise((n, r) => {
      ((e = n), (t = r));
    });
  o = globalThis[a] = { initPromise: n, initResolve: e, initReject: t };
}
var s = o.initResolve,
  c = `__mf_module_cache__`;
((globalThis[c] ||= { share: {}, remote: {} }),
  (globalThis[c].share ||= {}),
  (globalThis[c].remote ||= {}));
var l = globalThis[c];
for (let e of Object.keys(l.share))
  if (e.startsWith(`default:`)) {
    let t = e.slice(8);
    l.share[t] === void 0 && (l.share[t] = l.share[e]);
  } else if (!e.includes(`:`)) {
    let t = `default:` + e;
    l.share[t] === void 0 && (l.share[t] = l.share[e]);
  }
var u,
  d = {},
  f = Array.isArray(`default`) ? `default` : [`default`],
  p = `default`,
  m = `kicl`;
async function h(e) {
  for (let t = 0; ; t++)
    try {
      return await e();
    } catch (e) {
      throw e;
    }
}
var g = Symbol(`mf.originalSharedProvider`),
  _ = { emit: (e) => e },
  v = (e, t) => {
    if (!t) return;
    let n = Object.entries(e || {}),
      r = n.find(([, e]) => e === t);
    if (r) return { version: r[0], provider: t, registered: !0 };
    if (typeof t.version == `string` && t.version)
      return { version: t.version, provider: t, registered: !1 };
    let i = n.filter(([, e]) => e === t || !!(t.from && e?.from === t.from));
    return i.length === 1
      ? { version: i[0][0], provider: t, registered: !1 }
      : void 0;
  },
  y = (e, t, n, r) => {
    if (!e || !n) return;
    let a = Array.isArray(n.scope) ? n.scope : [n.scope || `default`],
      o = ((e, t) => {
        if (t !== `version-first`) return e;
        let n = {};
        for (let [t, r] of Object.entries(e))
          n[t] = Object.assign({}, r, { [g]: r });
        return n;
      })(e, r),
      s = {};
    for (let e of a) s[e || `default`] = { [t]: o };
    let c = i.getRegisteredShare(
      s,
      t,
      { ...n, scope: a, strategy: r },
      _
    )?.shared;
    return c?.[g] || c;
  },
  b = (e, t, n, r) => {
    let i = (e) => x(e, n),
      a = Object.fromEntries(Object.entries(e || {}).filter(([, e]) => !i(e)));
    n?.version &&
      !1 !== n.shareConfig?.import &&
      (a[n.version] || (a[n.version] = n));
    let o = y(a, t, n, r);
    return i(o) ? void 0 : o;
  },
  x = (e, t) => e === t || !!(t?.from && e?.from === t.from),
  S = (e, t, n, r, i, a, o, s, c) => {
    let l = a.registered
        ? ((e, t, n, r, i, a, o, s, c) => {
            if (c !== `version-first` || !s) return;
            let l = t?.options?.shared?.[i],
              u = Array.isArray(l) ? l.find((e) => e?.version === a) : void 0,
              d =
                (s?.from === t?.options?.name ? s : void 0) ||
                (x(u, s) ? u : t ? void 0 : s);
            return d &&
              e.some(
                (e) =>
                  e !== t &&
                  e?.options?.name === o?.from &&
                  e?.shareScopeMap?.[r] === n
              )
              ? d
              : void 0;
          })(e, t, n, r, i, a.version, a.provider, s, c)
        : void 0,
      u = l || o;
    if (u && (!a.registered || x(u, s)))
      return { provider: u, scopeRootProvider: l };
  };
async function C(t = {}, i = []) {
  let a = (e, t, n, r) => {
      let i = (Array.isArray(r) ? r[0] : r) || `default`,
        a = t || !n ? e : e + `@` + n,
        o = { canonical: i + `:` + a };
      return (i === 'default' && (o.aliases = [a]), o);
    },
    o = (e, t) => {
      let n = e[t.canonical];
      if (n !== void 0) return n;
      let r = t.aliases || [];
      for (let n of r) {
        if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
        let r = e[n];
        if (r !== void 0) return ((e[t.canonical] = r), r);
      }
    },
    c = Symbol.for(`module-federation.shared-cache-listeners`),
    u = Symbol.for(`module-federation.shared-cache-owners`),
    g = (e, t) => e[u]?.[t.canonical],
    _ = (e, t, n, r) => {
      e[t.canonical] = n;
      let i = t.aliases || [];
      for (let t of i)
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        });
      let a = e[u];
      r === void 0
        ? a && delete a[t.canonical]
        : (((e) => {
            let t = e[u];
            return (
              t === void 0 &&
                ((t = Object.create(null)),
                Object.defineProperty(e, u, {
                  value: t,
                  enumerable: !1,
                  configurable: !1,
                  writable: !1,
                })),
              t
            );
          })(e)[t.canonical] = r);
      let o = e[c]?.[t.canonical];
      if (o) for (let e of o) e(n);
      return n;
    },
    C = Symbol.for(`module-federation.tree-shaking-shared-cache`),
    w = (e, t, n, r) => {
      if (!Array.isArray(n)) return r;
      let i = [...new Set(n)].sort(),
        a = ((e) => {
          let t = e[C];
          return (
            t === void 0 &&
              ((t = Object.create(null)),
              Object.defineProperty(e, C, {
                value: t,
                enumerable: !1,
                configurable: !1,
                writable: !1,
              })),
            t
          );
        })(e),
        o = (a[t.canonical] ||= []),
        s = o.find(
          (e) =>
            e.providedExports.length === i.length &&
            e.providedExports.every((e, t) => e === i[t])
        );
      return (s ? (s.value = r) : o.push({ providedExports: i, value: r }), r);
    },
    T = Symbol.for(`module-federation.tree-shaking-shared-selection-cache`),
    E = (e, t, n) => {
      let r = o(e, t);
      return r === void 0 ? e[T]?.[t.canonical]?.[n] : r;
    },
    D = (e, t, n, r) => {
      let i = ((e) => {
        let t = e[T];
        return (
          t === void 0 &&
            ((t = Object.create(null)),
            Object.defineProperty(e, T, {
              value: t,
              enumerable: !1,
              configurable: !1,
              writable: !1,
            })),
          t
        );
      })(e);
      return (((i[t.canonical] ||= Object.create(null))[n] = r), r);
    },
    O = globalThis.__FEDERATION__?.__INSTANCES__ || [],
    k = i.find((e) => e?.from)?.from,
    A =
      O.find(
        (e) => e?.options?.name === k && e?.shareScopeMap?.default === t
      ) ||
      O.find((e) => e?.options?.name !== m && e?.shareScopeMap?.default === t),
    j = Object.create(null);
  for (let [e, n] of Object.entries(t)) {
    let t = (j[e] = Object.create(null));
    for (let [e, r] of Object.entries(n)) t[e] = Object.assign({}, r);
  }
  let { usedShared: M, usedRemotes: N } = await (async function () {
    return n;
  })();
  var P = d[p];
  if (((P ||= d[p] = { from: m }), i.indexOf(P) >= 0)) return;
  i.push(P);
  let F = (e) => {
      let t = e;
      for (let e = 0; e < 5; e++) {
        let e = t?.default;
        if (!e || typeof e != `object` || Object.keys(e).length === 0) break;
        let n = Object.keys(t)
          .filter((e) => e !== 'default')
          .map((e) => t[e]);
        if (n.length > 0 && n.some((e) => e !== void 0)) break;
        t = e;
      }
      return t;
    },
    I =
      globalThis.window === void 0
        ? await Promise.all([
            r(
              () =>
                import(`./ssrEntryLoader-CmdDGa16.js`).then((e) =>
                  (e.default ?? e)({
                    resolvedShared: {
                      react: `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/react/index.js`,
                      'react-dom': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/react-dom/index.js`,
                      'react/jsx-runtime': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/react/jsx-runtime.js`,
                      'react/jsx-dev-runtime': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/react/jsx-dev-runtime.js`,
                      'react/compiler-runtime': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/react/compiler-runtime.js`,
                      '@module-federation/runtime': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/@module-federation/runtime/dist/index.cjs`,
                      '@module-federation/runtime-core': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/@module-federation/runtime-core/dist/index.cjs`,
                      '@module-federation/sdk': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/@module-federation/sdk/dist/index.cjs`,
                      '@apollo/client': `/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/@apollo/client/core/index.js`,
                    },
                  })
                ),
              __vite__mapDeps([0, 1, 2])
            ),
          ])
        : [],
    L = `__mf_vite_runtime_share_load_id__`,
    R = 0,
    z = new Map(),
    B = new Map(),
    V = e({
      name: m,
      remotes: N,
      shared: M,
      plugins: [
        {
          name: `vite-share-pin-lifecycle-plugin`,
          resolveShare(e) {
            let t = e.shareInfo?.[L],
              n = t === void 0 ? void 0 : B.get(t);
            if (!n) return e;
            let r = e.resolver;
            return (
              (e.resolver = (...e) => (n.pinned.reapply(), r(...e))),
              n.pinned.reveal(),
              e
            );
          },
        },
        ...I,
      ],
      shareStrategy: `version-first`,
    });
  V.initShareScopeMap(`default`, t);
  let H = V.sharedHandler.hooks.lifecycle.resolveShare,
    U = new WeakMap();
  H.on((e) => {
    let t = e.shareInfo?.[L],
      n = e.resolver;
    return (
      typeof n == `function` &&
        (e.resolver = (...e) => {
          let r = n(...e),
            i = r?.shared;
          return (
            !i ||
              (typeof i != `object` && typeof i != `function`) ||
              U.has(i) ||
              U.set(i, { from: i.from }),
            t !== void 0 && i && z.set(t, i),
            r
          );
        }),
      e
    );
  });
  let W = async (e, t, n, r, i, a, o = !0) => {
      let s = a.from,
        c = ((e, t, n, r) => {
          if (!e || e[t] !== n) return;
          let i = Object.assign({}, r, {
              version: r.version ?? t,
              scope: r.scope ?? n?.scope ?? [`default`],
              strategy: `loaded-first`,
            }),
            a = r.from;
          e[t] = i;
          let o = () => (n === void 0 ? e[t] === void 0 : e[t] === n);
          return {
            provider: i,
            reveal: () =>
              e[t] === i && (n === void 0 ? delete e[t] : (e[t] = n), !0),
            reapply: () => !!o() && ((e[t] = i), !0),
            release: (s, c = !0) => (
              (r.from = a),
              e[t] === i
                ? c
                  ? s
                    ? ((i.from = a),
                      s && i.lib && (i.loaded = !0),
                      r.strategy === void 0
                        ? delete i.strategy
                        : (i.strategy = r.strategy),
                      !0)
                    : (n === void 0 ? delete e[t] : (e[t] = n), !1)
                  : (n === void 0 ? delete e[t] : (e[t] = n), !0)
                : !c && o()
            ),
          };
        })(n, r, i, a);
      if (!c) return;
      let l;
      try {
        l = await (async (e, t, n) => {
          let r = ++R;
          B.set(r, { pinned: n });
          try {
            let n = await V.loadShare(e, {
              customShareInfo: { shareConfig: t, [L]: r },
            });
            return {
              factory: !1 === n ? void 0 : n,
              selectedProvider: z.get(r),
            };
          } finally {
            (z.delete(r), B.delete(r));
          }
        })(e, t, c);
      } catch (e) {
        throw (c.release(!1), e);
      }
      let u = l?.factory;
      if (u === void 0) return void c.release(!1);
      let d = ((e) =>
          Object.entries(e || {}).map(([e, t]) => ({
            provider: t,
            version: e,
            from: t.from,
            registered: !0,
          })))(n),
        f = c.provider.treeShaking || c.provider,
        p = c.provider.lib === u || f.lib === u;
      if (!o && p) {
        let e = d.findIndex((e) => e.provider === c.provider);
        e !== -1 && d.splice(e, 1);
      }
      o ||
        d.some((e) => e.provider === a) ||
        d.push({
          provider: a,
          version: r,
          from: s,
          registered: !1,
          loadedFactory: p ? u : void 0,
        });
      let m =
        !o && l.selectedProvider === c.provider && p ? a : l.selectedProvider;
      if (m && !d.some((e) => e.provider === m)) {
        let e = U.get(m),
          t = typeof m.version == `string` && m.version ? m.version : r;
        d.push({
          provider: m,
          version: t,
          from: e ? e.from : m.from,
          registered: n?.[t] === m,
          loadedFactory: u,
        });
      }
      let h =
        d.find((e) => e.provider === m) ??
        ((e, t) => {
          if (t === void 0) return;
          let n;
          for (let r of e) {
            let e = r.provider,
              i = e.treeShaking || e;
            if (r.loadedFactory === t || e.lib === t || i.lib === t) {
              if (n) return;
              n = r;
            }
          }
          return n;
        })(d, u);
      if (!c.release(!0, h?.provider === c.provider) || !h) return;
      let g = U.get(h.provider);
      ((h.from = h.provider === a ? s : g ? g.from : h.provider.from),
        g && (h.provider.from = g.from));
      let _ = typeof u == `function` ? u() : u,
        v = await Promise.resolve(_);
      return h.registered && n?.[h.version] !== h.provider
        ? void 0
        : { provider: h.provider, selection: h, resolved: v };
    },
    G = new Set(),
    K = new Map(),
    q = async (e, n, r) => {
      let i = !!n.shareConfig?.singleton;
      if (!i && !1 !== n.canLiveRebind)
        try {
          let s = b(r, e, n, `version-first`),
            c = v(r, s);
          if (!c) return;
          let { version: u } = c;
          if (
            (!i && u !== n.version) ||
            !(s.lib || s.loading || (s.loaded && typeof s.get == `function`))
          )
            return;
          let d = a(e, i, n.version, n.scope);
          if (o(l.share, d) !== void 0) return;
          let f = t[e],
            p = f?.[u];
          if (c.registered && !x(p, s)) return;
          let m,
            h = s.lib;
          if (
            (!h && s.loading && (h = await s.loading),
            !h && s.loaded && typeof s.get == `function` && (h = await s.get()),
            !h)
          )
            return;
          let g = typeof h == `function` ? h() : h,
            y = await Promise.resolve(g),
            S = c.registered ? p : s;
          m = {
            provider: S,
            selection: {
              provider: S,
              version: u,
              from: s.from,
              registered: c.registered,
            },
            resolved: y,
          };
          let C = m?.provider,
            w = m?.selection;
          if (!w) return;
          let T = m?.resolved;
          if (
            T === void 0 ||
            o(l.share, d) !== void 0 ||
            (w.registered && f?.[w.version] !== C)
          )
            return;
          (_(l.share, d, F(T), w.from), G.add(C));
        } catch (t) {
          console.error(
            `[Module Federation] Failed to bridge materialized shared module "` +
              e +
              `"`,
            t
          );
        }
    },
    J = async (e, n, r, i, s) => {
      try {
        let c = a(e, n.shareConfig?.singleton, n.version, n.scope),
          u = o(l.share, c),
          d = g(l.share, c),
          f = b(r, e, n, `version-first`),
          p = f || y(r, e, n, `version-first`) || n,
          h = v(r, p);
        if (!h) return;
        let C = x(p, n),
          { version: w } = h,
          T = i?.[w],
          E = S(O, A, t, `default`, e, h, f, T, `version-first`);
        if (!E && !C) return;
        let { provider: D, scopeRootProvider: k } = E || {
          provider: p,
          scopeRootProvider: void 0,
        };
        if (
          !n.shareConfig?.singleton ||
          !1 === n.canLiveRebind ||
          (u !== void 0 && d !== m)
        )
          return;
        let j = t[e],
          M = j?.[w];
        if (h.registered && !k && !x(M, D)) return;
        let N = await W(e, n.shareConfig, j, w, M, D, h.registered && !C),
          P = N?.provider,
          I = N?.selection;
        if (
          !I ||
          x(P, n) ||
          (s &&
            (s.version !== I.version || !x({ from: I.from }, s.provider))) ||
          G.has(P)
        )
          return;
        let L = N?.resolved;
        if (L === void 0) return;
        let R = o(l.share, c),
          z = g(l.share, c);
        if ((R !== void 0 && z !== m) || (I.registered && j?.[I.version] !== P))
          return;
        (s || K.set(e, { version: I.version, provider: { from: I.from } }),
          G.add(P));
        let B = F(L);
        _(l.share, c, B, I.from);
      } catch (t) {
        console.error(
          `[Module Federation] Failed to bridge external shared module "` +
            e +
            `"`,
          t
        );
      }
    };
  for (let [e, t] of Object.entries(M)) t.treeShaking || (await q(e, t, j[e]));
  for (let [e, t] of Object.entries(M)) {
    if (t.treeShaking) continue;
    let n = a(e, t.shareConfig?.singleton, t.version, t.scope);
    if (o(l.share, n) !== void 0) continue;
    let r = a(e, !0, t.version, t.scope),
      i = o(l.share, r);
    i !== void 0 && _(l.share, n, i, g(l.share, r));
  }
  let Y = [
      `react`,
      `react/jsx-runtime`,
      `react-dom`,
      `react-dom/client`,
      `@apollo/client`,
    ].filter((e) => M[e] !== void 0),
    X = (e) =>
      e.startsWith(`@`) ? e.split(`/`).slice(0, 2).join(`/`) : e.split(`/`)[0];
  for (let e of Object.keys(M)) {
    if (Y.includes(e)) continue;
    let t = X(e),
      n = Y.indexOf(t);
    if (n === -1) {
      Y.push(e);
      continue;
    }
    let r = n;
    for (; r > 0 && X(Y[r - 1]) === t && Y[r - 1] !== t;) r--;
    Y.splice(r, 0, e);
  }
  var Z = async (e) => {
    for (let t of e) {
      let e = M[t],
        n = a(t, e.shareConfig?.singleton, e.version, e.scope);
      if (
        !1 === e.shareConfig?.import ||
        e.treeShaking ||
        o(l.share, n) !== void 0
      )
        continue;
      let r = a(t, !0, e.version, e.scope),
        i = o(l.share, r);
      if (i !== void 0) {
        _(l.share, n, i, g(l.share, r));
        continue;
      }
      let s = await e.get(),
        c = typeof s == `function` ? s() : s,
        u = await Promise.resolve(c),
        d = ((e) => {
          let t = e;
          for (let e = 0; e < 5; e++) {
            let e = t?.default;
            if (!e || typeof e != `object` || Object.keys(e).length === 0)
              break;
            let n = Object.keys(t)
              .filter((e) => e !== 'default')
              .map((e) => t[e]);
            if (n.length > 0 && n.some((e) => e !== void 0)) break;
            t = e;
          }
          return t;
        })(u),
        f = d === u ? { ...u } : d;
      (!0 !== f.__esModule &&
        Object.defineProperty(f, '__esModule', { value: !0, enumerable: !1 }),
        _(l.share, n, f, m));
    }
  };
  let Q = (e) => {
      let t = M[e];
      if (!t.treeShaking && !1 !== t.shareConfig?.import) return !1;
      let n = a(e, t.shareConfig?.singleton, t.version, t.scope);
      return t.treeShaking
        ? E(l.share, n, m) === void 0 && o(l.share, n) === void 0
        : o(l.share, n) === void 0;
    },
    $ = Y.findIndex((e) => {
      let t = M[e],
        n = a(e, t.shareConfig?.singleton, t.version, t.scope);
      return (
        (t.treeShaking
          ? (E(l.share, n, m) ?? o(l.share, n))
          : o(l.share, n)) === void 0 &&
        (!(!t.treeShaking && !1 !== t.shareConfig?.import) ||
          (!!t.shareConfig?.singleton && !!b(j[e], e, t, `version-first`)))
      );
    }),
    ee = $ === -1 ? Y : Y.slice(0, $);
  var te = $ === -1 ? [] : Y.slice($);
  await Z(ee);
  try {
    await h(async () => {
      await Promise.all(
        await V.initializeSharing(`default`, {
          strategy: `version-first`,
          from: `build`,
          initScope: i,
        })
      );
    });
  } catch (e) {
    console.error(`[Module Federation]`, e);
  }
  for (let [e, n] of Object.entries(M))
    n.treeShaking || (await J(e, n, t[e], j[e], void 0));
  try {
    let e = globalThis.__FEDERATION__?.__SHARE__,
      t = Object.create(null);
    if (e)
      for (let [, n] of Object.entries(e))
        for (let e of f) {
          let r = n?.[e];
          if (r)
            for (let [e, n] of Object.entries(r)) {
              let r = M?.[e],
                i = j[e],
                a = K.get(e);
              if (!r || !i || !a || r.treeShaking) continue;
              let o = t[e] || (t[e] = Object.create(null));
              for (let [e, t] of Object.entries(n)) {
                if (!t.lib || a.version !== e || !x(t, a.provider)) continue;
                let n = i[e];
                (t === n || (n?.from && t.from === n.from)) &&
                  (t === r ||
                    (r.from && t.from === r.from) ||
                    (o[e] === void 0 && (o[e] = t)));
              }
            }
        }
    for (let [e, n] of Object.entries(t)) await J(e, M[e], n, j[e], K.get(e));
  } catch (e) {
    console.error(
      `[Module Federation] Failed to bridge external shared modules`,
      e
    );
  }
  let ne = async () => {},
    re = async (e, n) => {
      let r = a(e, n.shareConfig?.singleton, n.version, n.scope),
        i = n.treeShaking ? E(l.share, r, m) : o(l.share, r);
      if (!1 !== n.shareConfig?.import || i !== void 0) return;
      let s = t?.[e],
        c = y(s, e, n, `version-first`) || n,
        u = v(s, c);
      if (!u) return;
      let { version: d } = u,
        f = s?.[d],
        p = await W(e, n.shareConfig, s, d, f, c, u.registered && !x(c, n)),
        h = p?.selection,
        g = p?.provider,
        b = p?.resolved;
      if (
        !h ||
        x(g, n) ||
        b === void 0 ||
        (n.treeShaking ? E(l.share, r, m) : o(l.share, r)) !== void 0 ||
        (h.registered && s?.[h.version] !== g)
      )
        return;
      let S = ((e) => {
        let t = e;
        for (let e = 0; e < 5; e++) {
          let e = t?.default;
          if (!e || typeof e != `object` || Object.keys(e).length === 0) break;
          let n = Object.keys(t)
            .filter((e) => e !== 'default')
            .map((e) => t[e]);
          if (n.length > 0 && n.some((e) => e !== void 0)) break;
          t = e;
        }
        return t;
      })(b);
      if (n.treeShaking) {
        let e =
          n.treeShaking.providedExports ?? n.treeShaking.usedExports ?? [];
        (w(l.share, r, e, S), D(l.share, r, m, S));
      } else _(l.share, r, S, h.from);
    };
  for (let e of te) {
    let t = M[e];
    if (
      (Q(e) &&
        (t.treeShaking
          ? await ne()
          : !1 === t.shareConfig?.import && (await re(e, t))),
      Q(e))
    )
      break;
    await Z([e]);
  }
  return (s(V), V);
}
async function w(e) {
  let t = await (async function () {
    return (
      (u ||= h(() => r(() => import(`./virtualExposes-BO-yD5vy.js`), []))
        .then((e) => e.default ?? e)
        .catch((e) => {
          throw ((u = void 0), e);
        })),
      u
    );
  })();
  if (!(e in t))
    throw Error(`[Module Federation] Module ${e} does not exist in container.`);
  return (
    l.pendingShareLoads && (await Promise.all(l.pendingShareLoads)),
    t[e]().then((e) => () => e)
  );
}
export { C as n, w as t };
//# sourceMappingURL=virtual_mf-REMOTE_ENTRY_ID___mfe_internal__kicl__remoteEntry-_hash_-DEo-qh9Z.js.map

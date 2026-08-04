import { t as e } from './vite-preload-helper-BpIsQ93C.js';
import { i as t, n, r, t as i } from './ssrEntryLoader-BUD1-3Z2-CD9UkcYe.js';
var a;
async function o() {
  return (
    (a ||= (async () => {
      try {
        let t = await e(() => import(`vm`), []);
        return typeof t.SourceTextModule != `function` ||
          typeof t.SyntheticModule != `function`
          ? null
          : t;
      } catch {
        return null;
      }
    })()),
    a
  );
}
async function s() {
  return (await o()) !== null;
}
async function c(t, n) {
  let r = n.federationInstance,
    i = r ? [r] : (globalThis.__FEDERATION__?.__INSTANCES__ ?? []);
  for (let e of i) {
    if (typeof e?.loadShare != `function`) continue;
    let r = e.options?.shared?.[t];
    if (
      r &&
      (Array.isArray(r.scope) ? r.scope : [r.scope ?? `default`]).includes(
        n.shareScopeName
      )
    )
      try {
        let n = await e.loadShare(t);
        if (typeof n == `function`) {
          let e = n();
          if (e) return e;
        }
      } catch {}
  }
  let a = n.resolvedShared[t];
  return e(a ? () => import(`file://${a}`) : () => import(t), []);
}
var l = new Map(),
  u = new Map(),
  d = new WeakMap(),
  f = 1;
function p(e) {
  let t = d.get(e);
  return (t === void 0 && ((t = f++), d.set(e, t)), t);
}
function m(e) {
  return JSON.stringify([
    p(e.cacheContext),
    e.shareScopeName,
    Object.entries(e.resolvedShared).sort(([e], [t]) => e.localeCompare(t)),
  ]);
}
function h(e, a, o) {
  let s = JSON.stringify([
    m(o),
    o.fetchTimeoutMs ?? 1e4,
    o.fetchMaxBytes ?? 10485760,
    o.versionKey,
    a,
  ]);
  return (
    l.has(s) ||
      l.set(
        s,
        (async () => {
          let s = await (async function (e, a, o) {
            let s = await n(e, {}, a),
              c = await t(s, o ?? 10485760, e);
            if (!s.ok)
              throw new i(
                e,
                s.status,
                s.statusText,
                c.slice(0, 240).replace(/\s+/g, ` `).trim()
              );
            return r(c);
          })(a, o.fetchTimeoutMs, o.fetchMaxBytes);
          return new e.SourceTextModule(s, {
            identifier: a,
            initializeImportMeta(e) {
              e.url = a;
            },
            importModuleDynamically: (t, n) =>
              (async function (e, t, n, r) {
                let i = (t, n) => g(e, t, n, r),
                  a = await i(t, n);
                return (
                  a.status === `unlinked` && (await a.link(i)),
                  a.status === `linked` && (await a.evaluate()),
                  a
                );
              })(e, t, n, o),
          });
        })().catch((e) => {
          throw (l.delete(s), e);
        })
      ),
    l.get(s)
  );
}
async function g(e, t, n, r) {
  let i = (function (e, t) {
    return (n = e).startsWith(`http://`) || n.startsWith(`https://`)
      ? e
      : e.startsWith(`./`) || e.startsWith(`../`) || e.startsWith(`/`)
        ? new URL(e, t).href
        : null;
    var n;
  })(t, n.identifier);
  return i
    ? h(e, i, r)
    : (function (e, t, n) {
        let r = n && typeof n == `object` ? n : { default: n },
          i = new Set(Object.keys(r));
        i.add(`default`);
        let a = new e.SyntheticModule(
          [...i],
          () => {
            for (let e of i)
              e === 'default'
                ? a.setExport(`default`, r.default === void 0 ? n : r.default)
                : a.setExport(e, r[e]);
          },
          { identifier: `mf-shared:${t}` }
        );
        return a;
      })(e, t, await c(t, r));
}
async function _(e, t) {
  let n = await o();
  if (!n) return null;
  let r = `${m(t)}::${t.versionKey}::${e}`;
  return (
    u.has(r) ||
      u.set(
        r,
        (async () => {
          let r = await h(n, e, t);
          return (
            r.status === `unlinked` && (await r.link((e, r) => g(n, e, r, t))),
            r.status === `linked` && (await r.evaluate()),
            r.namespace
          );
        })().catch((e) => {
          throw (u.delete(r), e);
        })
      ),
    u.get(r)
  );
}
export { s as isVmStrategyAvailable, _ as loadViaVmStrategy };
//# sourceMappingURL=ssrVmStrategy-C_cJtu5V-CNXtoom4.js.map

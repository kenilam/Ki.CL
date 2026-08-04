const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/remoteEntry-DF_8HBne.js'])
) => i.map((i) => d[i]);
import { t as e } from './vite-preload-helper-BpIsQ93C.js';
var t = `__mf_module_cache__`;
((globalThis[t] ||= { share: {}, remote: {} }),
  (globalThis[t].share ||= {}),
  (globalThis[t].remote ||= {}));
var n,
  r = globalThis[t];
for (let e of Object.keys(r.share))
  if (e.startsWith(`default:`)) {
    let t = e.slice(8);
    r.share[t] === void 0 && (r.share[t] = r.share[e]);
  } else if (!e.includes(`:`)) {
    let t = `default:` + e;
    r.share[t] === void 0 && (r.share[t] = r.share[e]);
  }
async function i() {
  return (
    (n ||= (async () => {
      let t = (e, t, n, r) => {
          let i = (Array.isArray(r) ? r[0] : r) || `default`,
            a = t || !n ? e : e + `@` + n,
            o = { canonical: i + `:` + a };
          return (i === 'default' && (o.aliases = [a]), o);
        },
        n = (e, t) => {
          let n = e[t.canonical];
          if (n !== void 0) return n;
          let r = t.aliases || [];
          for (let n of r) {
            if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
            let r = e[n];
            if (r !== void 0) return ((e[t.canonical] = r), r);
          }
        },
        i = Symbol.for(`module-federation.shared-cache-listeners`),
        a = Symbol.for(`module-federation.shared-cache-owners`),
        o = (e, t, n, r) => {
          e[t.canonical] = n;
          let o = t.aliases || [];
          for (let t of o)
            Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            });
          let s = e[a];
          r === void 0
            ? s && delete s[t.canonical]
            : (((e) => {
                let t = e[a];
                return (
                  t === void 0 &&
                    ((t = Object.create(null)),
                    Object.defineProperty(e, a, {
                      value: t,
                      enumerable: !1,
                      configurable: !1,
                      writable: !1,
                    })),
                  t
                );
              })(e)[t.canonical] = r);
          let c = e[i]?.[t.canonical];
          if (c) for (let e of c) e(n);
          return n;
        },
        s = await (
          await e(
            () => import(`./remoteEntry-DF_8HBne.js`),
            __vite__mapDeps([0])
          )
        ).init(),
        { usedShared: c } = await e(async () => {
          let { usedShared: e } = await import(
            `./_virtual_mf-localSharedImportMap___mfe_internal__kicl__mf_owner__1-CsbMOCsr.js`
          );
          return { usedShared: e };
        }, []),
        l = (e) => {
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
        },
        u = [`react`, `react-dom`, `@apollo/client`].concat(
          Object.keys(c).filter(
            (e) => ![`react`, `react-dom`, `@apollo/client`].includes(e)
          )
        );
      for (let e of u) {
        let i = c[e];
        if (!i || i.treeShaking) continue;
        let a = t(e, i.shareConfig?.singleton, i.version, i.scope);
        n(r.share, a) === void 0 &&
          (await s
            .loadShare(e, { customShareInfo: { shareConfig: i.shareConfig } })
            .then((e) => {
              let t = typeof e == `function` ? e() : e;
              return Promise.resolve(t).then((e) => {
                o(r.share, a, l(e), `kicl`);
              });
            }));
      }
      return (await Promise.all([]), s);
    })()),
    n
  );
}
n = i();
export { i as n, n as t };

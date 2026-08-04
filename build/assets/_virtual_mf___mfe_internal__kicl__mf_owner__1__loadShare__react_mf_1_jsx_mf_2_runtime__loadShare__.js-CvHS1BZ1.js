import { a as e, r as t, t as n } from './rolldown-runtime-Mj8OWp7p.js';
var r = n((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);
    function r(e, n, r) {
      var i = null;
      if (
        (r !== void 0 && (i = `` + r),
        n.key !== void 0 && (i = `` + n.key),
        `key` in n)
      )
        for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
      else r = n;
      return (
        (n = r.ref),
        { $$typeof: t, type: e, key: i, ref: n === void 0 ? null : n, props: r }
      );
    }
    ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
  }),
  i = n((e, t) => {
    t.exports = r();
  }),
  a = t({ Fragment: () => c, default: () => s, jsx: () => l, jsxs: () => u }),
  o = e(i()),
  s = o.default ?? o,
  c = s.Fragment,
  l = s.jsx,
  u = s.jsxs,
  d = `__mf_module_cache__`;
((globalThis[d] ||= { share: {}, remote: {} }),
  (globalThis[d].share ||= {}),
  (globalThis[d].remote ||= {}));
var f = globalThis[d];
for (let e of Object.keys(f.share))
  if (e.startsWith(`default:`)) {
    let t = e.slice(8);
    f.share[t] === void 0 && (f.share[t] = f.share[e]);
  } else if (!e.includes(`:`)) {
    let t = `default:` + e;
    f.share[t] === void 0 && (f.share[t] = f.share[e]);
  }
var p,
  m,
  h,
  g = Symbol.for(`module-federation.shared-cache-listeners`),
  _ = Symbol.for(`module-federation.shared-cache-owners`),
  v = ((e, t) => {
    let n = e[t.canonical];
    if (n !== void 0) return n;
    let r = t.aliases || [];
    for (let n of r) {
      if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
      let r = e[n];
      if (r !== void 0) return ((e[t.canonical] = r), r);
    }
  })(f.share, {
    canonical: `default:react/jsx-runtime`,
    aliases: [`react/jsx-runtime`],
  });
v === void 0 &&
  ((v = ((e) => {
    let t = (() => {
      let t = e;
      for (let e = 0; e < 5; e++) {
        let e = t?.default;
        if (!e || typeof e != `object`) break;
        let n = Object.keys(t)
          .filter((e) => e !== 'default')
          .map((e) => t[e]);
        if (n.length > 0 && n.some((e) => e !== void 0)) break;
        t = e;
      }
      return t;
    })();
    return t && Object.getPrototypeOf(t) === null ? Object.assign({}, t) : t;
  })(a)),
  ((e, t, n, r) => {
    e[t.canonical] = n;
    let i = t.aliases || [];
    for (let t of i)
      Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      });
    let a = e[_];
    r === void 0
      ? a && delete a[t.canonical]
      : (((e) => {
          let t = e[_];
          return (
            t === void 0 &&
              ((t = Object.create(null)),
              Object.defineProperty(e, _, {
                value: t,
                enumerable: !1,
                configurable: !1,
                writable: !1,
              })),
            t
          );
        })(e)[t.canonical] = r);
    let o = e[g]?.[t.canonical];
    if (o) for (let e of o) e(n);
  })(
    f.share,
    { canonical: `default:react/jsx-runtime`, aliases: [`react/jsx-runtime`] },
    v,
    `kicl`
  ));
var y = (e) => {
  ((p = e.Fragment),
    (m = e.jsx),
    (h = e.jsxs),
    (() => {
      let t = e;
      for (let e = 0; e < 5; e++) {
        let e = t?.default;
        if (!e || typeof e != `object`) return e ?? t;
        t = e;
      }
      return t;
    })());
};
(((e, t, n) => {
  let r = ((e) => {
    let t = e[g];
    return (
      t === void 0 &&
        ((t = Object.create(null)),
        Object.defineProperty(e, g, {
          value: t,
          enumerable: !1,
          configurable: !1,
          writable: !1,
        })),
      t
    );
  })(e);
  (r[t.canonical] ||= new Set()).add(n);
})(
  f.share,
  { canonical: `default:react/jsx-runtime`, aliases: [`react/jsx-runtime`] },
  y
),
  y(v));
export { a as i, m as n, h as r, p as t };
//# sourceMappingURL=_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-CvHS1BZ1.js.map

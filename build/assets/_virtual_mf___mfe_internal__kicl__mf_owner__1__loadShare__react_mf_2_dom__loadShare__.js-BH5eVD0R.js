import { a as e, i as t, n, r, t as i } from './rolldown-runtime-Mj8OWp7p.js';
import {
  D as a,
  O as o,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js';
var s,
  c,
  l,
  u,
  d,
  f,
  p,
  m,
  h,
  g,
  _,
  v,
  y,
  b,
  x,
  S,
  C,
  w,
  T,
  E,
  D,
  O,
  k,
  A,
  j,
  M,
  N,
  P,
  F,
  I,
  L,
  R,
  z,
  B,
  V,
  H,
  U,
  W,
  G,
  K,
  q,
  J,
  Y,
  X,
  Z,
  ee = i((e) => {
    var n = (o(), t(a));
    function r(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function i() {}
    var s = {
        d: {
          f: i,
          r: function () {
            throw Error(r(522));
          },
          D: i,
          C: i,
          L: i,
          m: i,
          X: i,
          S: i,
          M: i,
        },
        p: 0,
        findDOMNode: null,
      },
      c = Symbol.for(`react.portal`),
      l = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function u(e, t) {
      return e === `font`
        ? ``
        : typeof t == `string`
          ? t === `use-credentials`
            ? t
            : ``
          : void 0;
    }
    ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
      (e.createPortal = function (e, t) {
        var n =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
          throw Error(r(299));
        return (function (e, t, n) {
          var r =
            3 < arguments.length && arguments[3] !== void 0
              ? arguments[3]
              : null;
          return {
            $$typeof: c,
            key: r == null ? null : `` + r,
            children: e,
            containerInfo: t,
            implementation: n,
          };
        })(e, t, null, n);
      }),
      (e.flushSync = function (e) {
        var t = l.T,
          n = s.p;
        try {
          if (((l.T = null), (s.p = 2), e)) return e();
        } finally {
          ((l.T = t), (s.p = n), s.d.f());
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          ((t = t
            ? typeof (t = t.crossOrigin) == `string`
              ? t === `use-credentials`
                ? t
                : ``
              : void 0
            : null),
          s.d.C(e, t));
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && s.d.D(e);
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = u(n, t.crossOrigin),
            i = typeof t.integrity == `string` ? t.integrity : void 0,
            a = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
          n === `style`
            ? s.d.S(
                e,
                typeof t.precedence == `string` ? t.precedence : void 0,
                { crossOrigin: r, integrity: i, fetchPriority: a }
              )
            : n === `script` &&
              s.d.X(e, {
                crossOrigin: r,
                integrity: i,
                fetchPriority: a,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = u(t.as, t.crossOrigin);
              s.d.M(e, {
                crossOrigin: n,
                integrity:
                  typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
            }
          } else t ?? s.d.M(e);
      }),
      (e.preload = function (e, t) {
        if (
          typeof e == `string` &&
          typeof t == `object` &&
          t &&
          typeof t.as == `string`
        ) {
          var n = t.as,
            r = u(n, t.crossOrigin);
          s.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority:
              typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy:
              typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet:
              typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          });
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = u(t.as, t.crossOrigin);
            s.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            });
          } else s.d.m(e);
      }),
      (e.requestFormReset = function (e) {
        s.d.r(e);
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (e.useFormState = function (e, t, n) {
        return l.H.useFormState(e, t, n);
      }),
      (e.useFormStatus = function () {
        return l.H.useHostTransitionStatus();
      }),
      (e.version = `19.2.8`));
  }),
  te = i((e, t) => {
    ((function e() {
      if (
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` &&
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == `function`
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
    })(),
      (t.exports = ee()));
  }),
  Q = r({
    __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: () => l,
    createPortal: () => u,
    default: () => C,
    flushSync: () => d,
    preconnect: () => f,
    prefetchDNS: () => p,
    preinit: () => m,
    preinitModule: () => h,
    preload: () => g,
    preloadModule: () => _,
    requestFormReset: () => v,
    unstable_batchedUpdates: () => y,
    useFormState: () => b,
    useFormStatus: () => x,
    version: () => S,
  }),
  $ = n(() => {
    ((s = e(te())),
      (l = (c = s)
        .__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE),
      (u = c.createPortal),
      (d = c.flushSync),
      (f = c.preconnect),
      (p = c.prefetchDNS),
      (m = c.preinit),
      (h = c.preinitModule),
      (g = c.preload),
      (_ = c.preloadModule),
      (v = c.requestFormReset),
      (y = c.unstable_batchedUpdates),
      (b = c.useFormState),
      (x = c.useFormStatus),
      (S = c.version),
      (C = Reflect.get(s, `default`) ?? s));
  }),
  ne = r({
    __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: () => I,
    __moduleExports: () => Z,
    createPortal: () => L,
    default: () => F,
    flushSync: () => R,
    preconnect: () => z,
    prefetchDNS: () => B,
    preinit: () => V,
    preinitModule: () => H,
    preload: () => U,
    preloadModule: () => W,
    requestFormReset: () => G,
    unstable_batchedUpdates: () => K,
    useFormState: () => q,
    useFormStatus: () => J,
    version: () => Y,
  }),
  re = n(() => {
    ($(),
      (w = `__mf_module_cache__`),
      (globalThis[w] ||= { share: {}, remote: {} }),
      (globalThis[w].share ||= {}),
      (globalThis[w].remote ||= {}),
      (T = globalThis[w]));
    for (let e of Object.keys(T.share))
      if (e.startsWith(`default:`)) {
        let t = e.slice(8);
        T.share[t] === void 0 && (T.share[t] = T.share[e]);
      } else if (!e.includes(`:`)) {
        let t = `default:` + e;
        T.share[t] === void 0 && (T.share[t] = T.share[e]);
      }
    ((E = (e, t) => {
      let n = e[t.canonical];
      if (n !== void 0) return n;
      let r = t.aliases || [];
      for (let n of r) {
        if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
        let r = e[n];
        if (r !== void 0) return ((e[t.canonical] = r), r);
      }
    }),
      (D = Symbol.for(`module-federation.shared-cache-listeners`)),
      (O = (e) => {
        let t = e[D];
        return (
          t === void 0 &&
            ((t = Object.create(null)),
            Object.defineProperty(e, D, {
              value: t,
              enumerable: !1,
              configurable: !1,
              writable: !1,
            })),
          t
        );
      }),
      (k = (e, t, n) => {
        let r = O(e);
        (r[t.canonical] ||= new Set()).add(n);
      }),
      (A = Symbol.for(`module-federation.shared-cache-owners`)),
      (j = (e) => {
        let t = e[A];
        return (
          t === void 0 &&
            ((t = Object.create(null)),
            Object.defineProperty(e, A, {
              value: t,
              enumerable: !1,
              configurable: !1,
              writable: !1,
            })),
          t
        );
      }),
      (M = (e, t, n, r) => {
        e[t.canonical] = n;
        let i = t.aliases || [];
        for (let t of i)
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          });
        let a = e[A];
        r === void 0 ? a && delete a[t.canonical] : (j(e)[t.canonical] = r);
        let o = e[D]?.[t.canonical];
        if (o) for (let e of o) e(n);
        return n;
      }),
      (N = (e) => {
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
        return t && Object.getPrototypeOf(t) === null
          ? Object.assign({}, t)
          : t;
      }),
      (P = E(T.share, {
        canonical: `default:react-dom`,
        aliases: [`react-dom`],
      })) === void 0 &&
        ((P = N(Q)),
        M(
          T.share,
          { canonical: `default:react-dom`, aliases: [`react-dom`] },
          P,
          `kicl`
        )),
      (X = (e) => {
        ((I = e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE),
          (L = e.createPortal),
          (R = e.flushSync),
          (z = e.preconnect),
          (B = e.prefetchDNS),
          (V = e.preinit),
          (H = e.preinitModule),
          (U = e.preload),
          (W = e.preloadModule),
          (G = e.requestFormReset),
          (K = e.unstable_batchedUpdates),
          (q = e.useFormState),
          (J = e.useFormStatus),
          (Y = e.version),
          (F = (() => {
            let t = e;
            for (let e = 0; e < 5; e++) {
              let e = t?.default;
              if (!e || typeof e != `object`) return e ?? t;
              t = e;
            }
            return t;
          })()));
      }),
      k(T.share, { canonical: `default:react-dom`, aliases: [`react-dom`] }, X),
      X(P),
      (Z = P));
  });
export { Q as a, re as i, R as n, $ as o, ne as r, F as t };
//# sourceMappingURL=_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_2_dom__loadShare__.js-BH5eVD0R.js.map

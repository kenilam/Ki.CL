const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/Mobile-DSXVZ2-z.js',
      'assets/Components-DsgpJoHg.js',
      'assets/tslib.es6-c4aZVZRw.js',
      'assets/Components-xuLUo7G_.css',
      'assets/Mobile-COH5yKaG.css',
      'assets/Default-DHOGOGoH.js',
      'assets/Contents-pUcANtXp.js',
      'assets/constants-Ck2e2d37.js',
      'assets/Contents-DcJ2ODb3.css',
      'assets/Contents-Ol8VgVI5.js',
    ])
) => i.map((i) => d[i]);
import { a as e } from './rolldown-runtime-Mj8OWp7p.js';
import './virtual_mf-exposes___mfe_internal__kicl__remoteEntry-_hash_-DnnXQRkG.js';
import { t } from './vite-preload-helper-BpIsQ93C.js';
import {
  C as n,
  E as r,
  O as i,
  T as a,
  c as o,
  h as s,
  m as c,
  t as l,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js';
import {
  n as u,
  r as d,
  t as f,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-CvHS1BZ1.js';
import {
  i as p,
  t as m,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_2_dom__loadShare__.js-BH5eVD0R.js';
import { t as h } from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_2_dom_mf_1_client__loadShare__.js-JQ052Thm.js';
import './virtual_mf-REMOTE_ENTRY_ID___mfe_internal__kicl__remoteEntry-_hash_-DEo-qh9Z.js';
import {
  M as g,
  P as _,
  S as v,
  a as ee,
  c as te,
  d as ne,
  f as re,
  g as y,
  h as b,
  i as x,
  j as S,
  l as C,
  m as w,
  n as T,
  o as E,
  p as D,
  s as O,
  u as k,
  y as A,
} from './Components-DsgpJoHg.js';
import {
  i as j,
  n as M,
  o as N,
  r as P,
  s as F,
  t as I,
} from './constants-Ck2e2d37.js';
((function () {
  let e = document.createElement(`link`).relList;
  if (!(e && e.supports && e.supports(`modulepreload`))) {
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) t(e);
    new MutationObserver((e) => {
      for (let n of e)
        if (n.type === `childList`)
          for (let e of n.addedNodes)
            e.tagName === `LINK` && e.rel === `modulepreload` && t(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    let t = (function (e) {
      let t = {};
      return (
        e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        e.crossOrigin === `use-credentials`
          ? (t.credentials = `include`)
          : e.crossOrigin === `anonymous`
            ? (t.credentials = `omit`)
            : (t.credentials = `same-origin`),
        t
      );
    })(e);
    fetch(e.href, t);
  }
})(),
  i());
var L = l.createContext({ loading: !1 }),
  R = ({ children: e }) => {
    let [t, r] = n(),
      [i, a] = n(),
      [o, c] = n(!1),
      l = async () => {
        if (!o) {
          c(!0);
          try {
            let e = await (async (e) => {
              try {
                return await (
                  await window.fetch(`${window.location.origin}/env`, {
                    signal: e?.signal,
                  })
                ).json();
              } catch (e) {
                throw Error(`Failed to load client environment`, { cause: e });
              }
            })();
            if (!e) throw Error(`Fail to get env`);
            r(e);
          } catch (e) {
            a(e);
          } finally {
            c(!1);
          }
        }
      };
    s(() => {
      t || i || o || l();
    }, [t, i, o]);
    let d = { env: t, error: i, loading: o };
    return u(L.Provider, { value: d, children: e });
  };
i();
var z = {
    clear: window.localStorage.clear,
    getItem: (e) => ({}),
    key: window.localStorage.key,
    localStorage: window.localStorage,
    length: window.localStorage.length,
    removeItem: (e) => null,
    setItem: (e, t) => null,
  },
  B = l.createContext(z),
  V = `storageChange`,
  H = (e) => {
    let t = window.localStorage.getItem(e);
    if (!t) return t;
    try {
      return JSON.parse(String(t));
    } catch (e) {
      return (console.error(e), t);
    }
  },
  U = (e) => {
    (window.localStorage.removeItem(e),
      window.setTimeout(() => {
        let e = new CustomEvent(V);
        document.dispatchEvent(e);
      }, 300));
  },
  W = (e, t) => {
    let n = ``;
    try {
      typeof t != `string` && (n = JSON.stringify(t));
    } catch (e) {
      console.error(e);
    }
    (window.localStorage.setItem(e, String(n)),
      window.setTimeout(() => {
        let e = new CustomEvent(V);
        document.dispatchEvent(e);
      }, 300));
  },
  G = ({ children: e }) => {
    let [t, r] = n({ ...window.localStorage });
    s(() => {
      let e = () => {
        r({ ...window.localStorage });
      };
      return (
        window.addEventListener(`storage`, e),
        document.addEventListener(V, e, !1),
        () => {
          (window.removeEventListener(`storage`, e),
            document.removeEventListener(V, e, !1));
        }
      );
    });
    let { clear: i, key: a, length: o } = window.localStorage,
      c = {
        clear: i,
        getItem: H,
        length: o,
        localStorage: t,
        removeItem: U,
        setItem: W,
        key: a,
      };
    return u(B.Provider, { value: c, children: e });
  },
  { localStorage: ie } = window;
p();
var K = e(_());
i();
var ae = {
    true: l.lazy(() =>
      t(() => import(`./Mobile-DSXVZ2-z.js`), __vite__mapDeps([0, 1, 2, 3, 4]))
    ),
    false: l.lazy(() =>
      t(() => import(`./Default-DHOGOGoH.js`), __vite__mapDeps([5, 1, 2, 3]))
    ),
  },
  q = () => {
    let { isMobile: e } = E(),
      t = ae[String(e)];
    return u(r, { fallback: u(T, { position: `inline` }), children: u(t, {}) });
  };
i();
var J = l.createContext({
    node: { current: null },
    rect: void 0,
    show: !0,
    showHeader: (e) => e,
  }),
  Y = ({ children: e, show: t = !0 }) => {
    let { node: r, rect: i } = O(),
      [a, o] = n(t);
    s(() => {
      o(t);
    }, [t]);
    let c = { node: r, rect: i, show: a, showHeader: o };
    return u(J.Provider, { value: c, children: e });
  },
  X = () => c(J);
i();
var Z = `kicl--widgets--global-header`,
  oe = () => {
    let { node: e } = X(),
      { isTablet: t } = E(),
      n = (0, K.default)(`kicl-font-size-small`, `kicl-position-fixed`, Z);
    return u(x, {
      alignItems: `center`,
      autoFlow: `column`,
      gap: t ? `wider` : `normal`,
      justifyContent: `space-between`,
      ref: e,
      children: d(`header`, {
        className: n,
        role: `banner`,
        children: [u(ce, {}), u(q, {})],
      }),
    });
  },
  se = () => {
    let { rect: e, show: t } = X();
    return d(f, {
      children: [
        m.createPortal(
          u(`style`, {
            'data-widget-global-header-uuid': `${Z}--css-variables`,
            children: `:root {\n              --${Z}--block-size: ${e?.height || 0}px;\n            }`,
          }),
          window.document.body
        ),
        u(S, { animationStyle: `slide-from-top`, in: t, children: u(oe, {}) }),
      ],
    });
  };
(i(), p());
var Q = `kicl--widgets--infinite-scroll`;
(l.forwardRef(
  ({ children: e, direction: t = `normal`, speed: n = 15e4, ...r }, i) => {
    let { node: a, rect: o } = O(),
      s = `${Q}--${g()}`,
      c = (0, K.default)(Q, s, `kicl-position-relative`, {
        [`${Q}--animation-direction--${t}`]: t,
      }),
      p = (0, K.default)(r.className, `${Q}--element`),
      h = (e, t) => {
        let n = e.props;
        return l.cloneElement(e, {
          ...n,
          className: (0, K.default)(n.className, p),
          ...t,
        });
      },
      _ = l.Children.map(e, (e) => (l.isValidElement(e) ? h(e) : e)),
      v = l.Children.map(e, (e) =>
        l.isValidElement(e) ? h(e, { 'aria-hidden': `true` }) : e
      );
    return d(f, {
      children: [
        m.createPortal(
          u(`style`, {
            'data-widget-infinite-scroll-uuid': `${s}--css-variables`,
            children: `\n            .${s} {\n              --kicl--widgets--infinite-scroll--block-size: ${o?.height ? `${o.height}px` : `auto`};\n              --kicl--widgets--infinite-scroll--speed: ${n}ms;\n            }\n          `,
          }),
          window.document.body
        ),
        u(`div`, {
          className: c,
          ref: i,
          children: d(`div`, {
            className: `${Q}--wrapper kicl-position-absolute`,
            ref: a,
            children: [v, _, v],
          }),
        }),
      ],
    });
  }
),
  i());
var ce = ({ ...e }) => {
  let t = (0, K.default)(`kicl--widgets--site-logo`, e.className);
  return u(A, {
    ...e,
    className: t,
    title: `Ki.CL`,
    children: u(x, {
      autoFlow: `column`,
      gap: `narrower`,
      alignItems: `center`,
      justifyContent: `center`,
      children: u(ee, {
        className: `kicl-line-height-narrower`,
        to: `/`,
        unstyled: !0,
        children: u(v, {}),
      }),
    }),
  });
};
i();
var le = l.lazy(() =>
    t(
      () => import(`./Contents-pUcANtXp.js`),
      __vite__mapDeps([6, 1, 2, 7, 3, 8])
    )
  ),
  ue = d(w, {
    path: M,
    element: u(() => u(F, { children: u(D, {}) }), {}),
    children: [
      u(w, { index: !0, element: u(re, { replace: !0, to: j(P) }) }),
      u(w, {
        path: I,
        element: u(
          () =>
            u(r, {
              fallback: u(T, { position: `inline` }),
              children: u(le, {}),
            }),
          {}
        ),
      }),
    ],
  });
i();
var de = l.lazy(() =>
    t(() => import(`./Contents-Ol8VgVI5.js`), __vite__mapDeps([9, 1, 2, 3]))
  ),
  fe = u(w, {
    path: N,
    element: u(() => u(r, { fallback: u(T, {}), children: u(de, {}) }), {}),
    children: ue,
  });
i();
var pe = () =>
    d(f, {
      children: [
        u(b, {}),
        u(se, {}),
        u(x, {
          alignContent: `start`,
          alignItems: `start`,
          gap: `none`,
          justifyContent: `stretch`,
          justifyItems: `center`,
          children: u(`main`, { className: `kicl--view`, children: u(D, {}) }),
        }),
      ],
    }),
  $ = () => {
    E();
    let e = y();
    return (
      s(() => {
        let t = document.querySelector(`body`);
        if (!t) return;
        let n = (e.pathname.replace(`/`, ``) || `home`).split(`/`);
        ((t.dataset.routes = n.join(`.`)),
          (document.title = `Ki.CL | ${n.join(` | `)}`));
      }),
      u(Y, { show: !1, children: u(pe, {}) })
    );
  },
  me = () =>
    u(te, {
      children: d(w, {
        path: `/`,
        errorElement: u(ne, {}),
        element: u($, {}),
        children: [u(w, { path: `*`, element: u(C, {}) }), fe, k],
      }),
    });
i();
var he = o(() =>
    t(
      () =>
        import(
          `./virtual_mf___mfe_internal__kicl__loadRemote__api_mf_1_provider__mf_owner__1__loadRemote__-BNGdl3q8.js`
        ).then(function (e) {
          var t = e && e.__mf_remote_pending;
          return (
            t && typeof t.then == `function`
              ? t.then(function (t) {
                  return t || e;
                })
              : Promise.resolve(e)
          ).then(function (e) {
            if (!e || !e.__moduleExports) {
              if (
                e &&
                e.default &&
                typeof e.default == `object` &&
                e.default.__esModule
              ) {
                var t = e.default,
                  n = Object.create(null);
                return (
                  Object.defineProperty(n, Symbol.toStringTag, {
                    value: `Module`,
                  }),
                  Object.keys(t).forEach(function (e) {
                    e !== '__esModule' && (n[e] = t[e]);
                  }),
                  `default` in t && (n.default = t.default),
                  n
                );
              }
              var r = Object.create(null);
              Object.defineProperty(r, Symbol.toStringTag, { value: `Module` });
              var i = e;
              return (
                i &&
                  i.default &&
                  typeof i.default == `object` &&
                  i.default.__esModule &&
                  (i = i.default),
                i &&
                  (Object.keys(i).forEach(function (e) {
                    e !== '__esModule' && (r[e] = i[e]);
                  }),
                  (r.default = `default` in i ? i.default : i)),
                r
              );
            }
            var a = Object.create(null);
            Object.defineProperty(a, Symbol.toStringTag, { value: `Module` });
            var o = e.__moduleExports;
            return (
              o &&
                o.default &&
                typeof o.default == `object` &&
                o.default.__esModule &&
                (o = o.default),
              Object.keys(o).forEach(function (e) {
                e !== '__esModule' && (a[e] = o[e]);
              }),
              `default` in o
                ? (a.default = o.default)
                : `default` in e && (a.default = e.default),
              a
            );
          });
        }),
      []
    ).then(({ KiclProvider: e }) => ({ default: e }))
  ),
  ge = () => {
    let { loading: e } = c(L);
    return e
      ? u(T, {})
      : u(r, {
          fallback: u(T, {}),
          children: u(he, { children: u(G, { children: u(me, {}) }) }),
        });
  },
  _e = () => u(R, { children: u(ge, {}) });
(i(),
  (() => {
    let e = document.querySelector(`app-root`);
    e && h.createRoot(e).render(u(a, { children: u(_e, {}) }));
  })());
//# sourceMappingURL=App-BLAH2mSH.js.map

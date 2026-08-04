import { a as e, n as t, r as n, t as r } from './rolldown-runtime-Mj8OWp7p.js';
var i,
  a,
  o,
  s,
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
  ee,
  te,
  ne,
  re,
  ie,
  ae,
  oe,
  se,
  ce,
  le,
  ue,
  de,
  fe,
  pe,
  me,
  P,
  F,
  he,
  I,
  ge,
  _e,
  L,
  ve,
  ye,
  be,
  R,
  z,
  xe,
  B,
  V,
  H,
  Se,
  Ce,
  U,
  W,
  we,
  Te,
  Ee,
  De,
  Oe,
  G,
  K,
  q,
  J,
  Y,
  X,
  Z,
  Q,
  ke,
  Ae,
  je,
  Me,
  Ne,
  Pe,
  Fe,
  Ie,
  Le,
  Re,
  ze,
  Be,
  Ve,
  He,
  Ue,
  We,
  Ge,
  Ke,
  qe,
  Je,
  Ye,
  $,
  Xe,
  Ze = r((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.consumer`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.for(`react.activity`),
      p = Symbol.iterator,
      m = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      h = Object.assign,
      g = {};
    function _(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    function v() {}
    function y(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    ((_.prototype.isReactComponent = {}),
      (_.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `takes an object of state variables to update or a function which returns an object of state variables.`
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (_.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }),
      (v.prototype = _.prototype));
    var b = (y.prototype = new v());
    ((b.constructor = y), h(b, _.prototype), (b.isPureReactComponent = !0));
    var x = Array.isArray;
    function S() {}
    var C = { H: null, A: null, T: null, S: null },
      w = Object.prototype.hasOwnProperty;
    function T(e, n, r) {
      var i = r.ref;
      return {
        $$typeof: t,
        type: e,
        key: n,
        ref: i === void 0 ? null : i,
        props: r,
      };
    }
    function E(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    var D = /\/+/g;
    function O(e, t) {
      return typeof e == `object` && e && e.key != null
        ? ((n = `` + e.key),
          (r = { '=': `=0`, ':': `=2` }),
          `$` +
            n.replace(/[=:]/g, function (e) {
              return r[e];
            }))
        : t.toString(36);
      var n, r;
    }
    function k(e, r, i, a, o) {
      var s = typeof e;
      (s !== `undefined` && s !== `boolean`) || (e = null);
      var c,
        l,
        u = !1;
      if (e === null) u = !0;
      else
        switch (s) {
          case `bigint`:
          case `string`:
          case `number`:
            u = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                u = !0;
                break;
              case d:
                return k((u = e._init)(e._payload), r, i, a, o);
            }
        }
      if (u)
        return (
          (o = o(e)),
          (u = a === `` ? `.` + O(e, 0) : a),
          x(o)
            ? ((i = ``),
              u != null && (i = u.replace(D, `$&/`) + `/`),
              k(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (E(o) &&
                ((c = o),
                (l =
                  i +
                  (o.key == null || (e && e.key === o.key)
                    ? ``
                    : (`` + o.key).replace(D, `$&/`) + `/`) +
                  u),
                (o = T(c.type, l, c.props))),
              r.push(o)),
          1
        );
      u = 0;
      var f,
        m = a === `` ? `.` : a + `:`;
      if (x(e))
        for (var h = 0; h < e.length; h++)
          u += k((a = e[h]), r, i, (s = m + O(a, h)), o);
      else if (
        typeof (h =
          (f = e) === null || typeof f != `object`
            ? null
            : typeof (f = (p && f[p]) || f[`@@iterator`]) == `function`
              ? f
              : null) == `function`
      )
        for (e = h.call(e), h = 0; !(a = e.next()).done;)
          u += k((a = a.value), r, i, (s = m + O(a, h++)), o);
      else if (s === `object`) {
        if (typeof e.then == `function`)
          return k(
            (function (e) {
              switch (e.status) {
                case `fulfilled`:
                  return e.value;
                case `rejected`:
                  throw e.reason;
                default:
                  switch (
                    (typeof e.status == `string`
                      ? e.then(S, S)
                      : ((e.status = `pending`),
                        e.then(
                          function (t) {
                            e.status === `pending` &&
                              ((e.status = `fulfilled`), (e.value = t));
                          },
                          function (t) {
                            e.status === `pending` &&
                              ((e.status = `rejected`), (e.reason = t));
                          }
                        )),
                    e.status)
                  ) {
                    case `fulfilled`:
                      return e.value;
                    case `rejected`:
                      throw e.reason;
                  }
              }
              throw e;
            })(e),
            r,
            i,
            a,
            o
          );
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`
          )
        );
      }
      return u;
    }
    function A(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        k(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function j(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()).then(
          function (t) {
            (e._status !== 0 && e._status !== -1) ||
              ((e._status = 1), (e._result = t));
          },
          function (t) {
            (e._status !== 0 && e._status !== -1) ||
              ((e._status = 2), (e._result = t));
          }
        ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var M =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (
                typeof window == `object` &&
                typeof window.ErrorEvent == `function`
              ) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              }
              console.error(e);
            },
      N = {
        map: A,
        forEach: function (e, t, n) {
          A(
            e,
            function () {
              t.apply(this, arguments);
            },
            n
          );
        },
        count: function (e) {
          var t = 0;
          return (
            A(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            A(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!E(e))
            throw Error(
              `React.Children.only expected to receive a single React element child.`
            );
          return e;
        },
      };
    ((e.Activity = f),
      (e.Children = N),
      (e.Component = _),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = y),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C),
      (e.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return C.H.useMemoCache(e);
        },
      }),
      (e.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (e.cacheSignal = function () {
        return null;
      }),
      (e.cloneElement = function (e, t, n) {
        if (e == null)
          throw Error(
            `The argument must be a React element, but you passed ` + e + `.`
          );
        var r = h({}, e.props),
          i = e.key;
        if (t != null)
          for (a in (t.key !== void 0 && (i = `` + t.key), t))
            !w.call(t, a) ||
              a === `key` ||
              a === `__self` ||
              a === `__source` ||
              (a === `ref` && t.ref === void 0) ||
              (r[a] = t[a]);
        var a = arguments.length - 2;
        if (a === 1) r.children = n;
        else if (1 < a) {
          for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
          r.children = o;
        }
        return T(e.type, i, r);
      }),
      (e.createContext = function (e) {
        return (
          ((e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = e),
          (e.Consumer = { $$typeof: o, _context: e }),
          e
        );
      }),
      (e.createElement = function (e, t, n) {
        var r,
          i = {},
          a = null;
        if (t != null)
          for (r in (t.key !== void 0 && (a = `` + t.key), t))
            w.call(t, r) &&
              r !== `key` &&
              r !== `__self` &&
              r !== `__source` &&
              (i[r] = t[r]);
        var o = arguments.length - 2;
        if (o === 1) i.children = n;
        else if (1 < o) {
          for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
          i.children = s;
        }
        if (e && e.defaultProps)
          for (r in (o = e.defaultProps)) i[r] === void 0 && (i[r] = o[r]);
        return T(e, a, i);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = E),
      (e.lazy = function (e) {
        return { $$typeof: d, _payload: { _status: -1, _result: e }, _init: j };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = C.T,
          n = {};
        C.T = n;
        try {
          var r = e(),
            i = C.S;
          (i !== null && i(n, r),
            typeof r == `object` &&
              r &&
              typeof r.then == `function` &&
              r.then(S, M));
        } catch (e) {
          M(e);
        } finally {
          (t !== null && n.types !== null && (t.types = n.types), (C.T = t));
        }
      }),
      (e.unstable_useCacheRefresh = function () {
        return C.H.useCacheRefresh();
      }),
      (e.use = function (e) {
        return C.H.use(e);
      }),
      (e.useActionState = function (e, t, n) {
        return C.H.useActionState(e, t, n);
      }),
      (e.useCallback = function (e, t) {
        return C.H.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return C.H.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e, t) {
        return C.H.useDeferredValue(e, t);
      }),
      (e.useEffect = function (e, t) {
        return C.H.useEffect(e, t);
      }),
      (e.useEffectEvent = function (e) {
        return C.H.useEffectEvent(e);
      }),
      (e.useId = function () {
        return C.H.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return C.H.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return C.H.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return C.H.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return C.H.useMemo(e, t);
      }),
      (e.useOptimistic = function (e, t) {
        return C.H.useOptimistic(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return C.H.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return C.H.useRef(e);
      }),
      (e.useState = function (e) {
        return C.H.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return C.H.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return C.H.useTransition();
      }),
      (e.version = `19.2.8`));
  }),
  Qe = r((e, t) => {
    t.exports = Ze();
  }),
  $e = n({
    Activity: () => o,
    Children: () => s,
    Component: () => c,
    Fragment: () => l,
    Profiler: () => u,
    PureComponent: () => d,
    StrictMode: () => f,
    Suspense: () => p,
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: () => m,
    __COMPILER_RUNTIME: () => h,
    cache: () => g,
    cacheSignal: () => _,
    cloneElement: () => v,
    createContext: () => y,
    createElement: () => b,
    createRef: () => x,
    default: () => me,
    forwardRef: () => S,
    isValidElement: () => C,
    lazy: () => w,
    memo: () => T,
    startTransition: () => E,
    unstable_useCacheRefresh: () => D,
    use: () => O,
    useActionState: () => k,
    useCallback: () => A,
    useContext: () => j,
    useDebugValue: () => M,
    useDeferredValue: () => N,
    useEffect: () => ee,
    useEffectEvent: () => te,
    useId: () => ne,
    useImperativeHandle: () => re,
    useInsertionEffect: () => ie,
    useLayoutEffect: () => ae,
    useMemo: () => oe,
    useOptimistic: () => se,
    useReducer: () => ce,
    useRef: () => le,
    useState: () => ue,
    useSyncExternalStore: () => de,
    useTransition: () => fe,
    version: () => pe,
  }),
  et = t(() => {
    ((i = e(Qe())),
      (o = (a = i).Activity),
      (s = a.Children),
      (c = a.Component),
      (l = a.Fragment),
      (u = a.Profiler),
      (d = a.PureComponent),
      (f = a.StrictMode),
      (p = a.Suspense),
      (m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE),
      (h = a.__COMPILER_RUNTIME),
      (g = a.cache),
      (_ = a.cacheSignal),
      (v = a.cloneElement),
      (y = a.createContext),
      (b = a.createElement),
      (x = a.createRef),
      (S = a.forwardRef),
      (C = a.isValidElement),
      (w = a.lazy),
      (T = a.memo),
      (E = a.startTransition),
      (D = a.unstable_useCacheRefresh),
      (O = a.use),
      (k = a.useActionState),
      (A = a.useCallback),
      (j = a.useContext),
      (M = a.useDebugValue),
      (N = a.useDeferredValue),
      (ee = a.useEffect),
      (te = a.useEffectEvent),
      (ne = a.useId),
      (re = a.useImperativeHandle),
      (ie = a.useInsertionEffect),
      (ae = a.useLayoutEffect),
      (oe = a.useMemo),
      (se = a.useOptimistic),
      (ce = a.useReducer),
      (le = a.useRef),
      (ue = a.useState),
      (de = a.useSyncExternalStore),
      (fe = a.useTransition),
      (pe = a.version),
      (me = Reflect.get(i, `default`) ?? i));
  }),
  tt = n({
    Activity: () => xe,
    Children: () => B,
    Component: () => V,
    Fragment: () => H,
    Profiler: () => Se,
    PureComponent: () => Ce,
    StrictMode: () => U,
    Suspense: () => W,
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: () => we,
    __COMPILER_RUNTIME: () => Te,
    __moduleExports: () => Xe,
    cache: () => Ee,
    cacheSignal: () => De,
    cloneElement: () => Oe,
    createContext: () => G,
    createElement: () => K,
    createRef: () => q,
    default: () => z,
    forwardRef: () => J,
    isValidElement: () => Y,
    lazy: () => X,
    memo: () => Z,
    startTransition: () => Q,
    unstable_useCacheRefresh: () => ke,
    use: () => Ae,
    useActionState: () => je,
    useCallback: () => Me,
    useContext: () => Ne,
    useDebugValue: () => Pe,
    useDeferredValue: () => Fe,
    useEffect: () => Ie,
    useEffectEvent: () => Le,
    useId: () => Re,
    useImperativeHandle: () => ze,
    useInsertionEffect: () => Be,
    useLayoutEffect: () => Ve,
    useMemo: () => He,
    useOptimistic: () => Ue,
    useReducer: () => We,
    useRef: () => Ge,
    useState: () => Ke,
    useSyncExternalStore: () => qe,
    useTransition: () => Je,
    version: () => Ye,
  }),
  nt = t(() => {
    (et(),
      (P = `__mf_module_cache__`),
      (globalThis[P] ||= { share: {}, remote: {} }),
      (globalThis[P].share ||= {}),
      (globalThis[P].remote ||= {}),
      (F = globalThis[P]));
    for (let e of Object.keys(F.share))
      if (e.startsWith(`default:`)) {
        let t = e.slice(8);
        F.share[t] === void 0 && (F.share[t] = F.share[e]);
      } else if (!e.includes(`:`)) {
        let t = `default:` + e;
        F.share[t] === void 0 && (F.share[t] = F.share[e]);
      }
    ((he = (e, t) => {
      let n = e[t.canonical];
      if (n !== void 0) return n;
      let r = t.aliases || [];
      for (let n of r) {
        if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
        let r = e[n];
        if (r !== void 0) return ((e[t.canonical] = r), r);
      }
    }),
      (I = Symbol.for(`module-federation.shared-cache-listeners`)),
      (ge = (e) => {
        let t = e[I];
        return (
          t === void 0 &&
            ((t = Object.create(null)),
            Object.defineProperty(e, I, {
              value: t,
              enumerable: !1,
              configurable: !1,
              writable: !1,
            })),
          t
        );
      }),
      (_e = (e, t, n) => {
        let r = ge(e);
        (r[t.canonical] ||= new Set()).add(n);
      }),
      (L = Symbol.for(`module-federation.shared-cache-owners`)),
      (ve = (e) => {
        let t = e[L];
        return (
          t === void 0 &&
            ((t = Object.create(null)),
            Object.defineProperty(e, L, {
              value: t,
              enumerable: !1,
              configurable: !1,
              writable: !1,
            })),
          t
        );
      }),
      (ye = (e, t, n, r) => {
        e[t.canonical] = n;
        let i = t.aliases || [];
        for (let t of i)
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          });
        let a = e[L];
        r === void 0 ? a && delete a[t.canonical] : (ve(e)[t.canonical] = r);
        let o = e[I]?.[t.canonical];
        if (o) for (let e of o) e(n);
        return n;
      }),
      (be = (e) => {
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
      (R = he(F.share, { canonical: `default:react`, aliases: [`react`] })) ===
        void 0 &&
        ((R = be($e)),
        ye(
          F.share,
          { canonical: `default:react`, aliases: [`react`] },
          R,
          `kicl`
        )),
      ($ = (e) => {
        ((xe = e.Activity),
          (B = e.Children),
          (V = e.Component),
          (H = e.Fragment),
          (Se = e.Profiler),
          (Ce = e.PureComponent),
          (U = e.StrictMode),
          (W = e.Suspense),
          (we =
            e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE),
          (Te = e.__COMPILER_RUNTIME),
          (Ee = e.cache),
          (De = e.cacheSignal),
          (Oe = e.cloneElement),
          (G = e.createContext),
          (K = e.createElement),
          (q = e.createRef),
          (J = e.forwardRef),
          (Y = e.isValidElement),
          (X = e.lazy),
          (Z = e.memo),
          (Q = e.startTransition),
          (ke = e.unstable_useCacheRefresh),
          (Ae = e.use),
          (je = e.useActionState),
          (Me = e.useCallback),
          (Ne = e.useContext),
          (Pe = e.useDebugValue),
          (Fe = e.useDeferredValue),
          (Ie = e.useEffect),
          (Le = e.useEffectEvent),
          (Re = e.useId),
          (ze = e.useImperativeHandle),
          (Be = e.useInsertionEffect),
          (Ve = e.useLayoutEffect),
          (He = e.useMemo),
          (Ue = e.useOptimistic),
          (We = e.useReducer),
          (Ge = e.useRef),
          (Ke = e.useState),
          (qe = e.useSyncExternalStore),
          (Je = e.useTransition),
          (Ye = e.version),
          (z = (() => {
            let t = e;
            for (let e = 0; e < 5; e++) {
              let e = t?.default;
              if (!e || typeof e != `object`) return e ?? t;
              t = e;
            }
            return t;
          })()));
      }),
      _e(F.share, { canonical: `default:react`, aliases: [`react`] }, $),
      $(R),
      (Xe = R));
  });
export {
  et as A,
  Ke as C,
  tt as D,
  W as E,
  nt as O,
  Ge as S,
  U as T,
  Re as _,
  q as a,
  He as b,
  X as c,
  Q as d,
  Ae as f,
  H as g,
  Ie as h,
  K as i,
  $e as k,
  Z as l,
  Ne as m,
  B as n,
  J as o,
  Me as p,
  G as r,
  Y as s,
  z as t,
  V as u,
  ze as v,
  qe as w,
  Ue as x,
  Ve as y,
};
//# sourceMappingURL=_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js.map

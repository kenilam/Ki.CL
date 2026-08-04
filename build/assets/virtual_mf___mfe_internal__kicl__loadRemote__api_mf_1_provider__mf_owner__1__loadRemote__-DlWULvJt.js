import { t as e } from './_virtual_mf___mfe_internal__kicl__mf_owner__1__H_A_I__hostAutoInit__H_A_I__-T3eXpBTM.js';
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
function i() {
  let t = `__mf_pending__virtual:mf:__mfe_internal__kicl__mf_owner__1__mf_v__runtimeInit__mf_v__.js::api/provider`;
  return (
    r.remote[t] ||
      (r.remote[t] = e
        .then((e) =>
          e.loadRemote(`__mfe_internal__kicl__mf_owner__1__api/provider`)
        )
        .then((e) =>
          Promise.resolve(e?.__mf_remote_dependency_pending).then(() => e)
        )
        .then(
          (e) => (
            (r.remote[
              `virtual:mf:__mfe_internal__kicl__mf_owner__1__mf_v__runtimeInit__mf_v__.js::api/provider`
            ] = e),
            delete r.remote[t],
            e
          )
        )
        .catch((e) => {
          throw (delete r.remote[t], e);
        })),
    r.remote[t]
  );
}
function a() {
  n = o?.__mf_is_remote_proxy
    ? o
    : (function (e) {
        let t = e,
          n = new Set();
        for (; typeof t == `object` && t && !n.has(t);)
          if ((n.add(t), t.__esModule && t.default != null)) t = t.default;
          else {
            if (t.__esModule || t.default == null) break;
            t = t.default;
          }
        return t;
      })(o);
}
var o =
  r.remote[
    `virtual:mf:__mfe_internal__kicl__mf_owner__1__mf_v__runtimeInit__mf_v__.js::api/provider`
  ];
(o === void 0 &&
  (o = (function () {
    let e,
      t = () =>
        r.remote[
          `virtual:mf:__mfe_internal__kicl__mf_owner__1__mf_v__runtimeInit__mf_v__.js::api/provider`
        ],
      n = function (...n) {
        e ||= i();
        let r = t(),
          a = r && (r.default ?? r);
        return a == null ? null : a.apply(this, n);
      };
    return new Proxy(n, {
      get(r, a) {
        if (a === `__mf_is_remote_proxy` || a === '__esModule') return !0;
        if (a === `then`) return;
        if (a === Symbol.toPrimitive || a === `toString`)
          return () => `[MF remote: pending]`;
        let o = t();
        if (o) return a in o ? o[a] : o.default?.[a];
        if (((e ||= i()), a === 'default')) return n;
        throw ((e ||= i()), e);
      },
      has(e, n) {
        let r = t();
        return r
          ? n in r
          : n === 'default' ||
              n === '__esModule' ||
              n === `__mf_is_remote_proxy`;
      },
      ownKeys() {
        let e = t(),
          r = new Set(e ? Reflect.ownKeys(e) : []);
        for (let e of Reflect.ownKeys(n)) {
          let t = Object.getOwnPropertyDescriptor(n, e);
          t && !t.configurable && r.add(e);
        }
        return Array.from(r);
      },
      getOwnPropertyDescriptor(e, r) {
        let i = Object.getOwnPropertyDescriptor(n, r);
        if (i && !i.configurable) return i;
        let a = t();
        return a
          ? Object.getOwnPropertyDescriptor(a, r) || {
              configurable: !0,
              enumerable: !0,
              value: a[r],
            }
          : void 0;
      },
      apply: (e, t, n) => e.apply(t, n),
    });
  })()),
  a());
var s = i().then(function (e) {
  return (e !== void 0 && (o = e), a(), o);
});
export { s as n, o as r, n as t };
//# sourceMappingURL=virtual_mf___mfe_internal__kicl__loadRemote__api_mf_1_provider__mf_owner__1__loadRemote__-DlWULvJt.js.map

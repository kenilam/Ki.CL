var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (e) {
      throw ((n = [e]), e);
    }
  },
  s = (e, t) => () => (
    t || (e((t = { exports: {} }).exports, t), (e = null)),
    t.exports
  ),
  c = (e, n) => {
    let r = {};
    for (var i in e) t(r, i, { get: e[i], enumerable: !0 });
    return (n || t(r, Symbol.toStringTag, { value: `Module` }), r);
  },
  l = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c, l = r(i), u = 0, d = l.length; u < d; u++)
        ((c = l[u]),
          a.call(e, c) ||
            c === o ||
            t(e, c, {
              get: ((e) => i[e]).bind(null, c),
              enumerable: !(s = n(i, c)) || s.enumerable,
            }));
    return e;
  },
  u = (n, r, a) => (
    (a = n == null ? {} : e(i(n))),
    l(
      !r && n && n.__esModule
        ? a
        : t(a, `default`, { value: n, enumerable: !0 }),
      n
    )
  ),
  d = (e) =>
    a.call(e, `module.exports`)
      ? e[`module.exports`]
      : l(t({}, `__esModule`, { value: !0 }), e);
export { u as a, d as i, o as n, c as r, s as t };

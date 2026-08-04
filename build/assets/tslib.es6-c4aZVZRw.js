var e = function (t, n) {
  return (
    (e =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t)
          Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      }),
    e(t, n)
  );
};
function t(t, n) {
  if (typeof n != `function` && n !== null)
    throw TypeError(
      `Class extends value ` + String(n) + ` is not a constructor or null`
    );
  function r() {
    this.constructor = t;
  }
  (e(t, n),
    (t.prototype =
      n === null ? Object.create(n) : ((r.prototype = n.prototype), new r())));
}
var n = function () {
  return (
    (n =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }),
    n.apply(this, arguments)
  );
};
function r(e, t, n, r) {
  return new (n ||= Promise)(function (i, a) {
    function o(e) {
      try {
        c(r.next(e));
      } catch (e) {
        a(e);
      }
    }
    function s(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        a(e);
      }
    }
    function c(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(o, s);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function i(e, t) {
  var n,
    r,
    i,
    a = {
      label: 0,
      sent: function () {
        if (1 & i[0]) throw i[1];
        return i[1];
      },
      trys: [],
      ops: [],
    },
    o = Object.create(
      (typeof Iterator == `function` ? Iterator : Object).prototype
    );
  return (
    (o.next = s(0)),
    (o.throw = s(1)),
    (o.return = s(2)),
    typeof Symbol == `function` &&
      (o[Symbol.iterator] = function () {
        return this;
      }),
    o
  );
  function s(s) {
    return function (c) {
      return (function (s) {
        if (n) throw TypeError(`Generator is already executing.`);
        for (; o && ((o = 0), s[0] && (a = 0)), a;)
          try {
            if (
              ((n = 1),
              r &&
                (i =
                  2 & s[0]
                    ? r.return
                    : s[0]
                      ? r.throw || ((i = r.return) && i.call(r), 0)
                      : r.next) &&
                !(i = i.call(r, s[1])).done)
            )
              return i;
            switch (((r = 0), i && (s = [2 & s[0], i.value]), s[0])) {
              case 0:
              case 1:
                i = s;
                break;
              case 4:
                return (a.label++, { value: s[1], done: !1 });
              case 5:
                (a.label++, (r = s[1]), (s = [0]));
                continue;
              case 7:
                ((s = a.ops.pop()), a.trys.pop());
                continue;
              default:
                if (
                  ((i = a.trys),
                  !(
                    (i = i.length > 0 && i[i.length - 1]) ||
                    (s[0] !== 6 && s[0] !== 2)
                  ))
                ) {
                  a = 0;
                  continue;
                }
                if (s[0] === 3 && (!i || (s[1] > i[0] && s[1] < i[3]))) {
                  a.label = s[1];
                  break;
                }
                if (s[0] === 6 && a.label < i[1]) {
                  ((a.label = i[1]), (i = s));
                  break;
                }
                if (i && a.label < i[2]) {
                  ((a.label = i[2]), a.ops.push(s));
                  break;
                }
                (i[2] && a.ops.pop(), a.trys.pop());
                continue;
            }
            s = t.call(e, a);
          } catch (e) {
            ((s = [6, e]), (r = 0));
          } finally {
            n = i = 0;
          }
        if (5 & s[0]) throw s[1];
        return { value: s[0] ? s[1] : void 0, done: !0 };
      })([s, c]);
    };
  }
}
function a(e) {
  var t = typeof Symbol == `function` && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == `number`)
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0),
          { value: e && e[r++], done: !e }
        );
      },
    };
  throw TypeError(
    t ? `Object is not iterable.` : `Symbol.iterator is not defined.`
  );
}
function o(e, t) {
  var n = typeof Symbol == `function` && e[Symbol.iterator];
  if (!n) return e;
  var r,
    i,
    a = n.call(e),
    o = [];
  try {
    for (; (t === void 0 || t-- > 0) && !(r = a.next()).done;) o.push(r.value);
  } catch (e) {
    i = { error: e };
  } finally {
    try {
      r && !r.done && (n = a.return) && n.call(a);
    } finally {
      if (i) throw i.error;
    }
  }
  return o;
}
function s(e, t, n) {
  if (n || arguments.length === 2)
    for (var r, i = 0, a = t.length; i < a; i++)
      (!r && i in t) ||
        ((r ||= Array.prototype.slice.call(t, 0, i)), (r[i] = t[i]));
  return e.concat(r || Array.prototype.slice.call(t));
}
function c(e) {
  return this instanceof c ? ((this.v = e), this) : new c(e);
}
function l(e, t, n) {
  if (!Symbol.asyncIterator)
    throw TypeError(`Symbol.asyncIterator is not defined.`);
  var r,
    i = n.apply(e, t || []),
    a = [];
  return (
    (r = Object.create(
      (typeof AsyncIterator == `function` ? AsyncIterator : Object).prototype
    )),
    o(`next`),
    o(`throw`),
    o(`return`, function (e) {
      return function (t) {
        return Promise.resolve(t).then(e, u);
      };
    }),
    (r[Symbol.asyncIterator] = function () {
      return this;
    }),
    r
  );
  function o(e, t) {
    i[e] &&
      ((r[e] = function (t) {
        return new Promise(function (n, r) {
          a.push([e, t, n, r]) > 1 || s(e, t);
        });
      }),
      t && (r[e] = t(r[e])));
  }
  function s(e, t) {
    try {
      (n = i[e](t)).value instanceof c
        ? Promise.resolve(n.value.v).then(l, u)
        : d(a[0][2], n);
    } catch (e) {
      d(a[0][3], e);
    }
    var n;
  }
  function l(e) {
    s(`next`, e);
  }
  function u(e) {
    s(`throw`, e);
  }
  function d(e, t) {
    (e(t), a.shift(), a.length && s(a[0][0], a[0][1]));
  }
}
function u(e) {
  if (!Symbol.asyncIterator)
    throw TypeError(`Symbol.asyncIterator is not defined.`);
  var t,
    n = e[Symbol.asyncIterator];
  return n
    ? n.call(e)
    : ((e = a(e)),
      (t = {}),
      r(`next`),
      r(`throw`),
      r(`return`),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function r(n) {
    t[n] =
      e[n] &&
      function (t) {
        return new Promise(function (r, i) {
          (function (e, t, n, r) {
            Promise.resolve(r).then(function (t) {
              e({ value: t, done: n });
            }, t);
          })(r, i, (t = e[n](t)).done, t.value);
        });
      };
  }
}
export {
  r as a,
  o as c,
  c as i,
  s as l,
  l as n,
  t as o,
  u as r,
  i as s,
  n as t,
  a as u,
};
//# sourceMappingURL=tslib.es6-c4aZVZRw.js.map

const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/Contents-Da4b1pHu.js', 'assets/Contents-cSj78MRt.css'])
) => i.map((i) => d[i]);
import { a as e, t } from './rolldown-runtime-Mj8OWp7p.js';
import { t as n } from './vite-preload-helper-BpIsQ93C.js';
import {
  C as r,
  E as i,
  O as a,
  S as o,
  _ as s,
  b as c,
  d as l,
  g as u,
  h as d,
  i as f,
  l as p,
  m,
  n as h,
  o as g,
  p as _,
  r as v,
  s as y,
  t as b,
  u as x,
  x as S,
  y as C,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js';
import {
  n as w,
  r as T,
  t as E,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-CvHS1BZ1.js';
import {
  i as D,
  n as O,
  t as k,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_2_dom__loadShare__.js-BH5eVD0R.js';
import { l as A } from './tslib.es6-c4aZVZRw.js';
var j = t((e, t) => {
  (function () {
    var e = {}.hasOwnProperty;
    function n() {
      for (var e = ``, t = 0; t < arguments.length; t++) {
        var n = arguments[t];
        n && (e = i(e, r(n)));
      }
      return e;
    }
    function r(t) {
      if (typeof t == `string` || typeof t == `number`) return t;
      if (typeof t != `object`) return ``;
      if (Array.isArray(t)) return n.apply(null, t);
      if (
        t.toString !== Object.prototype.toString &&
        !t.toString.toString().includes(`[native code]`)
      )
        return t.toString();
      var r = ``;
      for (var a in t) e.call(t, a) && t[a] && (r = i(r, a));
      return r;
    }
    function i(e, t) {
      return t ? (e ? e + ` ` + t : e + t) : e;
    }
    t !== void 0 && t.exports
      ? ((n.default = n), (t.exports = n))
      : typeof define == `function` &&
          typeof define.amd == `object` &&
          define.amd
        ? define(`classnames`, [], function () {
            return n;
          })
        : (window.classNames = n);
  })();
});
function M() {
  return (
    (M = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    M.apply(null, arguments)
  );
}
function N(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function P(e, t) {
  return (
    (P = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    P(e, t)
  );
}
function F(e, t) {
  ((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    P(e, t));
}
var I = t((e, t) => {
    t.exports = `SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`;
  }),
  ee = t((e, t) => {
    var n = I();
    function r() {}
    function i() {}
    ((i.resetWarningCache = r),
      (t.exports = function () {
        function e(e, t, r, i, a, o) {
          if (o !== n) {
            var s = Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
            );
            throw ((s.name = `Invariant Violation`), s);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var a = {
          array: e,
          bigint: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: i,
          resetWarningCache: r,
        };
        return ((a.PropTypes = a), a);
      }));
  }),
  te = t((e, t) => {
    t.exports = ee()();
  });
function ne(e, t) {
  return e
    .replace(RegExp(`(^|\\s)` + t + `(?:\\s|$)`, `g`), `$1`)
    .replace(/\s+/g, ` `)
    .replace(/^\s*|\s*$/g, ``);
}
(a(), D());
var re = b.createContext(null),
  ie = function (e) {
    return e.scrollTop;
  };
a();
var L = `unmounted`,
  R = `exited`,
  z = `entering`,
  ae = `entered`,
  B = `exiting`,
  V = (function (e) {
    function t(t, n) {
      var r,
        i = e.call(this, t, n) || this,
        a = n && !n.isMounting ? t.enter : t.appear;
      return (
        (i.appearStatus = null),
        t.in
          ? a
            ? ((r = R), (i.appearStatus = z))
            : (r = ae)
          : (r = t.unmountOnExit || t.mountOnEnter ? L : R),
        (i.state = { status: r }),
        (i.nextCallback = null),
        i
      );
    }
    (F(t, e),
      (t.getDerivedStateFromProps = function (e, t) {
        return e.in && t.status === `unmounted` ? { status: R } : null;
      }));
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (n.componentDidUpdate = function (e) {
        var t = null;
        if (e !== this.props) {
          var n = this.state.status;
          this.props.in
            ? n !== `entering` && n !== `entered` && (t = z)
            : (n !== `entering` && n !== `entered`) || (t = B);
        }
        this.updateStatus(!1, t);
      }),
      (n.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (n.getTimeouts = function () {
        var e,
          t,
          n = this.props.timeout,
          r = (e = t = n);
        return (
          n != null &&
            typeof n != `number` &&
            ((r = n.exit),
            (e = n.enter),
            (t = n.appear === void 0 ? e : n.appear)),
          { exit: r, enter: e, appear: t }
        );
      }),
      (n.updateStatus = function (e, t) {
        if ((e === void 0 && (e = !1), t !== null))
          if ((this.cancelNextCallback(), t === `entering`)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var n = this.props.nodeRef
                ? this.props.nodeRef.current
                : k.findDOMNode(this);
              n && ie(n);
            }
            this.performEnter(e);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === `exited` &&
            this.setState({ status: L });
      }),
      (n.performEnter = function (e) {
        var t = this,
          n = this.props.enter,
          r = this.context ? this.context.isMounting : e,
          i = this.props.nodeRef ? [r] : [k.findDOMNode(this), r],
          a = i[0],
          o = i[1],
          s = this.getTimeouts(),
          c = r ? s.appear : s.enter;
        !e && !n
          ? this.safeSetState({ status: ae }, function () {
              t.props.onEntered(a);
            })
          : (this.props.onEnter(a, o),
            this.safeSetState({ status: z }, function () {
              (t.props.onEntering(a, o),
                t.onTransitionEnd(c, function () {
                  t.safeSetState({ status: ae }, function () {
                    t.props.onEntered(a, o);
                  });
                }));
            }));
      }),
      (n.performExit = function () {
        var e = this,
          t = this.props.exit,
          n = this.getTimeouts(),
          r = this.props.nodeRef ? void 0 : k.findDOMNode(this);
        t
          ? (this.props.onExit(r),
            this.safeSetState({ status: B }, function () {
              (e.props.onExiting(r),
                e.onTransitionEnd(n.exit, function () {
                  e.safeSetState({ status: R }, function () {
                    e.props.onExited(r);
                  });
                }));
            }))
          : this.safeSetState({ status: R }, function () {
              e.props.onExited(r);
            });
      }),
      (n.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (n.safeSetState = function (e, t) {
        ((t = this.setNextCallback(t)), this.setState(e, t));
      }),
      (n.setNextCallback = function (e) {
        var t = this,
          n = !0;
        return (
          (this.nextCallback = function (r) {
            n && ((n = !1), (t.nextCallback = null), e(r));
          }),
          (this.nextCallback.cancel = function () {
            n = !1;
          }),
          this.nextCallback
        );
      }),
      (n.onTransitionEnd = function (e, t) {
        this.setNextCallback(t);
        var n = this.props.nodeRef
            ? this.props.nodeRef.current
            : k.findDOMNode(this),
          r = e == null && !this.props.addEndListener;
        if (n && !r) {
          if (this.props.addEndListener) {
            var i = this.props.nodeRef
                ? [this.nextCallback]
                : [n, this.nextCallback],
              a = i[0],
              o = i[1];
            this.props.addEndListener(a, o);
          }
          e != null && setTimeout(this.nextCallback, e);
        } else setTimeout(this.nextCallback, 0);
      }),
      (n.render = function () {
        var e = this.state.status;
        if (e === `unmounted`) return null;
        var t = this.props,
          n = t.children;
        (t.in,
          t.mountOnEnter,
          t.unmountOnExit,
          t.appear,
          t.enter,
          t.exit,
          t.timeout,
          t.addEndListener,
          t.onEnter,
          t.onEntering,
          t.onEntered,
          t.onExit,
          t.onExiting,
          t.onExited,
          t.nodeRef);
        var r = N(t, [
          `children`,
          `in`,
          `mountOnEnter`,
          `unmountOnExit`,
          `appear`,
          `enter`,
          `exit`,
          `timeout`,
          `addEndListener`,
          `onEnter`,
          `onEntering`,
          `onEntered`,
          `onExit`,
          `onExiting`,
          `onExited`,
          `nodeRef`,
        ]);
        return b.createElement(
          re.Provider,
          { value: null },
          typeof n == `function`
            ? n(e, r)
            : b.cloneElement(b.Children.only(n), r)
        );
      }),
      t
    );
  })(b.Component);
function H() {}
((V.contextType = re),
  (V.propTypes = {}),
  (V.defaultProps = {
    in: !1,
    mountOnEnter: !1,
    unmountOnExit: !1,
    appear: !1,
    enter: !0,
    exit: !0,
    onEnter: H,
    onEntering: H,
    onEntered: H,
    onExit: H,
    onExiting: H,
    onExited: H,
  }),
  (V.UNMOUNTED = L),
  (V.EXITED = R),
  (V.ENTERING = z),
  (V.ENTERED = ae),
  (V.EXITING = B),
  a());
var oe = function (e, t) {
    return (
      e &&
      t &&
      t.split(` `).forEach(function (t) {
        ((r = t),
          (n = e).classList
            ? n.classList.add(r)
            : (function (e, t) {
                return e.classList
                  ? !!t && e.classList.contains(t)
                  : (` ` + (e.className.baseVal || e.className) + ` `).indexOf(
                      ` ` + t + ` `
                    ) !== -1;
              })(n, r) ||
              (typeof n.className == `string`
                ? (n.className = n.className + ` ` + r)
                : n.setAttribute(
                    `class`,
                    ((n.className && n.className.baseVal) || ``) + ` ` + r
                  )));
        return;
        var n, r;
      })
    );
  },
  se = function (e, t) {
    return (
      e &&
      t &&
      t.split(` `).forEach(function (t) {
        ((r = t),
          (n = e).classList
            ? n.classList.remove(r)
            : typeof n.className == `string`
              ? (n.className = ne(n.className, r))
              : n.setAttribute(
                  `class`,
                  ne((n.className && n.className.baseVal) || ``, r)
                ));
        return;
        var n, r;
      })
    );
  },
  ce = (function (e) {
    function t() {
      for (var t, n = arguments.length, r = Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return (
        ((t = e.call.apply(e, [this].concat(r)) || this).appliedClasses = {
          appear: {},
          enter: {},
          exit: {},
        }),
        (t.onEnter = function (e, n) {
          var r = t.resolveArguments(e, n),
            i = r[0],
            a = r[1];
          (t.removeClasses(i, `exit`),
            t.addClass(i, a ? `appear` : `enter`, `base`),
            t.props.onEnter && t.props.onEnter(e, n));
        }),
        (t.onEntering = function (e, n) {
          var r = t.resolveArguments(e, n),
            i = r[0],
            a = r[1] ? `appear` : `enter`;
          (t.addClass(i, a, `active`),
            t.props.onEntering && t.props.onEntering(e, n));
        }),
        (t.onEntered = function (e, n) {
          var r = t.resolveArguments(e, n),
            i = r[0],
            a = r[1] ? `appear` : `enter`;
          (t.removeClasses(i, a),
            t.addClass(i, a, `done`),
            t.props.onEntered && t.props.onEntered(e, n));
        }),
        (t.onExit = function (e) {
          var n = t.resolveArguments(e)[0];
          (t.removeClasses(n, `appear`),
            t.removeClasses(n, `enter`),
            t.addClass(n, `exit`, `base`),
            t.props.onExit && t.props.onExit(e));
        }),
        (t.onExiting = function (e) {
          var n = t.resolveArguments(e)[0];
          (t.addClass(n, `exit`, `active`),
            t.props.onExiting && t.props.onExiting(e));
        }),
        (t.onExited = function (e) {
          var n = t.resolveArguments(e)[0];
          (t.removeClasses(n, `exit`),
            t.addClass(n, `exit`, `done`),
            t.props.onExited && t.props.onExited(e));
        }),
        (t.resolveArguments = function (e, n) {
          return t.props.nodeRef ? [t.props.nodeRef.current, e] : [e, n];
        }),
        (t.getClassNames = function (e) {
          var n = t.props.classNames,
            r = typeof n == `string`,
            i = r ? (r && n ? n + `-` : ``) + e : n[e];
          return {
            baseClassName: i,
            activeClassName: r ? i + `-active` : n[e + `Active`],
            doneClassName: r ? i + `-done` : n[e + `Done`],
          };
        }),
        t
      );
    }
    F(t, e);
    var n = t.prototype;
    return (
      (n.addClass = function (e, t, n) {
        var r = this.getClassNames(t)[n + `ClassName`],
          i = this.getClassNames(`enter`).doneClassName;
        (t === `appear` && n === `done` && i && (r += ` ` + i),
          n === `active` && e && ie(e),
          r && ((this.appliedClasses[t][n] = r), oe(e, r)));
      }),
      (n.removeClasses = function (e, t) {
        var n = this.appliedClasses[t],
          r = n.base,
          i = n.active,
          a = n.done;
        ((this.appliedClasses[t] = {}),
          r && se(e, r),
          i && se(e, i),
          a && se(e, a));
      }),
      (n.render = function () {
        var e = this.props;
        e.classNames;
        var t = N(e, [`classNames`]);
        return b.createElement(
          V,
          M({}, t, {
            onEnter: this.onEnter,
            onEntered: this.onEntered,
            onEntering: this.onEntering,
            onExit: this.onExit,
            onExiting: this.onExiting,
            onExited: this.onExited,
          })
        );
      }),
      t
    );
  })(b.Component);
((ce.defaultProps = { classNames: `` }), (ce.propTypes = {}));
var U = [];
for (let e = 0; e < 256; ++e) U.push((e + 256).toString(16).slice(1));
var le = new Uint8Array(16);
function ue(e, t, n) {
  return t || e || !crypto.randomUUID
    ? (function (e, t, n) {
        e ||= {};
        let r = e.random ?? e.rng?.() ?? crypto.getRandomValues(le);
        if (r.length < 16) throw Error(`Random bytes length must be >= 16`);
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
          if ((n ||= 0) < 0 || n + 16 > t.length)
            throw RangeError(
              `UUID byte range ${n}:${n + 15} is out of buffer bounds`
            );
          for (let e = 0; e < 16; ++e) t[n + e] = r[e];
          return t;
        }
        return (function (e, t = 0) {
          return (
            U[e[t + 0]] +
            U[e[t + 1]] +
            U[e[t + 2]] +
            U[e[t + 3]] +
            `-` +
            U[e[t + 4]] +
            U[e[t + 5]] +
            `-` +
            U[e[t + 6]] +
            U[e[t + 7]] +
            `-` +
            U[e[t + 8]] +
            U[e[t + 9]] +
            `-` +
            U[e[t + 10]] +
            U[e[t + 11]] +
            U[e[t + 12]] +
            U[e[t + 13]] +
            U[e[t + 14]] +
            U[e[t + 15]]
          ).toLowerCase();
        })(r);
      })(e, t, n)
    : crypto.randomUUID();
}
a();
var de = t((e, t) => {
    var n = { _default: `deg` };
    ((n.deg = {
      grad: function (e) {
        return e / 0.9;
      },
      rad: function (e) {
        return (Math.PI / 180) * e;
      },
      turn: function (e) {
        return e / 360;
      },
    }),
      (n.grad = {
        deg: function (e) {
          return 0.9 * e;
        },
      }),
      (n.rad = {
        deg: function (e) {
          return e / (Math.PI / 180);
        },
      }),
      (n.turn = {
        deg: function (e) {
          return 360 * e;
        },
      }),
      (t.exports = n));
  }),
  fe = t((e, t) => {
    var n = {
        getElementFontSize: function (e) {
          return typeof getComputedStyle < `u`
            ? parseFloat(getComputedStyle(e, ``).fontSize)
            : 16;
        },
        getCreatedElementDimensions: function (e, t, n) {
          var r,
            i,
            a = document.createElement(`div`),
            o = a.style;
          if (
            ((o.position = `absolute`),
            (o.zIndex = -2147483648),
            (o.left = 0),
            (o.top = 0),
            (o.visibility = `hidden`),
            t)
          )
            for (i in t) t.hasOwnProperty(i) && (o[i] = t[i]);
          return (
            n && (a.innerHTML = n),
            e.appendChild(a),
            (r = [a.offsetWidth, a.offsetHeight]),
            e.removeChild(a),
            r
          );
        },
        getCreatedElementWidth: function (e, t, r) {
          return n.getCreatedElementDimensions(e, t, r)[0];
        },
        getCreatedElementHeight: function (e, t, r) {
          return n.getCreatedElementDimensions(e, t, r)[1];
        },
      },
      r = [
        `perspective`,
        `translate`,
        `translate3d`,
        `translateX`,
        `translateY`,
        `translateZ`,
        `transformOrigin`,
      ],
      i = [`height`, `top`, `translateY`],
      a = [`absolute`, `fixed`];
    ((n.getRelativeElementDimension = function (e, t) {
      var n,
        o,
        s,
        c = i.indexOf(t) > -1,
        l = r.indexOf(t) > -1,
        u = a.indexOf(getComputedStyle(e, ``).position) > -1;
      return (
        (n = l ? e : u ? e.offsetParent : e.parentNode),
        (o = c ? n.offsetHeight : n.offsetWidth),
        !l &&
          u &&
          ((s = getComputedStyle(n, ``)),
          (o -= c
            ? parseFloat(s.paddingTop) + parseFloat(s.paddingBottom)
            : parseFloat(s.paddingRight) + parseFloat(s.paddingLeft))),
        o
      );
    }),
      (n.DPI =
        typeof window > `u`
          ? 96
          : n.getCreatedElementWidth(document.body, { width: `1in` })),
      (n.ifZeroThenOne = function (e) {
        return e === 0 ? 1 : e;
      }),
      (t.exports = n));
  }),
  pe = t((e, t) => {
    var n = {},
      r = -1,
      i = -1;
    ((n.width = function () {
      return r;
    }),
      (n.height = function () {
        return i;
      }),
      (n.max = function () {
        return Math.max(r, i);
      }),
      (n.min = function () {
        return Math.min(r, i);
      }),
      (n.setDimensions = function () {
        typeof document < `u` &&
          ((r = document.documentElement.clientWidth),
          (i = document.documentElement.clientHeight));
      }),
      (n.onWindowResize = function () {
        n.setDimensions();
      }),
      typeof window < `u` &&
        (window.addEventListener(`resize`, n.onWindowResize, !1),
        window.addEventListener(`orientationchange`, n.onWindowResize, !1),
        n.setDimensions()),
      (t.exports = n));
  }),
  me = t((e, t) => {
    var n = fe(),
      r = pe(),
      i = { _default: `px` };
    ((i[``] = {
      px: function (e, t) {
        return parseFloat(getComputedStyle(t, ``).fontSize) * e;
      },
    }),
      (i[`%`] = {
        px: function (e, t, r) {
          return (e * n.getRelativeElementDimension(t, r)) / 100;
        },
      }),
      (i.ch = {
        px: function (e, t) {
          return e * n.ifZeroThenOne(n.getCreatedElementWidth(t, null, `0`));
        },
      }),
      (i.cm = {
        px: function (e) {
          return (e / 2.54) * n.ifZeroThenOne(n.DPI);
        },
      }),
      (i.em = {
        px: function (e, t) {
          return e * n.getElementFontSize(t);
        },
      }),
      (i.ex = {
        px: function (e, t) {
          return e * n.getCreatedElementHeight(t, null, `x`);
        },
      }),
      (i.in = {
        px: function (e) {
          return e * n.DPI;
        },
      }),
      (i.mm = {
        px: function (e) {
          return ((e / 2.54) * n.ifZeroThenOne(n.DPI)) / 10;
        },
      }),
      (i.pc = {
        px: function (e) {
          return e * ((n.DPI / 72) * 12);
        },
      }),
      (i.pt = {
        px: function (e) {
          return (e * n.DPI) / 72;
        },
      }),
      (i.px = {
        '': function (e, t) {
          return e / parseFloat(getComputedStyle(t, ``).fontSize);
        },
        '%': function (e, t, r) {
          return (
            (e / n.ifZeroThenOne(n.getRelativeElementDimension(t, r))) * 100
          );
        },
        ch: function (e, t) {
          return e / n.ifZeroThenOne(n.getCreatedElementWidth(t, null, `0`));
        },
        cm: function (e) {
          return (e / n.ifZeroThenOne(n.DPI)) * 2.54;
        },
        em: function (e, t) {
          return e / n.ifZeroThenOne(n.getElementFontSize(t));
        },
        ex: function (e, t) {
          return e / n.ifZeroThenOne(n.getCreatedElementHeight(t, null, `x`));
        },
        in: function (e) {
          return e / n.ifZeroThenOne(n.DPI);
        },
        mm: function (e) {
          return ((2.54 * e) / n.ifZeroThenOne(n.DPI)) * 10;
        },
        pc: function (e) {
          return e / ((n.DPI / 72) * 12);
        },
        pt: function (e) {
          return (72 * e) / n.DPI;
        },
        rem: function (e) {
          return (
            e / n.ifZeroThenOne(n.getElementFontSize(document.documentElement))
          );
        },
        vh: function (e) {
          return e / n.ifZeroThenOne(r.height() / 100);
        },
        vmax: function (e) {
          return e / n.ifZeroThenOne(r.max() / 100);
        },
        vmin: function (e) {
          return e / n.ifZeroThenOne(r.min() / 100);
        },
        vw: function (e) {
          return e / n.ifZeroThenOne(r.width() / 100);
        },
      }),
      (i.rem = {
        px: function (e) {
          return e * n.getElementFontSize(document.documentElement);
        },
      }),
      (i.vh = {
        px: function (e) {
          return e * (r.height() / 100);
        },
      }),
      (i.vmax = {
        px: function (e) {
          return e * (r.max() / 100);
        },
      }),
      (i.vmin = {
        px: function (e) {
          return e * (r.min() / 100);
        },
      }),
      (i.vw = {
        px: function (e) {
          return e * (r.width() / 100);
        },
      }),
      (t.exports = i));
  }),
  he = t((e, t) => {
    var n = fe(),
      r = { _default: `dpi` };
    ((r.dpi = {
      dpcm: function (e) {
        return e / 2.54;
      },
      dppx: function (e) {
        return e / n.DPI;
      },
    }),
      (r.dpcm = {
        dpi: function (e) {
          return 2.54 * e;
        },
      }),
      (r.dppx = {
        dpi: function (e) {
          return e * n.DPI;
        },
      }),
      (t.exports = r));
  }),
  ge = t((e, t) => {
    t.exports = { angle: de(), length: me(), resolution: he() };
  }),
  _e = t((e, t) => {
    var n = function (e) {
      return (
        (e = typeof e == `string` ? e.replace(/,/g, ``) : e),
        !isNaN(parseFloat(e)) &&
          isFinite(e) &&
          Object.prototype.toString.call(e).toLowerCase() !== `[object array]`
      );
    };
    e !== void 0 &&
      (t !== void 0 && t.exports && (e = t.exports = n), (e.isNumeric = n));
  }),
  ve = t((e, t) => {
    var n = ge(),
      r = _e(),
      i = {};
    i.conversions = n;
    var a = (i.properties = {});
    ((a.lineHeight =
      a.opacity =
      a.scale =
      a.scale3d =
      a.scaleX =
      a.scaleY =
      a.scaleZ =
        { defaultUnit: ``, defaultValue: 1 }),
      (a.rotate =
        a.rotate3d =
        a.rotateX =
        a.rotateY =
        a.rotateZ =
        a.skew =
        a.skewX =
        a.skewY =
          { defaultUnit: `deg` }),
      (a.resolution = { defaultUnit: `dpi`, defaultValue: 96 }),
      (i.convert = function (e, t, n, r) {
        var a = i.parse(t, r);
        return (
          e === `_default` && (e = i.getDefaultUnit(r)),
          e === a.unit ? a.value : i.processConversion(a.unit, e, a.value, n, r)
        );
      }),
      (i.parse = function (e, t) {
        var n,
          a = {};
        return (
          r(e)
            ? ((a.value = e), (a.unit = t ? i.getDefaultUnit(t) : ``))
            : (n = e
                  .toString()
                  .trim()
                  .match(/^(-?[\d+\.\-]+)([a-z]+|%)$/i)) === null
              ? ((a.unit = e), (a.value = t ? i.getDefaultValue(t) : 0))
              : ((a.value = n[1]), (a.unit = n[2])),
          (a.value = parseFloat(a.value)),
          a
        );
      }),
      (i.getDefaultValue = function (e) {
        return a[e] !== void 0 && a[e].defaultValue !== void 0
          ? a[e].defaultValue
          : 0;
      }),
      (i.getDefaultUnit = function (e) {
        return a[e] !== void 0 && a[e].defaultUnit !== void 0
          ? a[e].defaultUnit
          : `px`;
      }),
      (i.processConversion = function (e, t, n, r, a) {
        var o,
          s = i.getConversionType(e);
        return (
          typeof s[e][t] == `function`
            ? (o = s[e][t])
            : ((o = s[s._default][t]), (n = s[e][s._default](n, r, a))),
          o(n, r, a)
        );
      }),
      (i.getConversionType = function (e) {
        var t,
          r = null;
        for (t in n)
          if (n.hasOwnProperty(t) && n[t][e] !== void 0) {
            r = n[t];
            break;
          }
        return r;
      }),
      (t.exports = i));
  }),
  ye = e(
    t((e, t) => {
      t.exports = ve();
    })(),
    1
  ),
  be = [`%`, `ch`, `em`, `ex`],
  xe = [`s`, `ms`],
  Se = `px`,
  Ce = (e) => {
    let { value: t, unit: n } = ye.parse(e?.values || ``);
    return t < 0
      ? Number(e?.values)
      : n === Se
        ? t
        : xe.some((e) => e === n)
          ? n === `s`
            ? 1e3 * t
            : t
          : document.body && e?.values
            ? be.some((e) => e === n)
              ? ye.convert(Se, e.values, document.body)
              : ye.convert(Se, t, document.body)
            : 0;
  };
(a(), D());
var W = e(j(), 1),
  G = `kicl--components--animation`,
  we = `fade`,
  Te = ({
    animationDelay: e = 0,
    animationDuration: t = `slowest`,
    animationEasing: n = `ease-quint-in-out`,
    animationKey: r,
    animationStyle: i = we,
    appear: a = !0,
    children: s,
    className: l,
    in: u = !0,
    mountOnEnter: d = !0,
    nodeRef: p,
    onEnter: m,
    onEntered: h,
    onEntering: g,
    onExit: _,
    onExited: v,
    onExiting: y,
    unmountOnExit: x = !0,
    ...S
  }) => {
    let C = o(null),
      D = p ?? C,
      O = `${G}--${c(() => ue(), [])}`,
      A = `${G}--duration--${t}`,
      j = `${G}--style--${i}`,
      M = k.createPortal(
        w(`style`, {
          'data-component-animation-uuid': O,
          children: `\n        .${O} {\n          --${G}--transition-delay: ${e}ms;\n          --${G}--transition-duration: var(--kicl-transition-duration-${t});\n          --${G}--transition-timing-function: var(--kicl-${n});\n        }\n      `,
        }),
        window.document.body
      ),
      N = b.Children.only(s),
      P = b.isValidElement(N) ? N.props.ref : void 0;
    return T(E, {
      children: [
        M,
        f(
          ce,
          {
            ...S,
            addEndListener:
              ((F = D),
              (e) => {
                F.current || e();
                let t = window.getComputedStyle(F.current);
                Ce({ values: t.transitionDuration }) +
                Ce({ values: t.transitionDelay })
                  ? F.current?.addEventListener(`transitionend`, e)
                  : e();
              }),
            appear: a,
            classNames: `${G}-`,
            in: u,
            key: r,
            mountOnEnter: d,
            nodeRef: D,
            onEnter: (e) => {
              (D.current?.classList.add(G, A, j, O), m?.(e));
            },
            onEntered: (e) => {
              (D.current?.classList.remove(
                G,
                `${G}--appear-active`,
                `${G}--appear-done`,
                `${G}--enter-active`,
                `${G}--enter-done`,
                A,
                j,
                O
              ),
                h?.(e));
            },
            onEntering: g,
            onExit: () => {
              (D.current?.classList.add(G, A, j, O), _?.());
            },
            onExited: () => {
              v?.();
            },
            onExiting: y,
            unmountOnExit: x,
          },
          b.isValidElement(N)
            ? b.cloneElement(N, {
                ...S,
                className: (0, W.default)(N.props.className, l),
                ref: (e) => {
                  var t, n;
                  ((D.current = e),
                    (n = e),
                    typeof (t = P) == `function`
                      ? t(n)
                      : t && `current` in t && (t.current = n));
                },
              })
            : N
        ),
      ],
    });
    var F;
  };
(a(), a());
var Ee = `kicl--components--badge`,
  De = b.forwardRef(
    (
      {
        children: e,
        className: t,
        is: n = `span`,
        size: r,
        variant: i = `default`,
        ...a
      },
      o
    ) =>
      w(n, {
        ...a,
        className: (0, W.default)(
          Ee,
          `${Ee}--variant--${i}`,
          r && `${Ee}--size--${r}`,
          `kicl-font-weight`,
          `kicl-line-height-narrow`,
          t
        ),
        'data-is': n,
        ref: o,
        children: e,
      })
  );
((De.displayName = `Badge`), a());
var Oe = `kicl--components--button`,
  ke = ({
    bold: e,
    className: t = ``,
    disabled: n,
    level: r,
    size: i,
    unstyled: a,
    variant: o = `primary`,
  } = {}) =>
    (0, W.default)(
      Oe,
      {
        [`${Oe}--bold`]: !a && e,
        [`${Oe}--disabled`]: n,
        [`${Oe}--size--${i}`]: !a && i,
        [`${Oe}--level--${r}`]: !a && r,
        [`${Oe}--variant--${o}`]: !a && o,
        [`${Oe}--unstyled`]: a,
      },
      t
    ),
  Ae = b.forwardRef(
    (
      {
        bold: e,
        children: t,
        className: n = ``,
        disabled: r,
        level: i,
        lookLikeHyperLink: a = !1,
        onClick: o,
        size: s,
        type: c = `button`,
        unstyled: l,
        variant: u = `primary`,
        alignContent: d = `center`,
        alignItems: f = `center`,
        autoFlow: p = `column`,
        gap: m = `narrow`,
        justifyContent: h = `start`,
        justifyItems: g = `start`,
        ..._
      },
      v
    ) => {
      let y = (0, W.default)({
        [ke({
          bold: e,
          className: n,
          disabled: r,
          size: s,
          level: i,
          variant: u,
          unstyled: l,
        })]: !a,
        [Uo()]: a && !l,
        [`${Oe}--look-like-hyperlink`]: a && !l,
      });
      return w($, {
        alignContent: d,
        alignItems: f,
        autoFlow: p,
        gap: m,
        justifyContent: h,
        justifyItems: g,
        children: w(`button`, {
          ..._,
          className: y,
          disabled: r,
          onClick: o,
          ref: v,
          tabIndex: r ? -1 : void 0,
          type: c,
          children: t,
        }),
      });
    }
  );
((Ae.displayName = `Button`), a());
var je = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Me = b.createContext && b.createContext(je);
a();
var Ne = [`attr`, `size`, `title`];
function Pe() {
  return (
    (Pe = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Pe.apply(null, arguments)
  );
}
function Fe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Fe(Object(n), !0).forEach(function (t) {
          Le(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Fe(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Le(e, t, n) {
  return (
    (t = (function (e) {
      var t = (function (e, t) {
        if (typeof e != `object` || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (n !== void 0) {
          var r = n.call(e, t || `default`);
          if (typeof r != `object`) return r;
          throw TypeError(`@@toPrimitive must return a primitive value.`);
        }
        return (t === `string` ? String : Number)(e);
      })(e, `string`);
      return typeof t == `symbol` ? t : t + ``;
    })(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Re(e) {
  return (
    e &&
    e.map((e, t) => b.createElement(e.tag, Ie({ key: t }, e.attr), Re(e.child)))
  );
}
function ze(e) {
  return (t) =>
    b.createElement(Be, Pe({ attr: Ie({}, e.attr) }, t), Re(e.child));
}
function Be(e) {
  var t = (t) => {
    var n,
      r = e.attr,
      i = e.size,
      a = e.title,
      o = (function (e, t) {
        if (e == null) return {};
        var n,
          r,
          i = (function (e, t) {
            if (e == null) return {};
            var n = {};
            for (var r in e)
              if ({}.hasOwnProperty.call(e, r)) {
                if (t.indexOf(r) !== -1) continue;
                n[r] = e[r];
              }
            return n;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (r = 0; r < a.length; r++)
            ((n = a[r]),
              t.indexOf(n) === -1 &&
                {}.propertyIsEnumerable.call(e, n) &&
                (i[n] = e[n]));
        }
        return i;
      })(e, Ne),
      s = i || t.size || `1em`;
    return (
      t.className && (n = t.className),
      e.className && (n = (n ? n + ` ` : ``) + e.className),
      b.createElement(
        `svg`,
        Pe(
          { stroke: `currentColor`, fill: `currentColor`, strokeWidth: `0` },
          t.attr,
          r,
          o,
          {
            className: n,
            style: Ie(Ie({ color: e.color || t.color }, t.style), e.style),
            height: s,
            width: s,
            xmlns: `http://www.w3.org/2000/svg`,
          }
        ),
        a && b.createElement(`title`, null, a),
        e.children
      )
    );
  };
  return Me === void 0
    ? t(je)
    : b.createElement(Me.Consumer, null, (e) => t(e));
}
function Ve(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      { tag: `path`, attr: { d: `M13 10H20L11 23V14H4L13 1V10Z` }, child: [] },
    ],
  })(e);
}
function He(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [{ tag: `path`, attr: { d: `M5 11V13H19V11H5Z` }, child: [] }],
  })(e);
}
function Ue(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: { d: `M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z` },
        child: [],
      },
    ],
  })(e);
}
function We(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M3.05469 13H5.07065C5.55588 16.3923 8.47329 19 11.9998 19C15.5262 19 18.4436 16.3923 18.9289 13H20.9448C20.4474 17.5 16.6323 21 11.9998 21C7.36721 21 3.55213 17.5 3.05469 13ZM3.05469 11C3.55213 6.50005 7.36721 3 11.9998 3C16.6323 3 20.4474 6.50005 20.9448 11H18.9289C18.4436 7.60771 15.5262 5 11.9998 5C8.47329 5 5.55588 7.60771 5.07065 11H3.05469Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Ge(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Ke(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function qe(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M11.2703 12.2162L15 6L23 21H2L9 8L11.2703 12.2162ZM12.3897 14.2378L14.9873 19H19.6667L14.8976 10.058L12.3897 14.2378ZM5.34843 19H12.6516L9 12.2185L5.34843 19ZM5.5 8C4.11929 8 3 6.88071 3 5.5C3 4.11929 4.11929 3 5.5 3C6.88071 3 8 4.11929 8 5.5C8 6.88071 6.88071 8 5.5 8Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Je(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M12.001 9.55005C12.9181 8.61327 14.1121 8 15.501 8C18.5385 8 21.001 10.4624 21.001 13.5V21H19.001V13.5C19.001 11.567 17.434 10 15.501 10C13.568 10 12.001 11.567 12.001 13.5V21H10.001V8.5H12.001V9.55005ZM5.00098 6.5C4.17255 6.5 3.50098 5.82843 3.50098 5C3.50098 4.17157 4.17255 3.5 5.00098 3.5C5.8294 3.5 6.50098 4.17157 6.50098 5C6.50098 5.82843 5.8294 6.5 5.00098 6.5ZM4.00098 8.5H6.00098V21H4.00098V8.5Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Ye(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Xe(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Ze(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function Qe(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function $e(e) {
  return ze({
    tag: `svg`,
    attr: { viewBox: `0 0 24 24`, fill: `currentColor` },
    child: [
      {
        tag: `path`,
        attr: {
          d: `M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z`,
        },
        child: [],
      },
    ],
  })(e);
}
function et() {
  return (
    (et = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    et.apply(null, arguments)
  );
}
function tt(e, t) {
  return (
    (tt = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    tt(e, t)
  );
}
var nt = t((e) => {
    var t =
        /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,
      n = /\\([\u000b\u0020-\u00ff])/g,
      r = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
    function i(e) {
      ((this.parameters = Object.create(null)), (this.type = e));
    }
    e.parse = function (e) {
      if (!e) throw TypeError(`argument string is required`);
      var a =
        typeof e == `object`
          ? (function (e) {
              var t;
              if (
                (typeof e.getHeader == `function`
                  ? (t = e.getHeader(`content-type`))
                  : typeof e.headers == `object` &&
                    (t = e.headers && e.headers[`content-type`]),
                typeof t != `string`)
              )
                throw TypeError(`content-type header is missing from object`);
              return t;
            })(e)
          : e;
      if (typeof a != `string`)
        throw TypeError(`argument string is required to be a string`);
      var o = a.indexOf(`;`),
        s = o === -1 ? a.trim() : a.slice(0, o).trim();
      if (!r.test(s)) throw TypeError(`invalid media type`);
      var c = new i(s.toLowerCase());
      if (o !== -1) {
        var l, u, d;
        for (t.lastIndex = o; (u = t.exec(a));) {
          if (u.index !== o) throw TypeError(`invalid parameter format`);
          ((o += u[0].length),
            (l = u[1].toLowerCase()),
            (d = u[2]).charCodeAt(0) === 34 &&
              (d = d.slice(1, -1)).indexOf(`\\`) !== -1 &&
              (d = d.replace(n, `$1`)),
            (c.parameters[l] = d));
        }
        if (o !== a.length) throw TypeError(`invalid parameter format`);
      }
      return c;
    };
  })(),
  rt = new Map(),
  it = function (e) {
    return e.cloneNode(!0);
  },
  at = function () {
    return window.location.protocol === `file:`;
  },
  ot = function (e, t, n) {
    var r = new XMLHttpRequest();
    ((r.onreadystatechange = function () {
      try {
        if (!/\.svg/i.test(e) && r.readyState === 2) {
          var t = r.getResponseHeader(`Content-Type`);
          if (!t) throw Error(`Content type not found`);
          var i = (0, nt.parse)(t).type;
          if (i !== `image/svg+xml` && i !== `text/plain`)
            throw Error(`Invalid content type: ${i}`);
        }
        if (r.readyState === 4) {
          if (r.status === 404 || r.responseXML === null)
            throw Error(
              at()
                ? `Note: SVG injection ajax calls do not work locally without adjusting security settings in your browser. Or consider using a local webserver.`
                : `Unable to load SVG file: ` + e
            );
          if (!(r.status === 200 || (at() && r.status === 0)))
            throw Error(
              `There was a problem injecting the SVG: ` +
                r.status +
                ` ` +
                r.statusText
            );
          n(null, r);
        }
      } catch (e) {
        if ((r.abort(), !(e instanceof Error))) throw e;
        n(e, r);
      }
    }),
      r.open(`GET`, e),
      (r.withCredentials = t),
      r.overrideMimeType && r.overrideMimeType(`image/svg+xml`),
      r.send());
  },
  st = {},
  ct = function (e, t) {
    (st[e] ?? (st[e] = []), st[e].push(t));
  },
  lt = function (e, t, n) {
    if (rt.has(e)) {
      var r = rt.get(e);
      if (r === void 0) return void ct(e, n);
      if (r instanceof SVGSVGElement) return void n(null, it(r));
    }
    (rt.set(e, void 0),
      ct(e, n),
      ot(e, t, function (t, n) {
        (t
          ? rt.set(e, t)
          : n.responseXML?.documentElement instanceof SVGSVGElement &&
            rt.set(e, n.responseXML.documentElement),
          (function (e) {
            var t = st[e];
            if (t)
              for (
                var n = function (n, r) {
                    setTimeout(function () {
                      if (Array.isArray(st[e])) {
                        var r = rt.get(e),
                          i = t[n];
                        if (!i) return;
                        (r instanceof SVGSVGElement && i(null, it(r)),
                          r instanceof Error && i(r),
                          n === t.length - 1 && delete st[e]);
                      }
                    }, 0);
                  },
                  r = 0,
                  i = t.length;
                r < i;
                r++
              )
                n(r);
          })(e));
      }));
  },
  ut = function (e, t, n) {
    ot(e, t, function (e, t) {
      e
        ? n(e)
        : t.responseXML?.documentElement instanceof SVGSVGElement &&
          n(null, t.responseXML.documentElement);
    });
  },
  dt = `data:image/svg+xml`,
  ft = 0,
  pt = function () {
    return ++ft;
  },
  mt = [],
  ht = {},
  gt = `http://www.w3.org/1999/xlink`,
  _t = function (e, t, n, r, i, a, o) {
    var s = e.getAttribute(`data-src`) ?? e.getAttribute(`src`);
    if (s) {
      if (mt.indexOf(e) !== -1)
        return (mt.splice(mt.indexOf(e), 1), void (e = null));
      (mt.push(e), e.setAttribute(`src`, ``));
      var c = s.indexOf(`#`),
        l = c === -1 ? s : s.slice(0, c),
        u = c === -1 ? null : s.slice(c + 1),
        d = (function (e) {
          if (!e.startsWith(dt)) return null;
          var t,
            n = e.slice(18);
          if (n.startsWith(`;base64,`))
            try {
              t = atob(n.slice(8));
            } catch {
              return Error(`Invalid base64 in data URL`);
            }
          else if (n.startsWith(`,`))
            try {
              t = decodeURIComponent(n.slice(1));
            } catch {
              return Error(`Invalid encoding in data URL`);
            }
          else {
            if (!n.startsWith(`;charset=utf-8,`))
              return Error(`Unsupported data URL format`);
            try {
              t = decodeURIComponent(n.slice(15));
            } catch {
              return Error(`Invalid encoding in data URL`);
            }
          }
          var r = new DOMParser().parseFromString(t, `image/svg+xml`),
            i = r.querySelector(`parsererror`);
          return i
            ? Error(`Data URL SVG parse error: ` + i.textContent.trim())
            : r.documentElement instanceof SVGSVGElement
              ? r.documentElement
              : Error(`Data URL did not contain a valid SVG element`);
        })(l);
      if (d instanceof Error)
        return (mt.splice(mt.indexOf(e), 1), (e = null), void o(d));
      var f = function (r, i) {
        if (!i) return (mt.splice(mt.indexOf(e), 1), (e = null), void o(r));
        var c = i;
        if (u) {
          var d = (function (e, t) {
            var n = e.querySelector(`#` + CSS.escape(t));
            if (n?.tagName.toLowerCase() !== `symbol`) return null;
            for (
              var r = document.createElementNS(
                  `http://www.w3.org/2000/svg`,
                  `svg`
                ),
                i = n.attributes,
                a = 0,
                o = i.length;
              a < o;
              a++
            ) {
              var s = i[a];
              s.name !== `id` && r.setAttribute(s.name, s.value);
            }
            var c = n.childNodes;
            for (a = 0, o = c.length; a < o; a++)
              r.appendChild(c[a].cloneNode(!0));
            return r;
          })(i, u);
          if (!d)
            return (
              mt.splice(mt.indexOf(e), 1),
              (e = null),
              void o(Error(`Symbol "${u}" not found in ${l}`))
            );
          c = d;
        }
        var f = e.getAttribute(`id`);
        f && c.setAttribute(`id`, f);
        var p = e.getAttribute(`title`);
        p && c.setAttribute(`title`, p);
        var m = e.getAttribute(`width`);
        m && c.setAttribute(`width`, m);
        var h = e.getAttribute(`height`);
        h && c.setAttribute(`height`, h);
        var g = Array.from(
          new Set(
            A(
              A(
                A([], (c.getAttribute(`class`) ?? ``).split(` `), !0),
                [`injected-svg`],
                !1
              ),
              (e.getAttribute(`class`) ?? ``).split(` `),
              !0
            )
          )
        )
          .join(` `)
          .trim();
        c.setAttribute(`class`, g);
        var _ = e.getAttribute(`style`);
        (_ && c.setAttribute(`style`, _), c.setAttribute(`data-src`, s));
        var v = [].filter.call(e.attributes, function (e) {
          return /^data-\w[\w-]*$/.test(e.name);
        });
        if (
          (Array.prototype.forEach.call(v, function (e) {
            e.name && e.value && c.setAttribute(e.name, e.value);
          }),
          n)
        ) {
          var y,
            b,
            x,
            S,
            C,
            w = {
              clipPath: [`clip-path`],
              'color-profile': [`color-profile`],
              cursor: [`cursor`],
              filter: [`filter`],
              linearGradient: [`fill`, `stroke`],
              marker: [`marker`, `marker-start`, `marker-mid`, `marker-end`],
              mask: [`mask`],
              path: [],
              pattern: [`fill`, `stroke`],
              radialGradient: [`fill`, `stroke`],
            },
            T = function (e, t) {
              return e.replace(
                /url\((['"]?)\s*#([^\s'"\)]+)\s*\1\)/g,
                function (e, n, r) {
                  var i = t[r];
                  return i ? `url(#${i})` : e;
                }
              );
            },
            E = function (e, t) {
              if (!e.startsWith(`#`)) return e;
              var n = t[e.slice(1)];
              return n ? `#` + n : e;
            },
            D = [],
            O = {};
          (Object.keys(w).forEach(function (e) {
            y = e;
            for (
              var t = 0, n = (b = c.querySelectorAll(y + `[id]`)).length;
              t < n;
              t++
            ) {
              var r = b[t];
              ((S = r.id),
                (C = S + `-` + pt()),
                (O[S] = C),
                D.push({ element: r, currentId: S, newId: C }));
            }
          }),
            Object.keys(w).forEach(function (e) {
              var t;
              ((x = w[e]),
                Array.prototype.forEach.call(x, function (e) {
                  for (
                    var n = 0,
                      r = (t = c.querySelectorAll(`[` + e + `]`)).length;
                    n < r;
                    n++
                  ) {
                    var i = t[n],
                      a = i.getAttribute(e);
                    if (a) {
                      var o = T(a, O);
                      o !== a && i.setAttribute(e, o);
                    }
                  }
                }));
            }));
          for (
            var k = c.querySelectorAll(`*`), j = 0, M = k.length;
            j < M;
            j++
          ) {
            var N = k[j],
              P = N.getAttribute(`href`);
            if (P) {
              var F = E(P, O);
              F !== P && N.setAttribute(`href`, F);
            }
            var I = N.getAttributeNS(gt, `href`);
            if (I) {
              var ee = E(I, O);
              ee !== I && N.setAttributeNS(gt, `href`, ee);
            }
          }
          for (
            var te = c.querySelectorAll(`[style]`), ne = 0, re = te.length;
            ne < re;
            ne++
          ) {
            var ie = te[ne],
              L = ie.getAttribute(`style`);
            if (L) {
              var R = T(L, O);
              R !== L && ie.setAttribute(`style`, R);
            }
          }
          for (
            var z = c.querySelectorAll(`style`), ae = 0, B = z.length;
            ae < B;
            ae++
          ) {
            var V = z[ae],
              H = V.textContent;
            if (H) {
              var oe = T(H, O);
              oe !== H && (V.textContent = oe);
            }
          }
          for (var se = 0, ce = D.length; se < ce; se++)
            D[se].element.id = D[se].newId;
        }
        c.removeAttribute(`xmlns:a`);
        for (
          var U,
            le,
            ue = c.querySelectorAll(`script`),
            de = [],
            fe = 0,
            pe = ue.length;
          fe < pe;
          fe++
        ) {
          var me = ue[fe];
          ((le = me.getAttribute(`type`)) &&
            le !== `application/ecmascript` &&
            le !== `application/javascript` &&
            le !== `text/javascript`) ||
            ((U = me.innerText || me.textContent) && de.push(U),
            c.removeChild(me));
        }
        if (de.length > 0 && (t === `always` || (t === `once` && !ht[s]))) {
          for (var he = 0, ge = de.length; he < ge; he++)
            Function(de[he])(window);
          ht[s] = !0;
        }
        var _e = c.querySelectorAll(`style`);
        if (
          (Array.prototype.forEach.call(_e, function (e) {
            e.textContent += ``;
          }),
          c.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`),
          c.setAttribute(`xmlns:xlink`, gt),
          a(c),
          !e.parentNode)
        )
          return (
            mt.splice(mt.indexOf(e), 1),
            (e = null),
            void o(Error(`Parent node is null`))
          );
        (e.parentNode.replaceChild(c, e),
          mt.splice(mt.indexOf(e), 1),
          (e = null),
          o(null, c));
      };
      d
        ? setTimeout(function () {
            f(null, d);
          }, 0)
        : (r ? lt : ut)(l, i, f);
    } else o(Error(`Invalid data-src or src attribute`));
  },
  K = e(te());
a();
var vt = [
    `afterInjection`,
    `beforeInjection`,
    `desc`,
    `evalScripts`,
    `fallback`,
    `httpRequestWithCredentials`,
    `loading`,
    `renumerateIRIElements`,
    `src`,
    `title`,
    `useRequestCache`,
    `wrapper`,
  ],
  yt = `http://www.w3.org/2000/svg`,
  bt = `http://www.w3.org/1999/xlink`,
  xt = `react-svg-` + Math.random().toString(36).slice(2, 6),
  St = 0,
  Ct = (function (e) {
    function t() {
      for (var t, n = arguments.length, r = Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return (
        ((t = e.call.apply(e, [this].concat(r)) || this).initialState = {
          hasError: !1,
          isLoading: !0,
        }),
        (t.state = t.initialState),
        (t._isMounted = !1),
        (t.reactWrapper = void 0),
        (t.nonReactWrapper = void 0),
        (t.refCallback = function (e) {
          t.reactWrapper = e;
        }),
        t
      );
    }
    var n,
      r = e;
    (((n = t).prototype = Object.create(r.prototype)),
      (n.prototype.constructor = n),
      tt(n, r));
    var i = t.prototype;
    return (
      (i.renderSVG = function () {
        var e,
          t = this;
        if (
          this.reactWrapper instanceof
          ((e = this.reactWrapper),
          (e?.ownerDocument || document).defaultView || window).Node
        ) {
          var n,
            r,
            i = this.props,
            a = i.desc,
            o = i.evalScripts,
            s = i.httpRequestWithCredentials,
            c = i.renumerateIRIElements,
            l = i.src,
            u = i.title,
            d = i.useRequestCache,
            f = this.props.onError,
            p = this.props.beforeInjection,
            m = this.props.afterInjection,
            h = this.props.wrapper;
          (h === `svg`
            ? ((n = document.createElementNS(yt, h)).setAttribute(`xmlns`, yt),
              n.setAttribute(`xmlns:xlink`, bt),
              (r = document.createElementNS(yt, h)))
            : ((n = document.createElement(h)),
              (r = document.createElement(h))),
            n.appendChild(r),
            (r.dataset.src = l),
            (this.nonReactWrapper = this.reactWrapper.appendChild(n)));
          var g = function (e) {
            (t.removeSVG(),
              t._isMounted
                ? t.setState(
                    function () {
                      return { hasError: !0, isLoading: !1 };
                    },
                    function () {
                      f(e);
                    }
                  )
                : f(e));
          };
          (function (e, t) {
            var n = t === void 0 ? {} : t,
              r = n.afterAll,
              i = r === void 0 ? function () {} : r,
              a = n.afterEach,
              o = a === void 0 ? function () {} : a,
              s = n.beforeEach,
              c = s === void 0 ? function () {} : s,
              l = n.cacheRequests,
              u = l === void 0 || l,
              d = n.evalScripts,
              f = d === void 0 ? `never` : d,
              p = n.httpRequestWithCredentials,
              m = p !== void 0 && p,
              h = n.renumerateIRIElements,
              g = h === void 0 || h;
            if (e && `length` in e)
              for (var _ = 0, v = 0, y = e.length; v < y; v++) {
                var b = e[v];
                b &&
                  _t(b, f, g, u, m, c, function (t, n) {
                    (o(t, n), e && `length` in e && e.length === ++_ && i(_));
                  });
              }
            else
              e
                ? _t(e, f, g, u, m, c, function (t, n) {
                    (o(t, n), i(1), (e = null));
                  })
                : i(0);
          })(r, {
            afterEach: function (e, n) {
              e
                ? g(e)
                : t._isMounted &&
                  t.setState(
                    function () {
                      return { isLoading: !1 };
                    },
                    function () {
                      try {
                        m(n);
                      } catch (e) {
                        g(e);
                      }
                    }
                  );
            },
            beforeEach: function (e) {
              e.setAttribute(`role`, `img`);
              var t = [],
                n = [];
              if (u) {
                var r = e.querySelector(`:scope > title`);
                r && e.removeChild(r);
                var i = xt + `-title-` + ++St,
                  o = document.createElementNS(yt, `title`);
                ((o.id = i), (o.textContent = u), e.prepend(o), t.push(i));
              }
              if (a) {
                var s = e.querySelector(`:scope > desc`);
                s && e.removeChild(s);
                var c = xt + `-desc-` + ++St,
                  l = document.createElementNS(yt, `desc`);
                ((l.id = c), (l.textContent = a));
                var d = e.querySelector(`:scope > title`);
                (d ? d.after(l) : e.prepend(l), n.push(c));
              }
              (t.length > 0 && e.setAttribute(`aria-labelledby`, t.join(` `)),
                n.length > 0 &&
                  e.setAttribute(`aria-describedby`, n.join(` `)));
              try {
                p(e);
              } catch (e) {
                g(e);
              }
            },
            cacheRequests: d,
            evalScripts: o,
            httpRequestWithCredentials: s,
            renumerateIRIElements: c,
          });
        }
      }),
      (i.removeSVG = function () {
        var e;
        (e = this.nonReactWrapper) != null &&
          e.parentNode &&
          (this.nonReactWrapper.parentNode.removeChild(this.nonReactWrapper),
          (this.nonReactWrapper = null));
      }),
      (i.componentDidMount = function () {
        ((this._isMounted = !0), this.renderSVG());
      }),
      (i.componentDidUpdate = function (e) {
        var t = this;
        (function (e, t) {
          for (var n in e) if (!(n in t)) return !0;
          for (var r in t) if (e[r] !== t[r]) return !0;
          return !1;
        })(et({}, e), this.props) &&
          this.setState(
            function () {
              return t.initialState;
            },
            function () {
              (t.removeSVG(), t.renderSVG());
            }
          );
      }),
      (i.componentWillUnmount = function () {
        ((this._isMounted = !1), this.removeSVG());
      }),
      (i.render = function () {
        var e = this.props;
        (e.afterInjection, e.beforeInjection, e.desc, e.evalScripts);
        var t = e.fallback;
        e.httpRequestWithCredentials;
        var n = e.loading;
        (e.renumerateIRIElements, e.src, e.title, e.useRequestCache);
        var r = e.wrapper,
          i = (function (e, t) {
            if (e == null) return {};
            var n = {};
            for (var r in e)
              if ({}.hasOwnProperty.call(e, r)) {
                if (t.indexOf(r) !== -1) continue;
                n[r] = e[r];
              }
            return n;
          })(e, vt);
        return f(
          r,
          et(
            {},
            i,
            { ref: this.refCallback },
            r === `svg` ? { xmlns: yt, xmlnsXlink: bt } : {}
          ),
          this.state.isLoading && n && f(n, null),
          this.state.hasError && t && f(t, null)
        );
      }),
      t
    );
  })(x);
((Ct.defaultProps = {
  afterInjection: function () {},
  beforeInjection: function () {},
  desc: ``,
  evalScripts: `never`,
  fallback: null,
  httpRequestWithCredentials: !1,
  loading: null,
  onError: function () {},
  renumerateIRIElements: !0,
  title: ``,
  useRequestCache: !0,
  wrapper: `div`,
}),
  (Ct.propTypes = {
    afterInjection: K.func,
    beforeInjection: K.func,
    desc: K.string,
    evalScripts: K.oneOf([`always`, `once`, `never`]),
    fallback: K.oneOfType([K.func, K.object, K.string]),
    httpRequestWithCredentials: K.bool,
    loading: K.oneOfType([K.func, K.object, K.string]),
    onError: K.func,
    renumerateIRIElements: K.bool,
    src: K.string.isRequired,
    title: K.string,
    useRequestCache: K.bool,
    wrapper: K.oneOf([`div`, `span`, `svg`]),
  }));
var wt = {
    amazon: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M90.9,75.7c-2.4-3.3-5-6.1-5-12.3V42.8c0-8.8,0.6-16.8-5.8-22.8c-5.1-4.8-13.5-6.6-19.9-6.6c-12.6,0-26.6,4.7-29.6,20.2%20c-0.3,1.7,0.9,2.5,2,2.8l12.8,1.4c1.3-0.1,2.1-1.3,2.3-2.4c1.1-5.3,5.6-7.9,10.6-7.9c2.8,0,5.8,1,7.3,3.4c1.8,2.8,1.6,6.4,1.6,9.6%20v1.8c-7.7,0.8-17.7,1.4-24.8,4.6c-8.3,3.6-14.1,10.8-14.1,21.6c0,13.8,8.6,20.6,19.8,20.6c9.4,0,14.6-2.2,21.8-9.6%20c2.4,3.5,3.2,5.2,7.6,8.8c1,0.5,2.3,0.4,3.2-0.3c2.7-2.3,7.5-6.5,10.3-8.8C91.9,78.3,91.8,76.8,90.9,75.7z%20M64.8,69.7%20c-2.1,3.8-5.4,6-9.2,6c-5.1,0-8-3.8-8-9.6c0-11.3,10.1-13.3,19.7-13.3v2.9C67.3,60.8,67.4,65.1,64.8,69.7z'/%3e%3cpath%20d='M98.8,91.6c-12.3,5.2-25.6,7.8-37.8,7.8c-18,0-35.4-4.9-49.5-13.2c-1.3-0.8-2.2,0.6-1.1,1.5c13.1,11.8,30.3,18.8,49.5,18.8%20c13.7,0,29.5-4.3,40.5-12.4C102.2,92.8,100.7,90.8,98.8,91.6z'/%3e%3cpath%20d='M102.1,101.4c-0.4,1,0.5,1.4,1.3,0.7c5.8-4.9,7.4-15.3,6.2-16.7c-1.2-1.5-11.5-2.8-17.8,1.7c-1,0.7-0.8,1.6,0.3,1.5%20c3.5-0.4,11.4-1.3,12.8,0.4C106.4,90.8,103.4,98.1,102.1,101.4z'/%3e%3c/svg%3e`,
    canva: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M59.3,109.8c-8,0-15.1-2.2-21.3-6.3l0,0c-6.1-4.2-10.7-10.1-13.6-17.7c-1.7-4.2-2.7-9-3.2-14.4c-0.5-6.4-0.1-12.8,1.2-19%20c2.2-10,6.6-18.9,13.2-26.3l0,0c6.6-7.3,14.4-12.2,23.2-14.5c3.7-1,7.5-1.5,11.2-1.5c4.5,0,8.8,0.7,13,2.3%20c6.6,2.4,11.2,6.9,13.4,12.8c1.1,2.7,1.4,5.7,1.1,9.1l0,0c-0.4,4.6-1.9,8.6-4.4,12c-2.9,4-6.6,6.6-11,7.7c-0.9,0.2-1.8,0.4-3,0.4%20c-0.3,0-0.8,0-1.4-0.1c-2.1-0.2-3.8-1.2-5-2.8c-1.2-1.5-1.7-3.5-1.5-5.6v-0.1c0.2-1.9,1-3.4,1.6-4.4l0.2-0.2%20c0.9-1.9,1.7-3.5,2.2-5.1c0.7-2.7,0.7-4.5,0.1-6.1c-0.5-1.3-1.2-2-2.7-2.3l0,0c-0.7-0.2-1.4-0.2-2.1-0.2c-1.7,0-3.6,0.4-5.6,1.3%20c-4.3,2-7.9,5.2-11,10c-2.2,3.5-3.9,7.3-5.2,11.7c-0.9,3.1-1.5,6.5-1.9,10.3l0,0c-0.2,1.8-0.3,3.8-0.3,5.6c0.1,5.6,0.8,9.9,2.5,13.6%20l0,0c1.7,4,4,6.6,7.1,8.4c2,1.2,4.2,1.7,6.6,1.7c0.4,0,0.8,0,1.2,0c0.1,0,0.1,0,0.2,0c5.6-0.4,10.5-3,15-7.7c2.4-2.6,4.5-5.5,6.2-9%20c0-0.1,0.1-0.1,0.1-0.2l0.1-0.2c0.3-0.6,0.8-1.5,1.6-2.2c1.3-1.4,3.1-2.2,5-2.2c2.3,0,4.5,1.2,5.8,3.3c0,0,0,0,0,0.1%20c1,1.7,1.4,3.7,1.1,6c-0.4,2.9-1.4,5.7-3.2,9.2v0.1C91,96,84.3,102.4,75.9,106.5c-4.4,2.1-9.1,3.2-13.9,3.5%20C60.7,109.8,59.9,109.8,59.3,109.8z%20M42,97.3c5,3.3,10.7,5,17.1,5c0.6,0,1.1,0,1.6-0.1c0.1,0,0.1,0,0.2,0c3.8-0.2,7.6-1.1,11-2.7%20c7-3.3,12.5-8.7,16.6-16c1.2-2.2,1.8-3.9,2.2-5.6c-1.9,3.7-4.2,6.7-6.8,9.6c-5.9,6.1-12.4,9.5-19.8,10c-0.7,0.1-1.4,0.1-2,0.1%20c-3.7,0-7.1-0.9-10.3-2.7c-4.5-2.5-7.9-6.4-10.2-11.9c-2.1-4.7-3.1-9.9-3.2-16.5l0,0c0-2.1,0.1-4.3,0.3-6.4%20c0.4-4.3,1.1-8.1,2.2-11.6c1.5-5.1,3.5-9.7,6.1-13.8c4-6.1,8.6-10.2,14.2-12.8l0,0c3-1.3,5.9-2,8.6-2c1.3,0,2.6,0.2,3.9,0.5%20c3.8,0.9,6.6,3.3,7.9,7l0,0c1.2,3.1,1.2,6.3,0.2,10.5l0,0c-0.6,2.4-1.7,4.6-2.7,6.6L79,44.8c0,0.1-0.1,0.1-0.1,0.2%20c-0.4,0.7-0.7,1.2-0.7,1.8v0.1h0.1c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0,0.2,0c0.6,0,0.8-0.1,1-0.1c0.1,0,0.1,0,0.2-0.1%20c2.7-0.7,4.9-2.2,6.8-4.8c1.7-2.3,2.7-5.1,3.1-8.4c0.2-2.2,0-4.1-0.7-5.8c0,0,0,0,0-0.1c-1.4-3.9-4.3-6.6-9-8.4%20c-3.2-1.2-6.6-1.7-10.2-1.7c-3.1,0-6.2,0.4-9.3,1.2l0,0c-7.4,1.9-14,6.1-19.5,12.3c-5.8,6.4-9.6,14.1-11.5,22.8l0,0%20c-1.2,5.5-1.6,11.1-1.1,16.8c0.4,4.7,1.3,8.7,2.7,12.3C33.6,89.2,37.2,94,42,97.3z'/%3e%3c/svg%3e`,
    consensys: `/assets/consensys-BFJKKFgg.svg`,
    databricks: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M14,69.1L60,95l41.3-23.2v9.2L60,104.4L16.3,79.6L14,80.8V84l46,26l46-25.9v-18l-2.2-1.2L60,89.7L18.9,66.1v-9.2L60,80%20l46-25.9V36.3l-2.2-1.2L60,59.9L21,37.8l39-22.1l32.3,18.2l2.8-1.8v-2.3L60,10L14,36.2v3L60,65l41.3-23.2v9.4L60,74.7L16.3,49.8%20L14,51.1V69.1z'/%3e%3c/svg%3e`,
    epicGames: `/assets/epic-games-uhxRvQW8.svg`,
    flipboard: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M90,50H70v20H50v20H30V30h60V50z%20M10,10v100h100V10H10z'/%3e%3c/svg%3e`,
    google: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cg%20id='Page-1'%3e%3cg%20id='Dribbble-Light-Preview'%20transform='translate(-300.000000,%20-7399.000000)'%3e%3cg%20id='icons'%20transform='translate(56.000000,%20160.000000)'%3e%3cpath%20id='google-_x5B__x23_178_x5D_'%20d='M353.1,7289H305c0,5,0,15,0,20h27.9c-1.1,5-4.8,12-10.2,15.5l0,0%20c-7.1,4.7-16.5,5.8-23.4,4.3c-10.9-2.2-19.6-10.1-23.1-20.2c0,0,0-0.2,0.1-0.2c-2.2-6.3-2.2-14.6,0-19.6l0,0%20c2.8-9.2,11.8-17.6,22.7-19.9c8.8-1.8,18.8,0.2,26,7c1-0.9,13.4-13.1,14.3-14.1c-24.9-22.6-64.9-14.7-79.8,14.5l0,0%20c0,0,0,0,0,0.1l0,0c-7.4,14.3-7.1,31.2,0.1,44.9c0,0,0,0-0.1,0c6.5,12.6,18.3,22.2,32.4,25.9c15.1,3.9,34.3,1.3,47.1-10.3l0,0%20C349.8,7327.2,356.6,7310.5,353.1,7289'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,
    ibm: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M10,77.2h19.4V80H10V77.2z%20M10,71.9h19.4v2.8H10V71.9z%20M15.5,66.6h8.3v2.8h-8.3V66.6z%20M15.5,61.2h8.3v2.8h-8.3V61.2z%20M15.5,55.9h8.3v2.8h-8.3V55.9z%20M15.5,50.6h8.3v2.8h-8.3V50.6z%20M10,45.2h19.4v2.8H10V45.2z%20M10,39.9h19.4v2.8H10V39.9z%20M32.2,74.7%20h29.9c0.5-0.8,0.9-1.8,1.1-2.8h-31V74.7z%20M59.8,61.2h-22v2.8h24.3C61.5,63,60.8,62.1,59.8,61.2L59.8,61.2z%20M37.8,55.9v2.8h22%20c0.9-0.8,1.8-1.8,2.3-2.8H37.8z%20M62.1,45.2H32.2v2.8h31C63,47.1,62.6,46.2,62.1,45.2L62.1,45.2z%20M52.9,39.9H32.2v2.8h27.8%20C58.2,40.9,55.6,39.9,52.9,39.9z%20M37.8,50.6h8.3v2.8h-8.3V50.6z%20M54.4,53.4h8.8c0.2-0.9,0.4-1.8,0.4-2.8h-9.2V53.4z%20M37.8,66.6h8.3%20v2.8h-8.3V66.6z%20M54.4,66.6v2.8h9.1c0-1-0.2-1.9-0.4-2.8H54.4z%20M32.2,80h20.7c2.7,0,5.2-1.1,7.2-2.8H32.2V80z%20M65.6,77.2h13.8V80%20H65.6V77.2z%20M65.6,71.9h13.8v2.8H65.6V71.9z%20M71.1,66.6h8.3v2.8h-8.3V66.6z%20M71.1,61.2h8.3v2.8h-8.3V61.2z%20M83.3,45.2H65.6v2.8h18.7%20L83.3,45.2z%20M81.5,39.9H65.6v2.8h16.8L81.5,39.9z%20M96.1,77.2H110V80H96.1V77.2z%20M96.1,71.9H110v2.8H96.1V71.9z%20M96.1,66.6h8.3v2.8%20h-8.3V66.6z%20M96.1,61.2h8.3v2.8h-8.3V61.2z%20M96.1,58.7h8.3v-2.8H88.6l-0.8,2.2L87,55.9H71.1v2.8h8.3v-2.6l0.9,2.6h14.9l0.9-2.6%20L96.1,58.7L96.1,58.7z%20M104.4,50.6h-14l-1,2.8h15V50.6z%20M94.1,39.9l-1,2.8H110v-2.8H94.1z%20M87.8,80l1-2.8h-1.9L87.8,80z%20M85.9,74.7%20h3.7l1-2.8h-5.7L85.9,74.7z%20M84.1,69.4h7.4l1-2.8h-9.4L84.1,69.4z%20M82.2,64.1h11.2l0.9-2.8h-13L82.2,64.1z%20M71.1,53.4h15l-1-2.8h-14%20V53.4z%20M91.3,48.1H110v-2.8H92.2L91.3,48.1z'/%3e%3c/svg%3e`,
    meta: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Camada_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cg%3e%3cpath%20d='M43.2,43.6c-7.5,0-13.9,12.8-13.9,25.8c0,6.1,2.2,9.3,6.1,9.7c3.9,0,6.1-2.5,12.8-12.8c0,0,2.8-5,7.8-12.5%20C50.7,46.1,47.1,43.6,43.2,43.6z'/%3e%3cpath%20d='M76.8,41.7c-4.3,0-7.5,3.3-11.8,9.7c1.1,1.8,2.5,3.6,3.6,5.8l4.7,7.5c7.2,11.4,8.9,13.9,13.3,14.3c3.9,0,5.8-3.6,5.8-9.3%20C92.2,54.2,85.3,41.7,76.8,41.7z'/%3e%3cpath%20d='M95.8,10H24.2C16.4,10,10,16.4,10,24.2v71.5c0,7.8,6.4,14.3,14.3,14.3h71.5c7.8,0,14.3-6.4,14.3-14.3V24.2%20C110,16.4,103.6,10,95.8,10z%20M85.8,86.8c-7.5,0-11.8-4.3-19.3-16.8l-4-6.4c-0.8-1.4-1.8-2.8-2.5-4.3c-2.2,4.3-5.8,10.3-5.8,10.3%20C46,84.3,41.4,87.2,35,87.2c-8.9,0-14.3-6.8-14.3-17.8c0-17.5,9.7-34.3,22.5-34.3c6.4,0,11.4,3.3,17.8,11.1%20C65.7,40,70.8,35,77.2,34.6c12.2,0,22.2,15.3,22.2,33.9C99.3,79.7,94.3,86.8,85.8,86.8z'/%3e%3c/g%3e%3c/svg%3e`,
    salesforce: `/assets/salesforce-BNwFzohI.svg`,
    shopify: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M73.9,109.9l30.1-6.5c0,0-10.8-73.4-10.9-73.8c-0.1-0.4-0.4-0.8-0.9-0.8c-0.4,0-8-0.6-8-0.6s-5.3-5.3-6-5.9%20c-0.2-0.2-0.3-0.3-0.5-0.3l0,0L73.9,109.9L73.9,109.9L73.9,109.9z%20M58.8,57.1c-2.2-1.1-4.7-1.7-7.3-1.7l0,0c-6,0-6.2,3.8-6.2,4.8%20c0,5.2,13.5,7.2,13.5,19.2c0,9.6-6,15.7-14.2,15.7c-0.2,0-0.3,0-0.6,0c-5.6,0-10.7-2.3-14.2-6.1l0,0l2.7-8.7%20c2.6,2.2,5.8,3.8,9.4,4.4h0.1c0,0,0.1,0,0.2,0c2.2,0,3.9-1.8,3.9-3.9l0,0c0-6.8-11.1-7.1-11.1-18.2c-0.2-9.3,6.5-18.3,20.1-18.3%20c0.2,0,0.6,0,0.8,0c2.5,0,4.9,0.6,7.1,1.6l-0.1-0.1l-3.9,11.3H58.8L58.8,57.1z%20M56.5,13.5c0.7,0,1.2,0.2,1.7,0.6l0,0%20c-4,1.9-8.5,6.8-10.4,16.6c-2.8,0.9-5.4,1.7-7.8,2.4C42.1,25.7,47.3,13.5,56.5,13.5L56.5,13.5z%20M61.7,25.8v0.6c-3.2,1-6.6,2-10,3.1%20c0.9-5.3,4.2-9.8,8.7-12.3l0.1-0.1c0.8,2.3,1.3,5.1,1.3,7.9C61.8,25.2,61.8,25.5,61.7,25.8L61.7,25.8L61.7,25.8z%20M63.9,16.4%20c2.9,0.3,4.8,3.6,5.9,7.3c-1.4,0.5-3.1,1-4.8,1.5v-1.1c0-0.2,0-0.3,0-0.6c0-2.6-0.4-5.1-1.2-7.4L63.9,16.4L63.9,16.4z%20M76.4,21.8%20c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-1.2,0.3-3,0.9c-1.8-5.2-4.9-9.9-10.4-9.9h-0.5C61,11.2,59.1,10.2,57,10l0,0%20c-13,0-19.2,16.2-21.2,24.3c-5,1.5-8.6,2.7-9,2.8c-2.8,0.9-2.9,1-3.2,3.6C23.2,42.7,16,99.3,16,99.3L72.5,110L76.4,21.8L76.4,21.8z'%20/%3e%3c/svg%3e`,
    snapchat: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M88.8,73.8c-8-1.3-11.6-9.5-11.8-9.9c-0.4-0.9-0.5-1.6-0.3-2.1c0.4-1,2.1-1.6,3.2-1.9c0.3-0.1,0.6-0.2,0.9-0.3%20c1.1-0.4,1.9-0.9,2.4-1.4c0.5-0.4,0.7-1,0.7-1.6c0-1-0.8-1.8-1.9-2.2c-0.4-0.2-0.9-0.3-1.3-0.3s-0.8,0.1-1.2,0.3%20C78.7,54.7,77.9,55,77,55c-0.3,0-0.6-0.1-0.8-0.2l0.1-1.2v-0.2c0.3-4.1,0.6-9.1-0.8-12.1c-0.9-2-2.1-3.8-3.7-5.3%20c-1.3-1.2-2.8-2.2-4.4-2.9c-2.2-0.9-4.5-1.4-6.9-1.4h-1.2c-1.3,0-4,0.2-6.9,1.4c-1.6,0.7-3.1,1.7-4.4,2.9c-1.6,1.5-2.8,3.3-3.7,5.2%20c-1.3,3-1,8-0.8,12.1l0.1,1.3c-0.3,0.1-0.6,0.2-1,0.2c-0.8,0-1.7-0.2-2.7-0.7c-0.3-0.1-0.7-0.2-1-0.2c-0.6,0-1.2,0.2-1.8,0.5%20S36,55.3,35.8,56c-0.1,0.4-0.1,1.3,0.9,2.1c0.5,0.5,1.3,0.9,2.2,1.3c0.3,0.1,0.6,0.2,0.9,0.3c1.1,0.3,2.8,0.9,3.2,1.9%20c0.2,0.5,0.1,1.2-0.3,2c-0.1,0.3-1.1,2.5-3,4.7c-1.1,1.3-2.3,2.4-3.6,3.2c-1.6,1-3.3,1.7-5.1,2c-0.7,0.1-1.2,0.7-1.2,1.5%20c0,0.2,0.1,0.4,0.1,0.6c0.3,0.7,1,1.2,2,1.7c1.3,0.6,3.3,1.1,5.9,1.5c0.1,0.2,0.3,0.9,0.4,1.3c0.1,0.4,0.2,0.9,0.3,1.4%20c0.2,0.5,0.6,1.2,1.6,1.2c0.4,0,0.9-0.1,1.4-0.2c0.8-0.1,1.8-0.4,3.2-0.4c0.7,0,1.5,0.1,2.2,0.2c1.5,0.2,2.7,1.1,4.2,2.2%20c2.1,1.5,4.6,3.2,8.3,3.2h0.3h0.4c3.7,0,6.1-1.7,8.3-3.2c1.5-1,2.7-1.9,4.2-2.2c0.8-0.1,1.5-0.2,2.3-0.2c1.3,0,2.3,0.2,3.1,0.3%20c0.6,0.1,1,0.2,1.4,0.2c0.8,0,1.4-0.4,1.6-1.2c0.1-0.5,0.2-0.9,0.3-1.4c0.1-0.4,0.2-1,0.4-1.3c2.6-0.4,4.5-0.9,5.9-1.5%20c1.1-0.5,1.7-1.1,2-1.7c0.1-0.2,0.1-0.4,0.2-0.6C90,74.6,89.5,73.9,88.8,73.8L88.8,73.8z'/%3e%3cpath%20d='M30,19.9c-5.5,0-10,4.5-10,10v60c0,5.5,4.5,10,10,10h60c5.5,0,10-4.5,10-10v-60c0-5.5-4.5-10-10-10C90,19.9,30,19.9,30,19.9%20z%20M30,9.9h60c11.1,0,20,8.9,20,20v60c0,11.1-8.9,20-20,20H30c-11.1,0-20-8.9-20-20v-60C10,18.9,18.9,9.9,30,9.9z'/%3e%3c/svg%3e`,
    spacex: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M109.8,39C109.7,39,109.7,39,109.8,39c-0.1,0-0.2,0-0.2,0C46.6,45.4,17,72.8,10,79.5l0.9,1.5h11%20c28.7-28.7,67.3-38.3,87.8-41.5l0,0c0,0,0,0,0.1,0c0.1,0,0.2-0.1,0.2-0.2C110,39.2,109.9,39.1,109.8,39L109.8,39z%20M11.6,53.8%20L10.9,55l13.5,9.8c2.8-1.6,5.5-3.1,8.4-4.5l-9.1-6.7L11.6,53.8L11.6,53.8z%20M41.7,66.8c-2.2,1.7-4.5,3.4-7,5.5L46.6,81h12.3l0.5-1.1%20L41.7,66.8z'/%3e%3c/svg%3e`,
    stripe: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M52.8,40.2c0-4.3,3.7-6,9.4-6c8.5,0,19.2,2.6,27.8,7.2V15.1C80.8,11.4,71.5,10,62.2,10c-22.6,0-37.7,11.8-37.7,31.5%20c0,30.8,42.3,25.8,42.3,39.2c0.1,5.2-4.4,6.8-10.7,6.8c-9.2,0-21.1-3.8-30.4-8.9v25.1c9.6,4.2,20,6.3,30.5,6.3%20c23.2,0,39.1-10,39.1-30C95.4,46.8,52.8,52.8,52.8,40.2L52.8,40.2z'/%3e%3c/svg%3e`,
    tesla: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cg%20id='tesla'%3e%3cg%20id='T'%3e%3cpath%20d='M60,110l14-79c13.4,0,17.5,1.5,18.2,7.5c0,0,8.9-3.4,13.5-10.2c-17.5-8.2-35.3-8.5-35.3-8.5L60,32.4l0,0L49.6,19.7%20c0,0-17.6,0.5-35.3,8.5c4.5,6.8,13.5,10.2,13.5,10.2c0.6-6,4.8-7.5,18.1-7.5L60,110z'/%3e%3cpath%20d='M60,16.1c14.3-0.2,30.5,2.3,47.2,9.5c2.3-4,2.8-5.8,2.8-5.8c-15.9-6.3-32.8-9.6-50-9.7c-17.2,0.1-34.1,3.5-50,9.7%20c0.8,2,1.7,3.9,2.8,5.8C29.5,18.3,45.7,16,60,16.1L60,16.1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,
    tiktok: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20xml:space='preserve'%3e%3cpath%20d='M105,10H15c-2.7,0-5,2.3-5,5v90c0,2.7,2.3,5,5,5h90c2.7,0,5-2.3,5-5V15C110,12.3,107.7,10,105,10z%20M88.5,53.6L88.5,53.6%20c-0.5,0.1-1.1,0.1-1.6,0.1c-6,0-11.6-3-14.9-8.1v27.5c0,11.3-9.1,20.4-20.4,20.4s-20.4-9.1-20.4-20.4s9.1-20.4,20.4-20.4l0,0%20c0.5,0,0.8,0,1.3,0.1v10c-5.6-0.6-10.8,3.4-11.5,9s3.4,10.8,9,11.5c0.5,0.1,0.8,0.1,1.3,0.1c5.7,0.1,10.5-4.5,10.8-10.3l0.1-46.6%20h9.5c0.9,8.5,7.8,15.3,16.5,15.9L88.5,53.6L88.5,53.6z'/%3e%3c/svg%3e`,
  },
  Tt = {};
Object.keys(wt).forEach((e) => {
  Tt[e] = e;
});
var Et = {
    consensysBlue: `/assets/consensys-blue-BuAH_w3-.svg`,
    eaSports: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cg%20id='layer1'%20transform='translate(0,-52.362149)'%3e%3cpath%20id='path7928'%20d='M60,62.4c-27.6,0-50,22.4-50,50c0,27.6,22.4,50,50,50c27.6,0,50-22.4,50-50C110,84.8,87.6,62.4,60,62.4z%20M60,69.3c23.8,0,43.1,19.3,43.1,43.1S83.8,155.4,60,155.4s-43.1-19.3-43.1-43.1S36.2,69.3,60,69.3L60,69.3z'/%3e%3cpath%20id='path8072'%20d='M56.3,110.5H38.8l4-6.3h10.9l4-6.2H33.4l-3.9,6.2h5.8l-7.9,12.5h32.5l12.4-19.6l4.5,7.1h-3.9l-3.9,6.3h11.8%20l4,6.2h7.5L72.3,85.3L56.3,110.5z%20M41.3,85.5l-3.9,6.2l25.7,0l3.9-6.2L41.3,85.5L41.3,85.5z'/%3e%3cpath%20id='path8076'%20d='M92.9,120.4v0.2h0.5v1.1h0.3v-1.1h0.5v-0.2H92.9z'/%3e%3cpath%20id='path8080'%20d='M95.7,120.4l-0.5,0.8l-0.5-0.8h-0.2v1.3h0.2v-0.8l0-0.1l0.1,0.1l0.4,0.7h0l0.4-0.7l0.1-0.1v0.1v0.8h0.2v-1.3%20L95.7,120.4z'/%3e%3cpath%20id='path8092'%20d='M36.1,130.6c0,0.8-0.3,1.5-0.8,2c-0.6,0.6-1.2,0.8-2,0.8h-3.4c-0.8,0-1.5-0.3-2-0.8c-0.5-0.5-0.8-1.2-0.8-2%20v-1.3h2.1l0.3,1.2c0.1,0.5,0.5,0.8,1.1,0.8h2.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.8v-1.5c0-0.7-0.3-1.1-1-1.1h-2.9%20c-0.8,0-1.5-0.3-2-0.8c-0.6-0.6-0.8-1.3-0.8-2.1v-1.9c0-0.8,0.3-1.5,0.8-2c0.6-0.6,1.2-0.8,2-0.8h3.3c0.8,0,1.5,0.3,2,0.8%20c0.6,0.5,0.8,1.2,0.8,2v1.2H34l-0.3-1.1c-0.2-0.5-0.5-0.8-1.1-0.8h-2.3c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8v1.1%20c0,0.7,0.3,1.1,1,1.1h2.9c0.8,0,1.5,0.3,2,0.9c0.6,0.6,0.8,1.2,0.8,2V130.6z'/%3e%3cpath%20id='path8096'%20d='M47.9,125.6c0,0.8-0.3,1.5-0.9,2c-0.6,0.6-1.3,0.8-2,0.8h-3.7v5h-2.4V120H45c0.8,0,1.5,0.3,2,0.8%20c0.6,0.6,0.9,1.2,0.9,2V125.6z%20M44.5,122.1h-3.2v4.2h3.2l0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.8v-2c0-0.3-0.1-0.6-0.3-0.8L44.5,122.1z'/%3e%3cpath%20id='path8100'%20d='M69.1,133.5l-2.2-5.3h-2.3v5.3h-2.4V120h6c0.8,0,1.5,0.3,2,0.8c0.6,0.6,0.8,1.2,0.8,2v2.4%20c0,0.6-0.2,1.2-0.5,1.7c-0.4,0.5-0.8,0.8-1.3,1.1l2.4,5.6L69.1,133.5z%20M67.8,122.1h-3.1v3.9h3.1l0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.8%20v-1.7c0-0.3-0.1-0.6-0.3-0.8L67.8,122.1z'/%3e%3cpath%20id='path8104'%20d='M81.9,122.1h-3.5v11.3H76v-11.3h-3.4V120h9.3L81.9,122.1z'/%3e%3cpath%20id='path8108'%20d='M92.7,130.6c0,0.8-0.3,1.5-0.8,2c-0.6,0.6-1.2,0.8-2,0.8h-3.4c-0.8,0-1.5-0.3-2-0.8c-0.5-0.5-0.8-1.2-0.8-2%20v-1.3h2.1l0.3,1.2c0.1,0.5,0.5,0.8,1.1,0.8h2.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.2-0.5,0.2-0.8v-1.5c0-0.7-0.3-1.1-1-1.1h-2.9%20c-0.8,0-1.5-0.3-2-0.8c-0.6-0.6-0.8-1.3-0.8-2.1v-1.9c0-0.8,0.3-1.5,0.8-2c0.6-0.6,1.2-0.8,2-0.8h3.3c0.8,0,1.5,0.3,2,0.8%20c0.5,0.5,0.8,1.2,0.8,2v1.2h-2.1l-0.3-1.1c-0.2-0.5-0.5-0.8-1-0.8H87c-0.3,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8v1.1%20c0,0.7,0.3,1.1,1,1.1h2.9c0.8,0,1.5,0.3,2,0.9c0.6,0.6,0.9,1.2,0.9,2L92.7,130.6z'/%3e%3cpath%20id='path8112'%20d='M56,122.1h-2.3l-0.7,0.3c-0.2,0.2-0.3,0.5-0.3,0.8v6.9c0,0.3,0.1,0.6,0.3,0.8l0.7,0.3H56l0.7-0.3%20c0.2-0.2,0.3-0.5,0.3-0.8v-6.9c0-0.3-0.1-0.6-0.3-0.8L56,122.1z%20M59.3,130.6c0,0.8-0.3,1.5-0.8,2.1c-0.6,0.6-1.2,0.8-2,0.8h-3.2%20c-0.8,0-1.5-0.3-2-0.8c-0.6-0.6-0.8-1.2-0.8-2.1v-7.8c0-0.8,0.3-1.4,0.8-2c0.6-0.6,1.2-0.8,2-0.8h3.2c0.8,0,1.5,0.3,2,0.8%20c0.6,0.5,0.8,1.2,0.8,2V130.6z'/%3e%3c/g%3e%3c/svg%3e`,
    googleColored: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%234285F4;}%20.st1{fill:%2334A853;}%20.st2{fill:%23FBBC05;}%20.st3{fill:%23EA4335;}%20%3c/style%3e%3cg%20transform='translate(1184.583%20765.171)'%3e%3cpath%20class='st0'%20d='M-1123.6-714.3v19.4h26.9c-1.2,6.2-4.7,11.5-10,15l16.2,12.6c9.5-8.7,14.9-21.5,14.9-36.8%20c0-3.5-0.3-7-0.9-10.2L-1123.6-714.3z'/%3e%3cpath%20class='st1'%20d='M-1151.6-695.7l-3.7,2.8l-13,10.1l0,0c8.2,16.3,25.1,27.6,44.6,27.6c13.5,0,24.8-4.5,33.1-12.1l-16.2-12.6%20c-4.5,3-10.1,4.8-16.9,4.8C-1136.6-675-1147.6-683.8-1151.6-695.7L-1151.6-695.7z'/%3e%3cpath%20class='st2'%20d='M-1168.2-727.6c-3.4,6.7-5.4,14.3-5.4,22.4c0,8.1,2,15.7,5.4,22.4c0,0,16.6-12.9,16.6-12.9%20c-1-3-1.6-6.2-1.6-9.5c0-3.3,0.6-6.5,1.6-9.5L-1168.2-727.6z'/%3e%3cpath%20class='st3'%20d='M-1123.6-735.3c7.4,0,13.9,2.5,19.1,7.5l14.3-14.3c-8.7-8.1-20-13-33.5-13c-19.5,0-36.4,11.2-44.6,27.6%20l16.6,12.9C-1147.6-726.5-1136.6-735.3-1123.6-735.3L-1123.6-735.3z'/%3e%3c/g%3e%3c/svg%3e`,
    harvard: `/assets/harvard-DBbk5tSP.svg`,
    instagram: `/assets/instagram-DqgbUYzI.svg`,
    linkedin: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23117BB8;}%20%3c/style%3e%3cg%3e%3cpath%20class='st0'%20d='M60,109.9c-27.6,0-50-22.4-50-50s22.4-50,50-50s50,22.4,50,50S87.6,109.9,60,109.9z%20M60,11.2%20c-26.8,0-48.6,21.8-48.6,48.6s21.8,48.6,48.6,48.6s48.6-21.8,48.6-48.6S86.8,11.2,60,11.2z'/%3e%3crect%20id='XMLID_69_'%20x='37.7'%20y='50.6'%20class='st0'%20width='10.2'%20height='33.1'/%3e%3cellipse%20id='XMLID_68_'%20class='st0'%20cx='42.8'%20cy='40.1'%20rx='6.1'%20ry='6.2'/%3e%3cpath%20id='XMLID_62_'%20class='st0'%20d='M64.4,66.3c0-4.6,2.2-7.4,6.2-7.4c3.8,0,5.6,2.6,5.6,7.4c0,4.8,0,17.4,0,17.4h10.2%20c0,0,0-12.1,0-21c0-8.9-5.1-13.1-12-13.1c-7.1,0-10,5.4-10,5.4v-4.4h-10v33.1h9.9C64.4,83.7,64.4,71.4,64.4,66.3z'/%3e%3c/g%3e%3c/svg%3e`,
    metaBlue: `/assets/meta-blue-BDbXNAlc.svg`,
    miamiHurricanes: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.miami-hurricanes0{fill:%23FFFFFF;}%20.miami-hurricanes1{fill:%23005030;}%20.miami-hurricanes2{fill:%23F05A00;}%20%3c/style%3e%3cg%20transform='translate(1.0366%20.96338)'%3e%3cpath%20class='miami-hurricanes0'%20d='M81,28.2l0.1,41.3c0,2.6,0,10.7-20.3,10.7h-3.8c-20.3,0-20.3-8.1-20.3-10.7l0.1-41.3H9l0,47.4%20c0,13.1,36.8,14.1,48.1,14.1h3.8c11.3,0,48.1-1,48.1-14.1l0-47.4L81,28.2L81,28.2z'/%3e%3cpath%20class='miami-hurricanes1'%20d='M83.2,69.5l0-39.2h23.7c0,0,0,43.9,0,45.4c0,8.6-23.6,12.1-46,12.1c0-1.1,0-3.8,0-5.5%20C72.1,82.3,83.2,79.9,83.2,69.5'/%3e%3cpath%20class='miami-hurricanes2'%20d='M34.7,69.5l0-39.2H11c0,0,0,43.9,0,45.4c0,8.6,23.6,12.1,46,12.1c0-1.1,0-3.8,0-5.5%20C45.9,82.3,34.7,79.9,34.7,69.5'/%3e%3c/g%3e%3c/svg%3e`,
    mit: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.mit0{fill:%23A31F34;}%20.mit1{fill:%238A8B8C;}%20%3c/style%3e%3cg%3e%3cpath%20class='mit0'%20d='M92.2,85.9H81.3V50.7h10.9V85.9z%20M56.4,85.9H45.5V34.1h10.9V85.9z%20M20.9,85.9H10V34.1h10.9V85.9z%20M38.7,69.3%20H27.8V34.1h10.9V69.3z%20M74.2,44.4H63.3V34.1h10.9V44.4z'/%3e%3crect%20x='63.3'%20y='50.7'%20class='mit1'%20width='10.9'%20height='35.2'/%3e%3crect%20x='81.3'%20y='34.1'%20class='mit0'%20width='28.7'%20height='10.3'/%3e%3c/g%3e%3c/svg%3e`,
    ohio: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23BA0C2F;}%20.st1{fill:%23A7B1B7;}%20%3c/style%3e%3cg%20transform='matrix(1.3333%200%200%20-1.3333%20-391.72%20660.3)'%3e%3cg%3e%3cpath%20d='M336.5,467.2l-2.1-2.1v-14l2.3-2.2h3.8v-12.8h-3v8.6h-3.1v-9.4l2.1-2.1l5.1,0l2.1,2.1v15l-2.3,2.1l-3.9,0l0,11.5l3,0v-7.4%20h3.1l0,8.5l-2.1,2.1L336.5,467.2L336.5,467.2z%20M344.3,462.7l0-2.9c0.8-0.1,2.1-0.2,2.1-0.2l0-19.7c1-0.1,2-0.3,3-0.5v19.8%20c0,0,1.2-0.2,2.2-0.3v2.9C349.1,462.2,346.8,462.5,344.3,462.7L344.3,462.7z%20M330.1,462.3c-1.3-0.2-2.7-0.3-4-0.6l-1.7-2.2v-19.4%20l1.5-1.4c1.7,0.4,3,0.6,4.6,0.9l1.4,1.8v18.9L330.1,462.3L330.1,462.3z%20M354.1,461.3l-1.8-1.7v-20.9c0.9-0.2,1.9-0.4,2.8-0.7v10.4%20l1.8-0.5v-10.5c0.9-0.3,1.8-0.6,2.7-1v21.2l-1.6,2.8C356.6,460.8,355.5,461,354.1,461.3L354.1,461.3z%20M323,461.1%20c-0.9-0.2-1.9-0.4-2.8-0.6v-23.4c0.9,0.3,1.8,0.6,2.8,0.9V461.1L323,461.1z%20M318.7,460.1c-1-0.3-1.9-0.5-2.9-0.8v-9.5l-1.9-0.7%20v9.7c-1-0.3-1.9-0.6-2.8-1v-25.1c1,0.7,1.6,1.1,2.8,1.8v11.5c0,0,1.1,0.5,1.9,0.8v-11.2c0.9,0.5,1.9,0.8,2.9,1.2L318.7,460.1%20L318.7,460.1z%20M360.5,459.8v-3c0.2-0.1,2.3-0.7,2.3-0.7l0-21c1-0.5,1.9-1,2.8-1.6v21.6c0,0,2.5-1,2.7-1v3.1%20C365.8,458.2,363.1,459,360.5,459.8L360.5,459.8z%20M329.2,459.1v-16.7l-1.9-0.4v16.8L329.2,459.1L329.2,459.1z%20M355,458.1l1.8-0.4%20V451l-1.8,0.4V458.1L355,458.1z%20M369.3,456.8v-31.9c2.1-1.6,5.1-4,7-5.6v3.8c-1.3,1.1-4,3.2-4,3.2V438c0,0,2.8-1.5,4-2.2v3.6%20c-1.2,0.7-4.1,2.3-4.1,2.3l0,10.6c0,0,2.7-1.3,4.1-2.1v3.4C374,454.8,371.6,455.7,369.3,456.8L369.3,456.8z%20M307.1,456.1%20c-1.5-0.7-2.9-1.4-4.4-2.2l-1.5-2.8v-29.8l2.3-1.5c0.4,0.2,4,2.4,4.2,2.6l1.4,2.9v29.2L307.1,456.1L307.1,456.1z%20M306.4,452.6%20l0-27.6l-2.1-1.4v28L306.4,452.6L306.4,452.6z'/%3e%3cpath%20class='st0'%20d='M330,482.9l-11.4-11.2V462c3.2,0.9,6.4,1.5,9.6,2v3.8l5.8,5.6h10.2l5.7-5.7v-3.8c3.2-0.5,6.3-1.1,9.6-2v9.7%20l-11.3,11.3L330,482.9L330,482.9z%20M349.8,437.6l0-4.7l-5.6-5.8h-10.3l-5.7,5.7v4.7c-3.4-0.7-6.7-1.6-9.6-2.9v-5.9l11.4-11.3h18.2%20l11.3,11.4l0,5.8C356.4,436,353.4,436.9,349.8,437.6L349.8,437.6z'/%3e%3cpath%20class='st1'%20d='M328.2,487.2l-13.9-13.6l0-10.7c-4.3-1.4-8.9-3-13.1-5.3v-2.3c4.6,2.7,11.5,5,15.2,6.1v11.2l12.6,12.4h19.8%20l12.5-12.3l0-11.2c4.3-1.2,10.8-3.7,14.9-6v2.3c-4.2,2.2-8.3,3.7-12.7,5.2l0,10.7l-13.7,13.6H328.2L328.2,487.2z%20M334.8,471.4%20l-4.6-4.5v-2.7c0.8,0.1,1.4,0.1,2.2,0.2v1.6l3.3,3.2h6.7l3.2-3.2v-1.6c0.8-0.1,1.4-0.2,2.2-0.3v2.7l-4.5,4.5L334.8,471.4%20L334.8,471.4z%20M345.7,438.2v-3.6l-3.2-3.2h-6.8l-3.3,3.2v3.7c-0.8-0.1-1.4-0.1-2.2-0.3v-4.3l4.6-4.5h8.6l4.6,4.6v4.2%20C347.1,438,346.5,438.1,345.7,438.2L345.7,438.2z%20M316.6,433.8c-2.3-1.1-3.9-2.1-5.5-3.3V428c1,0.8,2.2,1.8,3.3,2.5v-3.3%20l13.9-13.8h21.5l13.8,13.8l0,3.2c1.6-0.9,2.9-1.9,4.2-3v2.5c-1.9,1.4-4,2.8-6.4,4l0-5.8L349,415.5h-19.8L316.6,428L316.6,433.8%20L316.6,433.8z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,
    stanford: `/assets/stanford-BPkJPd5u.svg`,
    ted: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.ted0{fill:%23E92818;}%20%3c/style%3e%3cg%3e%3cpath%20class='ted0'%20d='M83.7,57.1c-0.5-1.1-1.3-1.8-2.4-2.3c-0.6-0.2-1.2-0.4-1.8-0.4c-0.9,0-1.8,0-2.7,0c-0.1,0-0.1,0-0.2,0%20c0,0.1,0,0.1,0,0.2c0,3.5,0,7.1,0,10.6c0,0,0,0.1,0,0.2c0.1,0,0.2,0,0.3,0c0.8,0,1.7,0,2.5,0c0.4,0,0.8-0.1,1.2-0.1%20c1.2-0.3,2.2-0.9,2.8-2c0.2-0.3,0.3-0.6,0.4-0.9c0.3-1,0.4-2,0.4-3C84.2,58.5,84.1,57.8,83.7,57.1z'/%3e%3cpath%20class='ted0'%20d='M60,9.9c-27.6,0-50,22.4-50,50s22.4,50,50,50s50-22.4,50-50S87.6,9.9,60,9.9z%20M48.3,54.3%20c-0.2,0.1-0.4,0.1-0.5,0.1c-1.7,0-3.5,0-5.2,0c-0.2,0-0.4,0-0.5,0c0,0.1,0,0.3,0,0.4c0,0.5,0,1.1,0,1.7c0,4.7,0,9.4,0,14.1%20c0,0.2,0,0.4,0,0.6c-0.2,0.2-0.4,0.1-0.5,0.1c-1.6,0-3.1,0-4.7,0c-0.4,0-0.8,0-1.3,0c-0.1,0-0.2,0-0.4,0c0-0.1,0-0.2,0-0.3%20c0-0.1,0-0.3,0-0.4c0-5.1,0-10.3,0-15.4c0-0.2,0-0.4,0-0.6c-0.6,0-1.1,0-1.6,0c-0.5,0-1,0-1.6,0c-0.5,0-1,0-1.5,0c-0.5,0-1,0-1.6,0%20c0-0.1-0.1-0.2-0.1-0.3c0-1.8,0-3.6,0-5.4c0,0,0-0.1,0-0.1c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.3,0,0.4,0c6.1,0,12.2,0,18.3,0%20c0.2,0,0.4,0,0.6,0c0.1,0.5,0,0.9,0,1.4c0,0.5,0,1,0,1.5c0,0.5,0,0.9,0,1.4C48.3,53.4,48.4,53.8,48.3,54.3z%20M68.5,54%20c0,0.1,0,0.2,0,0.3c-0.2,0.1-0.4,0-0.6,0c-3.6,0-7.2,0-10.8,0c-0.2,0.1-0.4,0-0.6,0.1c-0.1,0.4-0.1,2.2,0,2.7c0.1,0,0.2,0,0.3,0%20c0.1,0,0.3,0,0.4,0c3.6,0,7.1,0,10.6,0c0.2,0,0.4,0,0.6,0c0,0.1,0.1,0.2,0.1,0.3c0,1.6,0,3.3,0,4.9c0,0,0,0.1,0,0.2%20c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0-0.3,0-0.4,0c-3.6,0-7.2,0-10.7,0c-0.2,0-0.4,0-0.6,0c-0.1,0.4-0.1,2.2,0,2.7c0.1,0,0.2,0,0.3,0%20c0.1,0,0.3,0,0.4,0c3.6,0,7.1,0,10.7,0c0.2,0,0.4,0,0.6,0c0,0.1,0,0.2,0,0.3c0,1.7,0,3.5,0,5.2c0,0.1,0,0.2,0,0.3%20c-0.1,0-0.2,0-0.2,0c-1.2,0.1-18.3,0-18.7,0c0-0.1,0-0.2,0-0.3c0-0.1,0-0.2,0-0.3c0-7.1,0-14.2,0-21.3c0-0.2,0-0.4,0-0.6%20c0.1,0,0.2-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0c5.9,0,11.9,0,17.8,0c0.2,0,0.4,0,0.6,0C68.5,49,68.5,51.5,68.5,54z%20M91.2,60.6%20c0,1.3-0.3,2.6-0.7,3.9c-1,2.9-2.9,4.9-5.8,5.9c-1.2,0.4-2.4,0.6-3.6,0.7c-0.7,0-1.5,0.1-2.2,0.1c-2.9,0-5.8,0-8.6,0%20c-0.2,0-0.4,0-0.6,0c0-7.5,0-14.9,0-22.3c0-0.1,0-0.2,0-0.2c0.2-0.1,0.4-0.1,0.5-0.1c1.9,0,3.8,0,5.7,0c1.7,0,3.4,0,5.1,0%20c0.9,0,1.8,0.1,2.6,0.2c3,0.6,5.2,2.3,6.5,5.1c0.6,1.3,0.9,2.6,1.1,4C91.2,58.8,91.2,59.7,91.2,60.6z'/%3e%3c/g%3e%3c/svg%3e`,
    ucBerkeley: `/assets/uc-berkeley-CWDo1t5B.svg`,
    upwork: `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2027.3.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20120%20120'%20style='enable-background:new%200%200%20120%20120;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%236FDA44;}%20%3c/style%3e%3cpath%20class='st0'%20d='M87.3,30.4c-10.7,0.1-18.9,7.1-21.9,18.4c-5.1-7.9-9.1-16.9-11.4-24.5l-11.3,0.1l0.2,29.9%20c0,5.9-4.7,10.7-10.7,10.8c-5.9,0-10.7-4.7-10.8-10.7l0,0l-0.2-29.9L10,24.5l0.2,29.9c0,12.4,10,22.2,22.1,22.2%20c12.1-0.1,22-10,21.9-22.4l0-5.1c2.3,4.5,5.1,9.3,8.2,13.5l-6.9,33L67,95.6l5-24c4.5,2.8,9.6,4.5,15.5,4.4%20C100,76,110.1,65.8,110,52.8C109.9,40.4,99.7,30.3,87.3,30.4L87.3,30.4z%20M87.5,64.5c-4.5,0-9-1.9-12.7-5l1.1-4.5v-0.3%20c0.8-4.8,3.3-13,11.8-13c6.2,0,11.3,5,11.3,11.2C98.7,59.4,93.4,64.5,87.5,64.5L87.5,64.5z'/%3e%3c/svg%3e`,
  },
  Dt = {};
(Object.keys(Et).forEach((e) => {
  Dt[e] = e;
}),
  a(),
  a());
var Ot = ({ className: e = ``, inline: t, ...n }) => {
  let r = (0, W.default)(`kicl--icons--logo`, { 'kicl-layout--inline': t }, e);
  return w($, {
    alignContent: `center`,
    justifyItems: `center`,
    children: T(`svg`, {
      ...n,
      className: r,
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 385 160`,
      children: [
        w(`text`, { children: `Ki.CL` }),
        T(`g`, {
          'data-letter': `k`,
          children: [
            w(`rect`, { x: `60`, width: `40`, height: `60` }),
            w(`polyline`, {
              points: `0 0 0 160 40 160 40 100 60 100 60 160 100 160 100 80 70 80 70 60 40 60 40 0 0 0`,
            }),
          ],
        }),
        T(`g`, {
          'data-letter': `i`,
          children: [
            w(`rect`, { x: `120`, width: `40`, height: `40` }),
            w(`rect`, { x: `120`, y: `60`, width: `40`, height: `100` }),
          ],
        }),
        w(`g`, {
          'data-letter': `c`,
          children: w(`path`, {
            d: `M253,120a40,40,0,1,1,29.74-66.74L311,25a80,80,0,1,0,22,55H293A40,40,0,0,1,253,120Z`,
          }),
        }),
        w(`g`, {
          'data-letter': `l`,
          children: w(`rect`, { x: `345`, width: `40`, height: `160` }),
        }),
      ],
    }),
  });
};
(a(), a());
var q = `kicl--components--calendar`,
  kt = [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`],
  At = (e) => {
    let t = new Date(e);
    return (t.setHours(0, 0, 0, 0), t);
  },
  jt = (e, t) =>
    !(!e || !t) &&
    e.getFullYear() === t.getFullYear() &&
    e.getMonth() === t.getMonth() &&
    e.getDate() === t.getDate(),
  Mt = b.forwardRef((e, t) => {
    let n = e.mode ?? `single`,
      { className: i, disabled: a } = e,
      o = c(() => At(new Date()), []),
      [s, l] = r(() => {
        let t = ((e) =>
          e.defaultMonth
            ? e.defaultMonth
            : e.mode === `range`
              ? (e.selected?.from ?? e.selected?.to ?? new Date())
              : (e.selected ?? new Date()))(e);
        return new Date(t.getFullYear(), t.getMonth(), 1);
      }),
      u = c(() => {
        let e = new Date(s.getFullYear(), s.getMonth(), 1),
          t = e.getDay(),
          n = new Date(e);
        return (
          n.setDate(e.getDate() - t),
          Array.from({ length: 42 }, (e, t) => {
            let r = new Date(n);
            return (r.setDate(n.getDate() + t), At(r));
          })
        );
      }, [s]),
      d = e.mode === `range` ? void 0 : e.selected,
      f = e.mode === `range` ? e.selected : void 0;
    return T(`div`, {
      ref: t,
      'data-slot': `calendar`,
      'data-mode': n,
      className: (0, W.default)(q, i),
      children: [
        T(`div`, {
          className: `${q}__header`,
          children: [
            w(`button`, {
              type: `button`,
              className: `${q}__nav`,
              'aria-label': `Previous month`,
              onClick: () => l(new Date(s.getFullYear(), s.getMonth() - 1, 1)),
              children: w(Qe, { 'aria-hidden': !0 }),
            }),
            w(`div`, {
              className: `${q}__title kicl-font-size-small kicl-font-weight-bold`,
              children:
                ((p = s),
                p.toLocaleString(void 0, { month: `long`, year: `numeric` })),
            }),
            w(`button`, {
              type: `button`,
              className: `${q}__nav`,
              'aria-label': `Next month`,
              onClick: () => l(new Date(s.getFullYear(), s.getMonth() + 1, 1)),
              children: w(Ze, { 'aria-hidden': !0 }),
            }),
          ],
        }),
        w(`div`, {
          className: `${q}__weekdays`,
          'aria-hidden': !0,
          children: kt.map((e) =>
            w(
              `div`,
              {
                className: `${q}__weekday kicl-font-size-smallest`,
                children: e,
              },
              e
            )
          ),
        }),
        w(`div`, {
          className: `${q}__grid`,
          role: `grid`,
          children: u.map((t) => {
            let r = t.getMonth() !== s.getMonth(),
              i = jt(t, o),
              c = a?.(t) ?? !1,
              l = jt(t, f?.from),
              u = jt(t, f?.to),
              p = ((e, t) => {
                if (!t?.from || !t.to) return !1;
                let n = e.getTime(),
                  r = At(t.from).getTime(),
                  i = At(t.to).getTime();
                return n > r && n < i;
              })(t, f),
              m = n === `single` ? jt(t, d) : l || u;
            return w(
              `button`,
              {
                type: `button`,
                role: `gridcell`,
                'aria-selected': m || p,
                disabled: c,
                className: (0, W.default)(
                  `${q}__day`,
                  `kicl-font-size-small`,
                  `kicl-position-relative`,
                  {
                    [`${q}__day--outside`]: r,
                    [`${q}__day--selected`]: m,
                    [`${q}__day--range-start`]: l,
                    [`${q}__day--range-end`]: u,
                    [`${q}__day--range-middle`]: p,
                    [`${q}__day--today`]: i,
                  }
                ),
                onClick: () =>
                  ((t) => {
                    if (e.mode === `range`) {
                      let i = e.selected,
                        a;
                      (!i?.from || (i.from && i.to)
                        ? (a = { from: t, to: void 0 })
                        : jt(i.from, t)
                          ? (a = { from: t, to: t })
                          : ((n = t),
                            (r = i.from),
                            (a =
                              n.getTime() < r.getTime()
                                ? { from: t, to: i.from }
                                : { from: i.from, to: t })),
                        e.onSelect?.(a));
                      return;
                    }
                    var n, r;
                    e.onSelect?.(t);
                  })(t),
                children: t.getDate(),
              },
              t.toISOString()
            );
          }),
        }),
      ],
    });
    var p;
  });
((Mt.displayName = `Calendar`), a());
var Nt = `kicl--components--card`;
((b.forwardRef(
  (
    { children: e, className: t, is: n = `div`, size: r = `default`, ...i },
    a
  ) =>
    w(n, {
      ...i,
      className: (0, W.default)(
        Nt,
        `${Nt}--size--${r}`,
        r !== 'default' && `kicl-inline-size-${r}`,
        t
      ),
      'data-is': n,
      'data-size': r,
      'data-slot': `card`,
      ref: a,
      children: e,
    })
).displayName = `Card`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `div`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(`kicl--components--card__action`, t),
      'data-is': n,
      'data-slot': `card-action`,
      ref: i,
      children: e,
    })
  ).displayName = `CardAction`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `div`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(`kicl--components--card__content`, t),
      'data-is': n,
      'data-slot': `card-content`,
      ref: i,
      children: e,
    })
  ).displayName = `CardContent`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `p`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(
        `kicl--components--card__description`,
        `kicl-font-size-small`,
        `kicl-color-grey-dark`,
        t
      ),
      'data-is': n,
      'data-slot': `card-description`,
      ref: i,
      children: e,
    })
  ).displayName = `CardDescription`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `div`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(`kicl--components--card__footer`, t),
      'data-is': n,
      'data-slot': `card-footer`,
      ref: i,
      children: e,
    })
  ).displayName = `CardFooter`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `div`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(`kicl--components--card__header`, t),
      'data-is': n,
      'data-slot': `card-header`,
      ref: i,
      children: e,
    })
  ).displayName = `CardHeader`),
  a(),
  (b.forwardRef(({ children: e, className: t, is: n = `div`, ...r }, i) =>
    w(n, {
      ...r,
      className: (0, W.default)(
        `kicl--components--card__title`,
        `kicl-font-weight-bold`,
        `kicl-line-height-narrow`,
        t
      ),
      'data-is': n,
      'data-slot': `card-title`,
      ref: i,
      children: e,
    })
  ).displayName = `CardTitle`),
  a());
var Pt = `kicl--components--checkbox`;
((b.forwardRef(
  (
    {
      checked: e,
      className: t,
      defaultChecked: n = !1,
      disabled: i,
      onCheckedChange: a,
      ...o
    },
    s
  ) => {
    let c = e !== void 0,
      [l, u] = r(n),
      d = c ? e : l,
      f = d === `indeterminate`,
      p = !0 === d;
    return w(`button`, {
      ref: s,
      type: `button`,
      role: `checkbox`,
      'aria-checked': f ? `mixed` : p,
      disabled: i,
      'data-slot': `checkbox`,
      className: (0, W.default)(
        Pt,
        {
          [`${Pt}--checked`]: p,
          [`${Pt}--indeterminate`]: f,
          [`${Pt}--disabled`]: i,
        },
        t
      ),
      onClick: () => {
        if (i) return;
        let e = !p;
        (c || u(e), a?.(e));
      },
      ...o,
      children: f
        ? w(He, { className: `${Pt}__icon`, 'aria-hidden': !0 })
        : p
          ? w(Ke, { className: `${Pt}__icon`, 'aria-hidden': !0 })
          : null,
    });
  }
).displayName = `Checkbox`),
  a());
var Ft = `kicl--components--popover`,
  It = v(null),
  Lt = () => {
    let e = m(It);
    if (!e) throw Error(`Popover parts must be used within Popover`);
    return e;
  },
  Rt = ({
    children: e,
    className: t,
    defaultOpen: n = !1,
    onOpenChange: i,
    open: a,
    ...o
  }) => {
    let s = a !== void 0,
      [c, l] = r(n),
      u = s ? !!a : c;
    return w(It.Provider, {
      value: {
        open: u,
        setOpen: (e) => {
          (s || l(e), i?.(e));
        },
      },
      children: w(`div`, {
        'data-slot': `popover`,
        className: (0, W.default)(Ft, `kicl-position-relative`, t),
        'data-state': u ? `open` : `closed`,
        ...o,
        children: e,
      }),
    });
  };
Rt.displayName = `Popover`;
var zt = b.forwardRef(({ children: e, className: t, onClick: n, ...r }, i) => {
  let a = Lt();
  return w(`button`, {
    ref: i,
    type: `button`,
    'data-slot': `popover-trigger`,
    'aria-expanded': a.open,
    className: t,
    onClick: (e) => {
      (n?.(e), e.defaultPrevented || a.setOpen(!a.open));
    },
    ...r,
    children: e,
  });
});
zt.displayName = `PopoverTrigger`;
var Bt = b.forwardRef(({ children: e, className: t, ...n }, r) => {
  let i = Lt(),
    a = o(null);
  return (
    d(() => {
      if (!i.open) return;
      let e = (e) => {
          let t = a.current?.closest(`.${Ft}`);
          t && !t.contains(e.target) && i.setOpen(!1);
        },
        t = (e) => {
          e.key === `Escape` && i.setOpen(!1);
        };
      return (
        document.addEventListener(`pointerdown`, e),
        document.addEventListener(`keydown`, t),
        () => {
          (document.removeEventListener(`pointerdown`, e),
            document.removeEventListener(`keydown`, t));
        }
      );
    }, [i]),
    i.open
      ? w(`div`, {
          ref: (e) => {
            ((a.current = e),
              typeof r == `function` ? r(e) : r && (r.current = e));
          },
          role: `dialog`,
          'data-slot': `popover-content`,
          className: (0, W.default)(
            `${Ft}__content`,
            `kicl-position-absolute`,
            t
          ),
          ...n,
          children: e,
        })
      : null
  );
});
((Bt.displayName = `PopoverContent`), a(), a());
var Vt = `kicl--components--details`;
((b.forwardRef(({ children: e, className: t, summary: n, ...r }, i) =>
  T(`details`, {
    ...r,
    className: (0, W.default)(Vt, t),
    'data-slot': `details`,
    ref: i,
    children: [
      T(`summary`, {
        className: `${Vt}__summary`,
        'data-slot': `summary`,
        children: [
          n,
          T(`span`, {
            'aria-hidden': !0,
            className: `${Vt}__marker`,
            children: [
              w(He, {
                className: `${Vt}__marker-icon ${Vt}__marker-icon--closed`,
              }),
              w($e, {
                className: `${Vt}__marker-icon ${Vt}__marker-icon--open`,
              }),
            ],
          }),
        ],
      }),
      e,
    ],
  })
).displayName = `Details`),
  a());
var Ht = `kicl--components--dialog`,
  Ut = b.forwardRef(
    (
      {
        children: e,
        className: t,
        closeIcon: n,
        isClosable: i = !0,
        dense: a = !1,
        isFullScreen: s = !1,
        isModal: c = !0,
        open: l = !0,
        onEnter: u,
        onEntered: f,
        onEntering: p,
        onExit: m,
        onExited: h,
        onExiting: g,
        onKeyDown: _,
        onKeyUp: v,
        alignContent: y = `start`,
        alignItems: b = `start`,
        autoFlow: x,
        footer: S,
        frames: C,
        fullScreen: E,
        gap: D = `wide`,
        justifyContent: O,
        justifyItems: k = `start`,
        wrap: A,
        ...j
      },
      M
    ) => {
      let N = o(null),
        [P, F] = r(l);
      d(() => {
        P !== l && F(l);
      }, [`${l}`]);
      let I = `${Ht}--${ue()}`,
        ee = (0, W.default)(
          Ht,
          {
            [`${Ht}--is-closable`]: i,
            [`${Ht}--is-dense`]: a,
            [`${Ht}--is-full-screen`]: s,
            [`${Ht}--is-modal`]: c,
          },
          t,
          I
        ),
        te = c ? 300 : 0,
        ne = w(Te, {
          animationDelay: te,
          in: i,
          children: w(Ae, {
            className: (0, W.default)(`kicl-font-size-medium`, `${Ht}--close`),
            onClick: (e) => {
              (e.preventDefault(), i && F(!1));
            },
            unstyled: !0,
            children: w(n || Ge, {}),
          }),
        }),
        re = w(Te, {
          animationDelay: te,
          in: !!S,
          children: w($, {
            alignContent: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            justifyItems: `center`,
            children: w(`footer`, {
              className: (0, W.default)(`${Ht}--footer`),
              children: S,
            }),
          }),
        }),
        ie = P ? `fast` : `faster`,
        L = `ease-quint-in-out`,
        R = `slide-from-bottom`,
        z = w(Te, {
          animationDelay: P ? 0 : 2 * te,
          animationDuration: ie,
          animationEasing: L,
          animationStyle: R,
          in: P,
          nodeRef: N,
          onEnter: (e) => {
            if (N.current)
              return N.current.open
                ? void u?.(e)
                : (c ? N.current.showModal() : N.current.show(),
                  void (N.current.inert = !0));
          },
          onEntered: (e) => {
            N.current && ((N.current.inert = !1), f?.(e));
          },
          onEntering: p,
          onExit: m,
          onExited: () => {
            (N.current?.close(), h?.());
          },
          onExiting: g,
          children: T(`dialog`, {
            ...j,
            className: ee,
            onCancel: (e) => {
              (e.preventDefault(), i && F(!1));
            },
            onKeyDown: (e) => {
              e.target === e.currentTarget
                ? (e.preventDefault(), _?.(e))
                : v?.(e);
            },
            onKeyUp: (e) => {
              e.target === e.currentTarget
                ? (e.preventDefault(), i && e.key === `Escape` && F(!1), v?.(e))
                : v?.(e);
            },
            ref: M,
            role: `presentation`,
            children: [
              ne,
              w(Te, {
                animationDelay: P ? 2 * te : 0,
                animationDuration: ie,
                animationEasing: L,
                animationStyle: R,
                in: P,
                children: w($, {
                  alignContent: y,
                  alignItems: b,
                  autoFlow: x,
                  frames: C,
                  fullScreen: E,
                  gap: D,
                  justifyContent: O,
                  justifyItems: k,
                  wrap: A,
                  children: T(`section`, { children: [e, re] }),
                }),
              }),
            ],
          }),
        });
      return (
        c ||
          (z = w(Te, {
            in: P,
            children: T(`div`, {
              className: `${Ht}--modal-wrapper`,
              children: [
                w(Ae, {
                  unstyled: !0,
                  onClick: () => {
                    F(!1);
                  },
                  children: `Close the dialog`,
                }),
                z,
              ],
            }),
          })),
        z
      );
    }
  );
((Ut.displayName = `Dialog`), a());
var Wt =
  typeof window < `u` && window.HTMLElement !== void 0 && typeof document < `u`;
((b.createContext(null).displayName = `HookFormControlContext`),
  Wt ? b.useLayoutEffect : b.useEffect);
var Gt = b.createContext(null);
Gt.displayName = `HookFormContext`;
var Kt = () => b.useContext(Gt);
(a(), a());
var qt = v(null),
  Jt = v(null);
function Yt() {
  let e = m(qt),
    t = m(Jt);
  if (!e) throw Error(`Form field primitives must be used within <FormField>`);
  if (!t) throw Error(`Form field primitives must be used within <FormItem>`);
  return {
    name: e.name,
    id: t.id,
    formItemId: t.id,
    formDescriptionId: `${t.id}-description`,
    formMessageId: `${t.id}-message`,
  };
}
(a(),
  a(),
  (b.forwardRef(({ className: e, ...t }, n) => {
    let r = s();
    return w(Jt.Provider, {
      value: { id: r },
      children: w(`div`, {
        ref: n,
        className: (0, W.default)(`kicl--components--form__item`, e),
        ...t,
      }),
    });
  }).displayName = `FormItem`),
  a());
var Xt = `kicl--components--form__label`;
((b.forwardRef(({ className: e, required: t, children: n, ...r }, i) => {
  let { formItemId: a, name: o } = Yt(),
    { getFieldState: s, formState: c } = Kt(),
    { error: l } = s(o, c);
  return T(`label`, {
    ref: i,
    className: (0, W.default)(
      Xt,
      `kicl-font-size-small`,
      `kicl-font-weight-bold`,
      l ? `kicl-color-error` : `kicl-color-grey-darker`,
      { [`${Xt}--error`]: !!l },
      e
    ),
    htmlFor: a,
    ...r,
    children: [
      n,
      t
        ? w(`span`, {
            className: `${Xt}__required kicl-color-error`,
            'aria-hidden': !0,
            children: `*`,
          })
        : null,
    ],
  });
}).displayName = `FormLabel`),
  a(),
  a());
var Zt = `kicl--components--text`,
  J = b.forwardRef(
    (
      {
        children: e,
        dense: t,
        is: n = `p`,
        lookLike: r,
        unstyled: i,
        variant: a,
        ...o
      },
      s
    ) => {
      let c = (0, W.default)(
        {
          [Zt]: !i,
          [`kicl-look-like-${r}`]: !i && r,
          [`kicl-variant--${a}`]: !i && !r && a,
          [`kicl-look-like-${r}--variant--${a}`]: !i && r && a,
          [`${Zt}--is-dense`]: !i && t,
        },
        o.className
      );
      return w(n, { ...o, className: c, 'data-is': n, ref: s, children: e });
    }
  );
((J.displayName = `Text`),
  a(),
  (b.forwardRef(({ className: e, ...t }, n) => {
    let { formDescriptionId: r } = Yt();
    return w(J, {
      ...t,
      ref: n,
      is: `p`,
      id: r,
      className: (0, W.default)(
        `kicl--components--form__description`,
        `kicl-font-size-smaller`,
        `kicl-color-grey-dark`,
        e
      ),
    });
  }).displayName = `FormDescription`),
  a(),
  (b.forwardRef(({ className: e, children: t, ...n }, r) => {
    let { formMessageId: i, name: a } = Yt(),
      { getFieldState: o, formState: s } = Kt(),
      { error: c } = o(a, s),
      l = c ? String(c.message ?? ``) : t;
    return l
      ? w(J, {
          ...n,
          ref: r,
          is: `p`,
          id: i,
          className: (0, W.default)(
            `kicl--components--form__message`,
            `kicl-font-size-smaller`,
            `kicl-color-error`,
            e
          ),
          role: `alert`,
          children: l,
        })
      : null;
  }).displayName = `FormMessage`),
  a());
var Qt = `kicl--components--heading`,
  $t = b.forwardRef(
    ({ children: e, className: t = ``, dense: n, is: r = `h1`, ...i }, a) => {
      let o = (0, W.default)(Qt, { [`${Qt}--is-dense`]: n }, t);
      return w(r, { ...i, className: o, 'data-is': r, ref: a, children: e });
    }
  );
(($t.displayName = `Heading`), a());
var en = (e) => {
    throw TypeError(e);
  },
  tn = (e, t, n) => t.has(e) || en(`Cannot ` + n),
  nn = (e, t, n) => (
    tn(e, t, `read from private field`),
    n ? n.call(e) : t.get(e)
  ),
  rn = (e, t, n) =>
    t.has(e)
      ? en(`Cannot add the same private member more than once`)
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  an = (e, t, n, r) => (
    tn(e, t, `write to private field`),
    r ? r.call(e, n) : t.set(e, n),
    n
  ),
  on = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  sn = /^[\\/]{2}/;
function cn(e, t) {
  return t + e.replace(/\\/g, `/`);
}
var ln,
  un = `popstate`;
function dn(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `pathname` in e &&
    `search` in e &&
    `hash` in e &&
    `state` in e &&
    `key` in e
  );
}
function fn(e = {}) {
  return (function (e, t, n, r = {}) {
    let { window: i = document.defaultView, v5Compat: a = !1 } = r,
      o = i.history,
      s = `POP`,
      c = null,
      l = u();
    l ?? ((l = 0), o.replaceState({ ...o.state, idx: l }, ``));
    function u() {
      return (o.state || { idx: null }).idx;
    }
    function d() {
      s = `POP`;
      let e = u(),
        t = e == null ? null : e - l;
      ((l = e), c && c({ action: s, location: h.location, delta: t }));
    }
    function f(e, t) {
      s = `PUSH`;
      let r = dn(e) ? e : mn(h.location, e, t);
      (n && n(r, e), (l = u() + 1));
      let d = pn(r, l),
        f = h.createHref(r.mask || r);
      try {
        o.pushState(d, ``, f);
      } catch (e) {
        if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
        i.location.assign(f);
      }
      a && c && c({ action: s, location: h.location, delta: 1 });
    }
    function p(e, t) {
      s = `REPLACE`;
      let r = dn(e) ? e : mn(h.location, e, t);
      (n && n(r, e), (l = u()));
      let i = pn(r, l),
        d = h.createHref(r.mask || r);
      (o.replaceState(i, ``, d),
        a && c && c({ action: s, location: h.location, delta: 0 }));
    }
    function m(e) {
      return _n(i, e);
    }
    let h = {
      get action() {
        return s;
      },
      get location() {
        return e(i, o);
      },
      listen(e) {
        if (c) throw Error(`A history only accepts one active listener`);
        return (
          i.addEventListener(un, d),
          (c = e),
          () => {
            (i.removeEventListener(un, d), (c = null));
          }
        );
      },
      createHref: (e) => t(i, e),
      createURL: m,
      encodeLocation(e) {
        let t = m(e);
        return { pathname: t.pathname, search: t.search, hash: t.hash };
      },
      push: f,
      replace: p,
      go: (e) => o.go(e),
    };
    return h;
  })(
    function (e, t) {
      let n = t.state?.masked,
        { pathname: r, search: i, hash: a } = n || e.location;
      return mn(
        ``,
        { pathname: r, search: i, hash: a },
        (t.state && t.state.usr) || null,
        (t.state && t.state.key) || `default`,
        n
          ? {
              pathname: e.location.pathname,
              search: e.location.search,
              hash: e.location.hash,
            }
          : void 0
      );
    },
    function (e, t) {
      return typeof t == `string` ? t : hn(t);
    },
    null,
    e
  );
}
function Y(e, t) {
  if (!1 === e || e == null) throw Error(t);
}
function X(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function pn(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function mn(e, t, n = null, r, i) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? gn(t) : t),
    state: n,
    key: (t && t.key) || r || Math.random().toString(36).substring(2, 10),
    mask: i,
  };
}
function hn({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  );
}
function gn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function _n(e, t, n = !1) {
  let r = `http://localhost`;
  (e &&
    (r = e.location.origin === `null` ? e.location.href : e.location.origin),
    Y(r, `No window.location.(origin|href) available to create URL`));
  let i = typeof t == `string` ? t : hn(t);
  return (
    (i = i.replace(/ $/, `%20`)),
    !n && sn.test(i) && (i = r + i),
    new URL(i, r)
  );
}
var vn = class {
  constructor(e) {
    if ((rn(this, ln, new Map()), e)) for (let [t, n] of e) this.set(t, n);
  }
  get(e) {
    if (nn(this, ln).has(e)) return nn(this, ln).get(e);
    if (e.defaultValue !== void 0) return e.defaultValue;
    throw Error(`No value found for context`);
  }
  set(e, t) {
    nn(this, ln).set(e, t);
  }
};
ln = new WeakMap();
var yn = new Set([`lazy`, `caseSensitive`, `path`, `id`, `index`, `children`]),
  bn = new Set([
    `lazy`,
    `caseSensitive`,
    `path`,
    `id`,
    `index`,
    `middleware`,
    `children`,
  ]);
function xn(e) {
  return bn.has(e);
}
function Sn(e, t, n = [], r = {}, i = !1) {
  return e.map((e, a) => {
    let o = [...n, String(a)],
      s = typeof e.id == `string` ? e.id : o.join(`-`);
    if (
      (Y(
        !0 !== e.index || !e.children,
        `Cannot specify children on an index route`
      ),
      Y(
        i || !r[s],
        `Found a route id collision on id "${s}".  Route id's must be globally unique within Data Router usages`
      ),
      (function (e) {
        return !0 === e.index;
      })(e))
    ) {
      let n = { ...e, id: s };
      return ((r[s] = Cn(n, t(n))), n);
    }
    {
      let n = { ...e, id: s, children: void 0 };
      return (
        (r[s] = Cn(n, t(n))),
        e.children && (n.children = Sn(e.children, t, o, r, i)),
        n
      );
    }
  });
}
function Cn(e, t) {
  return Object.assign(e, {
    ...t,
    ...(typeof t.lazy == `object` && t.lazy != null
      ? { lazy: { ...e.lazy, ...t.lazy } }
      : {}),
  });
}
function wn(e, t, n = `/`) {
  return Tn(e, t, n, !1);
}
function Tn(e, t, n, r, i) {
  let a = Hn((typeof t == `string` ? gn(t) : t).pathname || `/`, n);
  if (a == null) return null;
  let o = i ?? Dn(e),
    s = null,
    c = (function (e) {
      try {
        return e
          .split(`/`)
          .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
          .join(`/`);
      } catch (t) {
        return (
          X(
            !1,
            `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
          ),
          e
        );
      }
    })(a);
  for (let e = 0; s == null && e < o.length; ++e) s = Rn(o[e], c, r);
  return s;
}
function En(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return {
    id: n.id,
    pathname: r,
    params: i,
    data: t[n.id],
    loaderData: t[n.id],
    handle: n.handle,
  };
}
function Dn(e) {
  let t = On(e);
  return (
    (function (e) {
      e.sort((e, t) =>
        e.score === t.score
          ? (function (e, t) {
              return e.length === t.length &&
                e.slice(0, -1).every((e, n) => e === t[n])
                ? e[e.length - 1] - t[t.length - 1]
                : 0;
            })(
              e.routesMeta.map((e) => e.childrenIndex),
              t.routesMeta.map((e) => e.childrenIndex)
            )
          : t.score - e.score
      );
    })(t),
    t
  );
}
function On(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: !0 === e.caseSensitive,
      childrenIndex: a,
      route: e,
    };
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return;
      (Y(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (c.relativePath = c.relativePath.slice(r.length)));
    }
    let l = Xn([r, c.relativePath]),
      u = n.concat(c);
    (e.children &&
      e.children.length > 0 &&
      (Y(
        !0 !== e.index,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`
      ),
      On(e.children, t, u, l, o)),
      (e.path != null || e.index) &&
        t.push({
          path: l,
          score: Ln(l, e.index),
          routesMeta: u.map((e, t) => {
            let [n, r] = Vn(
              e.relativePath,
              e.caseSensitive,
              t === u.length - 1
            );
            return { ...e, matcher: n, compiledParams: r };
          }),
        }));
  };
  return (
    e.forEach((e, t) => {
      if (e.path !== `` && e.path?.includes(`?`))
        for (let n of kn(e.path)) a(e, t, !0, n);
      else a(e, t);
    }),
    t
  );
}
function kn(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = kn(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
var An = /^:[\w-]+$/,
  jn = 3,
  Mn = 2,
  Nn = 1,
  Pn = 10,
  Fn = -2,
  In = (e) => e === `*`;
function Ln(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(In) && (r += Fn),
    t && (r += Mn),
    n
      .filter((e) => !In(e))
      .reduce((e, t) => e + (An.test(t) ? jn : t === `` ? Nn : Pn), r)
  );
}
function Rn(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = { path: s.relativePath, caseSensitive: s.caseSensitive, end: c },
      d =
        s.matcher && s.compiledParams
          ? Bn(u, l, s.matcher, s.compiledParams)
          : zn(u, l),
      f = s.route;
    if (
      (!d &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (d = zn(
          { path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 },
          l
        )),
      !d)
    )
      return null;
    (Object.assign(i, d.params),
      o.push({
        params: i,
        pathname: Xn([a, d.pathname]),
        pathnameBase: Qn(Xn([a, d.pathnameBase])),
        route: f,
      }),
      d.pathnameBase !== `/` && (a = Xn([a, d.pathnameBase])));
  }
  return o;
}
function zn(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Vn(e.path, e.caseSensitive, e.end);
  return Bn(e, t, n, r);
}
function Bn(e, t, n, r) {
  let i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let i = s[r];
      return ((e[t] = n && !i ? void 0 : (i || ``).replace(/%2F/g, `/`)), e);
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function Vn(e, t = !1, n = !0) {
  X(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`
  );
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
          if ((r.push({ paramName: t, isOptional: n != null }), n)) {
            let t = a.charAt(i + e.length);
            return t && t !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`;
          }
          return `/([^\\/]+)`;
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }),
        (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function Hn(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
var Un = (e) => on.test(e);
function Wn(e, t) {
  let n = Zn(t).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function Gn(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Kn(e) {
  return e.filter(
    (e, t) => t === 0 || (e.route.path && e.route.path.length > 0)
  );
}
function qn(e) {
  let t = Kn(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function Jn(e, t, n, r = !1) {
  let i;
  typeof e == `string`
    ? (i = gn(e))
    : ((i = { ...e }),
      Y(
        !i.pathname || !i.pathname.includes(`?`),
        Gn(`?`, `pathname`, `search`, i)
      ),
      Y(
        !i.pathname || !i.pathname.includes(`#`),
        Gn(`#`, `pathname`, `hash`, i)
      ),
      Y(!i.search || !i.search.includes(`#`), Gn(`#`, `search`, `hash`, i)));
  let a,
    o = e === `` || i.pathname === ``,
    s = o ? `/` : i.pathname;
  if (s == null) a = n;
  else {
    let e = t.length - 1;
    if (!r && s.startsWith(`..`)) {
      let t = s.split(`/`);
      for (; t[0] === `..`;) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    a = e >= 0 ? t[e] : `/`;
  }
  let c = (function (e, t = `/`) {
      let n,
        {
          pathname: r,
          search: i = ``,
          hash: a = ``,
        } = typeof e == `string` ? gn(e) : e;
      return (
        r
          ? ((r = Yn(r)),
            (n = r.startsWith(`/`) ? Wn(r.substring(1), `/`) : Wn(r, t)))
          : (n = t),
        { pathname: n, search: $n(i), hash: er(a) }
      );
    })(i, a),
    l = s && s !== `/` && s.endsWith(`/`),
    u = (o || s === `.`) && n.endsWith(`/`);
  return (c.pathname.endsWith(`/`) || (!l && !u) || (c.pathname += `/`), c);
}
var Yn = (e) => e.replace(/[\\/]{2,}/g, `/`),
  Xn = (e) => Yn(e.join(`/`)),
  Zn = (e) => e.replace(/\/+$/, ``),
  Qn = (e) => Zn(e).replace(/^\/*/, `/`),
  $n = (e) => (e && e !== `?` ? (e.startsWith(`?`) ? e : `?` + e) : ``),
  er = (e) => (e && e !== `#` ? (e.startsWith(`#`) ? e : `#` + e) : ``),
  tr = [
    `EvalError`,
    `RangeError`,
    `ReferenceError`,
    `SyntaxError`,
    `TypeError`,
    `URIError`,
  ],
  nr = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n));
    }
  };
function rr(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
function ir(e) {
  return Xn(e.map((e) => e.route.path).filter(Boolean)) || `/`;
}
var ar =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
function or(e, t) {
  let n = e;
  if (typeof n != `string` || !on.test(n))
    return { absoluteURL: void 0, isExternal: !1, to: n };
  let r = n,
    i = !1;
  if (ar)
    try {
      let e = new URL(window.location.href),
        r = sn.test(n) ? new URL(cn(n, e.protocol)) : new URL(n),
        a = Hn(r.pathname, t);
      r.origin === e.origin && a != null
        ? (n = a + r.search + r.hash)
        : (i = !0);
    } catch {
      X(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: i, to: n };
}
var sr = Symbol(`Uninstrumented`);
function cr(e, t) {
  let n = {
    lazy: [],
    'lazy.loader': [],
    'lazy.action': [],
    'lazy.middleware': [],
    middleware: [],
    loader: [],
    action: [],
  };
  e.forEach((e) =>
    e({
      id: t.id,
      index: t.index,
      path: t.path,
      instrument(e) {
        let t = Object.keys(n);
        for (let r of t) e[r] && n[r].push(e[r]);
      },
    })
  );
  let r = {};
  if (typeof t.lazy == `function` && n.lazy.length > 0) {
    let e = lr(n.lazy, t.lazy, () => {});
    e && (r.lazy = e);
  }
  if (typeof t.lazy == `object`) {
    let e = t.lazy;
    [`middleware`, `loader`, `action`].forEach((t) => {
      let i = e[t],
        a = n[`lazy.${t}`];
      if (typeof i == `function` && a.length > 0) {
        let e = lr(a, i, () => {});
        e && (r.lazy = Object.assign(r.lazy || {}, { [t]: e }));
      }
    });
  }
  return (
    [`loader`, `action`].forEach((e) => {
      let i = t[e];
      if (typeof i == `function` && n[e].length > 0) {
        let t = i[sr] ?? i,
          a = lr(n[e], t, (...e) => dr(e[0]));
        a &&
          (e === `loader` && !0 === t.hydrate && (a.hydrate = !0),
          (a[sr] = t),
          (r[e] = a));
      }
    }),
    t.middleware &&
      t.middleware.length > 0 &&
      n.middleware.length > 0 &&
      (r.middleware = t.middleware.map((e) => {
        let t = e[sr] ?? e,
          r = lr(n.middleware, t, (...e) => dr(e[0]));
        return r ? ((r[sr] = t), r) : e;
      })),
    r
  );
}
function lr(e, t, n) {
  return e.length === 0
    ? null
    : async (...r) => {
        let i = await ur(e, n(...r), () => t(...r), e.length - 1);
        if (i.type === `error`) throw i.value;
        return i.value;
      };
}
async function ur(e, t, n, r) {
  let i,
    a = e[r];
  if (a) {
    let o,
      s = async () => (
        o
          ? console.error(
              `You cannot call instrumented handlers more than once`
            )
          : (o = ur(e, t, n, r - 1)),
        (i = await o),
        Y(i, `Expected a result`),
        i.type === `error` && i.value instanceof Error
          ? { status: `error`, error: i.value }
          : { status: `success`, error: void 0 }
      );
    try {
      await a(s, t);
    } catch (e) {
      console.error(`An instrumentation function threw an error:`, e);
    }
    (o || (await s()), await o);
  } else
    try {
      i = { type: `success`, value: await n() };
    } catch (e) {
      i = { type: `error`, value: e };
    }
  return (
    i || {
      type: `error`,
      value: Error(`No result assigned in instrumentation chain.`),
    }
  );
}
function dr(e) {
  let { request: t, context: n, params: r, pattern: i } = e;
  return { request: pr(t), params: { ...r }, pattern: i, context: mr(n) };
}
function fr(e, t) {
  return {
    currentUrl: hn(e.state.location),
    ...(`formMethod` in t ? { formMethod: t.formMethod } : {}),
    ...(`formEncType` in t ? { formEncType: t.formEncType } : {}),
    ...(`formData` in t ? { formData: t.formData } : {}),
    ...(`body` in t ? { body: t.body } : {}),
  };
}
function pr(e) {
  return {
    method: e.method,
    url: e.url,
    headers: { get: (...t) => e.headers.get(...t) },
  };
}
function mr(e) {
  if (
    (function (e) {
      if (typeof e != `object` || !e) return !1;
      let t = Object.getPrototypeOf(e);
      return (
        t === Object.prototype ||
        t === null ||
        Object.getOwnPropertyNames(t).sort().join(`\0`) === hr
      );
    })(e)
  ) {
    let t = { ...e };
    return (Object.freeze(t), t);
  }
  return { get: (t) => e.get(t) };
}
var hr = Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`),
  gr,
  _r,
  vr,
  yr,
  br = [`POST`, `PUT`, `PATCH`, `DELETE`],
  xr = new Set(br),
  Sr = [`GET`, ...br],
  Cr = new Set(Sr),
  wr = new Set([301, 302, 303, 307, 308]),
  Tr = new Set([307, 308]),
  Er = {
    state: `idle`,
    location: void 0,
    matches: void 0,
    historyAction: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Dr = {
    state: `idle`,
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Or = { state: `unblocked`, proceed: void 0, reset: void 0, location: void 0 },
  kr = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  Ar = `remix-router-transitions`,
  jr = Symbol(`ResetLoaderData`),
  Mr = class {
    constructor(e) {
      (rn(this, gr),
        rn(this, _r),
        rn(this, vr),
        rn(this, yr),
        an(this, gr, e),
        an(this, _r, Dn(e)));
    }
    get stableRoutes() {
      return nn(this, gr);
    }
    get activeRoutes() {
      return nn(this, vr) ?? nn(this, gr);
    }
    get branches() {
      return nn(this, yr) ?? nn(this, _r);
    }
    get hasHMRRoutes() {
      return nn(this, vr) != null;
    }
    setRoutes(e) {
      (an(this, gr, e), an(this, _r, Dn(e)));
    }
    setHmrRoutes(e) {
      (an(this, vr, e), an(this, yr, Dn(e)));
    }
    commitHmrRoutes() {
      nn(this, vr) &&
        (an(this, gr, nn(this, vr)),
        an(this, _r, nn(this, yr)),
        an(this, vr, void 0),
        an(this, yr, void 0));
    }
  };
function Nr(e) {
  let t = e.window ? e.window : typeof window < `u` ? window : void 0,
    n =
      t !== void 0 &&
      t.document !== void 0 &&
      t.document.createElement !== void 0;
  Y(
    e.routes.length > 0,
    `You must provide a non-empty routes array to createRouter`
  );
  let r = e.hydrationRouteProperties || [],
    i = e.mapRouteProperties || kr,
    a = i;
  if (e.instrumentations) {
    let t = e.instrumentations;
    a = (e) => ({ ...i(e), ...cr(t.map((e) => e.route).filter(Boolean), e) });
  }
  let o = {},
    s = new Mr(Sn(e.routes, a, void 0, o)),
    c = e.basename || `/`;
  c.startsWith(`/`) || (c = `/${c}`);
  let l,
    u,
    d,
    f = e.dataStrategy || Kr,
    p = { ...e.future },
    m = null,
    h = new Set(),
    g = null,
    _ = null,
    v = null,
    y = null,
    b = e.hydrationData != null,
    x = Tn(s.activeRoutes, e.history.location, c, !1, s.branches),
    S = !1,
    C = null;
  if (x != null || e.patchRoutesOnNavigation)
    if (
      (x &&
        !e.hydrationData &&
        Ce(x, s.activeRoutes, e.history.location.pathname).active &&
        (x = null),
      x)
    )
      if (x.some((e) => e.route.lazy)) ((l = !1), (u = !l));
      else if (x.some((e) => Lr(e.route))) {
        let t = e.hydrationData ? e.hydrationData.loaderData : null,
          n = e.hydrationData ? e.hydrationData.errors : null,
          r = x;
        if (n) {
          let e = x.findIndex((e) => n[e.route.id] !== void 0);
          r = r.slice(0, e + 1);
        }
        ((u = !1),
          (l = !0),
          r.forEach((e) => {
            let r = Rr(e.route, t, n);
            ((u ||= r.renderFallback), (l &&= !r.shouldLoad));
          }));
      } else ((l = !0), (u = !l));
    else {
      ((l = !1), (u = !l), (x = []));
      let t = Ce(null, s.activeRoutes, e.history.location.pathname);
      t.active && t.matches && ((S = !0), (x = t.matches));
    }
  else {
    let t = fi(404, { pathname: e.history.location.pathname }),
      { matches: n, route: r } = di(s.activeRoutes);
    ((l = !0), (u = !l), (x = n), (C = { [r.id]: t }));
  }
  let w,
    T,
    E = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: x,
      initialized: l,
      renderFallback: u,
      navigation: Er,
      restoreScrollPosition: e.hydrationData == null && null,
      preventScrollReset: !1,
      revalidation: `idle`,
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || C,
      fetchers: new Map(),
      blockers: new Map(),
    },
    D = `POP`,
    O = null,
    k = !1,
    A = !1,
    j = new Map(),
    M = null,
    N = !1,
    P = !1,
    F = new Set(),
    I = new Map(),
    ee = 0,
    te = -1,
    ne = new Map(),
    re = new Set(),
    ie = new Map(),
    L = new Map(),
    R = new Set(),
    z = new Map(),
    ae = null;
  function B(e, t = {}) {
    ((e.matches &&= e.matches.map((e) => {
      let t = o[e.route.id],
        n = e.route;
      return n.element !== t.element ||
        n.errorElement !== t.errorElement ||
        n.hydrateFallbackElement !== t.hydrateFallbackElement
        ? { ...e, route: t }
        : e;
    })),
      (E = { ...E, ...e }));
    let n = [],
      r = [];
    (E.fetchers.forEach((e, t) => {
      e.state === `idle` && (R.has(t) ? n.push(t) : r.push(t));
    }),
      R.forEach((e) => {
        E.fetchers.has(e) || I.has(e) || n.push(e);
      }),
      h.size === 0 && (g = { newErrors: e.errors ?? null }),
      [...h].forEach((r) =>
        r(E, {
          deletedFetchers: n,
          newErrors: e.errors ?? null,
          viewTransitionOpts: t.viewTransitionOpts,
          flushSync: !0 === t.flushSync,
        })
      ),
      n.forEach((e) => fe(E.fetchers, e)),
      r.forEach((e) => E.fetchers.delete(e)));
  }
  function V(t, n, { flushSync: r } = {}) {
    let i,
      a =
        E.actionData != null &&
        E.navigation.formMethod != null &&
        Z(E.navigation.formMethod) &&
        E.navigation.state === `loading` &&
        !0 !== t.state?._isRedirect;
    i = n.actionData
      ? Object.keys(n.actionData).length > 0
        ? n.actionData
        : null
      : a
        ? E.actionData
        : null;
    let o = n.loaderData
        ? ci(E.loaderData, n.loaderData, n.matches || [], n.errors)
        : E.loaderData,
      c = E.blockers;
    c.size > 0 && ((c = new Map(c)), c.forEach((e, t) => c.set(t, Or)));
    let l,
      u = !N && Se(t, n.matches || E.matches),
      d =
        !0 === k ||
        (E.navigation.formMethod != null &&
          Z(E.navigation.formMethod) &&
          !0 !== t.state?._isRedirect);
    if (
      (s.commitHmrRoutes(),
      N ||
        D === `POP` ||
        (D === `PUSH`
          ? e.history.push(t, t.state)
          : D === `REPLACE` && e.history.replace(t, t.state)),
      D === `POP`)
    ) {
      let e = j.get(E.location.pathname);
      e && e.has(t.pathname)
        ? (l = { currentLocation: E.location, nextLocation: t })
        : j.has(t.pathname) &&
          (l = { currentLocation: t, nextLocation: E.location });
    } else if (A) {
      let e = j.get(E.location.pathname);
      (e
        ? e.add(t.pathname)
        : ((e = new Set([t.pathname])), j.set(E.location.pathname, e)),
        (l = { currentLocation: E.location, nextLocation: t }));
    }
    (B(
      {
        ...n,
        actionData: i,
        loaderData: o,
        historyAction: D,
        location: t,
        initialized: !0,
        renderFallback: !1,
        navigation: Er,
        revalidation: `idle`,
        restoreScrollPosition: u,
        preventScrollReset: d,
        blockers: c,
      },
      { viewTransitionOpts: l, flushSync: !0 === r }
    ),
      (D = `POP`),
      (k = !1),
      (A = !1),
      (N = !1),
      (P = !1),
      O?.resolve(),
      (O = null),
      ae?.resolve(),
      (ae = null));
  }
  async function H(t, n, i) {
    (w && w.abort(),
      (w = null),
      (D = t),
      (N = !0 === (i && i.startUninterruptedRevalidation)),
      (function (e, t) {
        if (_ && y) {
          let n = xe(e, t);
          _[n] = y();
        }
      })(E.location, E.matches),
      (k = !0 === (i && i.preventScrollReset)),
      (A = !0 === (i && i.enableViewTransition)));
    let l = s.activeRoutes,
      u =
        i?.initialHydration && E.matches && E.matches.length > 0 && !S
          ? E.matches
          : Tn(l, n, c, !1, s.branches),
      d = !0 === (i && i.flushSync);
    if (
      u &&
      E.initialized &&
      !P &&
      (function (e, t) {
        return e.pathname !== t.pathname || e.search !== t.search
          ? !1
          : e.hash === ``
            ? t.hash !== ``
            : e.hash === t.hash || t.hash !== ``;
      })(E.location, n) &&
      !(i && i.submission && Z(i.submission.formMethod))
    )
      return void V(n, { matches: u }, { flushSync: d });
    let f = Ce(u, l, n.pathname);
    if ((f.active && f.matches && (u = f.matches), !u)) {
      let { error: e, notFoundMatches: t, route: r } = be(n.pathname);
      V(
        n,
        { matches: t, loaderData: {}, errors: { [r.id]: e } },
        { flushSync: d }
      );
      return;
    }
    let p =
      i && i.overrideNavigation
        ? { ...i.overrideNavigation, matches: u, historyAction: t }
        : void 0;
    w = new AbortController();
    let m,
      h = ri(e.history, n, w.signal, i && i.submission),
      g = e.getContext ? await e.getContext() : new vn();
    if (i && i.pendingError)
      m = [ui(u).route.id, { type: `error`, error: i.pendingError }];
    else if (i && i.submission && Z(i.submission.formMethod)) {
      let l = await (async function (t, n, i, l, u, d, f, p, m = {}) {
        if (
          (le(),
          B({ navigation: Ti(n, l, u, i) }, { flushSync: !0 === m.flushSync }),
          f)
        ) {
          let e = await W(l, n.pathname, t.signal);
          if (e.type === `aborted`) return { shortCircuited: !0 };
          if (e.type === `error`) {
            if (e.partialMatches.length === 0) {
              let { matches: t, route: n } = di(s.activeRoutes);
              return {
                matches: t,
                pendingActionResult: [n.id, { type: `error`, error: e.error }],
              };
            }
            let t = ui(e.partialMatches).route.id;
            return {
              matches: e.partialMatches,
              pendingActionResult: [t, { type: `error`, error: e.error }],
            };
          }
          if (!e.matches) {
            let { notFoundMatches: e, error: t, route: r } = be(n.pathname);
            return {
              matches: e,
              pendingActionResult: [r.id, { type: `error`, error: t }],
            };
          }
          l = e.matches;
        }
        let h,
          g = Si(l, n);
        if (g.route.action || g.route.lazy) {
          let e = await ce(t, n, Zr(a, o, t, n, l, g, p ? [] : r, d), d, null);
          if (((h = e[g.route.id]), !h)) {
            for (let t of l)
              if (e[t.route.id]) {
                h = e[t.route.id];
                break;
              }
          }
          if (t.signal.aborted) return { shortCircuited: !0 };
        } else
          h = {
            type: `error`,
            error: fi(405, {
              method: t.method,
              pathname: n.pathname,
              routeId: g.route.id,
            }),
          };
        if (vi(h)) {
          let n;
          return (
            (n =
              m && m.replace != null
                ? m.replace
                : ni(
                    h.response.headers.get(`Location`),
                    new URL(t.url),
                    c,
                    e.history
                  ) ===
                  E.location.pathname + E.location.search),
            await se(t, h, !0, { submission: i, replace: n }),
            { shortCircuited: !0 }
          );
        }
        if (_i(h)) {
          let e = ui(l, g.route.id);
          return (
            !0 !== (m && m.replace) && (D = `PUSH`),
            { matches: l, pendingActionResult: [e.route.id, h, g.route.id] }
          );
        }
        return { matches: l, pendingActionResult: [g.route.id, h] };
      })(
        h,
        n,
        i.submission,
        u,
        t,
        g,
        f.active,
        i && !0 === i.initialHydration,
        { replace: i.replace, flushSync: d }
      );
      if (l.shortCircuited) return;
      if (l.pendingActionResult) {
        let [e, t] = l.pendingActionResult;
        if (_i(t) && rr(t.error) && t.error.status === 404)
          return (
            (w = null),
            void V(n, {
              matches: l.matches,
              loaderData: {},
              errors: { [e]: t.error },
            })
          );
      }
      ((u = l.matches || u),
        (m = l.pendingActionResult),
        (p = wi(n, u, t, i.submission)),
        (d = !1),
        (f.active = !1),
        (h = ri(e.history, h.url, h.signal)));
    }
    let {
      shortCircuited: v,
      matches: b,
      loaderData: x,
      errors: C,
      workingFetchers: T,
    } = await (async function (t, n, i, l, u, d, f, p, m, h, g, _, v, y) {
      let b = f || wi(n, i, l, p),
        x = p || m || Ci(b),
        S = !N && !g;
      if (d) {
        if (S) {
          let e = oe(v);
          B(
            { navigation: b, ...(e === void 0 ? {} : { actionData: e }) },
            { flushSync: _ }
          );
        }
        let e = await W(i, n.pathname, t.signal);
        if (e.type === `aborted`) return { shortCircuited: !0 };
        if (e.type === `error`) {
          if (e.partialMatches.length === 0) {
            let { matches: t, route: n } = di(s.activeRoutes);
            return { matches: t, loaderData: {}, errors: { [n.id]: e.error } };
          }
          let t = ui(e.partialMatches).route.id;
          return {
            matches: e.partialMatches,
            loaderData: {},
            errors: { [t]: e.error },
          };
        }
        if (!e.matches) {
          let { error: e, notFoundMatches: t, route: r } = be(n.pathname);
          return { matches: t, loaderData: {}, errors: { [r.id]: e } };
        }
        i = e.matches;
      }
      let C = s.activeRoutes,
        { dsMatches: T, revalidatingFetchers: D } = Ir(
          t,
          u,
          a,
          o,
          e.history,
          E,
          i,
          x,
          n,
          g ? [] : r,
          !0 === g,
          P,
          F,
          R,
          ie,
          re,
          C,
          c,
          e.patchRoutesOnNavigation != null,
          s.branches,
          v,
          y
        );
      if (
        ((te = ++ee),
        !e.dataStrategy &&
          !T.some((e) => e.shouldLoad) &&
          !T.some((e) => e.route.middleware && e.route.middleware.length > 0) &&
          D.length === 0)
      ) {
        let e = new Map(E.fetchers),
          t = he(e);
        return (
          V(
            n,
            {
              matches: i,
              loaderData: {},
              errors: v && _i(v[1]) ? { [v[0]]: v[1].error } : null,
              ...li(v),
              ...(t ? { fetchers: e } : {}),
            },
            { flushSync: _ }
          ),
          { shortCircuited: !0 }
        );
      }
      if (S) {
        let e = {};
        if (!d) {
          e.navigation = b;
          let t = oe(v);
          t !== void 0 && (e.actionData = t);
        }
        (D.length > 0 &&
          (e.fetchers = (function (e) {
            let t = new Map(E.fetchers);
            return (
              e.forEach((e) => {
                let n = t.get(e.key),
                  r = Ei(void 0, n ? n.data : void 0);
                t.set(e.key, r);
              }),
              t
            );
          })(D)),
          B(e, { flushSync: _ }));
      }
      D.forEach((e) => {
        (pe(e.key), e.controller && I.set(e.key, e.controller));
      });
      let O = () => D.forEach((e) => pe(e.key));
      w && w.signal.addEventListener(`abort`, O);
      let { loaderResults: k, fetcherResults: A } = await U(T, D, t, n, u);
      if (t.signal.aborted) return { shortCircuited: !0 };
      (w && w.signal.removeEventListener(`abort`, O),
        D.forEach((e) => I.delete(e.key)));
      let j = pi(k);
      if (j)
        return (
          await se(t, j.result, !0, { replace: h }),
          { shortCircuited: !0 }
        );
      if (((j = pi(A)), j))
        return (
          re.add(j.key),
          await se(t, j.result, !0, { replace: h }),
          { shortCircuited: !0 }
        );
      let M = new Map(E.fetchers),
        { loaderData: ne, errors: L } = si(E, i, k, v, D, A, M);
      g && E.errors && (L = { ...E.errors, ...L });
      let z = he(M),
        ae = ge(te, M),
        H = z || ae || D.length > 0;
      return {
        matches: i,
        loaderData: ne,
        errors: L,
        ...(H ? { workingFetchers: M } : {}),
      };
    })(
      h,
      n,
      u,
      t,
      g,
      f.active,
      p,
      i && i.submission,
      i && i.fetcherSubmission,
      i && i.replace,
      i && !0 === i.initialHydration,
      d,
      m,
      i && i.callSiteDefaultShouldRevalidate
    );
    v ||
      ((w = null),
      V(n, {
        matches: b || u,
        ...li(m),
        loaderData: x,
        errors: C,
        ...(T ? { fetchers: T } : {}),
      }));
  }
  function oe(e) {
    return e && !_i(e[1])
      ? { [e[0]]: e[1].data }
      : E.actionData
        ? Object.keys(E.actionData).length === 0
          ? null
          : E.actionData
        : void 0;
  }
  async function se(
    r,
    i,
    a,
    {
      submission: o,
      fetcherSubmission: s,
      preventScrollReset: l,
      replace: u,
    } = {}
  ) {
    (a || (O?.resolve(), (O = null)),
      i.response.headers.has(`X-Remix-Revalidate`) && (P = !0));
    let d = i.response.headers.get(`Location`);
    (Y(d, `Expected a Location header on the redirect Response`),
      (d = ni(d, new URL(r.url), c, e.history)));
    let f = mn(E.location, d, { _isRedirect: !0 });
    if (n) {
      let e = !1;
      if (i.response.headers.has(`X-Remix-Reload-Document`)) e = !0;
      else if (Un(d)) {
        let n = _n(t, d, !0);
        e = n.origin !== t.location.origin || Hn(n.pathname, c) == null;
      }
      if (e) return void (u ? t.location.replace(d) : t.location.assign(d));
    }
    w = null;
    let p =
        !0 === u || i.response.headers.has(`X-Remix-Replace`)
          ? `REPLACE`
          : `PUSH`,
      { formMethod: m, formAction: h, formEncType: g } = E.navigation;
    !o && !s && m && h && g && (o = Ci(E.navigation));
    let _ = o || s;
    Tr.has(i.response.status) && _ && Z(_.formMethod)
      ? await H(p, f, {
          submission: { ..._, formAction: d },
          preventScrollReset: l || k,
          enableViewTransition: a ? A : void 0,
        })
      : await H(p, f, {
          overrideNavigation: wi(f, [], p, o),
          fetcherSubmission: s,
          preventScrollReset: l || k,
          enableViewTransition: a ? A : void 0,
        });
  }
  async function ce(e, t, n, r, i) {
    let a,
      o = {};
    try {
      a = await (async function (e, t, n, r, i, a, o) {
        r.some((e) => e._lazyPromises?.middleware) &&
          (await Promise.all(r.map((e) => e._lazyPromises?.middleware)));
        let s = {
            request: t,
            url: ii(t, n),
            pattern: ir(r),
            params: r[0].params,
            context: a,
            matches: r,
          },
          c = o
            ? () => {
                throw Error(
                  'You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`'
                );
              }
            : (e) => {
                let t = s;
                return qr(t, () =>
                  e({
                    ...t,
                    fetcherKey: i,
                    runClientMiddleware: () => {
                      throw Error(
                        'Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler'
                      );
                    },
                  })
                );
              },
          l = await e({ ...s, fetcherKey: i, runClientMiddleware: c });
        try {
          await Promise.all(
            r.flatMap((e) => [e._lazyPromises?.handler, e._lazyPromises?.route])
          );
        } catch {}
        return l;
      })(f, e, t, n, i, r, !1);
    } catch (e) {
      return (
        n
          .filter((e) => e.shouldLoad)
          .forEach((t) => {
            o[t.route.id] = { type: `error`, error: e };
          }),
        o
      );
    }
    if (e.signal.aborted) return o;
    if (!Z(e.method))
      for (let e of n) {
        if (a[e.route.id]?.type === `error`) break;
        a.hasOwnProperty(e.route.id) ||
          E.loaderData.hasOwnProperty(e.route.id) ||
          (E.errors && E.errors.hasOwnProperty(e.route.id)) ||
          !e.shouldCallHandler() ||
          (a[e.route.id] = {
            type: `error`,
            result: Error(
              `No result returned from dataStrategy for route ${e.route.id}`
            ),
          });
      }
    for (let [t, r] of Object.entries(a))
      if (gi(r)) {
        let i = r.result;
        o[t] = { type: `redirect`, response: $r(i, e, t, n, c) };
      } else o[t] = await Qr(r);
    return o;
  }
  async function U(e, t, n, r, i) {
    let a = ce(n, r, e, i, null),
      o = Promise.all(
        t.map(async (e) => {
          if (e.matches && e.match && e.request && e.controller) {
            let t = (await ce(e.request, e.path, e.matches, i, e.key))[
              e.match.route.id
            ];
            return { [e.key]: t };
          }
          return Promise.resolve({
            [e.key]: { type: `error`, error: fi(404, { pathname: e.path }) },
          });
        })
      );
    return {
      loaderResults: await a,
      fetcherResults: (await o).reduce((e, t) => Object.assign(e, t), {}),
    };
  }
  function le() {
    ((P = !0),
      ie.forEach((e, t) => {
        (I.has(t) && F.add(t), pe(t));
      }));
  }
  function ue(e, t, n = {}) {
    let r = new Map(E.fetchers);
    (r.set(e, t), B({ fetchers: r }, { flushSync: !0 === (n && n.flushSync) }));
  }
  function de(e, t, n, r = {}) {
    let i = ui(E.matches, t),
      a = new Map(E.fetchers);
    (fe(a, e),
      B(
        { errors: { [i.route.id]: n }, fetchers: a },
        { flushSync: !0 === (r && r.flushSync) }
      ));
  }
  function fe(e, t) {
    let n = E.fetchers.get(t);
    (!I.has(t) || (n && n.state === `loading` && ne.has(t)) || pe(t),
      ie.delete(t),
      ne.delete(t),
      re.delete(t),
      R.delete(t),
      F.delete(t),
      e.delete(t));
  }
  function pe(e, t) {
    let n = I.get(e);
    n && (n.abort(t), I.delete(e));
  }
  function me(e, t) {
    for (let n of e) {
      let e = t.get(n);
      Y(e, `Expected fetcher: ${n}`);
      let r = Di(e.data);
      t.set(n, r);
    }
  }
  function he(e) {
    let t = [],
      n = !1;
    for (let r of re) {
      let i = e.get(r);
      (Y(i, `Expected fetcher: ${r}`),
        i.state === `loading` && (re.delete(r), t.push(r), (n = !0)));
    }
    return (me(t, e), n);
  }
  function ge(e, t) {
    let n = [];
    for (let [r, i] of ne)
      if (i < e) {
        let e = t.get(r);
        (Y(e, `Expected fetcher: ${r}`),
          e.state === `loading` && (pe(r), ne.delete(r), n.push(r)));
      }
    return (me(n, t), n.length > 0);
  }
  function _e(e) {
    (E.blockers.delete(e), z.delete(e));
  }
  function ve(e, t) {
    let n = E.blockers.get(e) || Or;
    Y(
      (n.state === `unblocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `proceeding`) ||
        (n.state === `blocked` && t.state === `unblocked`) ||
        (n.state === `proceeding` && t.state === `unblocked`),
      `Invalid blocker state transition: ${n.state} -> ${t.state}`
    );
    let r = new Map(E.blockers);
    (r.set(e, t), B({ blockers: r }));
  }
  function ye({ currentLocation: e, nextLocation: t, historyAction: n }) {
    if (z.size === 0) return;
    z.size > 1 && X(!1, `A router only supports one blocker at a time`);
    let r = Array.from(z.entries()),
      [i, a] = r[r.length - 1],
      o = E.blockers.get(i);
    return o && o.state === `proceeding`
      ? void 0
      : a({ currentLocation: e, nextLocation: t, historyAction: n })
        ? i
        : void 0;
  }
  function be(e) {
    let t = fi(404, { pathname: e }),
      n = s.activeRoutes,
      { matches: r, route: i } = di(n);
    return { notFoundMatches: r, route: i, error: t };
  }
  function xe(e, t) {
    return (
      (v &&
        v(
          e,
          t.map((e) => En(e, E.loaderData))
        )) ||
      e.key
    );
  }
  function Se(e, t) {
    if (_) {
      let n = xe(e, t),
        r = _[n];
      if (typeof r == `number`) return r;
    }
    return null;
  }
  function Ce(t, n, r) {
    if (e.patchRoutesOnNavigation) {
      let e = s.branches;
      if (!t) return { active: !0, matches: Tn(n, r, c, !0, e) || [] };
      if (Object.keys(t[0].params).length > 0)
        return { active: !0, matches: Tn(n, r, c, !0, e) };
    }
    return { active: !1, matches: null };
  }
  async function W(t, n, r, i) {
    if (!e.patchRoutesOnNavigation) return { type: `success`, matches: t };
    let l = t;
    for (;;) {
      let t = o;
      try {
        await e.patchRoutesOnNavigation({
          signal: r,
          path: n,
          matches: l,
          fetcherKey: i,
          patch: (e, n) => {
            r.aborted || Br(e, n, s, t, a, !1);
          },
        });
      } catch (e) {
        return { type: `error`, error: e, partialMatches: l };
      }
      if (r.aborted) return { type: `aborted` };
      let u = s.branches,
        d = Tn(s.activeRoutes, n, c, !1, u),
        f = null;
      if (
        d &&
        (Object.keys(d[0].params).length === 0 ||
          ((f = Tn(s.activeRoutes, n, c, !0, u)),
          !(f && l.length < f.length && G(l, f.slice(0, l.length)))))
      )
        return { type: `success`, matches: d };
      if (((f ||= Tn(s.activeRoutes, n, c, !0, u)), !f || G(l, f)))
        return { type: `success`, matches: null };
      l = f;
    }
  }
  function G(e, t) {
    return (
      e.length === t.length && e.every((e, n) => e.route.id === t[n].route.id)
    );
  }
  return (
    (d = {
      get basename() {
        return c;
      },
      get future() {
        return p;
      },
      get state() {
        return E;
      },
      get routes() {
        return s.stableRoutes;
      },
      get branches() {
        return s.branches;
      },
      get manifest() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: function () {
        if (
          ((m = e.history.listen(({ action: t, location: n, delta: r }) => {
            if (T) return (T(), void (T = void 0));
            X(
              z.size === 0 || r != null,
              'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.'
            );
            let i = ye({
              currentLocation: E.location,
              nextLocation: n,
              historyAction: t,
            });
            if (i && r != null) {
              let t = new Promise((e) => {
                T = e;
              });
              (e.history.go(-1 * r),
                ve(i, {
                  state: `blocked`,
                  location: n,
                  proceed() {
                    (ve(i, {
                      state: `proceeding`,
                      proceed: void 0,
                      reset: void 0,
                      location: n,
                    }),
                      t.then(() => e.history.go(r)));
                  },
                  reset() {
                    let e = new Map(E.blockers);
                    (e.set(i, Or), B({ blockers: e }));
                  },
                }),
                O?.resolve(),
                (O = null));
              return;
            }
            return H(t, n);
          })),
          n)
        ) {
          (function (e, t) {
            try {
              let n = e.sessionStorage.getItem(Ar);
              if (n) {
                let e = JSON.parse(n);
                for (let [n, r] of Object.entries(e || {}))
                  r && Array.isArray(r) && t.set(n, new Set(r || []));
              }
            } catch {}
          })(t, j);
          let e = () =>
            (function (e, t) {
              if (t.size > 0) {
                let n = {};
                for (let [e, r] of t) n[e] = [...r];
                try {
                  e.sessionStorage.setItem(Ar, JSON.stringify(n));
                } catch (e) {
                  X(
                    !1,
                    `Failed to save applied view transitions in sessionStorage (${e}).`
                  );
                }
              }
            })(t, j);
          (t.addEventListener(`pagehide`, e),
            (M = () => t.removeEventListener(`pagehide`, e)));
        }
        return (
          E.initialized || H(`POP`, E.location, { initialHydration: !0 }),
          d
        );
      },
      subscribe: function (e) {
        if ((h.add(e), g)) {
          let { newErrors: t } = g;
          ((g = null),
            e(E, {
              deletedFetchers: [],
              newErrors: t,
              viewTransitionOpts: void 0,
              flushSync: !1,
            }));
        }
        return () => h.delete(e);
      },
      enableScrollRestoration: function (e, t, n) {
        if (((_ = e), (y = t), (v = n || null), !b && E.navigation === Er)) {
          b = !0;
          let e = Se(E.location, E.matches);
          e != null && B({ restoreScrollPosition: e });
        }
        return () => {
          ((_ = null), (y = null), (v = null));
        };
      },
      navigate: async function t(n, r) {
        if ((O?.resolve(), (O = null), typeof n == `number`)) {
          O ||= Oi();
          let t = O.promise;
          return (e.history.go(n), t);
        }
        let i,
          {
            path: a,
            submission: o,
            error: s,
          } = Fr(
            !1,
            Pr(E.location, E.matches, c, n, r?.fromRouteId, r?.relative),
            r
          );
        r?.mask &&
          (i = {
            pathname: ``,
            search: ``,
            hash: ``,
            ...(typeof r.mask == `string`
              ? gn(r.mask)
              : { ...E.location.mask, ...r.mask }),
          });
        let l = E.location,
          u = mn(l, a, r && r.state, void 0, i);
        u = { ...u, ...e.history.encodeLocation(u) };
        let d = r && r.replace != null ? r.replace : void 0,
          f = `PUSH`;
        !0 === d
          ? (f = `REPLACE`)
          : !1 === d ||
            (o != null &&
              Z(o.formMethod) &&
              o.formAction === E.location.pathname + E.location.search &&
              (f = `REPLACE`));
        let p =
            r && `preventScrollReset` in r
              ? !0 === r.preventScrollReset
              : void 0,
          m = !0 === (r && r.flushSync),
          h = ye({ currentLocation: l, nextLocation: u, historyAction: f });
        h
          ? ve(h, {
              state: `blocked`,
              location: u,
              proceed() {
                (ve(h, {
                  state: `proceeding`,
                  proceed: void 0,
                  reset: void 0,
                  location: u,
                }),
                  t(n, r));
              },
              reset() {
                let e = new Map(E.blockers);
                (e.set(h, Or), B({ blockers: e }));
              },
            })
          : await H(f, u, {
              submission: o,
              pendingError: s,
              preventScrollReset: p,
              replace: r && r.replace,
              enableViewTransition: r && r.viewTransition,
              flushSync: m,
              callSiteDefaultShouldRevalidate: r && r.defaultShouldRevalidate,
            });
      },
      fetch: async function (t, n, i, l) {
        pe(t);
        let u = !0 === (l && l.flushSync),
          d = s.activeRoutes,
          f = Pr(E.location, E.matches, c, i, n, l?.relative),
          p = Tn(d, f, c, !1, s.branches),
          m = Ce(p, d, f);
        if ((m.active && m.matches && (p = m.matches), !p))
          return void de(t, n, fi(404, { pathname: f }), { flushSync: u });
        let { path: h, submission: g, error: _ } = Fr(!0, f, l);
        if (_) return void de(t, n, _, { flushSync: u });
        let v = e.getContext ? await e.getContext() : new vn(),
          y = !0 === (l && l.preventScrollReset);
        g && Z(g.formMethod)
          ? await (async function (t, n, i, l, u, d, f, p, m, h) {
              (le(),
                ie.delete(t),
                ue(
                  t,
                  (function (e, t) {
                    return {
                      state: `submitting`,
                      formMethod: e.formMethod,
                      formAction: e.formAction,
                      formEncType: e.formEncType,
                      formData: e.formData,
                      json: e.json,
                      text: e.text,
                      data: t ? t.data : void 0,
                    };
                  })(m, E.fetchers.get(t)),
                  { flushSync: f }
                ));
              let g = new AbortController(),
                _ = ri(e.history, i, g.signal, m);
              if (d) {
                let e = await W(l, new URL(_.url).pathname, _.signal, t);
                if (e.type === `aborted`) return;
                if (e.type === `error`)
                  return void de(t, n, e.error, { flushSync: f });
                if (!e.matches)
                  return void de(t, n, fi(404, { pathname: i }), {
                    flushSync: f,
                  });
                l = e.matches;
              }
              let v = Si(l, i);
              if (!v.route.action && !v.route.lazy)
                return void de(
                  t,
                  n,
                  fi(405, { method: m.formMethod, pathname: i, routeId: n }),
                  { flushSync: f }
                );
              I.set(t, g);
              let y = ee,
                b = Zr(a, o, _, i, l, v, r, u),
                x = await ce(_, i, b, u, t),
                S = x[v.route.id];
              if (!S) {
                for (let e of b)
                  if (x[e.route.id]) {
                    S = x[e.route.id];
                    break;
                  }
              }
              if (_.signal.aborted) return void (I.get(t) === g && I.delete(t));
              if (R.has(t)) {
                if (vi(S) || _i(S)) return void ue(t, Di(void 0));
              } else {
                if (vi(S))
                  return (
                    I.delete(t),
                    te > y
                      ? void ue(t, Di(void 0))
                      : (re.add(t),
                        ue(t, Ei(m)),
                        se(_, S, !1, {
                          fetcherSubmission: m,
                          preventScrollReset: p,
                        }))
                  );
                if (_i(S)) return void de(t, n, S.error);
              }
              let C = E.navigation.location || E.location,
                T = ri(e.history, C, g.signal),
                O = s.activeRoutes,
                k =
                  E.navigation.state === `idle`
                    ? E.matches
                    : Tn(O, E.navigation.location, c, !1, s.branches);
              Y(k, `Didn't find any matches after fetcher action`);
              let A = ++ee;
              ne.set(t, A);
              let { dsMatches: j, revalidatingFetchers: M } = Ir(
                  T,
                  u,
                  a,
                  o,
                  e.history,
                  E,
                  k,
                  m,
                  C,
                  r,
                  !1,
                  P,
                  F,
                  R,
                  ie,
                  re,
                  O,
                  c,
                  e.patchRoutesOnNavigation != null,
                  s.branches,
                  [v.route.id, S],
                  h
                ),
                N = Ei(m, S.data),
                L = new Map(E.fetchers);
              (L.set(t, N),
                M.filter((e) => e.key !== t).forEach((e) => {
                  let t = e.key,
                    n = L.get(t),
                    r = Ei(void 0, n ? n.data : void 0);
                  (L.set(t, r), pe(t), e.controller && I.set(t, e.controller));
                }),
                B({ fetchers: L }));
              let z = () => M.forEach((e) => pe(e.key));
              g.signal.addEventListener(`abort`, z);
              let { loaderResults: ae, fetcherResults: H } = await U(
                j,
                M,
                T,
                C,
                u
              );
              if (g.signal.aborted) return;
              (g.signal.removeEventListener(`abort`, z),
                ne.delete(t),
                I.delete(t),
                M.forEach((e) => I.delete(e.key)));
              let oe = E.fetchers.has(t),
                fe = (e) => {
                  if (!oe) return e;
                  let n = new Map(e.fetchers);
                  return (n.set(t, Di(S.data)), { ...e, fetchers: n });
                },
                me = pi(ae);
              if (me)
                return (
                  (E = fe(E)),
                  se(T, me.result, !1, { preventScrollReset: p })
                );
              if (((me = pi(H)), me))
                return (
                  re.add(me.key),
                  (E = fe(E)),
                  se(T, me.result, !1, { preventScrollReset: p })
                );
              let he = new Map(E.fetchers);
              oe && he.set(t, Di(S.data));
              let { loaderData: _e, errors: ve } = si(
                E,
                k,
                ae,
                void 0,
                M,
                H,
                he
              );
              (ge(A, he),
                E.navigation.state === `loading` && A > te
                  ? (Y(D, `Expected pending action`),
                    w && w.abort(),
                    V(E.navigation.location, {
                      matches: k,
                      loaderData: _e,
                      errors: ve,
                      fetchers: he,
                    }))
                  : (B({
                      errors: ve,
                      loaderData: ci(E.loaderData, _e, k, ve),
                      fetchers: he,
                    }),
                    (P = !1)));
            })(t, n, h, p, v, m.active, u, y, g, l && l.defaultShouldRevalidate)
          : (ie.set(t, { routeId: n, path: h }),
            await (async function (t, n, i, s, c, l, u, d, f) {
              let p = E.fetchers.get(t);
              ue(t, Ei(f, p ? p.data : void 0), { flushSync: u });
              let m = new AbortController(),
                h = ri(e.history, i, m.signal);
              if (l) {
                let e = await W(s, new URL(h.url).pathname, h.signal, t);
                if (e.type === `aborted`) return;
                if (e.type === `error`)
                  return void de(t, n, e.error, { flushSync: u });
                if (!e.matches)
                  return void de(t, n, fi(404, { pathname: i }), {
                    flushSync: u,
                  });
                s = e.matches;
              }
              let g = Si(s, i);
              I.set(t, m);
              let _ = ee,
                v = await ce(h, i, Zr(a, o, h, i, s, g, r, c), c, t),
                y = v[g.route.id];
              if (!y) {
                for (let e of s)
                  if (v[e.route.id]) {
                    y = v[e.route.id];
                    break;
                  }
              }
              if ((I.get(t) === m && I.delete(t), !h.signal.aborted)) {
                if (R.has(t)) return void ue(t, Di(void 0));
                if (vi(y))
                  return te > _
                    ? void ue(t, Di(void 0))
                    : (re.add(t),
                      void (await se(h, y, !1, { preventScrollReset: d })));
                if (_i(y)) return void de(t, n, y.error);
                ue(t, Di(y.data));
              }
            })(t, n, h, p, v, m.active, u, y, g));
      },
      revalidate: function () {
        ((ae ||= Oi()), le(), B({ revalidation: `loading` }));
        let e = ae.promise;
        return E.navigation.state === `submitting`
          ? e
          : E.navigation.state === `idle`
            ? (H(E.historyAction, E.location, {
                startUninterruptedRevalidation: !0,
              }),
              e)
            : (H(D || E.historyAction, E.navigation.location, {
                overrideNavigation: E.navigation,
                enableViewTransition: !0 === A,
              }),
              e);
      },
      createHref: (t) => e.history.createHref(t),
      encodeLocation: (t) => e.history.encodeLocation(t),
      getFetcher: function (e) {
        return (
          L.set(e, (L.get(e) || 0) + 1),
          R.has(e) && R.delete(e),
          E.fetchers.get(e) || Dr
        );
      },
      resetFetcher: function (e, t) {
        (pe(e, t?.reason), ue(e, Di(null)));
      },
      deleteFetcher: function (e) {
        let t = (L.get(e) || 0) - 1;
        (t <= 0 ? (L.delete(e), R.add(e)) : L.set(e, t),
          B({ fetchers: new Map(E.fetchers) }));
      },
      dispose: function () {
        (m && m(),
          M && M(),
          h.clear(),
          w && w.abort(),
          E.fetchers.forEach((e, t) => fe(E.fetchers, t)),
          E.blockers.forEach((e, t) => _e(t)));
      },
      getBlocker: function (e, t) {
        let n = E.blockers.get(e) || Or;
        return (z.get(e) !== t && z.set(e, t), n);
      },
      deleteBlocker: _e,
      patchRoutes: function (e, t, n = !1) {
        (Br(e, t, s, o, a, n), s.hasHMRRoutes || B({}));
      },
      _internalFetchControllers: I,
      _internalSetRoutes: function (e) {
        ((o = {}), s.setHmrRoutes(Sn(e, a, void 0, o)));
      },
      _internalSetStateDoNotUseOrYouWillBreakYourApp(e) {
        B(e);
      },
    }),
    e.instrumentations &&
      (d = (function (e, t) {
        let n = { navigate: [], fetch: [] };
        if (
          (t.forEach((e) =>
            e({
              instrument(e) {
                let t = Object.keys(e);
                for (let r of t) e[r] && n[r].push(e[r]);
              },
            })
          ),
          n.navigate.length > 0)
        ) {
          let t = e.navigate[sr] ?? e.navigate,
            r = lr(n.navigate, t, (...t) => {
              let [n, r] = t;
              return {
                to:
                  typeof n == `number` || typeof n == `string`
                    ? n
                    : n
                      ? hn(n)
                      : `.`,
                ...fr(e, r ?? {}),
              };
            });
          r && ((r[sr] = t), (e.navigate = r));
        }
        if (n.fetch.length > 0) {
          let t = e.fetch[sr] ?? e.fetch,
            r = lr(n.fetch, t, (...t) => {
              let [n, , r, i] = t;
              return { href: r ?? `.`, fetcherKey: n, ...fr(e, i ?? {}) };
            });
          r && ((r[sr] = t), (e.fetch = r));
        }
        return e;
      })(d, e.instrumentations.map((e) => e.router).filter(Boolean))),
    d
  );
}
function Pr(e, t, n, r, i, a) {
  let o, s;
  if (i) {
    o = [];
    for (let e of t)
      if ((o.push(e), e.route.id === i)) {
        s = e;
        break;
      }
  } else ((o = t), (s = t[t.length - 1]));
  let c = Jn(r || `.`, qn(o), Hn(e.pathname, n) || e.pathname, a === `path`);
  if (
    (r ?? ((c.search = e.search), (c.hash = e.hash)),
    (r == null || r === `` || r === `.`) && s)
  ) {
    let e = xi(c.search);
    if (s.route.index && !e)
      c.search = c.search ? c.search.replace(/^\?/, `?index&`) : `?index`;
    else if (!s.route.index && e) {
      let e = new URLSearchParams(c.search),
        t = e.getAll(`index`);
      (e.delete(`index`),
        t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      c.search = n ? `?${n}` : ``;
    }
  }
  return (
    n !== `/` &&
      (c.pathname = (function ({ basename: e, pathname: t }) {
        return t === `/` ? e : Xn([e, t]);
      })({ basename: n, pathname: c.pathname })),
    hn(c)
  );
}
function Fr(e, t, n) {
  if (
    !n ||
    !(function (e) {
      return (
        e != null &&
        ((`formData` in e && e.formData != null) ||
          (`body` in e && e.body !== void 0))
      );
    })(n)
  )
    return { path: t };
  if (n.formMethod && ((r = n.formMethod), !Cr.has(r.toUpperCase())))
    return { path: t, error: fi(405, { method: n.formMethod }) };
  var r;
  let i,
    a,
    o = () => ({ path: t, error: fi(400, { type: `invalid-body` }) }),
    s = (n.formMethod || `get`).toUpperCase(),
    c = mi(t);
  if (n.body !== void 0) {
    if (n.formEncType === `text/plain`) {
      if (!Z(s)) return o();
      let e =
        typeof n.body == `string`
          ? n.body
          : n.body instanceof FormData || n.body instanceof URLSearchParams
            ? Array.from(n.body.entries()).reduce(
                (e, [t, n]) => `${e}${t}=${n}\n`,
                ``
              )
            : String(n.body);
      return {
        path: t,
        submission: {
          formMethod: s,
          formAction: c,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: e,
        },
      };
    }
    if (n.formEncType === `application/json`) {
      if (!Z(s)) return o();
      try {
        let e = typeof n.body == `string` ? JSON.parse(n.body) : n.body;
        return {
          path: t,
          submission: {
            formMethod: s,
            formAction: c,
            formEncType: n.formEncType,
            formData: void 0,
            json: e,
            text: void 0,
          },
        };
      } catch {
        return o();
      }
    }
  }
  if (
    (Y(
      typeof FormData == `function`,
      `FormData is not available in this environment`
    ),
    n.formData)
  )
    ((i = ai(n.formData)), (a = n.formData));
  else if (n.body instanceof FormData) ((i = ai(n.body)), (a = n.body));
  else if (n.body instanceof URLSearchParams) ((i = n.body), (a = oi(i)));
  else if (n.body == null) ((i = new URLSearchParams()), (a = new FormData()));
  else
    try {
      ((i = new URLSearchParams(n.body)), (a = oi(i)));
    } catch {
      return o();
    }
  let l = {
    formMethod: s,
    formAction: c,
    formEncType: (n && n.formEncType) || `application/x-www-form-urlencoded`,
    formData: a,
    json: void 0,
    text: void 0,
  };
  if (Z(l.formMethod)) return { path: t, submission: l };
  let u = gn(t);
  return (
    e && u.search && xi(u.search) && i.append(`index`, ``),
    (u.search = `?${i}`),
    { path: hn(u), submission: l }
  );
}
function Ir(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x) {
  let S,
    C = b ? (_i(b[1]) ? b[1].error : b[1].data) : void 0,
    w = i.createURL(a.location),
    T = i.createURL(c);
  if (u && a.errors) {
    let e = Object.keys(a.errors)[0];
    S = o.findIndex((t) => t.route.id === e);
  } else if (b && _i(b[1])) {
    let e = b[0];
    S = o.findIndex((t) => t.route.id === e) - 1;
  }
  let E = b ? b[1].statusCode : void 0,
    D = E && E >= 400,
    O = {
      currentUrl: w,
      currentParams: a.matches[0]?.params || {},
      nextUrl: T,
      nextParams: o[0].params,
      ...s,
      actionResult: C,
      actionStatus: E,
    },
    k = ir(o),
    A = o.map((i, o) => {
      let { route: s } = i,
        f = null;
      if (S != null && o > S) f = !1;
      else if (s.lazy) f = !0;
      else if (Lr(s))
        if (u) {
          let { shouldLoad: e } = Rr(s, a.loaderData, a.errors);
          f = e;
        } else
          (function (e, t, n) {
            let r = !t || n.route.id !== t.route.id,
              i = !e.hasOwnProperty(n.route.id);
            return r || i;
          })(a.loaderData, a.matches[o], i) && (f = !0);
      else f = !1;
      if (f !== null) return Xr(n, r, e, c, k, i, l, t, f);
      let p = !1;
      typeof x == `boolean`
        ? (p = x)
        : D
          ? (p = !1)
          : (d ||
              w.pathname + w.search === T.pathname + T.search ||
              w.search !== T.search ||
              (function (e, t) {
                let n = e.route.path;
                return (
                  e.pathname !== t.pathname ||
                  (n != null &&
                    n.endsWith(`*`) &&
                    e.params[`*`] !== t.params[`*`])
                );
              })(a.matches[o], i)) &&
            (p = !0);
      let m = { ...O, defaultShouldRevalidate: p },
        h = zr(i, m);
      return Xr(n, r, e, c, k, i, l, t, h, m, x);
    }),
    j = [];
  return (
    m.forEach((e, s) => {
      if (u || !o.some((t) => t.route.id === e.routeId) || p.has(s)) return;
      let c = a.fetchers.get(s),
        m = c && c.state !== `idle` && c.data === void 0,
        b = Tn(g, e.path, _ ?? `/`, !1, y);
      if (!b) {
        if (v && m) return;
        j.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (h.has(s)) return;
      let S = Si(b, e.path),
        C = new AbortController(),
        w = ri(i, e.path, C.signal),
        T = null;
      if (f.has(s)) (f.delete(s), (T = Zr(n, r, w, e.path, b, S, l, t)));
      else if (m) d && (T = Zr(n, r, w, e.path, b, S, l, t));
      else {
        let i;
        i = typeof x == `boolean` ? x : !D && d;
        let a = { ...O, defaultShouldRevalidate: i };
        zr(S, a) && (T = Zr(n, r, w, e.path, b, S, l, t, a));
      }
      T &&
        j.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: T,
          match: S,
          request: w,
          controller: C,
        });
    }),
    { dsMatches: A, revalidatingFetchers: j }
  );
}
function Lr(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0);
}
function Rr(e, t, n) {
  if (e.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!Lr(e)) return { shouldLoad: !1, renderFallback: !1 };
  let r = t != null && e.id in t,
    i = n != null && n[e.id] !== void 0;
  if (!r && i) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == `function` && !0 === e.loader.hydrate)
    return { shouldLoad: !0, renderFallback: !r };
  let a = !r && !i;
  return { shouldLoad: a, renderFallback: a };
}
function zr(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == `boolean`) return n;
  }
  return t.defaultShouldRevalidate;
}
function Br(e, t, n, r, i, a) {
  let o;
  if (e) {
    let t = r[e];
    (Y(t, `No route found to patch children into: routeId = ${e}`),
      (t.children ||= []),
      (o = t.children));
  } else o = n.activeRoutes;
  let s = [],
    c = [];
  if (
    (t.forEach((e) => {
      let t = o.find((t) => Vr(e, t));
      t ? c.push({ existingRoute: t, newRoute: e }) : s.push(e);
    }),
    s.length > 0)
  ) {
    let t = Sn(s, i, [e || `_`, `patch`, String(o?.length || `0`)], r);
    o.push(...t);
  }
  if (a && c.length > 0)
    for (let e = 0; e < c.length; e++) {
      let { existingRoute: t, newRoute: n } = c[e],
        r = t,
        [a] = Sn([n], i, [], {}, !0);
      Object.assign(r, {
        element: a.element ? a.element : r.element,
        errorElement: a.errorElement ? a.errorElement : r.errorElement,
        hydrateFallbackElement: a.hydrateFallbackElement
          ? a.hydrateFallbackElement
          : r.hydrateFallbackElement,
      });
    }
  n.hasHMRRoutes || n.setRoutes([...n.activeRoutes]);
}
function Vr(e, t) {
  return (
    (`id` in e && `id` in t && e.id === t.id) ||
    (e.index === t.index &&
      e.path === t.path &&
      e.caseSensitive === t.caseSensitive &&
      (!(
        (e.children && e.children.length !== 0) ||
        (t.children && t.children.length !== 0)
      ) ||
        (e.children?.every((e, n) => t.children?.some((t) => Vr(e, t))) ?? !1)))
  );
}
((gr = new WeakMap()),
  (_r = new WeakMap()),
  (vr = new WeakMap()),
  (yr = new WeakMap()));
var Hr = new WeakMap(),
  Ur = ({ key: e, route: t, manifest: n, mapRouteProperties: r }) => {
    let i = n[t.id];
    if (
      (Y(i, `No route found in manifest`), !i.lazy || typeof i.lazy != `object`)
    )
      return;
    let a = i.lazy[e];
    if (!a) return;
    let o = Hr.get(i);
    o || ((o = {}), Hr.set(i, o));
    let s = o[e];
    if (s) return s;
    let c = (async () => {
      let t = (function (e) {
          return yn.has(e);
        })(e),
        n = i[e] !== void 0 && e !== `hasErrorBoundary`;
      if (t)
        (X(
          !t,
          `Route property ` +
            e +
            ` is not a supported lazy route property. This property will be ignored.`
        ),
          (o[e] = Promise.resolve()));
      else if (n)
        X(
          !1,
          `Route "${i.id}" has a static property "${e}" defined. The lazy property will be ignored.`
        );
      else {
        let t = await a();
        t != null && (Object.assign(i, { [e]: t }), Object.assign(i, r(i)));
      }
      typeof i.lazy == `object` &&
        ((i.lazy[e] = void 0),
        Object.values(i.lazy).every((e) => e === void 0) && (i.lazy = void 0));
    })();
    return ((o[e] = c), c);
  },
  Wr = new WeakMap();
async function Gr(e) {
  let t = e.matches.filter((e) => e.shouldLoad),
    n = {};
  return (
    (await Promise.all(t.map((e) => e.resolve()))).forEach((e, r) => {
      n[t[r].route.id] = e;
    }),
    n
  );
}
async function Kr(e) {
  return e.matches.some((e) => e.route.middleware) ? qr(e, () => Gr(e)) : Gr(e);
}
function qr(e, t) {
  return (async function (e, t, n, r, i) {
    let { matches: a, ...o } = e;
    return await Jr(
      o,
      a.flatMap((e) =>
        e.route.middleware ? e.route.middleware.map((t) => [e.route.id, t]) : []
      ),
      t,
      n,
      r,
      i
    );
  })(
    e,
    t,
    (e) => {
      if (
        bi((t = e)) &&
        ((n = t.status), wr.has(n)) &&
        t.headers.has(`Location`)
      )
        throw e;
      var t, n;
      return e;
    },
    hi,
    function (t, n, r) {
      if (r)
        return Promise.resolve(
          Object.assign(r.value, { [n]: { type: `error`, result: t } })
        );
      {
        let { matches: r } = e,
          i = ui(
            r,
            r[
              Math.min(
                Math.max(
                  r.findIndex((e) => e.route.id === n),
                  0
                ),
                Math.max(
                  r.findIndex((e) => e.shouldCallHandler()),
                  0
                )
              )
            ].route.id
          ).route.id;
        return Promise.resolve({ [i]: { type: `error`, result: t } });
      }
    }
  );
}
async function Jr(e, t, n, r, i, a, o = 0) {
  let { request: s } = e;
  if (s.signal.aborted)
    throw s.signal.reason ?? Error(`Request aborted: ${s.method} ${s.url}`);
  let c = t[o];
  if (!c) return await n();
  let l,
    [u, d] = c,
    f = async () => {
      if (l) throw Error('You may only call `next()` once per middleware');
      try {
        return ((l = { value: await Jr(e, t, n, r, i, a, o + 1) }), l.value);
      } catch (e) {
        return ((l = { value: await a(e, u, l) }), l.value);
      }
    };
  try {
    let t = await d(e, f),
      n = t == null ? void 0 : r(t);
    return i(n)
      ? n
      : l
        ? (n ?? l.value)
        : ((l = { value: await f() }), l.value);
  } catch (e) {
    return await a(e, u, l);
  }
}
function Yr(e, t, n, r, i) {
  let a = Ur({
      key: `middleware`,
      route: r.route,
      manifest: t,
      mapRouteProperties: e,
    }),
    o = (function (e, t, n, r, i) {
      let a = n[e.id];
      if ((Y(a, `No route found in manifest`), !e.lazy))
        return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
      if (typeof e.lazy == `function`) {
        let t = Wr.get(a);
        if (t) return { lazyRoutePromise: t, lazyHandlerPromise: t };
        let n = (async () => {
          Y(typeof e.lazy == `function`, `No lazy route function found`);
          let t = await e.lazy(),
            n = {};
          for (let e in t) {
            let r = t[e];
            if (r === void 0) continue;
            let i = xn(e),
              o = a[e] !== void 0 && e !== `hasErrorBoundary`;
            i
              ? X(
                  !i,
                  `Route property ` +
                    e +
                    ` is not a supported property to be returned from a lazy route function. This property will be ignored.`
                )
              : o
                ? X(
                    !o,
                    `Route "${a.id}" has a static property "${e}" defined but its lazy function is also returning a value for this property. The lazy route property "${e}" will be ignored.`
                  )
                : (n[e] = r);
          }
          (Object.assign(a, n), Object.assign(a, { ...r(a), lazy: void 0 }));
        })();
        return (
          Wr.set(a, n),
          n.catch(() => {}),
          { lazyRoutePromise: n, lazyHandlerPromise: n }
        );
      }
      let o,
        s = Object.keys(e.lazy),
        c = [];
      for (let a of s) {
        if (i && i.includes(a)) continue;
        let s = Ur({ key: a, route: e, manifest: n, mapRouteProperties: r });
        s && (c.push(s), a === t && (o = s));
      }
      let l = c.length > 0 ? Promise.all(c).then(() => {}) : void 0;
      return (
        l?.catch(() => {}),
        o?.catch(() => {}),
        { lazyRoutePromise: l, lazyHandlerPromise: o }
      );
    })(r.route, Z(n.method) ? `action` : `loader`, t, e, i);
  return {
    middleware: a,
    route: o.lazyRoutePromise,
    handler: o.lazyHandlerPromise,
  };
}
function Xr(e, t, n, r, i, a, o, s, c, l = null, u) {
  let d = !1,
    f = Yr(e, t, n, a, o);
  return {
    ...a,
    _lazyPromises: f,
    shouldLoad: c,
    shouldRevalidateArgs: l,
    shouldCallHandler: (e) => (
      (d = !0),
      l
        ? zr(
            a,
            typeof u == `boolean`
              ? { ...l, defaultShouldRevalidate: u }
              : typeof e == `boolean`
                ? { ...l, defaultShouldRevalidate: e }
                : l
          )
        : c
    ),
    resolve(e) {
      let { lazy: t, loader: o, middleware: l } = a.route,
        u = d || c || (e && !Z(n.method) && (t || o)),
        p = l && l.length > 0 && !o && !t;
      return !u || (!Z(n.method) && p)
        ? Promise.resolve({ type: `data`, result: void 0 })
        : (async function ({
            request: e,
            path: t,
            pattern: n,
            match: r,
            lazyHandlerPromise: i,
            lazyRoutePromise: a,
            handlerOverride: o,
            scopedContext: s,
          }) {
            let c,
              l,
              u = Z(e.method),
              d = u ? `action` : `loader`,
              f = (i) => {
                let a,
                  c = new Promise((e, t) => (a = t));
                ((l = () => a()), e.signal.addEventListener(`abort`, l));
                let u = (a) =>
                    typeof i == `function`
                      ? i(
                          {
                            request: e,
                            url: ii(e, t),
                            pattern: n,
                            params: r.params,
                            context: s,
                          },
                          ...(a === void 0 ? [] : [a])
                        )
                      : Promise.reject(
                          Error(
                            `You cannot call the handler for a route which defines a boolean "${d}" [routeId: ${r.route.id}]`
                          )
                        ),
                  f = (async () => {
                    try {
                      return {
                        type: `data`,
                        result: await (o ? o((e) => u(e)) : u()),
                      };
                    } catch (e) {
                      return { type: `error`, result: e };
                    }
                  })();
                return Promise.race([f, c]);
              };
            try {
              let t = u ? r.route.action : r.route.loader;
              if (i || a)
                if (t) {
                  let e,
                    [n] = await Promise.all([
                      f(t).catch((t) => {
                        e = t;
                      }),
                      i,
                      a,
                    ]);
                  if (e !== void 0) throw e;
                  c = n;
                } else {
                  await i;
                  let t = u ? r.route.action : r.route.loader;
                  if (!t) {
                    if (d === `action`) {
                      let t = new URL(e.url),
                        n = t.pathname + t.search;
                      throw fi(405, {
                        method: e.method,
                        pathname: n,
                        routeId: r.route.id,
                      });
                    }
                    return { type: `data`, result: void 0 };
                  }
                  [c] = await Promise.all([f(t), a]);
                }
              else {
                if (!t) {
                  let t = new URL(e.url);
                  throw fi(404, { pathname: t.pathname + t.search });
                }
                c = await f(t);
              }
            } catch (e) {
              return { type: `error`, result: e };
            } finally {
              l && e.signal.removeEventListener(`abort`, l);
            }
            return c;
          })({
            request: n,
            path: r,
            pattern: i,
            match: a,
            lazyHandlerPromise: f?.handler,
            lazyRoutePromise: f?.route,
            handlerOverride: e,
            scopedContext: s,
          });
    },
  };
}
function Zr(e, t, n, r, i, a, o, s, c = null) {
  return i.map((l) =>
    l.route.id === a.route.id
      ? Xr(e, t, n, r, ir(i), l, o, s, !0, c)
      : {
          ...l,
          shouldLoad: !1,
          shouldRevalidateArgs: c,
          shouldCallHandler: () => !1,
          _lazyPromises: Yr(e, t, n, l, o),
          resolve: () => Promise.resolve({ type: `data`, result: void 0 }),
        }
  );
}
async function Qr(e) {
  let { result: t, type: n } = e;
  if (bi(t)) {
    let e;
    try {
      e = await (async function (e) {
        let t = e.headers.get(`Content-Type`);
        return t && /\bapplication\/json\b/.test(t)
          ? e.body == null
            ? null
            : e.json()
          : e.text();
      })(t);
    } catch (e) {
      return { type: `error`, error: e };
    }
    return n === `error`
      ? {
          type: `error`,
          error: new nr(t.status, t.statusText, e),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: `data`, data: e, statusCode: t.status, headers: t.headers };
  }
  return n === `error`
    ? yi(t)
      ? t.data instanceof Error
        ? {
            type: `error`,
            error: t.data,
            statusCode: t.init?.status,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
        : {
            type: `error`,
            error:
              ((r = t),
              new nr(
                r.init?.status ?? 500,
                r.init?.statusText ?? `Internal Server Error`,
                r.data
              )),
            statusCode: rr(t) ? t.status : void 0,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
      : { type: `error`, error: t, statusCode: rr(t) ? t.status : void 0 }
    : yi(t)
      ? {
          type: `data`,
          data: t.data,
          statusCode: t.init?.status,
          headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
        }
      : { type: `data`, data: t };
  var r;
}
function $r(e, t, n, r, i) {
  let a = e.headers.get(`Location`);
  if (
    (Y(
      a,
      `Redirects returned/thrown from loaders/actions must have a Location header`
    ),
    !Un(a))
  ) {
    let o = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
    ((a = Pr(new URL(t.url), o, i, a)), e.headers.set(`Location`, a));
  }
  return e;
}
var ei = [
  `about:`,
  `blob:`,
  `chrome:`,
  `chrome-untrusted:`,
  `content:`,
  `data:`,
  `devtools:`,
  `file:`,
  `filesystem:`,
  `javascript:`,
];
function ti(e) {
  try {
    return ei.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
function ni(e, t, n, r) {
  if (Un(e)) {
    let r = e,
      i = sn.test(r) ? new URL(cn(r, t.protocol)) : new URL(r);
    if (ti(i.toString())) throw Error(`Invalid redirect location`);
    let a = Hn(i.pathname, n) != null;
    if (i.origin === t.origin && a) return Yn(i.pathname) + i.search + i.hash;
  }
  try {
    if (ti(r.createURL(e).toString())) throw Error(`Invalid redirect location`);
  } catch {}
  return e;
}
function ri(e, t, n, r) {
  let i = e.createURL(mi(t)).toString(),
    a = { signal: n };
  if (r && Z(r.formMethod)) {
    let { formMethod: e, formEncType: t } = r;
    ((a.method = e.toUpperCase()),
      t === `application/json`
        ? ((a.headers = new Headers({ 'Content-Type': t })),
          (a.body = JSON.stringify(r.json)))
        : t === `text/plain`
          ? (a.body = r.text)
          : t === `application/x-www-form-urlencoded` && r.formData
            ? (a.body = ai(r.formData))
            : (a.body = r.formData));
  }
  return new Request(i, a);
}
function ii(e, t) {
  let n = new URL(e.url),
    r = typeof t == `string` ? gn(t) : t;
  if (((n.pathname = r.pathname || `/`), r.search)) {
    let e = new URLSearchParams(r.search),
      t = e.getAll(`index`);
    e.delete(`index`);
    for (let n of t.filter(Boolean)) e.append(`index`, n);
    n.search = e.size ? `?${e.toString()}` : ``;
  } else n.search = ``;
  return ((n.hash = r.hash || ``), n);
}
function ai(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == `string` ? r : r.name);
  return t;
}
function oi(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function si(e, t, n, r, i, a, o) {
  let { loaderData: s, errors: c } = (function (e, t, n, r = !1, i = !1) {
    let a,
      o = {},
      s = null,
      c = !1,
      l = {},
      u = n && _i(n[1]) ? n[1].error : void 0;
    return (
      e.forEach((n) => {
        if (!(n.route.id in t)) return;
        let d = n.route.id,
          f = t[d];
        if (
          (Y(!vi(f), `Cannot handle redirect results in processLoaderData`),
          _i(f))
        ) {
          let t = f.error;
          if ((u !== void 0 && ((t = u), (u = void 0)), (s ||= {}), i))
            s[d] = t;
          else {
            let n = ui(e, d);
            s[n.route.id] ?? (s[n.route.id] = t);
          }
          (r || (o[d] = jr),
            c || ((c = !0), (a = rr(f.error) ? f.error.status : 500)),
            f.headers && (l[d] = f.headers));
        } else
          ((o[d] = f.data),
            f.statusCode && f.statusCode !== 200 && !c && (a = f.statusCode),
            f.headers && (l[d] = f.headers));
      }),
      u !== void 0 && n && ((s = { [n[0]]: u }), n[2] && (o[n[2]] = void 0)),
      { loaderData: o, errors: s, statusCode: a || 200, loaderHeaders: l }
    );
  })(t, n, r);
  return (
    i
      .filter((e) => !e.matches || e.matches.some((e) => e.shouldLoad))
      .forEach((t) => {
        let { key: n, match: r, controller: i } = t;
        if (i && i.signal.aborted) return;
        let s = a[n];
        if ((Y(s, `Did not find corresponding fetcher result`), _i(s))) {
          let t = ui(e.matches, r?.route.id);
          ((c && c[t.route.id]) || (c = { ...c, [t.route.id]: s.error }),
            o.delete(n));
        } else if (vi(s)) Y(!1, `Unhandled fetcher revalidation redirect`);
        else {
          let e = Di(s.data);
          o.set(n, e);
        }
      }),
    { loaderData: s, errors: c }
  );
}
function ci(e, t, n, r) {
  let i = Object.entries(t)
    .filter(([, e]) => e !== jr)
    .reduce((e, [t, n]) => ((e[t] = n), e), {});
  for (let a of n) {
    let n = a.route.id;
    if (
      (!t.hasOwnProperty(n) &&
        e.hasOwnProperty(n) &&
        a.route.loader &&
        (i[n] = e[n]),
      r && r.hasOwnProperty(n))
    )
      break;
  }
  return i;
}
function li(e) {
  return e
    ? _i(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function ui(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
      .reverse()
      .find((e) => !0 === e.route.hasErrorBoundary) || e[0]
  );
}
function di(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((e) => e.index || !e.path || e.path === `/`) || {
          id: `__shim-error-route__`,
        };
  return {
    matches: [{ params: {}, pathname: ``, pathnameBase: ``, route: t }],
    route: t,
  };
}
function fi(
  e,
  { pathname: t, routeId: n, method: r, type: i, message: a } = {}
) {
  let o = `Unknown Server Error`,
    s = `Unknown @remix-run/router error`;
  return (
    e === 400
      ? ((o = `Bad Request`),
        r && t && n
          ? (s = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
          : i === `invalid-body` && (s = `Unable to encode submission body`))
      : e === 403
        ? ((o = `Forbidden`), (s = `Route "${n}" does not match URL "${t}"`))
        : e === 404
          ? ((o = `Not Found`), (s = `No route matches URL "${t}"`))
          : e === 405 &&
            ((o = `Method Not Allowed`),
            r && t && n
              ? (s = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
              : r && (s = `Invalid request method "${r.toUpperCase()}"`)),
    new nr(e || 500, o, Error(s), !0)
  );
}
function pi(e) {
  let t = Object.entries(e);
  for (let e = t.length - 1; e >= 0; e--) {
    let [n, r] = t[e];
    if (vi(r)) return { key: n, result: r };
  }
}
function mi(e) {
  return hn({ ...(typeof e == `string` ? gn(e) : e), hash: `` });
}
function hi(e) {
  return (
    typeof e == `object` &&
    !!e &&
    Object.entries(e).every(
      ([e, t]) =>
        typeof e == `string` &&
        (function (e) {
          return (
            typeof e == `object` &&
            !!e &&
            `type` in e &&
            `result` in e &&
            (e.type === `data` || e.type === `error`)
          );
        })(t)
    )
  );
}
function gi(e) {
  return bi(e.result) && wr.has(e.result.status);
}
function _i(e) {
  return e.type === `error`;
}
function vi(e) {
  return (e && e.type) === `redirect`;
}
function yi(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `data` in e &&
    `init` in e &&
    e.type === `DataWithResponseInit`
  );
}
function bi(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.headers == `object` &&
    e.body !== void 0
  );
}
function Z(e) {
  return xr.has(e.toUpperCase());
}
function xi(e) {
  return new URLSearchParams(e).getAll(`index`).some((e) => e === ``);
}
function Si(e, t) {
  let n = typeof t == `string` ? gn(t).search : t.search;
  if (e[e.length - 1].route.index && xi(n || ``)) return e[e.length - 1];
  let r = Kn(e);
  return r[r.length - 1];
}
function Ci(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: i,
    formData: a,
    json: o,
  } = e;
  if (t && n && r)
    return i == null
      ? a == null
        ? o === void 0
          ? void 0
          : {
              formMethod: t,
              formAction: n,
              formEncType: r,
              formData: void 0,
              json: o,
              text: void 0,
            }
        : {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: a,
            json: void 0,
            text: void 0,
          }
      : {
          formMethod: t,
          formAction: n,
          formEncType: r,
          formData: void 0,
          json: void 0,
          text: i,
        };
}
function wi(e, t, n, r) {
  return r
    ? {
        state: `loading`,
        location: e,
        matches: t,
        historyAction: n,
        formMethod: r.formMethod,
        formAction: r.formAction,
        formEncType: r.formEncType,
        formData: r.formData,
        json: r.json,
        text: r.text,
      }
    : {
        state: `loading`,
        location: e,
        matches: t,
        historyAction: n,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function Ti(e, t, n, r) {
  return {
    state: `submitting`,
    location: e,
    matches: t,
    historyAction: n,
    formMethod: r.formMethod,
    formAction: r.formAction,
    formEncType: r.formEncType,
    formData: r.formData,
    json: r.json,
    text: r.text,
  };
}
function Ei(e, t) {
  return e
    ? {
        state: `loading`,
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: `loading`,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function Di(e) {
  return {
    state: `idle`,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function Oi() {
  let e,
    t,
    n = new Promise((r, i) => {
      ((e = async (e) => {
        r(e);
        try {
          await n;
        } catch {}
      }),
        (t = async (e) => {
          i(e);
          try {
            await n;
          } catch {}
        }));
    });
  return { promise: n, resolve: e, reject: t };
}
var ki = v(null);
ki.displayName = `DataRouter`;
var Ai = v(null);
Ai.displayName = `DataRouterState`;
var ji = v(!1);
function Mi() {
  return m(ji);
}
var Ni = v({ isTransitioning: !1 });
Ni.displayName = `ViewTransition`;
var Pi = v(new Map());
Pi.displayName = `Fetchers`;
var Fi = v(null);
Fi.displayName = `Await`;
var Q = v(null);
Q.displayName = `Navigation`;
var Ii = v(null);
Ii.displayName = `Location`;
var Li = v({ outlet: null, matches: [], isDataRoute: !1 });
Li.displayName = `Route`;
var Ri = v(null);
Ri.displayName = `RouteError`;
var zi = `REACT_ROUTER_ERROR`;
function Bi() {
  return m(Ii) != null;
}
function Vi() {
  return (
    Y(
      Bi(),
      `useLocation() may be used only in the context of a <Router> component.`
    ),
    m(Ii).location
  );
}
var Hi = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function Ui(e) {
  m(Q).static || C(e);
}
function Wi() {
  let { isDataRoute: e } = m(Li);
  return e
    ? (function () {
        let { router: e } = (function (e) {
            let t = m(ki);
            return (Y(t, ta(e)), t);
          })(`useNavigate`),
          t = ra(`useNavigate`),
          n = o(!1);
        return (
          Ui(() => {
            n.current = !0;
          }),
          _(
            async (r, i = {}) => {
              (X(n.current, Hi),
                n.current &&
                  (typeof r == `number`
                    ? await e.navigate(r)
                    : await e.navigate(r, { fromRouteId: t, ...i })));
            },
            [e, t]
          )
        );
      })()
    : (function () {
        Y(
          Bi(),
          `useNavigate() may be used only in the context of a <Router> component.`
        );
        let e = m(ki),
          { basename: t, navigator: n } = m(Q),
          { matches: r } = m(Li),
          { pathname: i } = Vi(),
          a = JSON.stringify(qn(r)),
          s = o(!1);
        return (
          Ui(() => {
            s.current = !0;
          }),
          _(
            (r, o = {}) => {
              if ((X(s.current, Hi), !s.current)) return;
              if (typeof r == `number`) return void n.go(r);
              let c = Jn(r, JSON.parse(a), i, o.relative === `path`);
              (e == null &&
                t !== `/` &&
                (c.pathname = c.pathname === `/` ? t : Xn([t, c.pathname])),
                (o.replace ? n.replace : n.push)(c, o.state, o));
            },
            [t, n, a, i, e]
          )
        );
      })();
}
var Gi = v(null);
function Ki() {
  let { matches: e } = m(Li);
  return e[e.length - 1]?.params ?? {};
}
function qi(e, { relative: t } = {}) {
  let { matches: n } = m(Li),
    { pathname: r } = Vi(),
    i = JSON.stringify(qn(n));
  return c(() => Jn(e, JSON.parse(i), r, t === `path`), [e, i, r, t]);
}
function Ji(e, t, n) {
  Y(
    Bi(),
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: r } = m(Q),
    { matches: i } = m(Li),
    a = i[i.length - 1],
    o = a ? a.params : {},
    s = a ? a.pathname : `/`,
    c = a ? a.pathnameBase : `/`,
    l = a && a.route;
  {
    let e = (l && l.path) || ``;
    sa(
      s,
      !l || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`
    );
  }
  let u,
    d = Vi();
  if (t) {
    let e = typeof t == `string` ? gn(t) : t;
    (Y(
      c === `/` || e.pathname?.startsWith(c),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`
    ),
      (u = e));
  } else u = d;
  let p = u.pathname || `/`,
    h = p;
  if (c !== `/`) {
    let e = c.replace(/^\//, ``).split(`/`);
    h = `/` + p.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let g =
    n && n.state.matches.length
      ? n.state.matches.map((e) =>
          Object.assign(e, { route: n.manifest[e.route.id] || e.route })
        )
      : wn(e, { pathname: h });
  (X(
    l || g != null,
    `No routes matched location "${u.pathname}${u.search}${u.hash}" `
  ),
    X(
      g == null ||
        g[g.length - 1].route.element !== void 0 ||
        g[g.length - 1].route.Component !== void 0 ||
        g[g.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let _ = (function (e, t = [], n) {
    let r = n?.state;
    if (e == null) {
      if (!r) return null;
      if (r.errors) e = r.matches;
      else {
        if (t.length !== 0 || r.initialized || !(r.matches.length > 0))
          return null;
        e = r.matches;
      }
    }
    let i = e,
      a = r?.errors;
    if (a != null) {
      let e = i.findIndex((e) => e.route.id && a?.[e.route.id] !== void 0);
      (Y(
        e >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`
      ),
        (i = i.slice(0, Math.min(i.length, e + 1))));
    }
    let o = !1,
      s = -1;
    if (n && r) {
      o = r.renderFallback;
      for (let e = 0; e < i.length; e++) {
        let t = i[e];
        if (
          ((t.route.HydrateFallback || t.route.hydrateFallbackElement) &&
            (s = e),
          t.route.id)
        ) {
          let { loaderData: e, errors: a } = r,
            c =
              t.route.loader &&
              !e.hasOwnProperty(t.route.id) &&
              (!a || a[t.route.id] === void 0);
          if (t.route.lazy || c) {
            (n.isStatic && (o = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]));
            break;
          }
        }
      }
    }
    let c = n?.onError,
      l =
        r && c
          ? (e, t) => {
              c(e, {
                location: r.location,
                params: r.matches?.[0]?.params ?? {},
                pattern: ir(r.matches),
                errorInfo: t,
              });
            }
          : void 0;
    return i.reduceRight((e, n, c) => {
      let u,
        d = !1,
        p = null,
        m = null;
      r &&
        ((u = a && n.route.id ? a[n.route.id] : void 0),
        (p = n.route.errorElement || Xi),
        o &&
          (s < 0 && c === 0
            ? (sa(
                `route-fallback`,
                !1,
                'No `HydrateFallback` element provided to render during initial hydration'
              ),
              (d = !0),
              (m = null))
            : s === c &&
              ((d = !0), (m = n.route.hydrateFallbackElement || null))));
      let h = t.concat(i.slice(0, c + 1)),
        g = () => {
          let t;
          return (
            (t = u
              ? p
              : d
                ? m
                : n.route.Component
                  ? f(n.route.Component, null)
                  : n.route.element
                    ? n.route.element
                    : e),
            f(ea, {
              match: n,
              routeContext: { outlet: e, matches: h, isDataRoute: r != null },
              children: t,
            })
          );
        };
      return r && (n.route.ErrorBoundary || n.route.errorElement || c === 0)
        ? f(Zi, {
            location: r.location,
            revalidation: r.revalidation,
            component: p,
            error: u,
            children: g(),
            routeContext: { outlet: null, matches: h, isDataRoute: !0 },
            onError: l,
          })
        : g();
    }, null);
  })(
    g &&
      g.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, o, e.params),
          pathname: Xn([
            c,
            r.encodeLocation
              ? r.encodeLocation(
                  e.pathname
                    .replace(/%/g, `%25`)
                    .replace(/\?/g, `%3F`)
                    .replace(/#/g, `%23`)
                ).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? c
              : Xn([
                  c,
                  r.encodeLocation
                    ? r.encodeLocation(
                        e.pathnameBase
                          .replace(/%/g, `%25`)
                          .replace(/\?/g, `%3F`)
                          .replace(/#/g, `%23`)
                      ).pathname
                    : e.pathnameBase,
                ]),
        })
      ),
    i,
    n
  );
  return t && _
    ? f(
        Ii.Provider,
        {
          value: {
            location: {
              pathname: `/`,
              search: ``,
              hash: ``,
              state: null,
              key: `default`,
              mask: void 0,
              ...u,
            },
            navigationType: `POP`,
          },
        },
        _
      )
    : _;
}
function Yi() {
  let e = aa(),
    t = rr(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = `rgba(200,200,200, 0.5)`,
    i = { padding: `0.5rem`, backgroundColor: r },
    a = { padding: `2px 4px`, backgroundColor: r },
    o = null;
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (o = f(
      u,
      null,
      f(`p`, null, `💿 Hey developer 👋`),
      f(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        f(`code`, { style: a }, `ErrorBoundary`),
        ` or`,
        ` `,
        f(`code`, { style: a }, `errorElement`),
        ` prop on your route.`
      )
    )),
    f(
      u,
      null,
      f(`h2`, null, `Unexpected Application Error!`),
      f(`h3`, { style: { fontStyle: `italic` } }, t),
      n ? f(`pre`, { style: i }, n) : null,
      o
    )
  );
}
var Xi = f(Yi, null),
  Zi = class extends x {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            `React Router caught the following error during render`,
            e
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = (function (e) {
          if (e.startsWith(`${zi}:ROUTE_ERROR_RESPONSE:{`))
            try {
              let t = JSON.parse(e.slice(40));
              if (
                typeof t == `object` &&
                t &&
                typeof t.status == `number` &&
                typeof t.statusText == `string`
              )
                return new nr(t.status, t.statusText, t.data);
            } catch {}
        })(e.digest);
        t && (e = t);
      }
      let t =
        e === void 0
          ? this.props.children
          : f(
              Li.Provider,
              { value: this.props.routeContext },
              f(Ri.Provider, { value: e, children: this.props.component })
            );
      return this.context ? f($i, { error: e }, t) : t;
    }
  };
Zi.contextType = ji;
var Qi = new WeakMap();
function $i({ children: e, error: t }) {
  let { basename: n } = m(Q);
  if (
    typeof t == `object` &&
    t &&
    `digest` in t &&
    typeof t.digest == `string`
  ) {
    let e = (function (e) {
      if (e.startsWith(`${zi}:REDIRECT:{`))
        try {
          let t = JSON.parse(e.slice(28));
          if (
            typeof t == `object` &&
            t &&
            typeof t.status == `number` &&
            typeof t.statusText == `string` &&
            typeof t.location == `string` &&
            typeof t.reloadDocument == `boolean` &&
            typeof t.replace == `boolean`
          )
            return t;
        } catch {}
    })(t.digest);
    if (e) {
      let r = Qi.get(t);
      if (r) throw r;
      let i = or(e.location, n),
        a = i.absoluteURL || i.to;
      if (ti(a)) throw Error(`Invalid redirect location`);
      if (ar && !Qi.get(t)) {
        if (!i.isExternal && !e.reloadDocument) {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, {
              replace: e.replace,
            })
          );
          throw (Qi.set(t, n), n);
        }
        window.location.href = a;
      }
      return f(`meta`, { httpEquiv: `refresh`, content: `0;url=${a}` });
    }
  }
  return e;
}
function ea({ routeContext: e, match: t, children: n }) {
  let r = m(ki);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    f(Li.Provider, { value: e }, n)
  );
}
function ta(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function na(e) {
  let t = m(Ai);
  return (Y(t, ta(e)), t);
}
function ra(e) {
  let t = (function (e) {
      let t = m(Li);
      return (Y(t, ta(e)), t);
    })(e),
    n = t.matches[t.matches.length - 1];
  return (
    Y(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function ia() {
  let { matches: e, loaderData: t } = na(`useMatches`);
  return c(() => e.map((e) => En(e, t)), [e, t]);
}
function aa() {
  let e = m(Ri),
    t = na(`useRouteError`),
    n = ra(`useRouteError`);
  return e === void 0 ? t.errors?.[n] : e;
}
var oa = {};
function sa(e, t, n) {
  t || oa[e] || ((oa[e] = !0), X(!1, n));
}
var ca = {};
function la(e, t) {
  e || ca[t] || ((ca[t] = !0), console.warn(t));
}
var ua = S,
  da = () => {};
function fa(e) {
  let t = {
    hasErrorBoundary:
      e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element &&
        X(
          !1,
          'You should not include both `Component` and `element` on your route - `Component` will be used.'
        ),
      Object.assign(t, { element: f(e.Component), Component: void 0 })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        X(
          !1,
          'You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.'
        ),
      Object.assign(t, {
        hydrateFallbackElement: f(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement &&
        X(
          !1,
          'You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.'
        ),
      Object.assign(t, {
        errorElement: f(e.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    t
  );
}
var pa = [`HydrateFallback`, `hydrateFallbackElement`],
  ma = class {
    constructor() {
      ((this.status = `pending`),
        (this.promise = new Promise((e, t) => {
          ((this.resolve = (t) => {
            this.status === `pending` && ((this.status = `resolved`), e(t));
          }),
            (this.reject = (e) => {
              this.status === `pending` && ((this.status = `rejected`), t(e));
            }));
        })));
    }
  };
function ha({ router: e, flushSync: t, onError: n, useTransitions: i }) {
  i = Mi() || i;
  let [a, s] = r(e.state),
    [p, m] = ((h = a), ua ? ua(h) : [h, da]);
  var h;
  let [g, v] = r(),
    [y, b] = r({ isTransitioning: !1 }),
    [x, S] = r(),
    [w, T] = r(),
    [E, D] = r(),
    O = o(new Map()),
    k = _(
      (
        r,
        {
          deletedFetchers: a,
          newErrors: o,
          flushSync: c,
          viewTransitionOpts: u,
        }
      ) => {
        (o &&
          n &&
          Object.values(o).forEach((e) =>
            n(e, {
              location: r.location,
              params: r.matches[0]?.params ?? {},
              pattern: ir(r.matches),
            })
          ),
          r.fetchers.forEach((e, t) => {
            e.data !== void 0 && O.current.set(t, e.data);
          }),
          a.forEach((e) => O.current.delete(e)),
          la(
            !1 === c || t != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let d =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == `function`;
        if (
          (la(
            u == null || d,
            'You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.'
          ),
          u && d)
        ) {
          if (t && c) {
            t(() => {
              (w && (x?.resolve(), w.skipTransition()),
                b({
                  isTransitioning: !0,
                  flushSync: !0,
                  currentLocation: u.currentLocation,
                  nextLocation: u.nextLocation,
                }));
            });
            let n = e.window.document.startViewTransition(() => {
              t(() => s(r));
            });
            (n.finished.finally(() => {
              t(() => {
                (S(void 0), T(void 0), v(void 0), b({ isTransitioning: !1 }));
              });
            }),
              t(() => T(n)));
            return;
          }
          w
            ? (x?.resolve(),
              w.skipTransition(),
              D({
                state: r,
                currentLocation: u.currentLocation,
                nextLocation: u.nextLocation,
              }))
            : (v(r),
              b({
                isTransitioning: !0,
                flushSync: !1,
                currentLocation: u.currentLocation,
                nextLocation: u.nextLocation,
              }));
        } else
          t && c
            ? t(() => s(r))
            : !1 === i
              ? s(r)
              : l(() => {
                  (!0 === i && m((e) => ga(e, r)), s(r));
                });
      },
      [e.window, t, w, x, i, m, n]
    );
  (C(() => e.subscribe(k), [e, k]),
    d(() => {
      y.isTransitioning && !y.flushSync && S(new ma());
    }, [y]),
    d(() => {
      if (x && g && e.window) {
        let t = g,
          n = x.promise,
          r = e.window.document.startViewTransition(async () => {
            (!1 === i
              ? s(t)
              : l(() => {
                  (!0 === i && m((e) => ga(e, t)), s(t));
                }),
              await n);
          });
        (r.finished.finally(() => {
          (S(void 0), T(void 0), v(void 0), b({ isTransitioning: !1 }));
        }),
          T(r));
      }
    }, [g, x, e.window, i, m]),
    d(() => {
      x && g && p.location.key === g.location.key && x.resolve();
    }, [x, w, p.location, g]),
    d(() => {
      !y.isTransitioning &&
        E &&
        (v(E.state),
        b({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: E.currentLocation,
          nextLocation: E.nextLocation,
        }),
        D(void 0));
    }, [y.isTransitioning, E]));
  let A = c(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (t) => e.navigate(t),
        push: (t, n, r) =>
          e.navigate(t, {
            state: n,
            preventScrollReset: r?.preventScrollReset,
          }),
        replace: (t, n, r) =>
          e.navigate(t, {
            replace: !0,
            state: n,
            preventScrollReset: r?.preventScrollReset,
          }),
      }),
      [e]
    ),
    j = e.basename || `/`,
    M = c(
      () => ({ router: e, navigator: A, static: !1, basename: j, onError: n }),
      [e, A, j, n]
    );
  return f(
    u,
    null,
    f(
      ki.Provider,
      { value: M },
      f(
        Ai.Provider,
        { value: p },
        f(
          Pi.Provider,
          { value: O.current },
          f(
            Ni.Provider,
            { value: y },
            f(
              xa,
              {
                basename: j,
                location: p.location,
                navigationType: p.historyAction,
                navigator: A,
                useTransitions: i,
              },
              f(_a, {
                routes: e.routes,
                manifest: e.manifest,
                future: e.future,
                state: p,
                isStatic: !1,
                onError: n,
              })
            )
          )
        )
      )
    ),
    null
  );
}
function ga(e, t) {
  return {
    ...e,
    navigation: t.navigation.state === `idle` ? e.navigation : t.navigation,
    revalidation: t.revalidation === `idle` ? e.revalidation : t.revalidation,
    actionData:
      t.navigation.state === `submitting` ? e.actionData : t.actionData,
    fetchers: t.fetchers,
  };
}
var _a = p(function ({
  routes: e,
  manifest: t,
  future: n,
  state: r,
  isStatic: i,
  onError: a,
}) {
  return Ji(e, void 0, {
    manifest: t,
    state: r,
    isStatic: i,
    onError: a,
    future: n,
  });
});
function va({ to: e, replace: t, state: n, relative: r }) {
  Y(
    Bi(),
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: i } = m(Q);
  X(
    !i,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches: a } = m(Li),
    { pathname: o } = Vi(),
    s = Wi(),
    c = Jn(e, qn(a), o, r === `path`),
    l = JSON.stringify(c);
  return (
    d(() => {
      s(JSON.parse(l), { replace: t, state: n, relative: r });
    }, [s, l, r, t, n]),
    null
  );
}
function ya(e) {
  return (function (e) {
    let t = m(Li).outlet;
    return c(() => t && f(Gi.Provider, { value: e }, t), [t, e]);
  })(e.context);
}
function ba(e) {
  Y(
    !1,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function xa({
  basename: e = `/`,
  children: t = null,
  location: n,
  navigationType: r = `POP`,
  navigator: i,
  static: a = !1,
  useTransitions: o,
}) {
  Y(
    !Bi(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let s = e.replace(/^\/*/, `/`),
    l = c(
      () => ({
        basename: s,
        navigator: i,
        static: a,
        useTransitions: o,
        future: {},
      }),
      [s, i, a, o]
    );
  typeof n == `string` && (n = gn(n));
  let {
      pathname: u = `/`,
      search: d = ``,
      hash: p = ``,
      state: m = null,
      key: h = `default`,
      mask: g,
    } = n,
    _ = c(() => {
      let e = Hn(u, s);
      return e == null
        ? null
        : {
            location: {
              pathname: e,
              search: d,
              hash: p,
              state: m,
              key: h,
              mask: g,
            },
            navigationType: r,
          };
    }, [s, u, d, p, m, h, r, g]);
  return (
    X(
      _ != null,
      `<Router basename="${s}"> is not able to match the URL "${u}${d}${p}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    _ == null
      ? null
      : f(Q.Provider, { value: l }, f(Ii.Provider, { children: t, value: _ }))
  );
}
var Sa = function e(t, n = []) {
    let r = [];
    return (
      h.forEach(t, (t, i) => {
        if (!y(t)) return;
        let a = [...n, i];
        if (t.type === u) return void r.push.apply(r, e(t.props.children, a));
        (Y(
          t.type === ba,
          `[${typeof t.type == `string` ? t.type : t.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
        ),
          Y(
            !t.props.index || !t.props.children,
            `An index route cannot have child routes.`
          ));
        let o = {
          id: t.props.id || a.join(`-`),
          caseSensitive: t.props.caseSensitive,
          element: t.props.element,
          Component: t.props.Component,
          index: t.props.index,
          path: t.props.path,
          middleware: t.props.middleware,
          loader: t.props.loader,
          action: t.props.action,
          hydrateFallbackElement: t.props.hydrateFallbackElement,
          HydrateFallback: t.props.HydrateFallback,
          errorElement: t.props.errorElement,
          ErrorBoundary: t.props.ErrorBoundary,
          hasErrorBoundary:
            !0 === t.props.hasErrorBoundary ||
            t.props.ErrorBoundary != null ||
            t.props.errorElement != null,
          shouldRevalidate: t.props.shouldRevalidate,
          handle: t.props.handle,
          lazy: t.props.lazy,
        };
        (t.props.children && (o.children = e(t.props.children, a)), r.push(o));
      }),
      r
    );
  },
  Ca = `get`,
  wa = `application/x-www-form-urlencoded`;
function Ta(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement;
}
var Ea = null,
  Da = new Set([
    `application/x-www-form-urlencoded`,
    `multipart/form-data`,
    `text/plain`,
  ]);
function Oa(e) {
  return e == null || Da.has(e)
    ? e
    : (X(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${wa}"`
      ),
      null);
}
function ka(e, t) {
  let n, r, i, a, o;
  if (Ta((s = e)) && s.tagName.toLowerCase() === `form`) {
    let o = e.getAttribute(`action`);
    ((r = o ? Hn(o, t) : null),
      (n = e.getAttribute(`method`) || Ca),
      (i = Oa(e.getAttribute(`enctype`)) || wa),
      (a = new FormData(e)));
  } else if (
    (function (e) {
      return Ta(e) && e.tagName.toLowerCase() === `button`;
    })(e) ||
    ((function (e) {
      return Ta(e) && e.tagName.toLowerCase() === `input`;
    })(e) &&
      (e.type === `submit` || e.type === `image`))
  ) {
    let o = e.form;
    if (o == null)
      throw Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`);
    if (
      ((r = s ? Hn(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || Ca),
      (i =
        Oa(e.getAttribute(`formenctype`)) ||
        Oa(o.getAttribute(`enctype`)) ||
        wa),
      (a = new FormData(o, e)),
      !(function () {
        if (Ea === null)
          try {
            (new FormData(document.createElement(`form`), 0), (Ea = !1));
          } catch {
            Ea = !0;
          }
        return Ea;
      })())
    ) {
      let { name: t, type: n, value: r } = e;
      if (n === `image`) {
        let e = t ? `${t}.` : ``;
        (a.append(`${e}x`, `0`), a.append(`${e}y`, `0`));
      } else t && a.append(t, r);
    }
  } else {
    if (Ta(e))
      throw Error(
        `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
      );
    ((n = Ca), (r = null), (i = wa), (o = e));
  }
  var s;
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: a, body: o }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Aa = {
    '&': `\\u0026`,
    '>': `\\u003e`,
    '<': `\\u003c`,
    '\u2028': `\\u2028`,
    '\u2029': `\\u2029`,
  },
  ja = /[&><\u2028\u2029]/g;
function Ma(e) {
  return e.replace(ja, (e) => Aa[e]);
}
function Na(e, t) {
  if (!1 === e || e == null) throw Error(t);
}
function Pa(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(
          e,
          typeof window > `u` ? `server://singlefetch/` : window.location.origin
        )
      : e;
  return (
    n
      ? i.pathname.endsWith(`/`)
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === `/`
        ? (i.pathname = `_root.${r}`)
        : t && Hn(i.pathname, t) === `/`
          ? (i.pathname = `${Zn(t)}/_root.${r}`)
          : (i.pathname = `${Zn(i.pathname)}.${r}`),
    i
  );
}
function Fa(e) {
  return (
    e != null &&
    (e.href == null
      ? e.rel === `preload` &&
        typeof e.imageSrcSet == `string` &&
        typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`)
  );
}
async function Ia(e, t, r) {
  return (function (e, t) {
    let n = new Set(),
      r = new Set(t);
    return e.reduce((e, i) => {
      if (
        t &&
        ((a = i) == null || typeof a.page != `string`) &&
        i.as === `script` &&
        i.href &&
        r.has(i.href)
      )
        return e;
      var a;
      let o = JSON.stringify(
        (function (e) {
          let t = {},
            n = Object.keys(e).sort();
          for (let r of n) t[r] = e[r];
          return t;
        })(i)
      );
      return (n.has(o) || (n.add(o), e.push({ key: o, link: i })), e);
    }, []);
  })(
    (
      await Promise.all(
        e.map(async (e) => {
          let i = t.routes[e.route.id];
          if (i) {
            let e = await (async function (e, t) {
              if (e.id in t) return t[e.id];
              try {
                let r = await n(() => import(e.module), []);
                return ((t[e.id] = r), r);
              } catch (t) {
                return (
                  console.error(
                    `Error loading route module \`${e.module}\`, reloading page...`
                  ),
                  console.error(t),
                  window.__reactRouterContext &&
                    window.__reactRouterContext.isSpaMode,
                  window.location.reload(),
                  new Promise(() => {})
                );
              }
            })(i, r);
            return e.links ? e.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(Fa)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet`
          ? { ...e, rel: `prefetch`, as: `style` }
          : { ...e, rel: `prefetch` }
      )
  );
}
function La(e, t, n, r, i, a) {
  let o = (e, t) => !n[t] || e.route.id !== n[t].route.id,
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`]);
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id];
          if (!c || !c.hasLoader) return !1;
          if (o(t, a) || s(t, a)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin
              ),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r == `boolean`) return r;
          }
          return !0;
        })
      : [];
}
function Ra(e, t, { includeHydrateFallback: n } = {}) {
  return (
    (r = e
      .map((e) => {
        let r = t.routes[e.route.id];
        if (!r) return [];
        let i = [r.module];
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n &&
            r.hydrateFallbackModule &&
            (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        );
      })
      .flat(1)),
    [...new Set(r)]
  );
  var r;
}
function za() {
  let e = m(ki);
  return (
    Na(
      e,
      `You must render this element inside a <DataRouterContext.Provider> element`
    ),
    e
  );
}
function Ba() {
  let e = m(Ai);
  return (
    Na(
      e,
      `You must render this element inside a <DataRouterStateContext.Provider> element`
    ),
    e
  );
}
var Va = v(void 0);
function Ha() {
  let e = m(Va);
  return (
    Na(e, `You must render this element inside a <HydratedRouter> element`),
    e
  );
}
function Ua(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function Wa({ page: e, ...t }) {
  let n = Mi(),
    { nonce: r } = Ha(),
    { router: i } = za(),
    a = c(() => wn(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return a
    ? (t.nonce == null && r && (t = { ...t, nonce: r }),
      f(n ? Ga : Ka, { page: e, matches: a, ...t }))
    : null;
}
function Ga({ page: e, matches: t, ...n }) {
  let r = Vi(),
    { future: i } = Ha(),
    { basename: a } = za();
  return f(
    u,
    null,
    c(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = Pa(e, a, i.v8_trailingSlashAwareDataRequests, `rsc`),
        o = !1,
        s = [];
      for (let e of t)
        typeof e.route.shouldRevalidate == `function`
          ? (o = !0)
          : s.push(e.route.id);
      return (
        o && s.length > 0 && n.searchParams.set(`_routes`, s.join(`,`)),
        [n.pathname + n.search]
      );
    }, [a, i.v8_trailingSlashAwareDataRequests, e, r, t]).map((e) =>
      f(`link`, { key: e, rel: `prefetch`, as: `fetch`, href: e, ...n })
    )
  );
}
function Ka({ page: e, matches: t, ...n }) {
  let i = Vi(),
    { future: a, manifest: o, routeModules: s } = Ha(),
    { basename: l } = za(),
    { loaderData: p, matches: m } = Ba(),
    h = c(() => La(e, t, m, o, i, `data`), [e, t, m, o, i]),
    g = c(() => La(e, t, m, o, i, `assets`), [e, t, m, o, i]),
    _ = c(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let n = new Set(),
        r = !1;
      if (
        (t.forEach((e) => {
          let t = o.routes[e.route.id];
          t &&
            t.hasLoader &&
            ((!h.some((t) => t.route.id === e.route.id) &&
              e.route.id in p &&
              s[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (r = !0)
              : n.add(e.route.id));
        }),
        n.size === 0)
      )
        return [];
      let c = Pa(e, l, a.v8_trailingSlashAwareDataRequests, `data`);
      return (
        r &&
          n.size > 0 &&
          c.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`)
          ),
        [c.pathname + c.search]
      );
    }, [l, a.v8_trailingSlashAwareDataRequests, p, i, o, h, t, e, s]),
    v = c(() => Ra(g, o), [g, o]),
    y = (function (e) {
      let { manifest: t, routeModules: n } = Ha(),
        [i, a] = r([]);
      return (
        d(() => {
          let r = !1;
          return (
            Ia(e, t, n).then((e) => {
              r || a(e);
            }),
            () => {
              r = !0;
            }
          );
        }, [e, t, n]),
        i
      );
    })(g);
  return f(
    u,
    null,
    _.map((e) =>
      f(`link`, { key: e, rel: `prefetch`, as: `fetch`, href: e, ...n })
    ),
    v.map((e) => f(`link`, { key: e, rel: `modulepreload`, href: e, ...n })),
    y.map(({ key: e, link: t }) =>
      f(`link`, {
        key: e,
        nonce: n.nonce,
        ...t,
        crossOrigin: t.crossOrigin ?? n.crossOrigin,
      })
    )
  );
}
Va.displayName = `FrameworkContext`;
function qa(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
var Ja =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
try {
  Ja && (window.__reactRouterVersion = `7.18.2`);
} catch {}
function Ya() {
  let e = window?.__staticRouterHydrationData;
  return (e && e.errors && (e = { ...e, errors: Xa(e.errors) }), e);
}
function Xa(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [e, r] of t)
    if (r && r.__type === `RouteErrorResponse`)
      n[e] = new nr(r.status, r.statusText, r.data, !0 === r.internal);
    else if (r && r.__type === `Error`) {
      if (typeof r.__subType == `string` && tr.includes(r.__subType)) {
        let t = window[r.__subType];
        if (typeof t == `function`)
          try {
            let i = new t(r.message);
            ((i.stack = ``), (n[e] = i));
          } catch {}
      }
      if (n[e] == null) {
        let t = Error(r.message);
        ((t.stack = ``), (n[e] = t));
      }
    } else n[e] = r;
  return n;
}
var Za = g(function (
  {
    onClick: e,
    discover: t = `render`,
    prefetch: n = `none`,
    relative: i,
    reloadDocument: a,
    replace: s,
    mask: c,
    state: p,
    target: h,
    to: g,
    preventScrollReset: v,
    viewTransition: y,
    defaultShouldRevalidate: b,
    ...x
  },
  S
) {
  let { basename: C, navigator: w, useTransitions: T } = m(Q),
    E = typeof g == `string` && on.test(g),
    D = or(g, C),
    O = (function (e, { relative: t } = {}) {
      Y(
        Bi(),
        `useHref() may be used only in the context of a <Router> component.`
      );
      let { basename: n, navigator: r } = m(Q),
        { hash: i, pathname: a, search: o } = qi(e, { relative: t }),
        s = a;
      return (
        n !== `/` && (s = a === `/` ? n : Xn([n, a])),
        r.createHref({ pathname: s, search: o, hash: i })
      );
    })((g = D.to), { relative: i }),
    k = Vi(),
    A = null;
  if (c) {
    let e = Jn(c, [], k.mask ? k.mask.pathname : `/`, !0);
    (C !== `/` && (e.pathname = e.pathname === `/` ? C : Xn([C, e.pathname])),
      (A = w.createHref(e)));
  }
  let [j, M, N] = (function (e, t) {
      let n = m(Va),
        [i, a] = r(!1),
        [s, c] = r(!1),
        {
          onFocus: l,
          onBlur: u,
          onMouseEnter: f,
          onMouseLeave: p,
          onTouchStart: h,
        } = t,
        g = o(null);
      (d(() => {
        if ((e === `render` && c(!0), e === `viewport`)) {
          let e = new IntersectionObserver(
            (e) => {
              e.forEach((e) => {
                c(e.isIntersecting);
              });
            },
            { threshold: 0.5 }
          );
          return (
            g.current && e.observe(g.current),
            () => {
              e.disconnect();
            }
          );
        }
      }, [e]),
        d(() => {
          if (i) {
            let e = setTimeout(() => {
              c(!0);
            }, 100);
            return () => {
              clearTimeout(e);
            };
          }
        }, [i]));
      let _ = () => {
          a(!0);
        },
        v = () => {
          (a(!1), c(!1));
        };
      return n
        ? e === `intent`
          ? [
              s,
              g,
              {
                onFocus: Ua(l, _),
                onBlur: Ua(u, v),
                onMouseEnter: Ua(f, _),
                onMouseLeave: Ua(p, v),
                onTouchStart: Ua(h, _),
              },
            ]
          : [s, g, {}]
        : [!1, g, {}];
    })(n, x),
    P = (function (
      e,
      {
        target: t,
        replace: n,
        mask: r,
        state: i,
        preventScrollReset: a,
        relative: o,
        viewTransition: s,
        defaultShouldRevalidate: c,
        useTransitions: u,
      } = {}
    ) {
      let d = Wi(),
        f = Vi(),
        p = qi(e, { relative: o });
      return _(
        (m) => {
          if (
            (function (e, t) {
              return !(
                e.button !== 0 ||
                (t && t !== `_self`) ||
                (function (e) {
                  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                })(e)
              );
            })(m, t)
          ) {
            m.preventDefault();
            let t = n === void 0 ? hn(f) === hn(p) : n,
              h = () =>
                d(e, {
                  replace: t,
                  mask: r,
                  state: i,
                  preventScrollReset: a,
                  relative: o,
                  viewTransition: s,
                  defaultShouldRevalidate: c,
                });
            u ? l(() => h()) : h();
          }
        },
        [f, d, p, n, r, i, t, e, a, o, s, c, u]
      );
    })(g, {
      replace: s,
      mask: c,
      state: p,
      target: h,
      preventScrollReset: v,
      relative: i,
      viewTransition: y,
      defaultShouldRevalidate: b,
      useTransitions: T,
    }),
    F = !(D.isExternal || a),
    I = f(`a`, {
      ...x,
      ...N,
      href: (F ? A : void 0) || D.absoluteURL || O,
      onClick: F
        ? function (t) {
            (e && e(t), t.defaultPrevented || P(t));
          }
        : e,
      ref: qa(S, M),
      target: h,
      'data-discover': E || t !== `render` ? void 0 : `true`,
    });
  return j && !E ? f(u, null, I, f(Wa, { page: O })) : I;
});
Za.displayName = `Link`;
var Qa = g(function (
  {
    'aria-current': e = `page`,
    caseSensitive: t = !1,
    className: n = ``,
    end: r = !1,
    style: i,
    to: a,
    viewTransition: o,
    children: s,
    ...c
  },
  l
) {
  let u = qi(a, { relative: c.relative }),
    d = Vi(),
    p = m(Ai),
    { navigator: h, basename: g } = m(Q),
    _ =
      p != null &&
      (function (e, { relative: t } = {}) {
        let n = m(Ni);
        Y(
          n != null,
          "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
        );
        let { basename: r } = to(`useViewTransitionState`),
          i = qi(e, { relative: t });
        if (!n.isTransitioning) return !1;
        let a = Hn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
          o = Hn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
        return zn(i.pathname, o) != null || zn(i.pathname, a) != null;
      })(u) &&
      !0 === o,
    v = h.encodeLocation ? h.encodeLocation(u).pathname : u.pathname,
    y = d.pathname,
    b =
      p && p.navigation && p.navigation.location
        ? p.navigation.location.pathname
        : null;
  (t ||
    ((y = y.toLowerCase()),
    (b = b ? b.toLowerCase() : null),
    (v = v.toLowerCase())),
    b && g && (b = Hn(b, g) || b));
  let x = v !== `/` && v.endsWith(`/`) ? v.length - 1 : v.length,
    S,
    C = y === v || (!r && y.startsWith(v) && y.charAt(x) === `/`),
    w =
      b != null &&
      (b === v || (!r && b.startsWith(v) && b.charAt(v.length) === `/`)),
    T = { isActive: C, isPending: w, isTransitioning: _ },
    E = C ? e : void 0;
  S =
    typeof n == `function`
      ? n(T)
      : [
          n,
          C ? `active` : null,
          w ? `pending` : null,
          _ ? `transitioning` : null,
        ]
          .filter(Boolean)
          .join(` `);
  let D = typeof i == `function` ? i(T) : i;
  return f(
    Za,
    {
      ...c,
      'aria-current': E,
      className: S,
      ref: l,
      style: D,
      to: a,
      viewTransition: o,
    },
    typeof s == `function` ? s(T) : s
  );
});
function $a({ getKey: e, storageKey: t, ...n }) {
  let r = m(Va),
    { basename: i } = m(Q),
    a = Vi(),
    o = ia();
  (function ({ getKey: e, storageKey: t } = {}) {
    let { router: n } = to(`useScrollRestoration`),
      { restoreScrollPosition: r, preventScrollReset: i } = (function (e) {
        let t = m(Ai);
        return (Y(t, eo(e)), t);
      })(`useScrollRestoration`),
      { basename: a } = m(Q),
      o = Vi(),
      s = ia(),
      l = (function () {
        let e = na(`useNavigation`);
        return c(() => {
          let { matches: t, historyAction: n, ...r } = e.navigation;
          return r;
        }, [e.navigation]);
      })();
    (d(
      () => (
        (window.history.scrollRestoration = `manual`),
        () => {
          window.history.scrollRestoration = `auto`;
        }
      ),
      []
    ),
      (function (e, t) {
        let { capture: n } = t || {};
        d(() => {
          let t = n == null ? void 0 : { capture: n };
          return (
            window.addEventListener(`pagehide`, e, t),
            () => {
              window.removeEventListener(`pagehide`, e, t);
            }
          );
        }, [e, n]);
      })(
        _(() => {
          if (l.state === `idle`) {
            let t = oo(o, s, a, e);
            ao[t] = window.scrollY;
          }
          try {
            sessionStorage.setItem(t || io, JSON.stringify(ao));
          } catch (e) {
            X(
              !1,
              `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`
            );
          }
          window.history.scrollRestoration = `auto`;
        }, [l.state, e, a, o, s, t])
      ),
      typeof document < `u` &&
        (C(() => {
          try {
            let e = sessionStorage.getItem(t || io);
            e && (ao = JSON.parse(e));
          } catch {}
        }, [t]),
        C(() => {
          let t = n?.enableScrollRestoration(
            ao,
            () => window.scrollY,
            e ? (t, n) => oo(t, n, a, e) : void 0
          );
          return () => t && t();
        }, [n, a, e]),
        C(() => {
          if (!1 !== r)
            if (typeof r != `number`) {
              try {
                if (o.hash) {
                  let e = document.getElementById(
                    decodeURIComponent(o.hash.slice(1))
                  );
                  if (e) return void e.scrollIntoView();
                }
              } catch {
                X(
                  !1,
                  `"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`
                );
              }
              !0 !== i && window.scrollTo(0, 0);
            } else window.scrollTo(0, r);
        }, [o, r, i])));
  })({ getKey: e, storageKey: t });
  let s = c(() => {
    if (!r || !e) return null;
    let t = oo(a, o, i, e);
    return t === a.key ? null : t;
  }, []);
  if (!r || r.isSpaMode) return null;
  let l = ((e, t) => {
    if (!window.history.state || !window.history.state.key) {
      let e = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: e }, ``);
    }
    try {
      let n = JSON.parse(sessionStorage.getItem(e) || `{}`)[
        t || window.history.state.key
      ];
      typeof n == `number` && window.scrollTo(0, n);
    } catch (t) {
      (console.error(t), sessionStorage.removeItem(e));
    }
  }).toString();
  return (
    n.nonce == null && r?.nonce && (n.nonce = r.nonce),
    f(`script`, {
      ...n,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${l})(${Ma(JSON.stringify(t || io))}, ${Ma(JSON.stringify(s))})`,
      },
    })
  );
}
function eo(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function to(e) {
  let t = m(ki);
  return (Y(t, eo(e)), t);
}
((Qa.displayName = `NavLink`),
  (g(
    (
      {
        discover: e = `render`,
        fetcherKey: t,
        navigate: n,
        reloadDocument: r,
        replace: i,
        state: a,
        method: o = Ca,
        action: s,
        onSubmit: c,
        relative: u,
        preventScrollReset: d,
        viewTransition: p,
        defaultShouldRevalidate: h,
        ...g
      },
      v
    ) => {
      let { useTransitions: y } = m(Q),
        b = (function () {
          let { router: e } = to(`useSubmit`),
            { basename: t } = m(Q),
            n = ra(`useRouteId`),
            r = e.fetch,
            i = e.navigate;
          return _(
            async (e, a = {}) => {
              let {
                action: o,
                method: s,
                encType: c,
                formData: l,
                body: u,
              } = ka(e, t);
              if (!1 === a.navigate) {
                let e = a.fetcherKey || ro();
                await r(e, n, a.action || o, {
                  defaultShouldRevalidate: a.defaultShouldRevalidate,
                  preventScrollReset: a.preventScrollReset,
                  formData: l,
                  body: u,
                  formMethod: a.method || s,
                  formEncType: a.encType || c,
                  flushSync: a.flushSync,
                });
              } else
                await i(a.action || o, {
                  defaultShouldRevalidate: a.defaultShouldRevalidate,
                  preventScrollReset: a.preventScrollReset,
                  formData: l,
                  body: u,
                  formMethod: a.method || s,
                  formEncType: a.encType || c,
                  replace: a.replace,
                  state: a.state,
                  fromRouteId: n,
                  flushSync: a.flushSync,
                  viewTransition: a.viewTransition,
                });
            },
            [r, i, t, n]
          );
        })(),
        x = (function (e, { relative: t } = {}) {
          let { basename: n } = m(Q),
            r = m(Li);
          Y(r, `useFormAction must be used inside a RouteContext`);
          let [i] = r.matches.slice(-1),
            a = { ...qi(e || `.`, { relative: t }) },
            o = Vi();
          if (e == null) {
            a.search = o.search;
            let e = new URLSearchParams(a.search),
              t = e.getAll(`index`);
            if (t.some((e) => e === ``)) {
              (e.delete(`index`),
                t.filter((e) => e).forEach((t) => e.append(`index`, t)));
              let n = e.toString();
              a.search = n ? `?${n}` : ``;
            }
          }
          return (
            (e && e !== `.`) ||
              !i.route.index ||
              (a.search = a.search
                ? a.search.replace(/^\?/, `?index&`)
                : `?index`),
            n !== `/` &&
              (a.pathname = a.pathname === `/` ? n : Xn([n, a.pathname])),
            hn(a)
          );
        })(s, { relative: u }),
        S = o.toLowerCase() === `get` ? `get` : `post`,
        C = typeof s == `string` && on.test(s);
      return f(`form`, {
        ref: v,
        method: S,
        action: x,
        onSubmit: r
          ? c
          : (e) => {
              if ((c && c(e), e.defaultPrevented)) return;
              e.preventDefault();
              let r = e.nativeEvent.submitter,
                s = r?.getAttribute(`formmethod`) || o,
                f = () =>
                  b(r || e.currentTarget, {
                    fetcherKey: t,
                    method: s,
                    navigate: n,
                    replace: i,
                    state: a,
                    relative: u,
                    preventScrollReset: d,
                    viewTransition: p,
                    defaultShouldRevalidate: h,
                  });
              y && !1 !== n ? l(() => f()) : f();
            },
        ...g,
        'data-discover': C || e !== `render` ? void 0 : `true`,
      });
    }
  ).displayName = `Form`),
  ($a.displayName = `ScrollRestoration`));
var no = 0,
  ro = () => `__${String(++no)}__`,
  io = `react-router-scroll-positions`,
  ao = {};
function oo(e, t, n, r) {
  let i = null;
  return (
    r &&
      (i = r(
        n === `/` ? e : { ...e, pathname: Hn(e.pathname, n) || e.pathname },
        t
      )),
    (i ??= e.key),
    i
  );
}
function so(e) {
  return f(ha, { flushSync: O, ...e });
}
(a(),
  D(),
  globalThis.URLPattern ||
    (await n(() => import(`./urlpattern-polyfill-BARnH7kx.js`), [])),
  globalThis.URLPattern,
  a());
var co = () => {
  let e = aa();
  return (
    d(() => {
      if (!e) return;
      let t = document.querySelector(`body`);
      t &&
        ((t.dataset.routes = `errors`),
        e instanceof Error
          ? (document.title = `Loci | ${e?.message.toUpperCase()}`)
          : (document.title = `Loci | ${e?.status}`));
    }),
    e
      ? e instanceof Error
        ? T(E, {
            children: [
              w($t, { is: `h1`, children: `${e?.message}` }),
              w(J, { children: `${e?.stack}` }),
            ],
          })
        : T(E, {
            children: [
              w($t, { is: `h1`, children: `${e?.status}: ${e?.statusText}` }),
              w(J, { children: `${e?.error}` }),
            ],
          })
      : null
  );
};
a();
var lo = b.lazy(() =>
    n(() => import(`./Contents-Da4b1pHu.js`), __vite__mapDeps([0, 1]))
  ),
  uo = w(ba, {
    path: ``,
    element: w(() => w(i, { fallback: w(ps, {}), children: w(lo, {}) }), {}),
  });
(a(), a());
var fo = () => {
  let { pathname: e } = Vi(),
    t = Wi(),
    n = (0, W.default)(
      `kicl-text-align-center`,
      `kicl--router--http-status`,
      `kicl--router--http-status--404`
    ),
    r = document.referrer ? new URL(document.referrer) : void 0,
    i = { pathname: r?.pathname || `..`, search: r?.search, hash: r?.hash };
  return w(Te, {
    children: w($, {
      alignContent: `center`,
      alignItems: `center`,
      justifyContent: `center`,
      justifyItems: `center`,
      fullScreen: !0,
      children: T(`section`, {
        className: n,
        children: [
          w($, {
            alignContent: `center`,
            alignItems: `center`,
            justifyContent: `center`,
            justifyItems: `center`,
            children: T($t, {
              is: `h1`,
              children: [
                w(qe, { className: `kicl-font-size-extreme` }),
                `Oops, something not right!`,
              ],
            }),
          }),
          w(J, { lookLike: `h2`, children: `404 - Page Not Found` }),
          T(J, {
            children: [
              `The page `,
              w(J, { is: `span`, lookLike: `h3`, children: e }),
              ` you are looking for might have been removed, had its name changed, or it temporarily unavailable.`,
            ],
          }),
          w(Wo, {
            level: `confirm`,
            lookLikeButton: !0,
            onClick: (e) => {
              r?.origin &&
                r?.origin !== window.location.origin &&
                (e.preventDefault(), t(-1));
            },
            to: i,
            size: `large`,
            variant: `secondary`,
            children: `Go Back`,
          }),
        ],
      }),
    }),
  });
};
(a(), a(), a());
var po = ({ children: e }) => {
  return w(E, {
    children: w(so, {
      router:
        ((t = Sa(e)),
        Nr({
          basename: n?.basename,
          getContext: n?.getContext,
          future: n?.future,
          history: fn({ window: n?.window }),
          hydrationData: n?.hydrationData || Ya(),
          routes: t,
          mapRouteProperties: fa,
          hydrationRouteProperties: pa,
          dataStrategy: n?.dataStrategy,
          patchRoutesOnNavigation: n?.patchRoutesOnNavigation,
          window: n?.window,
          instrumentations: n?.instrumentations,
        }).initialize()),
    }),
  });
  var t, n;
};
function mo() {
  let e = o(null),
    [t, n] = r(e.current?.getBoundingClientRect());
  return (
    d(() => {
      let r = new ResizeObserver((e) => {
        for (let r of e) {
          let e = r.target.getBoundingClientRect();
          if (Object.keys(e.toJSON()).every((n) => e[n] === t?.[n])) return;
          n(e);
        }
      });
      return (
        e.current && r.observe(e.current),
        () => {
          r.disconnect();
        }
      );
    }),
    { node: e, rect: t }
  );
}
(a(), a(), a());
var ho = t((e) => {
    ((e.match = function (e, t) {
      return o(e).some(function (e) {
        var n = e.inverse,
          r = e.type === `all` || t.type === e.type;
        if ((r && n) || (!r && !n)) return !1;
        var i = e.expressions.every(function (e) {
          var n = e.feature,
            r = e.modifier,
            i = e.value,
            a = t[n];
          if (!a) return !1;
          switch (n) {
            case `orientation`:
            case `scan`:
              return a.toLowerCase() === i.toLowerCase();
            case `width`:
            case `height`:
            case `device-width`:
            case `device-height`:
              ((i = l(i)), (a = l(a)));
              break;
            case `resolution`:
              ((i = c(i)), (a = c(a)));
              break;
            case `aspect-ratio`:
            case `device-aspect-ratio`:
            case `device-pixel-ratio`:
              ((i = s(i)), (a = s(a)));
              break;
            case `grid`:
            case `color`:
            case `color-index`:
            case `monochrome`:
              ((i = parseInt(i, 10) || 1), (a = parseInt(a, 10) || 0));
          }
          switch (r) {
            case `min`:
              return a >= i;
            case `max`:
              return a <= i;
            default:
              return a === i;
          }
        });
        return (i && !n) || (!i && n);
      });
    }),
      (e.parse = o));
    var t = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
      n = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
      r = /^(?:(min|max)-)?(.+)/,
      i = /(em|rem|px|cm|mm|in|pt|pc)?$/,
      a = /(dpi|dpcm|dppx)?$/;
    function o(e) {
      return e.split(`,`).map(function (e) {
        var i = (e = e.trim()).match(t),
          a = i[1],
          o = i[2],
          s = i[3] || ``,
          c = {};
        return (
          (c.inverse = !!a && a.toLowerCase() === `not`),
          (c.type = o ? o.toLowerCase() : `all`),
          (s = s.match(/\([^\)]+\)/g) || []),
          (c.expressions = s.map(function (e) {
            var t = e.match(n),
              i = t[1].toLowerCase().match(r);
            return { modifier: i[1], feature: i[2], value: t[2] };
          })),
          c
        );
      });
    }
    function s(e) {
      var t,
        n = Number(e);
      return ((n ||= (t = e.match(/^(\d+)\s*\/\s*(\d+)$/))[1] / t[2]), n);
    }
    function c(e) {
      var t = parseFloat(e);
      switch (String(e).match(a)[1]) {
        case `dpcm`:
          return t / 2.54;
        case `dppx`:
          return 96 * t;
        default:
          return t;
      }
    }
    function l(e) {
      var t = parseFloat(e);
      switch (String(e).match(i)[1]) {
        case `em`:
        case `rem`:
          return 16 * t;
        case `cm`:
          return (96 * t) / 2.54;
        case `mm`:
          return (96 * t) / 2.54 / 10;
        case `in`:
          return 96 * t;
        case `pt`:
          return 72 * t;
        case `pc`:
          return (72 * t) / 12;
        default:
          return t;
      }
    }
  }),
  go = t((e, t) => {
    var n = ho().match,
      r = typeof window < `u` ? window.matchMedia : null;
    function i(e, t, i) {
      var a,
        o = this;
      function s(e) {
        ((o.matches = e.matches), (o.media = e.media));
      }
      (r && !i && (a = r.call(window, e)),
        a
          ? ((this.matches = a.matches),
            (this.media = a.media),
            a.addListener(s))
          : ((this.matches = n(e, t)), (this.media = e)),
        (this.addListener = function (e) {
          a && a.addListener(e);
        }),
        (this.removeListener = function (e) {
          a && a.removeListener(e);
        }),
        (this.dispose = function () {
          a && a.removeListener(s);
        }));
    }
    t.exports = function (e, t, n) {
      return new i(e, t, n);
    };
  }),
  _o = /[A-Z]/g,
  vo = /^ms-/,
  yo = {};
function bo(e) {
  return `-` + e.toLowerCase();
}
function xo(e) {
  if (yo.hasOwnProperty(e)) return yo[e];
  var t = e.replace(_o, bo);
  return (yo[e] = vo.test(t) ? `-` + t : t);
}
a();
var So = e(go()),
  Co = K.default.oneOfType([K.default.string, K.default.number]),
  wo = {
    all: K.default.bool,
    grid: K.default.bool,
    aural: K.default.bool,
    braille: K.default.bool,
    handheld: K.default.bool,
    print: K.default.bool,
    projection: K.default.bool,
    screen: K.default.bool,
    tty: K.default.bool,
    tv: K.default.bool,
    embossed: K.default.bool,
  },
  To = {
    orientation: K.default.oneOf([`portrait`, `landscape`]),
    scan: K.default.oneOf([`progressive`, `interlace`]),
    aspectRatio: K.default.string,
    deviceAspectRatio: K.default.string,
    height: Co,
    deviceHeight: Co,
    width: Co,
    deviceWidth: Co,
    color: K.default.bool,
    colorIndex: K.default.bool,
    monochrome: K.default.bool,
    resolution: Co,
    type: Object.keys(wo),
  },
  { type: Eo, ...Do } = To,
  Oo = {
    minAspectRatio: K.default.string,
    maxAspectRatio: K.default.string,
    minDeviceAspectRatio: K.default.string,
    maxDeviceAspectRatio: K.default.string,
    minHeight: Co,
    maxHeight: Co,
    minDeviceHeight: Co,
    maxDeviceHeight: Co,
    minWidth: Co,
    maxWidth: Co,
    minDeviceWidth: Co,
    maxDeviceWidth: Co,
    minColor: K.default.number,
    maxColor: K.default.number,
    minColorIndex: K.default.number,
    maxColorIndex: K.default.number,
    minMonochrome: K.default.number,
    maxMonochrome: K.default.number,
    minResolution: Co,
    maxResolution: Co,
    ...Do,
  },
  ko = { all: { ...wo, ...Oo }, types: wo, matchers: To, features: Oo },
  Ao = (e) => {
    let t = [];
    return (
      Object.keys(ko.all).forEach((n) => {
        let r = e[n];
        r != null &&
          t.push(
            ((e, t) => {
              let n = xo(e);
              return (
                typeof t == `number` && (t = `${t}px`),
                !0 === t ? n : !1 === t ? `not ${n}` : `(${n}: ${t})`
              );
            })(n, r)
          );
      }),
      t.join(` and `)
    );
  },
  jo = v(void 0),
  Mo = (e) => {
    if (e) return Object.keys(e).reduce((t, n) => ((t[xo(n)] = e[n]), t), {});
  },
  No = () => {
    let e = o(!1);
    return (
      d(() => {
        e.current = !0;
      }, []),
      e.current
    );
  },
  Po = (e) => {
    let t = m(jo),
      n = () => Mo(e) || Mo(t),
      [i, a] = r(n);
    return (
      d(() => {
        let e = n();
        (function (e, t) {
          if (e === t) return !0;
          if (!e || !t) return !1;
          let n = Object.keys(e),
            r = Object.keys(t),
            i = n.length;
          if (r.length !== i) return !1;
          for (let r = 0; r < i; r++) {
            let i = n[r];
            if (e[i] !== t[i] || !Object.prototype.hasOwnProperty.call(t, i))
              return !1;
          }
          return !0;
        })(i, e) || a(e);
      }, [e, t]),
      i
    );
  },
  Fo = (e) => {
    let t = () => ((e) => e.query || Ao(e))(e),
      [n, i] = r(t);
    return (
      d(() => {
        let e = t();
        n !== e && i(e);
      }, [e]),
      n
    );
  },
  Io = (e, t, n) => {
    let i = Po(t),
      a = Fo(e);
    if (!a) throw Error(`Invalid or missing MediaQuery!`);
    let o = ((e, t) => {
        let n = () => (0, So.default)(e, t || {}, !!t),
          [i, a] = r(n),
          o = No();
        return (
          d(() => {
            if (o) {
              let e = n();
              return (
                a(e),
                () => {
                  e && e.dispose();
                }
              );
            }
          }, [e, t]),
          i
        );
      })(a, i),
      s = ((e) => {
        let [t, n] = r(e.matches);
        return (
          d(() => {
            let t = (e) => {
              n(e.matches);
            };
            return (
              e.addListener(t),
              n(e.matches),
              () => {
                e.removeListener(t);
              }
            );
          }, [e]),
          t
        );
      })(o),
      c = No();
    return (
      d(() => {
        c && n && n(s);
      }, [s]),
      d(
        () => () => {
          o && o.dispose();
        },
        []
      ),
      s
    );
  };
a();
var Lo = `kicl--theme--dark`,
  Ro = window.getComputedStyle(document.documentElement),
  zo = {
    desktop: Ce({ values: Ro.getPropertyValue(`--kicl-breakpoint-desktop`) }),
    tablet: Ce({ values: Ro.getPropertyValue(`--kicl-breakpoint-tablet`) }),
    mobile: Ce({ values: Ro.getPropertyValue(`--kicl-breakpoint-mobile`) }),
    wide: Ce({ values: Ro.getPropertyValue(`--kicl-breakpoint-wide`) }),
  },
  Bo = () => {
    let e = Io({ query: `(prefers-color-scheme: dark)` });
    d(() => {
      e ? document.body.classList.add(Lo) : document.body.classList.remove(Lo);
    }, [e]);
    let t = Io({ query: `(orientation: landscape)` }),
      n = Io({ query: `(orientation: portrait)` }),
      r = Io({ query: `(max-width: ${zo.wide}px)` }),
      i = Io({ query: `(max-width: ${zo.desktop}px)` }),
      a = Io({ query: `(max-width: ${zo.tablet}px)` }),
      o = Io({ query: `(max-width: ${zo.mobile}px)` }),
      s = Io({ query: `(min-width: ${zo.wide + 1}px)` });
    return {
      breakpoints: zo,
      isDarkColorSchemePrefers: e,
      isDesktop: r || s || !i || !a,
      isLandscape: t,
      isMobile: a || o,
      isNarrow: o,
      isPortrait: n,
      isTablet: i || a,
      isWidescreen: s,
    };
  };
a();
var Vo = { behavior: `smooth`, block: `center` };
a();
var Ho = `kicl--components--hyper-link`,
  Uo = ({ className: e, unstyled: t = !1 } = {}) =>
    (0, W.default)(Ho, { [`${Ho}--unstyled`]: t }, e),
  Wo = b.forwardRef(
    (
      {
        after: e,
        before: t,
        children: n,
        className: r = ``,
        disabled: i,
        level: a,
        lookLikeButton: o,
        target: s,
        onClick: c,
        style: l,
        to: u,
        variant: d,
        unstyled: f = !1,
        ...p
      },
      m
    ) => {
      let { scrollIntoView: h } = {
        scrollIntoView: (e) => {
          e?.scrollIntoView({ ...Vo, ...g });
        },
      };
      var g;
      let _ = ((e) => {
          if (typeof e == `string`) {
            let t = e.startsWith(`#`),
              n = e.startsWith(`?`);
            try {
              return { isExternal: !!new URL(e), isHash: t, isSearch: n };
            } catch {
              return { isExternal: !1, isHash: t, isSearch: n };
            }
          }
          if (e.pathname) {
            let t = !!e.hash,
              n = !!e.search;
            try {
              return {
                isExternal: !!new URL(e.pathname),
                isHash: t,
                isSearch: n,
              };
            } catch {
              return { isExternal: !1, isHash: t, isSearch: n };
            }
          }
          return { isExternal: !1, isHash: !1, isSearch: !1 };
        })(u),
        v = (0, W.default)(
          Uo({ className: r, unstyled: f }),
          {
            [ke({ ...p, disabled: i, level: a, variant: d })]: o && !f,
            [`${Ho}--look-like-button`]: o && !f,
          },
          String(r)
        ),
        y = s;
      _.isExternal && (y = `_blank`);
      let b = n;
      (e || t) &&
        (b = w($, {
          autoFlow: `column`,
          alignContent: `center`,
          alignItems: `center`,
          gap: `narrow`,
          children: T(J, {
            className: `${Ho}--wrapper`,
            is: `span`,
            children: [
              t,
              w(J, {
                className: `${Ho}--wrapper--content`,
                is: `span`,
                children: b,
              }),
              e,
            ],
          }),
        }));
      let x = w(Qa, {
        ...p,
        className: v,
        onClick: (e) => {
          if (i) e.preventDefault();
          else {
            if (_.isHash) {
              e.preventDefault();
              let t = typeof u == `string`,
                n = null;
              (t && (n = window.document.querySelector(u)),
                !t && u.hash && (n = window.document.querySelector(u.hash)),
                h(n));
            }
            c?.(e);
          }
        },
        ref: m,
        tabIndex: i ? -1 : void 0,
        target: y,
        to: u,
        'aria-disabled': i,
        children: b,
      });
      return o ? w($, { alignItems: `center`, children: x }) : x;
    }
  );
((Wo.displayName = `HyperLink`), a(), a());
var Go = b.forwardRef(({ className: e, type: t = `text`, ...n }, r) =>
  w(`input`, {
    ref: r,
    type: t,
    'data-slot': `input`,
    className: (0, W.default)(
      `kicl--components--input`,
      `kicl-font-size-small`,
      e
    ),
    ...n,
  })
);
((Go.displayName = `Input`), a());
var Ko = b.forwardRef(({ className: e, ...t }, n) =>
  w(`textarea`, {
    ref: n,
    'data-slot': `textarea`,
    className: (0, W.default)(
      `kicl--components--textarea`,
      `kicl-font-size-small`,
      e
    ),
    ...t,
  })
);
((Ko.displayName = `Textarea`), a());
var qo = `kicl--components--input-group`;
((b.forwardRef(({ children: e, className: t, ...n }, r) =>
  w(`div`, {
    ref: r,
    'data-slot': `input-group`,
    className: (0, W.default)(qo, t),
    ...n,
    children: e,
  })
).displayName = `InputGroup`),
  (b.forwardRef(({ align: e = `inline-start`, className: t, ...n }, r) =>
    w(`div`, {
      ref: r,
      'data-slot': `input-group-addon`,
      'data-align': e,
      className: (0, W.default)(`${qo}__addon`, `${qo}__addon--${e}`, t),
      ...n,
    })
  ).displayName = `InputGroupAddon`),
  (b.forwardRef(
    ({ className: e, size: t = `sm`, variant: n = `ghost`, ...r }, i) =>
      w(Ae, {
        ref: i,
        size:
          t === `xs` || t === `icon-xs` || t === `sm` || t === `icon-sm`
            ? `small`
            : void 0,
        unstyled: n === `ghost` || n === `link`,
        className: (0, W.default)(`${qo}__button`, e),
        ...r,
      })
  ).displayName = `InputGroupButton`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(Go, {
      ref: n,
      'data-slot': `input-group-control`,
      className: (0, W.default)(`${qo}__control`, e),
      ...t,
    })
  ).displayName = `InputGroupInput`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(Ko, {
      ref: n,
      'data-slot': `input-group-control`,
      className: (0, W.default)(`${qo}__control`, e),
      ...t,
    })
  ).displayName = `InputGroupTextarea`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(`span`, {
      ref: n,
      'data-slot': `input-group-text`,
      className: (0, W.default)(`${qo}__text`, `kicl-font-size-small`, e),
      ...t,
    })
  ).displayName = `InputGroupText`),
  a());
var Jo = `kicl-layout`,
  $ = b.forwardRef(
    (
      {
        children: e,
        alignContent: t,
        alignItems: n,
        autoFlow: r = `row`,
        display: i = `grid`,
        frames: a,
        fullScreen: o,
        gap: s = `normal`,
        justifyContent: c,
        justifyItems: l,
        wrap: u,
        ...d
      },
      f
    ) => {
      let p = (0, W.default)(
          Jo,
          {
            [`${Jo}--align-content--${t}`]: t,
            [`${Jo}--align-items--${n}`]: n,
            [`${Jo}--${r}`]: r,
            [`${Jo}--display--${i}`]: i,
            [`${Jo}--full-screen`]: o,
            [`${Jo}--gap--${s}`]: s,
            [`${Jo}--justify-content--${c}`]: c,
            [`${Jo}--justify-items--${l}`]: l,
            [`${Jo}--wrap`]: u,
            [`${Jo}--${a}`]: a,
          },
          d.className
        ),
        m = b.Children.only(e);
      if (!m || !b.isValidElement(m)) return m;
      let h = m.props || {},
        g = h.ref;
      return b.cloneElement(m, {
        ...d,
        ...h,
        className: (0, W.default)(p, h.className),
        ref: (e) => {
          (typeof f == `function` ? f(e) : f && (f.current = e),
            typeof g == `function` ? g(e) : g && (g.current = e));
        },
      });
    }
  );
(($.displayName = `Layout`), a());
var Yo = b.forwardRef(({ children: e, ...t }, n) =>
  w(`ol`, { ...t, ref: n, children: e })
);
Yo.displayName = `List.OL`;
var Xo = b.forwardRef(({ children: e, ...t }, n) =>
  w(`ul`, { ...t, ref: n, children: e })
);
Xo.displayName = `List.UL`;
var Zo = b.forwardRef(({ is: e = `ul`, ...t }, n) => {
  let r = t;
  switch (e) {
    case `ol`:
      return w(Yo, { ...r, 'data-is': e, ref: n });
    case `ul`:
      return w(Xo, { ...r, 'data-is': e, ref: n });
    default:
      throw Error(`Unsupported node type: ${e}`);
  }
});
((Zo.displayName = `List.Switch`),
  (b.forwardRef(
    (
      {
        children: e,
        alignContent: t,
        alignItems: n,
        autoFlow: r,
        frames: i,
        fullScreen: a,
        gap: o = `normal`,
        is: s = `ul`,
        justifyContent: c,
        justifyItems: l,
        wrap: u,
        ...d
      },
      f
    ) => {
      let p = (0, W.default)(`kicl--components--list`, d.className);
      return w($, {
        alignContent: t,
        alignItems: n,
        autoFlow: r,
        frames: i,
        fullScreen: a,
        gap: o,
        justifyContent: c,
        justifyItems: l,
        wrap: u,
        children: w(Zo, { ...d, className: p, is: s, ref: f, children: e }),
      });
    }
  ).displayName = `List`),
  a());
var Qo = b.forwardRef(
  (
    {
      children: e,
      alignContent: t,
      alignItems: n,
      autoFlow: r,
      frames: i,
      fullScreen: a,
      gap: o,
      justifyContent: s,
      justifyItems: c,
      wrap: l,
      ...u
    },
    d
  ) => {
    let f = (0, W.default)(`kicl--components--list-item`, u.className);
    return w($, {
      alignContent: t,
      alignItems: n,
      autoFlow: r,
      frames: i,
      fullScreen: a,
      gap: o,
      justifyContent: s,
      justifyItems: c,
      wrap: l,
      ref: d,
      children: w(`li`, { ...u, className: f, children: e }),
    });
  }
);
((Qo.displayName = `ListItem`), a());
var $o = `kicl--components--menu`,
  es = [
    `extreme`,
    `narrow`,
    `narrower`,
    `narrowest`,
    `normal`,
    `wide`,
    `wider`,
    `widest`,
  ];
((b.forwardRef(
  (
    {
      children: e,
      className: t = ``,
      alignContent: n,
      alignItems: r,
      autoFlow: i = `column`,
      frames: a,
      fullScreen: o,
      gap: s = `normal`,
      justifyContent: c,
      justifyItems: l,
      wrap: u,
      ...d
    },
    f
  ) => {
    typeof s == `boolean` || [...es, void 0].includes(s) || (s = `normal`);
    let p = (0, W.default)($o, t);
    return w($, {
      alignContent: n,
      alignItems: r,
      autoFlow: i,
      frames: a,
      fullScreen: o,
      gap: s,
      justifyContent: c,
      justifyItems: l,
      wrap: u,
      children: w(`menu`, {
        ...d,
        className: p,
        ref: f,
        children: b.Children.toArray(e).map((e) => {
          let t = String(e);
          return (
            b.isValidElement(e) && (t = String(e.key)),
            w(Qo, { className: `${$o}--list-item`, children: e }, t)
          );
        }),
      }),
    });
  }
).displayName = `Menu`),
  a());
var ts = `kicl--components--navigation`,
  ns = b.forwardRef(
    (
      {
        animation: e,
        children: t,
        className: n = ``,
        alignContent: r,
        alignItems: i,
        autoFlow: a,
        frames: o,
        fullScreen: s,
        gap: c = `normal`,
        is: l = `ul`,
        justifyContent: u,
        justifyItems: d,
        wrap: p,
        ...m
      },
      h
    ) => {
      let g = (0, W.default)(ts, n);
      return w($, {
        alignContent: r,
        alignItems: i,
        autoFlow: a,
        frames: o,
        fullScreen: s,
        gap: c,
        justifyContent: u,
        justifyItems: d,
        wrap: p,
        children: w(`nav`, {
          ...m,
          className: g,
          ref: h,
          children: b.Children.toArray(t).map((t, n) => {
            let r = String(t);
            b.isValidElement(t) && (r = String(t.key));
            let i = w(Qo, { className: `${ts}--list-item`, children: t }, r);
            if (e) {
              let t = typeof e == `boolean` ? {} : e,
                a = (t.animationDelay || 0) + 100 * (n + 1);
              return f(Te, { ...t, animationDelay: a, key: r }, i);
            }
            return i;
          }),
        }),
      });
    }
  );
((ns.displayName = `Navigation`), a());
var rs = `kicl--components--radio-group`,
  is = v(null),
  as = b.forwardRef(
    (
      {
        children: e,
        className: t,
        defaultValue: n,
        disabled: i,
        name: a,
        onValueChange: o,
        value: c,
        ...l
      },
      u
    ) => {
      let d = s(),
        f = c !== void 0,
        [p, m] = r(n),
        h = f ? c : p;
      return w(is.Provider, {
        value: {
          disabled: i,
          name: a ?? d,
          onValueChange: (e) => {
            i || (f || m(e), o?.(e));
          },
          value: h,
        },
        children: w(`div`, {
          ref: u,
          role: `radiogroup`,
          'data-slot': `radio-group`,
          className: (0, W.default)(rs, t),
          ...l,
          children: e,
        }),
      });
    }
  );
((as.displayName = `RadioGroup`),
  (b.forwardRef(({ className: e, disabled: t, value: n, ...r }, i) => {
    let a = (() => {
        let e = m(is);
        if (!e) throw Error(`RadioGroupItem must be used within RadioGroup`);
        return e;
      })(),
      o = t || a.disabled,
      s = a.value === n;
    return w(`button`, {
      ref: i,
      type: `button`,
      role: `radio`,
      'aria-checked': s,
      'data-slot': `radio-group-item`,
      disabled: o,
      className: (0, W.default)(
        `${rs}__item`,
        { [`${rs}__item--checked`]: s, [`${rs}__item--disabled`]: o },
        e
      ),
      onClick: () => a.onValueChange(n),
      ...r,
    });
  }).displayName = `RadioGroupItem`),
  a());
var os = `kicl--components--select`,
  ss = v(null),
  cs = () => {
    let e = m(ss);
    if (!e) throw Error(`Select parts must be used within Select`);
    return e;
  };
((b.forwardRef(
  ({ children: e, className: t, disabled: n, onKeyDown: r, ...i }, a) => {
    let o = cs(),
      s = n || o.disabled;
    return T(`button`, {
      ref: a,
      type: `button`,
      id: o.triggerId,
      disabled: s,
      'aria-haspopup': `listbox`,
      'aria-expanded': o.open,
      'aria-controls': o.listId,
      'data-slot': `select-trigger`,
      className: (0, W.default)(`${os}__trigger`, `kicl-font-size-small`, t),
      onClick: () => {
        s || o.setOpen(!o.open);
      },
      onKeyDown: (e) => {
        (r?.(e),
          e.defaultPrevented ||
            ((e.key !== `ArrowDown` && e.key !== `Enter` && e.key !== ` `) ||
              (e.preventDefault(), o.setOpen(!0)),
            e.key === `Escape` && o.setOpen(!1)));
      },
      ...i,
      children: [e, w($e, { className: `${os}__icon`, 'aria-hidden': !0 })],
    });
  }
).displayName = `SelectTrigger`),
  (b.forwardRef(({ className: e, placeholder: t = `Select…`, ...n }, r) => {
    let i = cs(),
      a = !i.valueLabel;
    return w(`span`, {
      ref: r,
      'data-slot': `select-value`,
      className: (0, W.default)(
        `${os}__value`,
        { [`${os}__value--placeholder`]: a },
        e
      ),
      ...n,
      children: a ? t : i.valueLabel,
    });
  }).displayName = `SelectValue`));
var ls = b.forwardRef(({ children: e, className: t, ...n }, i) => {
  let a = cs(),
    s = o(null),
    [c, l] = r(null);
  return (
    C(() => {
      if (!a.open) return void l(null);
      let e = () => {
        let e = s.current;
        if (!e) return;
        let t = e
          .closest(`.${os}`)
          ?.querySelector(`[data-slot='select-trigger']`);
        if (!t) return;
        let n = t.getBoundingClientRect(),
          r = (() => {
            let e = getComputedStyle(document.documentElement)
                .getPropertyValue(`--kicl-gutter-narrowest`)
                .trim(),
              t = Number.parseFloat(e);
            return Number.isFinite(t) ? t : 4;
          })(),
          i = ((e) => {
            let t = getComputedStyle(e).maxBlockSize,
              n = Number.parseFloat(t);
            return Number.isFinite(n) ? n : 256;
          })(e),
          a = window.innerHeight - n.bottom - r,
          o = n.top - r,
          c = a < Math.min(i, e.scrollHeight || i) && o > a ? `top` : `bottom`,
          u = c === `bottom` ? a : o;
        l({
          side: c,
          left: n.left,
          width: n.width,
          maxHeight: Math.max(0, Math.min(i, u)),
          ...(c === `bottom`
            ? { top: n.bottom + r, bottom: void 0 }
            : { top: void 0, bottom: window.innerHeight - n.top + r }),
        });
      };
      return (
        e(),
        window.addEventListener(`resize`, e),
        window.addEventListener(`scroll`, e, !0),
        () => {
          (window.removeEventListener(`resize`, e),
            window.removeEventListener(`scroll`, e, !0));
        }
      );
    }, [a.open, e]),
    d(() => {
      if (!a.open) return;
      let e = (e) => {
        let t = s.current,
          n = e.target;
        if (!t || !n) return;
        let r = t.closest(`.${os}`);
        r && !r.contains(n) && a.setOpen(!1);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [a]),
    w(`div`, {
      ref: (e) => {
        ((s.current = e), typeof i == `function` ? i(e) : i && (i.current = e));
      },
      id: a.listId,
      role: `listbox`,
      hidden: !a.open,
      'data-slot': `select-content`,
      'data-side': c?.side,
      className: (0, W.default)(`${os}__content`, `kicl-position-fixed`, t),
      ...n,
      style: {
        ...n.style,
        ...(c
          ? {
              insetInlineStart: c.left,
              inlineSize: c.width,
              maxBlockSize: c.maxHeight,
              insetBlockStart: c.side === `bottom` ? c.top : `auto`,
              insetBlockEnd: c.side === `top` ? c.bottom : `auto`,
            }
          : null),
      },
      children: e,
    })
  );
});
((ls.displayName = `SelectContent`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(`div`, {
      ref: n,
      role: `group`,
      'data-slot': `select-group`,
      className: (0, W.default)(`${os}__group`, e),
      ...t,
    })
  ).displayName = `SelectGroup`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(`div`, {
      ref: n,
      'data-slot': `select-label`,
      className: (0, W.default)(`${os}__label`, `kicl-font-size-smaller`, e),
      ...t,
    })
  ).displayName = `SelectLabel`),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(`hr`, {
      ref: n,
      'data-slot': `select-separator`,
      className: (0, W.default)(`${os}__separator`, e),
      ...t,
    })
  ).displayName = `SelectSeparator`),
  (b.forwardRef(
    ({ children: e, className: t, disabled: n, value: r, ...i }, a) => {
      let { registerItem: o, onValueChange: s, value: c } = cs(),
        l = typeof e == `string` ? e : String(r),
        u = c === r;
      return (
        d(() => {
          o({ value: r, label: l });
        }, [l, o, r]),
        T(`button`, {
          ref: a,
          type: `button`,
          role: `option`,
          'aria-selected': u,
          disabled: n,
          'data-slot': `select-item`,
          className: (0, W.default)(`${os}__item`, `kicl-font-size-small`, t),
          onClick: () => s(r, l),
          ...i,
          children: [
            w(`span`, { children: e }),
            u
              ? w(Ke, { className: `${os}__item-indicator`, 'aria-hidden': !0 })
              : null,
          ],
        })
      );
    }
  ).displayName = `SelectItem`),
  a());
var us = `kicl--components--separator`;
((b.forwardRef(
  (
    { className: e, decorative: t = !0, orientation: n = `horizontal`, ...r },
    i
  ) =>
    w(`div`, {
      ref: i,
      role: t ? `none` : `separator`,
      'aria-orientation': t ? void 0 : n,
      'data-slot': `separator`,
      'data-orientation': n,
      className: (0, W.default)(us, `${us}--${n}`, e),
      ...r,
    })
).displayName = `Separator`),
  a(),
  (b.forwardRef(({ className: e, ...t }, n) =>
    w(`div`, {
      ref: n,
      'data-slot': `skeleton`,
      className: (0, W.default)(`kicl--components--skeleton`, e),
      ...t,
    })
  ).displayName = `Skeleton`),
  a(),
  a(),
  D());
var ds = `kicl--components--spinner`,
  fs = `fast`,
  ps = ({
    animationDelay: e = 0,
    animationDuration: t = `fast`,
    animationStyle: n = `zoom-out`,
    atRoot: r,
    className: i,
    hasBackdrop: a = !0,
    in: o,
    onEnter: s,
    onEntered: c,
    onEntering: l,
    onExit: u,
    onExited: d,
    onExiting: f,
    position: p = `overlay`,
    size: m,
    ...h
  }) => {
    let g = p === `overlay`,
      _ = g ? 200 : 0,
      v = (0, W.default)(
        ds,
        {
          'kicl-font-size-large': g,
          [`${ds}--no-backdrop`]: !a,
          [`${ds}--position--${p}`]: p,
          [`${ds}--size--${m}`]: m,
        },
        i
      ),
      y = !!o,
      b = y ? fs : t,
      x = y ? e + _ : e,
      S = y ? t : fs,
      C = y ? e : e + _,
      T = w(Te, {
        ...h,
        animationDelay: C,
        animationDuration: S,
        in: o,
        children: w($, {
          display: g ? `grid` : `inline-grid`,
          alignContent: `center`,
          alignItems: `center`,
          justifyContent: `center`,
          justifyItems: `center`,
          children: w(J, {
            className: v,
            is: `span`,
            role: `progressbar`,
            unstyled: !0,
            children: w(Te, {
              ...h,
              animationDelay: x,
              animationDuration: b,
              animationStyle: n,
              in: o,
              onEnter: s,
              onEntered: c,
              onEntering: l,
              onExit: u,
              onExited: d,
              onExiting: f,
              children: w($, {
                display: g ? `grid` : `inline-grid`,
                children: w(J, {
                  is: `span`,
                  children: w(We, { className: `${ds}--icon` }),
                }),
              }),
            }),
          }),
        }),
      });
    if (!r) return T;
    let D = document.querySelector(`body`);
    return D ? w(E, { children: k.createPortal(T, D) }) : T;
  };
a();
var ms = ({ children: e, className: t, ...n }) =>
  w(`span`, {
    className: (0, W.default)(
      `kicl--components--switch__label`,
      `kicl-font-size-small`,
      `kicl-color-grey-darker`,
      t
    ),
    ...n,
    children: e,
  });
((ms.displayName = `SwitchLabel`), a());
var hs = `kicl--components--switch`,
  gs = `kicl--components--switch-field`;
((b.forwardRef(
  (
    {
      checked: e,
      children: t,
      className: n,
      defaultChecked: i = !1,
      disabled: a,
      id: o,
      label: c,
      onCheckedChange: l,
      size: u = `default`,
      ...d
    },
    f
  ) => {
    let p = e !== void 0,
      [m, h] = r(i),
      g = p ? !!e : m,
      _ = s(),
      v = o ?? _,
      y = null,
      x = [];
    b.Children.forEach(t, (e) => {
      ((e) =>
        b.isValidElement(e) &&
        (e.type === ms ||
          (typeof e.type != `string` && e.type.displayName === `SwitchLabel`)))(
        e
      )
        ? (y = e)
        : e != null && !1 !== e && x.push(e);
    });
    let S = y ?? (c != null && !1 !== c ? w(ms, { children: c }) : null),
      C = T(`button`, {
        ref: f,
        id: v,
        type: `button`,
        role: `switch`,
        'aria-checked': g,
        disabled: a,
        className: (0, W.default)(
          hs,
          `${hs}--size--${u}`,
          { [`${hs}--checked`]: g, [`${hs}--disabled`]: a },
          n
        ),
        onClick: () => {
          if (a) return;
          let e = !g;
          (p || h(e), l?.(e));
        },
        ...d,
        children: [
          w(`span`, { className: `${hs}__thumb`, 'aria-hidden': !0 }),
          x,
        ],
      });
    return S
      ? T(`label`, {
          className: (0, W.default)(gs, { [`${gs}--disabled`]: a }),
          children: [C, S],
        })
      : C;
  }
).displayName = `Switch`),
  a());
var _s = b.forwardRef(
  (
    {
      animationDelay: e = 0,
      animationDuration: t = `fastest`,
      animationEasing: n,
      animationStyle: r = `slide-from-top`,
      children: i,
      stagger: a = 10,
      ...o
    },
    s
  ) => {
    if (![`string`, `number`].includes(typeof i)) return null;
    let c = String(i);
    return w(J, {
      ...o,
      ref: s,
      children: c.split(``).map((i, o) => {
        let s = `${o}`;
        return w(
          Te,
          {
            animationDelay: e + a * o,
            animationDuration: t,
            animationEasing: n,
            animationStyle: r,
            children: w(J, { is: `span`, unstyled: !0, children: i }),
          },
          s
        );
      }),
    });
  }
);
((_s.displayName = `AnimatedText`), a());
var vs = `kicl--components--video`;
b.forwardRef(
  (
    {
      autoPlay: e = !0,
      className: t,
      controls: n = !1,
      controlsList: i = `nofullscreen nodownload`,
      height: a = `auto`,
      loop: o = !0,
      muted: s = !0,
      objectFit: c,
      onLoadedData: l,
      onLoadStart: u,
      playsInline: d = !0,
      preload: f = `auto`,
      src: p,
      width: m = `auto`,
      ...h
    },
    g
  ) => {
    let [_, v] = r(!0);
    return w($, {
      alignContent: `stretch`,
      alignItems: `stretch`,
      justifyContent: `stretch`,
      justifyItems: `stretch`,
      ref: g,
      children: T(`figure`, {
        className: (0, W.default)(vs, { [`${vs}--object-fit--${c}`]: !!c }, t),
        children: [
          T(`video`, {
            ...h,
            autoPlay: e,
            controls: n,
            controlsList: i,
            height: a,
            loop: o,
            muted: !0,
            onLoadStart: (e) => {
              (v(!0), u?.(e));
            },
            onLoadedData: (e) => {
              (v(!1), l?.(e));
            },
            playsInline: d,
            preload: f,
            width: m,
            children: [
              w(`source`, { src: p, type: `video/mp4` }),
              w(`track`, {
                default: !0,
                kind: `captions`,
                label: `English`,
                srcLang: `en`,
              }),
            ],
          }),
          w(ps, { in: _ }),
        ],
      }),
    });
  }
).displayName = `Video`;
export {
  De as A,
  Ge as C,
  Xe as D,
  Je as E,
  ue as M,
  M as N,
  Ue as O,
  j as P,
  Ot as S,
  Ye as T,
  Wi as _,
  Wo as a,
  J as b,
  po as c,
  co as d,
  va as f,
  Vi as g,
  $a as h,
  $ as i,
  Te as j,
  Ae as k,
  fo as l,
  ba as m,
  ps as n,
  Bo as o,
  ya as p,
  ns as r,
  mo as s,
  _s as t,
  uo as u,
  Ki as v,
  Ve as w,
  Ut as x,
  $t as y,
};
//# sourceMappingURL=Components-DsgpJoHg.js.map

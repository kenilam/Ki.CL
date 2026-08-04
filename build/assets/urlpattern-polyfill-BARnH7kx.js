var e = Object.defineProperty,
  t = (t, n) => e(t, `name`, { value: n, configurable: !0 }),
  n = class {
    type = 3;
    name = ``;
    prefix = ``;
    value = ``;
    suffix = ``;
    modifier = 3;
    constructor(e, t, n, r, i, a) {
      ((this.type = e),
        (this.name = t),
        (this.prefix = n),
        (this.value = r),
        (this.suffix = i),
        (this.modifier = a));
    }
    hasCustomName() {
      return this.name !== `` && typeof this.name != `number`;
    }
  };
t(n, `Part`);
var r = /[$_\p{ID_Start}]/u,
  i = /[$_\u200C\u200D\p{ID_Continue}]/u,
  a = `.*`;
function o(e, t) {
  return (t ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(e);
}
function s(e, n = !1) {
  let a = [],
    s = 0;
  for (; s < e.length;) {
    let c = e[s],
      l = t(function (t) {
        if (!n) throw TypeError(t);
        a.push({ type: `INVALID_CHAR`, index: s, value: e[s++] });
      }, `ErrorOrInvalid`);
    if (c !== `*`)
      if (c !== `+` && c !== `?`)
        if (c !== `\\`)
          if (c !== `{`)
            if (c !== `}`) {
              if (c === `:`) {
                let t = ``,
                  n = s + 1;
                for (; n < e.length;) {
                  let a = e.substr(n, 1);
                  if (!(
                    (n === s + 1 && r.test(a)) ||
                    (n !== s + 1 && i.test(a))
                  ))
                    break;
                  t += e[n++];
                }
                if (!t) {
                  l(`Missing parameter name at ${s}`);
                  continue;
                }
                (a.push({ type: `NAME`, index: s, value: t }), (s = n));
                continue;
              }
              if (c === `(`) {
                let t = 1,
                  n = ``,
                  r = s + 1,
                  i = !1;
                if (e[r] === `?`) {
                  l(`Pattern cannot start with "?" at ${r}`);
                  continue;
                }
                for (; r < e.length;) {
                  if (!o(e[r], !1)) {
                    (l(`Invalid character '${e[r]}' at ${r}.`), (i = !0));
                    break;
                  }
                  if (e[r] !== `\\`) {
                    if (e[r] === `)`) {
                      if ((t--, t === 0)) {
                        r++;
                        break;
                      }
                    } else if (e[r] === `(` && (t++, e[r + 1] !== `?`)) {
                      (l(`Capturing groups are not allowed at ${r}`), (i = !0));
                      break;
                    }
                    n += e[r++];
                  } else n += e[r++] + e[r++];
                }
                if (i) continue;
                if (t) {
                  l(`Unbalanced pattern at ${s}`);
                  continue;
                }
                if (!n) {
                  l(`Missing pattern at ${s}`);
                  continue;
                }
                (a.push({ type: `REGEX`, index: s, value: n }), (s = r));
                continue;
              }
              a.push({ type: `CHAR`, index: s, value: e[s++] });
            } else a.push({ type: `CLOSE`, index: s, value: e[s++] });
          else a.push({ type: `OPEN`, index: s, value: e[s++] });
        else a.push({ type: `ESCAPED_CHAR`, index: s++, value: e[s++] });
      else a.push({ type: `OTHER_MODIFIER`, index: s, value: e[s++] });
    else a.push({ type: `ASTERISK`, index: s, value: e[s++] });
  }
  return (a.push({ type: `END`, index: s, value: `` }), a);
}
function c(e, r = {}) {
  let i = s(e);
  ((r.delimiter ??= `/#?`), (r.prefixes ??= `./`));
  let o = `[^${l(r.delimiter)}]+?`,
    c = [],
    u = 0,
    d = 0,
    f = new Set(),
    p = t((e) => {
      if (d < i.length && i[d].type === e) return i[d++].value;
    }, `tryConsume`),
    m = t(() => p(`OTHER_MODIFIER`) ?? p(`ASTERISK`), `tryConsumeModifier`),
    h = t((e) => {
      let t = p(e);
      if (t !== void 0) return t;
      let { type: n, index: r } = i[d];
      throw TypeError(`Unexpected ${n} at ${r}, expected ${e}`);
    }, `mustConsume`),
    g = t(() => {
      let e,
        t = ``;
      for (; (e = p(`CHAR`) ?? p(`ESCAPED_CHAR`));) t += e;
      return t;
    }, `consumeText`),
    _ = t((e) => e, `DefaultEncodePart`),
    v = r.encodePart || _,
    y = ``,
    b = t((e) => {
      y += e;
    }, `appendToPendingFixedValue`),
    x = t(() => {
      y.length && (c.push(new n(3, ``, ``, v(y), ``, 3)), (y = ``));
    }, `maybeAddPartFromPendingFixedValue`),
    S = t((e, t, r, i, s) => {
      let l,
        d = 3;
      switch (s) {
        case `?`:
          d = 1;
          break;
        case `*`:
          d = 0;
          break;
        case `+`:
          d = 2;
      }
      if (!t && !r && d === 3) return void b(e);
      if ((x(), !t && !r)) {
        if (!e) return;
        c.push(new n(3, ``, ``, v(e), ``, d));
        return;
      }
      l = r ? (r === `*` ? a : r) : o;
      let p,
        m = 2;
      if (
        (l === o ? ((m = 1), (l = ``)) : l === a && ((m = 0), (l = ``)),
        t ? (p = t) : r && (p = u++),
        f.has(p))
      )
        throw TypeError(`Duplicate name '${p}'.`);
      (f.add(p), c.push(new n(m, p, v(e), l, v(i), d)));
    }, `addPart`);
  for (; d < i.length;) {
    let e = p(`CHAR`),
      t = p(`NAME`),
      n = p(`REGEX`);
    if ((!t && !n && (n = p(`ASTERISK`)), t || n)) {
      let i = e ?? ``;
      (r.prefixes.indexOf(i) === -1 && (b(i), (i = ``)),
        x(),
        S(i, t, n, ``, m()));
      continue;
    }
    let i = e ?? p(`ESCAPED_CHAR`);
    if (i) b(i);
    else {
      if (p(`OPEN`)) {
        let e = g(),
          t = p(`NAME`),
          n = p(`REGEX`);
        !t && !n && (n = p(`ASTERISK`));
        let r = g();
        (h(`CLOSE`), S(e, t, n, r, m()));
        continue;
      }
      (x(), h(`END`));
    }
  }
  return c;
}
function l(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, `\\$1`);
}
function u(e) {
  return e && e.ignoreCase ? `ui` : `u`;
}
function d(e, t, n) {
  return p(c(e, n), t, n);
}
function f(e) {
  switch (e) {
    case 0:
      return `*`;
    case 1:
      return `?`;
    case 2:
      return `+`;
    case 3:
      return ``;
  }
}
function p(e, t, n = {}) {
  ((n.delimiter ??= `/#?`),
    (n.prefixes ??= `./`),
    (n.sensitive ??= !1),
    (n.strict ??= !1),
    (n.end ??= !0),
    (n.start ??= !0),
    (n.endsWith = ``));
  let r = n.start ? `^` : ``;
  for (let i of e) {
    if (i.type === 3) {
      i.modifier === 3
        ? (r += l(i.value))
        : (r += `(?:${l(i.value)})${f(i.modifier)}`);
      continue;
    }
    t && t.push(i.name);
    let e = `[^${l(n.delimiter)}]+?`,
      o = i.value;
    (i.type === 1 ? (o = e) : i.type === 0 && (o = a),
      i.prefix.length || i.suffix.length
        ? i.modifier !== 3 && i.modifier !== 1
          ? ((r += `(?:${l(i.prefix)}`),
            (r += `((?:${o})(?:`),
            (r += l(i.suffix)),
            (r += l(i.prefix)),
            (r += `(?:${o}))*)${l(i.suffix)})`),
            i.modifier === 0 && (r += `?`))
          : ((r += `(?:${l(i.prefix)}(${o})${l(i.suffix)})`),
            (r += f(i.modifier)))
        : i.modifier === 3 || i.modifier === 1
          ? (r += `(${o})${f(i.modifier)}`)
          : (r += `((?:${o})${f(i.modifier)})`));
  }
  let i = `[${l(n.endsWith)}]|$`,
    o = `[${l(n.delimiter)}]`;
  if (n.end)
    return (
      n.strict || (r += `${o}?`),
      n.endsWith.length ? (r += `(?=${i})`) : (r += `$`),
      new RegExp(r, u(n))
    );
  n.strict || (r += `(?:${o}(?=${i}))?`);
  let s = !1;
  if (e.length) {
    let t = e[e.length - 1];
    t.type === 3 && t.modifier === 3 && (s = n.delimiter.indexOf(t) > -1);
  }
  return (s || (r += `(?=${o}|${i})`), new RegExp(r, u(n)));
}
(t(o, `isASCII`),
  t(s, `lexer`),
  t(c, `parse`),
  t(l, `escapeString`),
  t(u, `flags`),
  t(d, `stringToRegexp`),
  t(f, `modifierToString`),
  t(p, `partsToRegexp`));
var m = { delimiter: ``, prefixes: ``, sensitive: !0, strict: !0 },
  h = { delimiter: `.`, prefixes: ``, sensitive: !0, strict: !0 },
  g = { delimiter: `/`, prefixes: `/`, sensitive: !0, strict: !0 };
function _(e, t) {
  return (
    !!e.length &&
    (e[0] === `/` ||
      (!(!t || e.length < 2) && (e[0] == `\\` || e[0] == `{`) && e[1] == `/`))
  );
}
function v(e, t) {
  return e.startsWith(t) ? e.substring(t.length, e.length) : e;
}
function y(e, t) {
  return e.endsWith(t) ? e.substr(0, e.length - t.length) : e;
}
function b(e) {
  return (
    !(!e || e.length < 2) &&
    (e[0] === `[` || ((e[0] === `\\` || e[0] === `{`) && e[1] === `[`))
  );
}
(t(_, `isAbsolutePathname`),
  t(v, `maybeStripPrefix`),
  t(y, `maybeStripSuffix`),
  t(b, `treatAsIPv6Hostname`));
var x = [`ftp`, `file`, `http`, `https`, `ws`, `wss`];
function S(e) {
  if (!e) return !0;
  for (let t of x) if (e.test(t)) return !0;
  return !1;
}
function C(e, t) {
  if (((e = v(e, `#`)), t || e === ``)) return e;
  let n = new URL(`https://example.com`);
  return ((n.hash = e), n.hash ? n.hash.substring(1, n.hash.length) : ``);
}
function w(e, t) {
  if (((e = v(e, `?`)), t || e === ``)) return e;
  let n = new URL(`https://example.com`);
  return (
    (n.search = e),
    n.search ? n.search.substring(1, n.search.length) : ``
  );
}
function T(e, t) {
  return t || e === `` ? e : b(e) ? I(e) : F(e);
}
function E(e, t) {
  if (t || e === ``) return e;
  let n = new URL(`https://example.com`);
  return ((n.password = e), n.password);
}
function D(e, t) {
  if (t || e === ``) return e;
  let n = new URL(`https://example.com`);
  return ((n.username = e), n.username);
}
function O(e, t, n) {
  if (n || e === ``) return e;
  if (t && !x.includes(t)) return new URL(`${t}:${e}`).pathname;
  let r = e[0] == `/`;
  return (
    (e = new URL(r ? e : `/-` + e, `https://example.com`).pathname),
    r || (e = e.substring(2, e.length)),
    e
  );
}
function k(e, t, n) {
  return (j(t) === e && (e = ``), n || e === `` ? e : L(e));
}
function A(e, t) {
  return ((e = y(e, `:`)), t || e === `` ? e : M(e));
}
function j(e) {
  switch (e) {
    case `ws`:
    case `http`:
      return `80`;
    case `wws`:
    case `https`:
      return `443`;
    case `ftp`:
      return `21`;
    default:
      return ``;
  }
}
function M(e) {
  if (e === ``) return e;
  if (/^[-+.A-Za-z0-9]*$/.test(e)) return e.toLowerCase();
  throw TypeError(`Invalid protocol '${e}'.`);
}
function N(e) {
  if (e === ``) return e;
  let t = new URL(`https://example.com`);
  return ((t.username = e), t.username);
}
function P(e) {
  if (e === ``) return e;
  let t = new URL(`https://example.com`);
  return ((t.password = e), t.password);
}
function F(e) {
  if (e === ``) return e;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))
    throw TypeError(`Invalid hostname '${e}'`);
  let t = new URL(`https://example.com`);
  return ((t.hostname = e), t.hostname);
}
function I(e) {
  if (e === ``) return e;
  if (/[^0-9a-fA-F[\]:]/g.test(e))
    throw TypeError(`Invalid IPv6 hostname '${e}'`);
  return e.toLowerCase();
}
function L(e) {
  if (e === `` || (/^[0-9]*$/.test(e) && parseInt(e) <= 65535)) return e;
  throw TypeError(`Invalid port '${e}'.`);
}
function R(e) {
  if (e === ``) return e;
  let t = new URL(`https://example.com`);
  return (
    (t.pathname = e[0] === `/` ? e : `/-` + e),
    e[0] === `/` ? t.pathname : t.pathname.substring(2, t.pathname.length)
  );
}
function z(e) {
  return e === `` ? e : new URL(`data:${e}`).pathname;
}
function B(e) {
  if (e === ``) return e;
  let t = new URL(`https://example.com`);
  return ((t.search = e), t.search.substring(1, t.search.length));
}
function V(e) {
  if (e === ``) return e;
  let t = new URL(`https://example.com`);
  return ((t.hash = e), t.hash.substring(1, t.hash.length));
}
(t(S, `isSpecialScheme`),
  t(C, `canonicalizeHash`),
  t(w, `canonicalizeSearch`),
  t(T, `canonicalizeHostname`),
  t(E, `canonicalizePassword`),
  t(D, `canonicalizeUsername`),
  t(O, `canonicalizePathname`),
  t(k, `canonicalizePort`),
  t(A, `canonicalizeProtocol`),
  t(j, `defaultPortForProtocol`),
  t(M, `protocolEncodeCallback`),
  t(N, `usernameEncodeCallback`),
  t(P, `passwordEncodeCallback`),
  t(F, `hostnameEncodeCallback`),
  t(I, `ipv6HostnameEncodeCallback`),
  t(L, `portEncodeCallback`),
  t(R, `standardURLPathnameEncodeCallback`),
  t(z, `pathURLPathnameEncodeCallback`),
  t(B, `searchEncodeCallback`),
  t(V, `hashEncodeCallback`));
var H = class {
  #e;
  #t = [];
  #n = {};
  #r = 0;
  #i = 1;
  #a = 0;
  #o = 0;
  #s = 0;
  #c = 0;
  #l = !1;
  constructor(e) {
    this.#e = e;
  }
  get result() {
    return this.#n;
  }
  parse() {
    for (
      this.#t = s(this.#e, !0);
      this.#r < this.#t.length;
      this.#r += this.#i
    ) {
      if (((this.#i = 1), this.#t[this.#r].type === `END`)) {
        if (this.#o === 0) {
          (this.#f(),
            this.#C()
              ? this.#u(9, 1)
              : this.#S()
                ? this.#u(8, 1)
                : this.#u(7, 0));
          continue;
        }
        if (this.#o === 2) {
          this.#p(5);
          continue;
        }
        this.#u(10, 0);
        break;
      }
      if (this.#s > 0) {
        if (!this.#T()) continue;
        --this.#s;
      }
      if (this.#w()) this.#s += 1;
      else
        switch (this.#o) {
          case 0:
            this.#g() && this.#p(1);
            break;
          case 1:
            if (this.#g()) {
              this.#k();
              let e = 7,
                t = 1;
              (this.#_() ? ((e = 2), (t = 3)) : this.#l && (e = 2),
                this.#u(e, t));
            }
            break;
          case 2:
            this.#v()
              ? this.#p(3)
              : (this.#x() || this.#S() || this.#C()) && this.#p(5);
            break;
          case 3:
            this.#y() ? this.#u(4, 1) : this.#v() && this.#u(5, 1);
            break;
          case 4:
            this.#v() && this.#u(5, 1);
            break;
          case 5:
            (this.#E() ? (this.#c += 1) : this.#D() && --this.#c,
              this.#b() && !this.#c
                ? this.#u(6, 1)
                : this.#x()
                  ? this.#u(7, 0)
                  : this.#S()
                    ? this.#u(8, 1)
                    : this.#C() && this.#u(9, 1));
            break;
          case 6:
            this.#x()
              ? this.#u(7, 0)
              : this.#S()
                ? this.#u(8, 1)
                : this.#C() && this.#u(9, 1);
            break;
          case 7:
            this.#S() ? this.#u(8, 1) : this.#C() && this.#u(9, 1);
            break;
          case 8:
            this.#C() && this.#u(9, 1);
        }
    }
    this.#n.hostname !== void 0 &&
      this.#n.port === void 0 &&
      (this.#n.port = ``);
  }
  #u(e, t) {
    switch (this.#o) {
      case 0:
      case 2:
      case 10:
        break;
      case 1:
        this.#n.protocol = this.#O();
        break;
      case 3:
        this.#n.username = this.#O();
        break;
      case 4:
        this.#n.password = this.#O();
        break;
      case 5:
        this.#n.hostname = this.#O();
        break;
      case 6:
        this.#n.port = this.#O();
        break;
      case 7:
        this.#n.pathname = this.#O();
        break;
      case 8:
        this.#n.search = this.#O();
        break;
      case 9:
        this.#n.hash = this.#O();
    }
    (this.#o !== 0 &&
      e !== 10 &&
      ([1, 2, 3, 4].includes(this.#o) &&
        [6, 7, 8, 9].includes(e) &&
        (this.#n.hostname ??= ``),
      [1, 2, 3, 4, 5, 6].includes(this.#o) &&
        [8, 9].includes(e) &&
        (this.#n.pathname ??= this.#l ? `/` : ``),
      [1, 2, 3, 4, 5, 6, 7].includes(this.#o) &&
        e === 9 &&
        (this.#n.search ??= ``)),
      this.#d(e, t));
  }
  #d(e, t) {
    ((this.#o = e), (this.#a = this.#r + t), (this.#r += t), (this.#i = 0));
  }
  #f() {
    ((this.#r = this.#a), (this.#i = 0));
  }
  #p(e) {
    (this.#f(), (this.#o = e));
  }
  #m(e) {
    return (
      e < 0 && (e = this.#t.length - e),
      e < this.#t.length ? this.#t[e] : this.#t[this.#t.length - 1]
    );
  }
  #h(e, t) {
    let n = this.#m(e);
    return (
      n.value === t &&
      (n.type === `CHAR` ||
        n.type === `ESCAPED_CHAR` ||
        n.type === `INVALID_CHAR`)
    );
  }
  #g() {
    return this.#h(this.#r, `:`);
  }
  #_() {
    return this.#h(this.#r + 1, `/`) && this.#h(this.#r + 2, `/`);
  }
  #v() {
    return this.#h(this.#r, `@`);
  }
  #y() {
    return this.#h(this.#r, `:`);
  }
  #b() {
    return this.#h(this.#r, `:`);
  }
  #x() {
    return this.#h(this.#r, `/`);
  }
  #S() {
    if (this.#h(this.#r, `?`)) return !0;
    if (this.#t[this.#r].value !== `?`) return !1;
    let e = this.#m(this.#r - 1);
    return (
      e.type !== `NAME` &&
      e.type !== `REGEX` &&
      e.type !== `CLOSE` &&
      e.type !== `ASTERISK`
    );
  }
  #C() {
    return this.#h(this.#r, `#`);
  }
  #w() {
    return this.#t[this.#r].type == `OPEN`;
  }
  #T() {
    return this.#t[this.#r].type == `CLOSE`;
  }
  #E() {
    return this.#h(this.#r, `[`);
  }
  #D() {
    return this.#h(this.#r, `]`);
  }
  #O() {
    let e = this.#t[this.#r],
      t = this.#m(this.#a).index;
    return this.#e.substring(t, e.index);
  }
  #k() {
    let e = {};
    (Object.assign(e, m), (e.encodePart = M));
    let t = d(this.#O(), void 0, e);
    this.#l = S(t);
  }
};
t(H, `Parser`);
var U = [
    `protocol`,
    `username`,
    `password`,
    `hostname`,
    `port`,
    `pathname`,
    `search`,
    `hash`,
  ],
  W = `*`;
function G(e, t) {
  if (typeof e != `string`)
    throw TypeError(`parameter 1 is not of type 'string'.`);
  let n = new URL(e, t);
  return {
    protocol: n.protocol.substring(0, n.protocol.length - 1),
    username: n.username,
    password: n.password,
    hostname: n.hostname,
    port: n.port,
    pathname: n.pathname,
    search: n.search === `` ? void 0 : n.search.substring(1, n.search.length),
    hash: n.hash === `` ? void 0 : n.hash.substring(1, n.hash.length),
  };
}
function K(e, t) {
  return t ? J(e) : e;
}
function q(e, t, n) {
  let r;
  if (typeof t.baseURL == `string`)
    try {
      ((r = new URL(t.baseURL)),
        t.protocol === void 0 &&
          (e.protocol = K(r.protocol.substring(0, r.protocol.length - 1), n)),
        !n &&
          t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          t.username === void 0 &&
          (e.username = K(r.username, n)),
        !n &&
          t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          t.username === void 0 &&
          t.password === void 0 &&
          (e.password = K(r.password, n)),
        t.protocol === void 0 &&
          t.hostname === void 0 &&
          (e.hostname = K(r.hostname, n)),
        t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          (e.port = K(r.port, n)),
        t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          t.pathname === void 0 &&
          (e.pathname = K(r.pathname, n)),
        t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          t.pathname === void 0 &&
          t.search === void 0 &&
          (e.search = K(r.search.substring(1, r.search.length), n)),
        t.protocol === void 0 &&
          t.hostname === void 0 &&
          t.port === void 0 &&
          t.pathname === void 0 &&
          t.search === void 0 &&
          t.hash === void 0 &&
          (e.hash = K(r.hash.substring(1, r.hash.length), n)));
    } catch {
      throw TypeError(`invalid baseURL '${t.baseURL}'.`);
    }
  if (
    (typeof t.protocol == `string` && (e.protocol = A(t.protocol, n)),
    typeof t.username == `string` && (e.username = D(t.username, n)),
    typeof t.password == `string` && (e.password = E(t.password, n)),
    typeof t.hostname == `string` && (e.hostname = T(t.hostname, n)),
    typeof t.port == `string` && (e.port = k(t.port, e.protocol, n)),
    typeof t.pathname == `string`)
  ) {
    if (((e.pathname = t.pathname), r && !_(e.pathname, n))) {
      let t = r.pathname.lastIndexOf(`/`);
      t >= 0 &&
        (e.pathname = K(r.pathname.substring(0, t + 1), n) + e.pathname);
    }
    e.pathname = O(e.pathname, e.protocol, n);
  }
  return (
    typeof t.search == `string` && (e.search = w(t.search, n)),
    typeof t.hash == `string` && (e.hash = C(t.hash, n)),
    e
  );
}
function J(e) {
  return e.replace(/([+*?:{}()\\])/g, `\\$1`);
}
function Y(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, `\\$1`);
}
function X(e, t) {
  ((t.delimiter ??= `/#?`),
    (t.prefixes ??= `./`),
    (t.sensitive ??= !1),
    (t.strict ??= !1),
    (t.end ??= !0),
    (t.start ??= !0),
    (t.endsWith = ``));
  let n = `[^${Y(t.delimiter)}]+?`,
    r = /[$_\u200C\u200D\p{ID_Continue}]/u,
    i = ``;
  for (let a = 0; a < e.length; ++a) {
    let o = e[a];
    if (o.type === 3) {
      if (o.modifier === 3) {
        i += J(o.value);
        continue;
      }
      i += `{${J(o.value)}}${f(o.modifier)}`;
      continue;
    }
    let s = o.hasCustomName(),
      c =
        !!o.suffix.length ||
        (!!o.prefix.length &&
          (o.prefix.length !== 1 || !t.prefixes.includes(o.prefix))),
      l = a > 0 ? e[a - 1] : null,
      u = a < e.length - 1 ? e[a + 1] : null;
    if (
      !c &&
      s &&
      o.type === 1 &&
      o.modifier === 3 &&
      u &&
      !u.prefix.length &&
      !u.suffix.length
    )
      if (u.type === 3) {
        let e = u.value.length > 0 ? u.value[0] : ``;
        c = r.test(e);
      } else c = !u.hasCustomName();
    if (!c && !o.prefix.length && l && l.type === 3) {
      let e = l.value[l.value.length - 1];
      c = t.prefixes.includes(e);
    }
    (c && (i += `{`),
      (i += J(o.prefix)),
      s && (i += `:${o.name}`),
      o.type === 2
        ? (i += `(${o.value})`)
        : o.type === 1
          ? s || (i += `(${n})`)
          : o.type === 0 &&
            (s ||
            (l && l.type !== 3 && l.modifier === 3 && !c && o.prefix === ``)
              ? (i += `(.*)`)
              : (i += `*`)),
      o.type === 1 &&
        s &&
        o.suffix.length &&
        r.test(o.suffix[0]) &&
        (i += `\\`),
      (i += J(o.suffix)),
      c && (i += `}`),
      o.modifier !== 3 && (i += f(o.modifier)));
  }
  return i;
}
(t(G, `extractValues`),
  t(K, `processBaseURLString`),
  t(q, `applyInit`),
  t(J, `escapePatternString`),
  t(Y, `escapeRegexpString`),
  t(X, `partsToPattern`));
var Z = class {
  #e;
  #t = {};
  #n = {};
  #r = {};
  #i = {};
  #a = !1;
  constructor(e = {}, t, n) {
    try {
      let r;
      if ((typeof t == `string` ? (r = t) : (n = t), typeof e == `string`)) {
        let t = new H(e);
        if (
          (t.parse(),
          (e = t.result),
          r === void 0 && typeof e.protocol != `string`)
        )
          throw TypeError(
            `A base URL must be provided for a relative constructor string.`
          );
        e.baseURL = r;
      } else {
        if (!e || typeof e != `object`)
          throw TypeError(
            `parameter 1 is not of type 'string' and cannot convert to dictionary.`
          );
        if (r) throw TypeError(`parameter 1 is not of type 'string'.`);
      }
      typeof n > `u` && (n = { ignoreCase: !1 });
      let i,
        a = { ignoreCase: !0 === n.ignoreCase },
        o = {
          pathname: W,
          protocol: W,
          username: W,
          password: W,
          hostname: W,
          port: W,
          search: W,
          hash: W,
        };
      for (i of ((this.#e = q(o, e, !0)),
      j(this.#e.protocol) === this.#e.port && (this.#e.port = ``),
      U)) {
        if (!(i in this.#e)) continue;
        let e = {},
          t = this.#e[i];
        switch (((this.#n[i] = []), i)) {
          case `protocol`:
            (Object.assign(e, m), (e.encodePart = M));
            break;
          case `username`:
            (Object.assign(e, m), (e.encodePart = N));
            break;
          case `password`:
            (Object.assign(e, m), (e.encodePart = P));
            break;
          case `hostname`:
            (Object.assign(e, h),
              b(t) ? (e.encodePart = I) : (e.encodePart = F));
            break;
          case `port`:
            (Object.assign(e, m), (e.encodePart = L));
            break;
          case `pathname`:
            S(this.#t.protocol)
              ? (Object.assign(e, g, a), (e.encodePart = R))
              : (Object.assign(e, m, a), (e.encodePart = z));
            break;
          case `search`:
            (Object.assign(e, m, a), (e.encodePart = B));
            break;
          case `hash`:
            (Object.assign(e, m, a), (e.encodePart = V));
        }
        try {
          ((this.#i[i] = c(t, e)),
            (this.#t[i] = p(this.#i[i], this.#n[i], e)),
            (this.#r[i] = X(this.#i[i], e)),
            (this.#a = this.#a || this.#i[i].some((e) => e.type === 2)));
        } catch {
          throw TypeError(`invalid ${i} pattern '${this.#e[i]}'.`);
        }
      }
    } catch (e) {
      throw TypeError(`Failed to construct 'URLPattern': ${e.message}`);
    }
  }
  get [Symbol.toStringTag]() {
    return `URLPattern`;
  }
  test(e = {}, t) {
    let n,
      r = {
        pathname: ``,
        protocol: ``,
        username: ``,
        password: ``,
        hostname: ``,
        port: ``,
        search: ``,
        hash: ``,
      };
    if (typeof e != `string` && t)
      throw TypeError(`parameter 1 is not of type 'string'.`);
    if (typeof e > `u`) return !1;
    try {
      r = q(r, typeof e == `object` ? e : G(e, t), !1);
    } catch {
      return !1;
    }
    for (n of U) if (!this.#t[n].exec(r[n])) return !1;
    return !0;
  }
  exec(e = {}, t) {
    let n = {
      pathname: ``,
      protocol: ``,
      username: ``,
      password: ``,
      hostname: ``,
      port: ``,
      search: ``,
      hash: ``,
    };
    if (typeof e != `string` && t)
      throw TypeError(`parameter 1 is not of type 'string'.`);
    if (typeof e > `u`) return;
    try {
      n = q(n, typeof e == `object` ? e : G(e, t), !1);
    } catch {
      return null;
    }
    let r,
      i = {};
    for (r of ((i.inputs = t ? [e, t] : [e]), U)) {
      let e = this.#t[r].exec(n[r]);
      if (!e) return null;
      let t = {};
      for (let [n, i] of this.#n[r].entries())
        (typeof i != `string` && typeof i != `number`) || (t[i] = e[n + 1]);
      i[r] = { input: n[r] ?? ``, groups: t };
    }
    return i;
  }
  static compareComponent(e, r, i) {
    let a = t((e, t) => {
        for (let n of [`type`, `modifier`, `prefix`, `value`, `suffix`]) {
          if (e[n] < t[n]) return -1;
          if (e[n] !== t[n]) return 1;
        }
        return 0;
      }, `comparePart`),
      o = new n(3, ``, ``, ``, ``, 3),
      s = new n(0, ``, ``, ``, ``, 3),
      c = t((e, t) => {
        let n = 0;
        for (; n < Math.min(e.length, t.length); ++n) {
          let r = a(e[n], t[n]);
          if (r) return r;
        }
        return e.length === t.length ? 0 : a(e[n] ?? o, t[n] ?? o);
      }, `comparePartList`);
    return r.#r[e] || i.#r[e]
      ? r.#r[e] && !i.#r[e]
        ? c(r.#i[e], [s])
        : !r.#r[e] && i.#r[e]
          ? c([s], i.#i[e])
          : c(r.#i[e], i.#i[e])
      : 0;
  }
  get protocol() {
    return this.#r.protocol;
  }
  get username() {
    return this.#r.username;
  }
  get password() {
    return this.#r.password;
  }
  get hostname() {
    return this.#r.hostname;
  }
  get port() {
    return this.#r.port;
  }
  get pathname() {
    return this.#r.pathname;
  }
  get search() {
    return this.#r.search;
  }
  get hash() {
    return this.#r.hash;
  }
  get hasRegExpGroups() {
    return this.#a;
  }
};
(t(Z, `URLPattern`), globalThis.URLPattern || (globalThis.URLPattern = Z));
export { Z as URLPattern };
//# sourceMappingURL=urlpattern-polyfill-BARnH7kx.js.map

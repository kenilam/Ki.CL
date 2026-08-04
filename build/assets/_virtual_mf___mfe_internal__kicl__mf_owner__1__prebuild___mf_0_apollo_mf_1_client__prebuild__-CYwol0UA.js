import { r as e } from './rolldown-runtime-Mj8OWp7p.js';
import {
  c as t,
  i as n,
  l as r,
  n as i,
  o as a,
  s as o,
  t as s,
  u as c,
} from './tslib.es6-c4aZVZRw.js';
function l(e) {
  return u(e, []);
}
function u(e, t) {
  switch (typeof e) {
    case `string`:
      return JSON.stringify(e);
    case `function`:
      return e.name ? `[function ${e.name}]` : `[function]`;
    case `object`:
      return (function (e, t) {
        if (e === null) return `null`;
        if (t.includes(e)) return `[Circular]`;
        let n = [...t, e];
        if (
          (function (e) {
            return typeof e.toJSON == `function`;
          })(e)
        ) {
          let t = e.toJSON();
          if (t !== e) return typeof t == `string` ? t : u(t, n);
        } else if (Array.isArray(e))
          return (function (e, t) {
            if (e.length === 0) return `[]`;
            if (t.length > 2) return `[Array]`;
            let n = Math.min(10, e.length),
              r = e.length - n,
              i = [];
            for (let r = 0; r < n; ++r) i.push(u(e[r], t));
            return (
              r === 1
                ? i.push(`... 1 more item`)
                : r > 1 && i.push(`... ${r} more items`),
              `[` + i.join(`, `) + `]`
            );
          })(e, n);
        return (function (e, t) {
          let n = Object.entries(e);
          return n.length === 0
            ? `{}`
            : t.length > 2
              ? `[` +
                (function (e) {
                  let t = Object.prototype.toString
                    .call(e)
                    .replace(/^\[object /, ``)
                    .replace(/]$/, ``);
                  if (t === `Object` && typeof e.constructor == `function`) {
                    let t = e.constructor.name;
                    if (typeof t == `string` && t !== ``) return t;
                  }
                  return t;
                })(e) +
                `]`
              : `{ ` + n.map(([e, n]) => e + `: ` + u(n, t)).join(`, `) + ` }`;
        })(e, n);
      })(e, t);
    default:
      return String(e);
  }
}
var d = function (e, t) {
  return e?.__kind === t;
};
function f(e, t) {
  if (!e) throw Error(t ?? `Unexpected invariant triggered.`);
}
var p = /\r\n|[\n\r]/g;
function m(e, t) {
  let n = 0,
    r = 1;
  for (let i of e.body.matchAll(p)) {
    if ((typeof i.index != `number` && f(!1), i.index >= t)) break;
    ((n = i.index + i[0].length), (r += 1));
  }
  return { line: r, column: t + 1 - n };
}
function h(e) {
  return g(e.source, m(e.source, e.start));
}
function g(e, t) {
  let n = e.locationOffset.column - 1,
    r = ``.padStart(n) + e.body,
    i = t.line - 1,
    a = e.locationOffset.line - 1,
    o = t.line + a,
    s = t.line === 1 ? n : 0,
    c = t.column + s,
    l = `${e.name}:${o}:${c}\n`,
    u = r.split(/\r\n|[\n\r]/g),
    d = u[i];
  if (d.length > 120) {
    let e = Math.floor(c / 80),
      t = c % 80,
      n = [];
    for (let e = 0; e < d.length; e += 80) n.push(d.slice(e, e + 80));
    return (
      l +
      ee([
        [`${o} |`, n[0]],
        ...n.slice(1, e + 1).map((e) => [`|`, e]),
        [`|`, `^`.padStart(t)],
        [`|`, n[e + 1]],
      ])
    );
  }
  return (
    l +
    ee([
      [o - 1 + ` |`, u[i - 1]],
      [`${o} |`, d],
      [`|`, `^`.padStart(c)],
      [`${o + 1} |`, u[i + 1]],
    ])
  );
}
function ee(e) {
  let t = e.filter(([e, t]) => t !== void 0),
    n = Math.max(...t.map(([e]) => e.length));
  return t.map(([e, t]) => e.padStart(n) + (t ? ` ` + t : ``)).join(`
`);
}
var te = class e extends Error {
  constructor(t, n = {}) {
    let {
        nodes: r,
        source: i,
        positions: a,
        path: o,
        originalError: s,
        cause: c,
        extensions: l,
      } = n,
      u = `cause` in n;
    (super(t, u || s != null ? { cause: u ? c : s } : void 0),
      (this.name = `GraphQLError`),
      (this.path = o ?? void 0));
    let d = s ?? (c instanceof Error ? c : void 0);
    ((this.originalError = d),
      (this.nodes = ne(Array.isArray(r) ? r : r ? [r] : void 0)));
    let f = ne(this.nodes?.map((e) => e.loc).filter((e) => e != null));
    ((this.source = i ?? f?.[0]?.source),
      (this.positions = a ?? f?.map((e) => e.start)),
      (this.locations =
        a && i ? a.map((e) => m(i, e)) : f?.map((e) => m(e.source, e.start))));
    let p =
      ((h = d?.extensions), typeof h == `object` && h ? d.extensions : void 0);
    var h;
    ((this.extensions = l ?? p ?? Object.create(null)),
      Object.defineProperties(this, {
        message: { writable: !0, enumerable: !0 },
        name: { enumerable: !1 },
        nodes: { enumerable: !1 },
        source: { enumerable: !1 },
        positions: { enumerable: !1 },
        originalError: { enumerable: !1 },
      }),
      s?.stack == null
        ? Error.captureStackTrace == null
          ? Object.defineProperty(this, 'stack', {
              value: Error().stack,
              writable: !0,
              configurable: !0,
            })
          : Error.captureStackTrace(this, e)
        : Object.defineProperty(this, 'stack', {
            value: s.stack,
            writable: !0,
            configurable: !0,
          }));
  }
  get [Symbol.toStringTag]() {
    return `GraphQLError`;
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (let t of this.nodes)
        t.loc &&
          (e +=
            `

` + h(t.loc));
    else if (this.source && this.locations)
      for (let t of this.locations)
        e +=
          `

` + g(this.source, t);
    return e;
  }
  toJSON() {
    let e = { message: this.message };
    return (
      this.locations != null && (e.locations = this.locations),
      this.path != null && (e.path = this.path),
      this.extensions != null &&
        Object.keys(this.extensions).length > 0 &&
        (e.extensions = this.extensions),
      e
    );
  }
};
function ne(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
var re = class {
    constructor(e, t, n) {
      ((this.start = e.start),
        (this.end = t.end),
        (this.startToken = e),
        (this.endToken = t),
        (this.source = n));
    }
    get [Symbol.toStringTag]() {
      return `Location`;
    }
    toJSON() {
      return { start: this.start, end: this.end };
    }
  },
  ie = class {
    constructor(e, t, n, r, i, a) {
      ((this.kind = e),
        (this.start = t),
        (this.end = n),
        (this.line = r),
        (this.column = i),
        (this.value = a),
        (this.prev = null),
        (this.next = null));
    }
    get [Symbol.toStringTag]() {
      return `Token`;
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column,
      };
    }
  },
  ae = {
    Name: [],
    Document: [`definitions`],
    OperationDefinition: [
      `description`,
      `name`,
      `variableDefinitions`,
      `directives`,
      `selectionSet`,
    ],
    VariableDefinition: [
      `description`,
      `variable`,
      `type`,
      `defaultValue`,
      `directives`,
    ],
    Variable: [`name`],
    SelectionSet: [`selections`],
    Field: [`alias`, `name`, `arguments`, `directives`, `selectionSet`],
    Argument: [`name`, `value`],
    FragmentArgument: [`name`, `value`],
    FragmentSpread: [`name`, `arguments`, `directives`],
    InlineFragment: [`typeCondition`, `directives`, `selectionSet`],
    FragmentDefinition: [
      `description`,
      `name`,
      `variableDefinitions`,
      `typeCondition`,
      `directives`,
      `selectionSet`,
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: [`values`],
    ObjectValue: [`fields`],
    ObjectField: [`name`, `value`],
    Directive: [`name`, `arguments`],
    NamedType: [`name`],
    ListType: [`type`],
    NonNullType: [`type`],
    SchemaDefinition: [`description`, `directives`, `operationTypes`],
    OperationTypeDefinition: [`type`],
    ScalarTypeDefinition: [`description`, `name`, `directives`],
    ObjectTypeDefinition: [
      `description`,
      `name`,
      `interfaces`,
      `directives`,
      `fields`,
    ],
    FieldDefinition: [`description`, `name`, `arguments`, `type`, `directives`],
    InputValueDefinition: [
      `description`,
      `name`,
      `type`,
      `defaultValue`,
      `directives`,
    ],
    InterfaceTypeDefinition: [
      `description`,
      `name`,
      `interfaces`,
      `directives`,
      `fields`,
    ],
    UnionTypeDefinition: [`description`, `name`, `directives`, `types`],
    EnumTypeDefinition: [`description`, `name`, `directives`, `values`],
    EnumValueDefinition: [`description`, `name`, `directives`],
    InputObjectTypeDefinition: [`description`, `name`, `directives`, `fields`],
    DirectiveDefinition: [
      `description`,
      `name`,
      `arguments`,
      `directives`,
      `locations`,
    ],
    SchemaExtension: [`directives`, `operationTypes`],
    DirectiveExtension: [`name`, `directives`],
    ScalarTypeExtension: [`name`, `directives`],
    ObjectTypeExtension: [`name`, `interfaces`, `directives`, `fields`],
    InterfaceTypeExtension: [`name`, `interfaces`, `directives`, `fields`],
    UnionTypeExtension: [`name`, `directives`, `types`],
    EnumTypeExtension: [`name`, `directives`, `values`],
    InputObjectTypeExtension: [`name`, `directives`, `fields`],
    TypeCoordinate: [`name`],
    MemberCoordinate: [`name`, `memberName`],
    ArgumentCoordinate: [`name`, `fieldName`, `argumentName`],
    DirectiveCoordinate: [`name`],
    DirectiveArgumentCoordinate: [`name`, `argumentName`],
  },
  oe = new Set(Object.keys(ae));
function se(e) {
  let t = e?.kind;
  return typeof t == `string` && oe.has(t);
}
var ce = `query`,
  le = `mutation`,
  ue = `subscription`,
  de = e({
    ARGUMENT: () => ve,
    ARGUMENT_COORDINATE: () => at,
    BOOLEAN: () => De,
    DIRECTIVE: () => Ne,
    DIRECTIVE_ARGUMENT_COORDINATE: () => st,
    DIRECTIVE_COORDINATE: () => ot,
    DIRECTIVE_DEFINITION: () => Je,
    DIRECTIVE_EXTENSION: () => Xe,
    DOCUMENT: () => pe,
    ENUM: () => ke,
    ENUM_TYPE_DEFINITION: () => Ge,
    ENUM_TYPE_EXTENSION: () => tt,
    ENUM_VALUE_DEFINITION: () => Ke,
    FIELD: () => _e,
    FIELD_DEFINITION: () => Ve,
    FLOAT: () => Te,
    FRAGMENT_ARGUMENT: () => ye,
    FRAGMENT_DEFINITION: () => Se,
    FRAGMENT_SPREAD: () => be,
    INLINE_FRAGMENT: () => xe,
    INPUT_OBJECT_TYPE_DEFINITION: () => qe,
    INPUT_OBJECT_TYPE_EXTENSION: () => nt,
    INPUT_VALUE_DEFINITION: () => He,
    INT: () => we,
    INTERFACE_TYPE_DEFINITION: () => Ue,
    INTERFACE_TYPE_EXTENSION: () => $e,
    LIST: () => Ae,
    LIST_TYPE: () => Fe,
    MEMBER_COORDINATE: () => it,
    NAME: () => fe,
    NAMED_TYPE: () => Pe,
    NON_NULL_TYPE: () => Ie,
    NULL: () => Oe,
    OBJECT: () => je,
    OBJECT_FIELD: () => Me,
    OBJECT_TYPE_DEFINITION: () => Be,
    OBJECT_TYPE_EXTENSION: () => Qe,
    OPERATION_DEFINITION: () => me,
    OPERATION_TYPE_DEFINITION: () => Re,
    SCALAR_TYPE_DEFINITION: () => ze,
    SCALAR_TYPE_EXTENSION: () => Ze,
    SCHEMA_DEFINITION: () => Le,
    SCHEMA_EXTENSION: () => Ye,
    SELECTION_SET: () => ge,
    STRING: () => Ee,
    TYPE_COORDINATE: () => rt,
    UNION_TYPE_DEFINITION: () => We,
    UNION_TYPE_EXTENSION: () => et,
    VARIABLE: () => Ce,
    VARIABLE_DEFINITION: () => he,
  }),
  fe = `Name`,
  pe = `Document`,
  me = `OperationDefinition`,
  he = `VariableDefinition`,
  ge = `SelectionSet`,
  _e = `Field`,
  ve = `Argument`,
  ye = `FragmentArgument`,
  be = `FragmentSpread`,
  xe = `InlineFragment`,
  Se = `FragmentDefinition`,
  Ce = `Variable`,
  we = `IntValue`,
  Te = `FloatValue`,
  Ee = `StringValue`,
  De = `BooleanValue`,
  Oe = `NullValue`,
  ke = `EnumValue`,
  Ae = `ListValue`,
  je = `ObjectValue`,
  Me = `ObjectField`,
  Ne = `Directive`,
  Pe = `NamedType`,
  Fe = `ListType`,
  Ie = `NonNullType`,
  Le = `SchemaDefinition`,
  Re = `OperationTypeDefinition`,
  ze = `ScalarTypeDefinition`,
  Be = `ObjectTypeDefinition`,
  Ve = `FieldDefinition`,
  He = `InputValueDefinition`,
  Ue = `InterfaceTypeDefinition`,
  We = `UnionTypeDefinition`,
  Ge = `EnumTypeDefinition`,
  Ke = `EnumValueDefinition`,
  qe = `InputObjectTypeDefinition`,
  Je = `DirectiveDefinition`,
  Ye = `SchemaExtension`,
  Xe = `DirectiveExtension`,
  Ze = `ScalarTypeExtension`,
  Qe = `ObjectTypeExtension`,
  $e = `InterfaceTypeExtension`,
  et = `UnionTypeExtension`,
  tt = `EnumTypeExtension`,
  nt = `InputObjectTypeExtension`,
  rt = `TypeCoordinate`,
  it = `MemberCoordinate`,
  at = `ArgumentCoordinate`,
  ot = `DirectiveCoordinate`,
  st = `DirectiveArgumentCoordinate`;
function ct(e, t) {
  if (!e) throw Error(t);
}
function lt(e) {
  return e === 9 || e === 32;
}
function ut(e) {
  return e >= 48 && e <= 57;
}
function dt(e) {
  return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
}
function ft(e) {
  return dt(e) || e === 95;
}
function pt(e) {
  return dt(e) || ut(e) || e === 95;
}
function mt(e) {
  let t = 2 ** 53 - 1,
    n = null,
    r = -1;
  for (let i = 0; i < e.length; ++i) {
    let a = e[i],
      o = ht(a);
    o !== a.length && ((n ??= i), (r = i), i !== 0 && o < t && (t = o));
  }
  return e.map((e, n) => (n === 0 ? e : e.slice(t))).slice(n ?? 0, r + 1);
}
function ht(e) {
  let t = 0;
  for (; t < e.length && lt(e.charCodeAt(t));) ++t;
  return t;
}
var gt = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function _t(e) {
  return vt[e.charCodeAt(0)];
}
var vt =
    `\\u0000.\\u0001.\\u0002.\\u0003.\\u0004.\\u0005.\\u0006.\\u0007.\\b.\\t.\\n.\\u000B.\\f.\\r.\\u000E.\\u000F.\\u0010.\\u0011.\\u0012.\\u0013.\\u0014.\\u0015.\\u0016.\\u0017.\\u0018.\\u0019.\\u001A.\\u001B.\\u001C.\\u001D.\\u001E.\\u001F...\\"..........................................................\\\\...................................\\u007F.\\u0080.\\u0081.\\u0082.\\u0083.\\u0084.\\u0085.\\u0086.\\u0087.\\u0088.\\u0089.\\u008A.\\u008B.\\u008C.\\u008D.\\u008E.\\u008F.\\u0090.\\u0091.\\u0092.\\u0093.\\u0094.\\u0095.\\u0096.\\u0097.\\u0098.\\u0099.\\u009A.\\u009B.\\u009C.\\u009D.\\u009E.\\u009F`.split(
      `.`
    ),
  yt = Object.freeze({});
function _(e, t, n = ae) {
  let r = new Map();
  for (let e of Object.values(de)) r.set(e, bt(t, e));
  let i,
    a,
    o,
    s = Array.isArray(e),
    c = [e],
    u = -1,
    d = [],
    f = e,
    p = [],
    m = [];
  do {
    u++;
    let e = u === c.length,
      h = e && d.length !== 0;
    if (e) {
      if (
        ((a = m.length === 0 ? void 0 : p[p.length - 1]),
        (f = o),
        (o = m.pop()),
        h)
      )
        if (s) {
          f = f.slice();
          let e = 0;
          for (let [t, n] of d) {
            let r = t - e;
            n === null ? (f.splice(r, 1), e++) : (f[r] = n);
          }
        } else {
          f = { ...f };
          for (let [e, t] of d) f[e] = t;
        }
      ((u = i.index),
        (c = i.keys),
        (d = i.edits),
        (s = i.inArray),
        (i = i.prev));
    } else if (o != null) {
      if (((a = s ? u : c[u]), (f = o[a]), f == null)) continue;
      p.push(a);
    }
    let g;
    if (!Array.isArray(f)) {
      if (
        (se(f) || ct(!1, `Invalid AST Node: ${l(f)}.`),
        (g = (e ? r.get(f.kind)?.leave : r.get(f.kind)?.enter)?.call(
          t,
          f,
          a,
          o,
          p,
          m
        )),
        g === yt)
      )
        break;
      if (!1 === g) {
        if (!e) {
          p.pop();
          continue;
        }
      } else if (g !== void 0 && (d.push([a, g]), !e)) {
        if (!se(g)) {
          p.pop();
          continue;
        }
        f = g;
      }
    }
    (g === void 0 && h && d.push([a, f]),
      e
        ? p.pop()
        : ((i = { inArray: s, index: u, keys: c, edits: d, prev: i }),
          (s = Array.isArray(f)),
          (c = s ? f : (n[f.kind] ?? [])),
          (u = -1),
          (d = []),
          o != null && m.push(o),
          (o = f)));
  } while (i !== void 0);
  return d.length === 0 ? e : d.at(-1)[1];
}
function bt(e, t) {
  let n = e[t];
  return typeof n == `object`
    ? n
    : typeof n == `function`
      ? { enter: n, leave: void 0 }
      : { enter: e.enter, leave: e.leave };
}
var xt = {
  Name: { leave: (e) => e.value },
  Variable: { leave: (e) => `$` + e.name },
  Document: {
    leave: (e) =>
      v(
        e.definitions,
        `

`
      ),
  },
  OperationDefinition: {
    leave(e) {
      let t = Ct(e.variableDefinitions)
          ? b(
              `(
`,
              v(
                e.variableDefinitions,
                `
`
              ),
              `
)`
            )
          : b(`(`, v(e.variableDefinitions, `, `), `)`),
        n =
          b(
            ``,
            e.description,
            `
`
          ) + v([e.operation, v([e.name, t]), v(e.directives, ` `)], ` `);
      return (n === `query` ? `` : n + ` `) + e.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({
      variable: e,
      type: t,
      defaultValue: n,
      directives: r,
      description: i,
    }) =>
      b(
        ``,
        i,
        `
`
      ) +
      e +
      `: ` +
      t +
      b(` = `, n) +
      b(` `, v(r, ` `)),
  },
  SelectionSet: { leave: ({ selections: e }) => y(e) },
  Field: {
    leave: ({
      alias: e,
      name: t,
      arguments: n,
      directives: r,
      selectionSet: i,
    }) => v([wt(v([b(``, e, `: `), t], ``), n), b(` `, v(r, ` `)), b(` `, i)]),
  },
  Argument: { leave: ({ name: e, value: t }) => e + `: ` + t },
  FragmentArgument: { leave: ({ name: e, value: t }) => e + `: ` + t },
  FragmentSpread: {
    leave: ({ name: e, arguments: t, directives: n }) =>
      wt(`...` + e, t) + b(` `, v(n, ` `)),
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) =>
      v([`...`, b(`on `, e), v(t, ` `), n], ` `),
  },
  FragmentDefinition: {
    leave: ({
      name: e,
      typeCondition: t,
      variableDefinitions: n,
      directives: r,
      selectionSet: i,
      description: a,
    }) =>
      b(
        ``,
        a,
        `
`
      ) +
      `fragment ${e}${b(`(`, v(n, `, `), `)`)} on ${t} ${b(``, v(r, ` `), ` `)}` +
      i,
  },
  IntValue: { leave: ({ value: e }) => e },
  FloatValue: { leave: ({ value: e }) => e },
  StringValue: {
    leave: ({ value: e, block: t }) =>
      !0 === t
        ? (function (e, t) {
            let n = e.replaceAll(`"""`, `\\"""`),
              r = n.split(/\r\n|[\n\r]/g),
              i = r.length === 1,
              a =
                r.length > 1 &&
                r.slice(1).every((e) => e.length === 0 || lt(e.charCodeAt(0))),
              o = n.endsWith(`\\"""`),
              s = e.endsWith(`"`) && !o,
              c = e.endsWith(`\\`),
              l = s || c,
              u = !t?.minimize && (!i || e.length > 70 || l || a || o),
              d = ``,
              f = i && lt(e.charCodeAt(0));
            return (
              ((u && !f) || a) &&
                (d += `
`),
              (d += n),
              (u || l) &&
                (d += `
`),
              `"""` + d + `"""`
            );
          })(e)
        : `"${e.replace(gt, _t)}"`,
  },
  BooleanValue: { leave: ({ value: e }) => (e ? `true` : `false`) },
  NullValue: { leave: () => `null` },
  EnumValue: { leave: ({ value: e }) => e },
  ListValue: {
    leave: ({ values: e }) => {
      let t = `[` + v(e, `, `) + `]`;
      return t.length > 80
        ? `[
` +
            St(
              v(
                e,
                `
`
              )
            ) +
            `
]`
        : t;
    },
  },
  ObjectValue: {
    leave: ({ fields: e }) => {
      let t = `{ ` + v(e, `, `) + ` }`;
      return t.length > 80 ? y(e) : t;
    },
  },
  ObjectField: { leave: ({ name: e, value: t }) => e + `: ` + t },
  Directive: {
    leave: ({ name: e, arguments: t }) => `@` + e + b(`(`, v(t, `, `), `)`),
  },
  NamedType: { leave: ({ name: e }) => e },
  ListType: { leave: ({ type: e }) => `[` + e + `]` },
  NonNullType: { leave: ({ type: e }) => e + `!` },
  SchemaDefinition: {
    leave: ({ description: e, directives: t, operationTypes: n }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`schema`, v(t, ` `), y(n)], ` `),
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + `: ` + t,
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`scalar`, t, v(n, ` `)], ` `),
  },
  ObjectTypeDefinition: {
    leave: ({
      description: e,
      name: t,
      interfaces: n,
      directives: r,
      fields: i,
    }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`type`, t, b(`implements `, v(n, ` & `)), v(r, ` `), y(i)], ` `),
  },
  FieldDefinition: {
    leave: ({
      description: e,
      name: t,
      arguments: n,
      type: r,
      directives: i,
    }) =>
      b(
        ``,
        e,
        `
`
      ) +
      t +
      (Ct(n)
        ? b(
            `(
`,
            St(
              v(
                n,
                `
`
              )
            ),
            `
)`
          )
        : b(`(`, v(n, `, `), `)`)) +
      `: ` +
      r +
      b(` `, v(i, ` `)),
  },
  InputValueDefinition: {
    leave: ({
      description: e,
      name: t,
      type: n,
      defaultValue: r,
      directives: i,
    }) =>
      b(
        ``,
        e,
        `
`
      ) + v([t + `: ` + n, b(`= `, r), v(i, ` `)], ` `),
  },
  InterfaceTypeDefinition: {
    leave: ({
      description: e,
      name: t,
      interfaces: n,
      directives: r,
      fields: i,
    }) =>
      b(
        ``,
        e,
        `
`
      ) +
      v([`interface`, t, b(`implements `, v(n, ` & `)), v(r, ` `), y(i)], ` `),
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`union`, t, v(n, ` `), b(`= `, v(r, ` | `))], ` `),
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`enum`, t, v(n, ` `), y(r)], ` `),
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) =>
      b(
        ``,
        e,
        `
`
      ) + v([t, v(n, ` `)], ` `),
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) =>
      b(
        ``,
        e,
        `
`
      ) + v([`input`, t, v(n, ` `), y(r)], ` `),
  },
  DirectiveDefinition: {
    leave: ({
      description: e,
      name: t,
      arguments: n,
      directives: r,
      repeatable: i,
      locations: a,
    }) =>
      b(
        ``,
        e,
        `
`
      ) +
      `directive @` +
      t +
      (Ct(n)
        ? b(
            `(
`,
            St(
              v(
                n,
                `
`
              )
            ),
            `
)`
          )
        : b(`(`, v(n, `, `), `)`)) +
      b(` `, v(r, ` `)) +
      (i ? ` repeatable` : ``) +
      ` on ` +
      v(a, ` | `),
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) =>
      v([`extend schema`, v(e, ` `), y(t)], ` `),
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) =>
      v([`extend scalar`, e, v(t, ` `)], ` `),
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
      v(
        [`extend type`, e, b(`implements `, v(t, ` & `)), v(n, ` `), y(r)],
        ` `
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
      v(
        [`extend interface`, e, b(`implements `, v(t, ` & `)), v(n, ` `), y(r)],
        ` `
      ),
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) =>
      v([`extend union`, e, v(t, ` `), b(`= `, v(n, ` | `))], ` `),
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) =>
      v([`extend enum`, e, v(t, ` `), y(n)], ` `),
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) =>
      v([`extend input`, e, v(t, ` `), y(n)], ` `),
  },
  DirectiveExtension: {
    leave: ({ name: e, directives: t }) =>
      v([`extend directive @` + e, v(t, ` `)], ` `),
  },
  TypeCoordinate: { leave: ({ name: e }) => e },
  MemberCoordinate: {
    leave: ({ name: e, memberName: t }) => v([e, b(`.`, t)]),
  },
  ArgumentCoordinate: {
    leave: ({ name: e, fieldName: t, argumentName: n }) =>
      v([e, b(`.`, t), b(`(`, n, `:)`)]),
  },
  DirectiveCoordinate: { leave: ({ name: e }) => v([`@`, e]) },
  DirectiveArgumentCoordinate: {
    leave: ({ name: e, argumentName: t }) => v([`@`, e, b(`(`, t, `:)`)]),
  },
};
function v(e, t = ``) {
  return e?.filter((e) => e !== void 0 && e !== ``).join(t) ?? ``;
}
function y(e) {
  return b(
    `{
`,
    St(
      v(
        e,
        `
`
      )
    ),
    `
}`
  );
}
function b(e, t, n = ``) {
  return t != null && t !== `` ? e + t + n : ``;
}
function St(e) {
  return b(
    `  `,
    e.replaceAll(
      `
`,
      `
  `
    )
  );
}
function Ct(e) {
  return (
    e?.some((e) =>
      e.includes(`
`)
    ) ?? !1
  );
}
function wt(e, t) {
  let n = e + b(`(`, v(t, `, `), `)`);
  return (
    n.length > 80 &&
      (n =
        e +
        b(
          `(
`,
          St(
            v(
              t,
              `
`
            )
          ),
          `
)`
        )),
    n
  );
}
var Tt = {
  QUERY: `QUERY`,
  MUTATION: `MUTATION`,
  SUBSCRIPTION: `SUBSCRIPTION`,
  FIELD: `FIELD`,
  FRAGMENT_DEFINITION: `FRAGMENT_DEFINITION`,
  FRAGMENT_SPREAD: `FRAGMENT_SPREAD`,
  INLINE_FRAGMENT: `INLINE_FRAGMENT`,
  VARIABLE_DEFINITION: `VARIABLE_DEFINITION`,
  FRAGMENT_VARIABLE_DEFINITION: `FRAGMENT_VARIABLE_DEFINITION`,
  SCHEMA: `SCHEMA`,
  SCALAR: `SCALAR`,
  OBJECT: `OBJECT`,
  FIELD_DEFINITION: `FIELD_DEFINITION`,
  ARGUMENT_DEFINITION: `ARGUMENT_DEFINITION`,
  INTERFACE: `INTERFACE`,
  UNION: `UNION`,
  ENUM: `ENUM`,
  ENUM_VALUE: `ENUM_VALUE`,
  INPUT_OBJECT: `INPUT_OBJECT`,
  INPUT_FIELD_DEFINITION: `INPUT_FIELD_DEFINITION`,
  DIRECTIVE_DEFINITION: `DIRECTIVE_DEFINITION`,
};
function x(e, t, n) {
  return new te(`Syntax Error: ${n}`, { source: e, positions: [t] });
}
var Et = (function () {
    let e;
    try {
      let t = globalThis.process;
      typeof t?.getBuiltinModule == `function` &&
        (e = t.getBuiltinModule(`node:diagnostics_channel`));
    } catch {}
    return e;
  })(),
  Dt = Et?.tracingChannel(`graphql:parse`),
  Ot =
    (Et?.tracingChannel(`graphql:validate`),
    Et?.tracingChannel(`graphql:execute`),
    Et?.tracingChannel(`graphql:execute:variableCoercion`),
    Et?.tracingChannel(`graphql:execute:rootSelectionSet`),
    Et?.tracingChannel(`graphql:subscribe`),
    Et?.tracingChannel(`graphql:resolve`),
    [`start`, `end`, `asyncStart`, `asyncEnd`, `error`]),
  kt = `<SOF>`,
  At = `<EOF>`,
  jt = `!`,
  Mt = `$`,
  Nt = `&`,
  S = `(`,
  Pt = `)`,
  Ft = `.`,
  It = `...`,
  C = `:`,
  Lt = `=`,
  Rt = `@`,
  zt = `[`,
  Bt = `]`,
  w = `{`,
  Vt = `|`,
  T = `}`,
  E = `Name`,
  Ht = `Int`,
  Ut = `Float`,
  Wt = `String`,
  Gt = `BlockString`,
  Kt = `Comment`,
  qt = class {
    constructor(e) {
      let t = new ie(kt, 0, 0, 0, 0);
      ((this.source = e),
        (this.lastToken = t),
        (this.token = t),
        (this.line = 1),
        (this.lineStart = 0));
    }
    get [Symbol.toStringTag]() {
      return `Lexer`;
    }
    advance() {
      return ((this.lastToken = this.token), (this.token = this.lookahead()));
    }
    lookahead() {
      let e = this.token;
      if (e.kind !== At)
        do
          if (e.next) e = e.next;
          else {
            let t = $t(this, e.end);
            ((e.next = t), (t.prev = e), (e = t));
          }
        while (e.kind === Kt);
      return e;
    }
  };
function Jt(e) {
  return (e >= 0 && e <= 55295) || (e >= 57344 && e <= 1114111);
}
function Yt(e, t) {
  return Xt(e.charCodeAt(t)) && Zt(e.charCodeAt(t + 1));
}
function Xt(e) {
  return e >= 55296 && e <= 56319;
}
function Zt(e) {
  return e >= 56320 && e <= 57343;
}
function Qt(e, t) {
  let n = e.source.body.codePointAt(t);
  if (n === void 0) return At;
  if (n >= 32 && n <= 126) {
    let e = String.fromCodePoint(n);
    return e === `"` ? `'"'` : `"${e}"`;
  }
  return `U+` + n.toString(16).toUpperCase().padStart(4, `0`);
}
function D(e, t, n, r, i) {
  let a = e.line;
  return new ie(t, n, r, a, 1 + n - e.lineStart, i);
}
function $t(e, t) {
  let n = e.source.body,
    r = n.length,
    i = t;
  for (; i < r;) {
    let t = n.charCodeAt(i);
    switch (t) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++i;
        continue;
      case 10:
        (++i, ++e.line, (e.lineStart = i));
        continue;
      case 13:
        (n.charCodeAt(i + 1) === 10 ? (i += 2) : ++i,
          ++e.line,
          (e.lineStart = i));
        continue;
      case 35:
        return en(e, i);
      case 33:
        return D(e, jt, i, i + 1);
      case 36:
        return D(e, Mt, i, i + 1);
      case 38:
        return D(e, Nt, i, i + 1);
      case 40:
        return D(e, S, i, i + 1);
      case 41:
        return D(e, Pt, i, i + 1);
      case 46: {
        let t = n.charCodeAt(i + 1);
        if (t === 46 && n.charCodeAt(i + 2) === 46) return D(e, It, i, i + 3);
        if (t === 46)
          throw x(e.source, i, `Unexpected "..", did you mean "..."?`);
        if (ut(t)) {
          let n = e.source.body.slice(i + 1, nn(e, i + 1, t));
          throw x(
            e.source,
            i,
            `Invalid number, expected digit before ".", did you mean "0.${n}"?`
          );
        }
        break;
      }
      case 58:
        return D(e, C, i, i + 1);
      case 61:
        return D(e, Lt, i, i + 1);
      case 64:
        return D(e, Rt, i, i + 1);
      case 91:
        return D(e, zt, i, i + 1);
      case 93:
        return D(e, Bt, i, i + 1);
      case 123:
        return D(e, w, i, i + 1);
      case 124:
        return D(e, Vt, i, i + 1);
      case 125:
        return D(e, T, i, i + 1);
      case 34:
        return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34
          ? un(e, i)
          : rn(e, i);
    }
    if (ut(t) || t === 45) return tn(e, i, t);
    if (ft(t)) return dn(e, i);
    throw x(
      e.source,
      i,
      t === 39
        ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
        : Jt(t) || Yt(n, i)
          ? `Unexpected character: ${Qt(e, i)}.`
          : `Invalid character: ${Qt(e, i)}.`
    );
  }
  return D(e, At, r, r);
}
function en(e, t) {
  let n = e.source.body,
    r = n.length,
    i = t + 1;
  for (; i < r;) {
    let e = n.charCodeAt(i);
    if (e === 10 || e === 13) break;
    if (Jt(e)) ++i;
    else {
      if (!Yt(n, i)) break;
      i += 2;
    }
  }
  return D(e, Kt, t, i, n.slice(t + 1, i));
}
function tn(e, t, n) {
  let r = e.source.body,
    i = t,
    a = n,
    o = !1;
  if ((a === 45 && (a = r.charCodeAt(++i)), a === 48)) {
    if (((a = r.charCodeAt(++i)), ut(a)))
      throw x(
        e.source,
        i,
        `Invalid number, unexpected digit after 0: ${Qt(e, i)}.`
      );
  } else ((i = nn(e, i, a)), (a = r.charCodeAt(i)));
  if (
    (a === 46 &&
      ((o = !0),
      (a = r.charCodeAt(++i)),
      (i = nn(e, i, a)),
      (a = r.charCodeAt(i))),
    (a !== 69 && a !== 101) ||
      ((o = !0),
      (a = r.charCodeAt(++i)),
      (a !== 43 && a !== 45) || (a = r.charCodeAt(++i)),
      (i = nn(e, i, a)),
      (a = r.charCodeAt(i))),
    a === 46 || ft(a))
  )
    throw x(
      e.source,
      i,
      `Invalid number, expected digit but got: ${Qt(e, i)}.`
    );
  return D(e, o ? Ut : Ht, t, i, r.slice(t, i));
}
function nn(e, t, n) {
  if (!ut(n))
    throw x(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Qt(e, t)}.`
    );
  let r = e.source.body,
    i = t + 1;
  for (; ut(r.charCodeAt(i));) ++i;
  return i;
}
function rn(e, t) {
  let n = e.source.body,
    r = n.length,
    i = t + 1,
    a = i,
    o = ``;
  for (; i < r;) {
    let r = n.charCodeAt(i);
    if (r === 34) return ((o += n.slice(a, i)), D(e, Wt, t, i + 1, o));
    if (r === 92) {
      o += n.slice(a, i);
      let t =
        n.charCodeAt(i + 1) === 117
          ? n.charCodeAt(i + 2) === 123
            ? an(e, i)
            : on(e, i)
          : ln(e, i);
      ((o += t.value), (i += t.size), (a = i));
      continue;
    }
    if (r === 10 || r === 13) break;
    if (Jt(r)) ++i;
    else {
      if (!Yt(n, i))
        throw x(e.source, i, `Invalid character within String: ${Qt(e, i)}.`);
      i += 2;
    }
  }
  throw x(e.source, i, `Unterminated string.`);
}
function an(e, t) {
  let n = e.source.body,
    r = 0,
    i = 3;
  for (; i < 12;) {
    let e = n.charCodeAt(t + i++);
    if (e === 125) {
      if (i < 5 || !Jt(r)) break;
      return { value: String.fromCodePoint(r), size: i };
    }
    if (((r = (r << 4) | cn(e)), r < 0)) break;
  }
  throw x(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + i)}".`
  );
}
function on(e, t) {
  let n = e.source.body,
    r = sn(n, t + 2);
  if (Jt(r)) return { value: String.fromCodePoint(r), size: 6 };
  if (Xt(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    let e = sn(n, t + 8);
    if (Zt(e)) return { value: String.fromCodePoint(r, e), size: 12 };
  }
  throw x(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function sn(e, t) {
  return (
    (cn(e.charCodeAt(t)) << 12) |
    (cn(e.charCodeAt(t + 1)) << 8) |
    (cn(e.charCodeAt(t + 2)) << 4) |
    cn(e.charCodeAt(t + 3))
  );
}
function cn(e) {
  return e >= 48 && e <= 57
    ? e - 48
    : e >= 65 && e <= 70
      ? e - 55
      : e >= 97 && e <= 102
        ? e - 87
        : -1;
}
function ln(e, t) {
  let n = e.source.body;
  switch (n.charCodeAt(t + 1)) {
    case 34:
      return { value: `"`, size: 2 };
    case 92:
      return { value: `\\`, size: 2 };
    case 47:
      return { value: `/`, size: 2 };
    case 98:
      return { value: `\b`, size: 2 };
    case 102:
      return { value: `\f`, size: 2 };
    case 110:
      return {
        value: `
`,
        size: 2,
      };
    case 114:
      return { value: `\r`, size: 2 };
    case 116:
      return { value: `	`, size: 2 };
  }
  throw x(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(t, t + 2)}".`
  );
}
function un(e, t) {
  let n = e.source.body,
    r = n.length,
    i = e.lineStart,
    a = t + 3,
    o = a,
    s = ``,
    c = [];
  for (; a < r;) {
    let r = n.charCodeAt(a);
    if (r === 34 && n.charCodeAt(a + 1) === 34 && n.charCodeAt(a + 2) === 34) {
      ((s += n.slice(o, a)), c.push(s));
      let r = D(
        e,
        Gt,
        t,
        a + 3,
        mt(c).join(`
`)
      );
      return ((e.line += c.length - 1), (e.lineStart = i), r);
    }
    if (
      r !== 92 ||
      n.charCodeAt(a + 1) !== 34 ||
      n.charCodeAt(a + 2) !== 34 ||
      n.charCodeAt(a + 3) !== 34
    )
      if (r !== 10 && r !== 13)
        if (Jt(r)) ++a;
        else {
          if (!Yt(n, a))
            throw x(
              e.source,
              a,
              `Invalid character within String: ${Qt(e, a)}.`
            );
          a += 2;
        }
      else
        ((s += n.slice(o, a)),
          c.push(s),
          r === 13 && n.charCodeAt(a + 1) === 10 ? (a += 2) : ++a,
          (s = ``),
          (o = a),
          (i = a));
    else ((s += n.slice(o, a)), (o = a + 1), (a += 4));
  }
  throw x(e.source, a, `Unterminated string.`);
}
function dn(e, t) {
  let n = e.source.body,
    r = n.length,
    i = t + 1;
  for (; i < r && pt(n.charCodeAt(i));) ++i;
  return D(e, E, t, i, n.slice(t, i));
}
var fn = Symbol(`Source`),
  pn = class {
    constructor(e, t = `GraphQL request`, n = { line: 1, column: 1 }) {
      ((this.__kind = fn),
        (this.body = e),
        (this.name = t),
        (this.locationOffset = n),
        this.locationOffset.line > 0 ||
          ct(!1, `line in locationOffset is 1-indexed and must be positive.`),
        this.locationOffset.column > 0 ||
          ct(
            !1,
            `column in locationOffset is 1-indexed and must be positive.`
          ));
    }
    get [Symbol.toStringTag]() {
      return `Source`;
    }
  };
function mn(e, t) {
  return (function (e) {
    if (e == null) return !1;
    let t = e.hasSubscribers;
    if (t !== void 0) return t;
    for (let t of Ot) if (e[t].hasSubscribers) return !0;
    return !1;
  })(Dt)
    ? Dt.traceSync(() => hn(e, t), { source: e })
    : hn(e, t);
}
function hn(e, t) {
  let n = new gn(e, t),
    r = n.parseDocument();
  return (
    Object.defineProperty(r, 'tokenCount', {
      enumerable: !1,
      value: n.tokenCount,
    }),
    r
  );
}
var gn = class {
  constructor(e, t = {}) {
    let { lexer: n, ...r } = t;
    if (n) this._lexer = n;
    else {
      let t = (function (e) {
        return d(e, fn, pn);
      })(e)
        ? e
        : new pn(e);
      this._lexer = new qt(t);
    }
    ((this._options = r), (this._tokenCounter = 0));
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  parseName() {
    let e = this.expectToken(E);
    return this.node(e, { kind: fe, value: e.value });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: pe,
      definitions: this.many(kt, this.parseDefinition, At),
    });
  }
  parseDefinition() {
    if (this.peek(w)) return this.parseOperationDefinition();
    let e = this.peekDescription(),
      t = e ? this._lexer.lookahead() : this._lexer.token;
    if (e && t.kind === w)
      throw x(
        this._lexer.source,
        this._lexer.token.start,
        `Unexpected description, descriptions are not supported on shorthand queries.`
      );
    if (t.kind === E) {
      switch (t.value) {
        case `schema`:
          return this.parseSchemaDefinition();
        case `scalar`:
          return this.parseScalarTypeDefinition();
        case `type`:
          return this.parseObjectTypeDefinition();
        case `interface`:
          return this.parseInterfaceTypeDefinition();
        case `union`:
          return this.parseUnionTypeDefinition();
        case `enum`:
          return this.parseEnumTypeDefinition();
        case `input`:
          return this.parseInputObjectTypeDefinition();
        case `directive`:
          return this.parseDirectiveDefinition();
      }
      switch (t.value) {
        case `query`:
        case `mutation`:
        case `subscription`:
          return this.parseOperationDefinition();
        case `fragment`:
          return this.parseFragmentDefinition();
      }
      if (e)
        throw x(
          this._lexer.source,
          this._lexer.token.start,
          `Unexpected description, only GraphQL definitions support descriptions.`
        );
      if (t.value === `extend`) return this.parseTypeSystemExtension();
    }
    throw this.unexpected(t);
  }
  parseOperationDefinition() {
    let e = this._lexer.token;
    if (this.peek(w))
      return this.node(e, {
        kind: me,
        operation: ce,
        description: void 0,
        name: void 0,
        variableDefinitions: void 0,
        directives: void 0,
        selectionSet: this.parseSelectionSet(),
      });
    let t = this.parseDescription(),
      n = this.parseOperationType(),
      r;
    return (
      this.peek(E) && (r = this.parseName()),
      this.node(e, {
        kind: me,
        operation: n,
        description: t,
        name: r,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet(),
      })
    );
  }
  parseOperationType() {
    let e = this.expectToken(E);
    switch (e.value) {
      case `query`:
        return ce;
      case `mutation`:
        return le;
      case `subscription`:
        return ue;
    }
    throw this.unexpected(e);
  }
  parseVariableDefinitions() {
    return this.optionalMany(S, this.parseVariableDefinition, Pt);
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: he,
      description: this.parseDescription(),
      variable: this.parseVariable(),
      type: (this.expectToken(C), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(Lt)
        ? this.parseConstValueLiteral()
        : void 0,
      directives: this.parseConstDirectives(),
    });
  }
  parseVariable() {
    let e = this._lexer.token;
    return (
      this.expectToken(Mt),
      this.node(e, { kind: Ce, name: this.parseName() })
    );
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ge,
      selections: this.many(w, this.parseSelection, T),
    });
  }
  parseSelection() {
    return this.peek(It) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    let e = this._lexer.token,
      t = this.parseName(),
      n,
      r;
    return (
      this.expectOptionalToken(C) ? ((n = t), (r = this.parseName())) : (r = t),
      this.node(e, {
        kind: _e,
        alias: n,
        name: r,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(w) ? this.parseSelectionSet() : void 0,
      })
    );
  }
  parseArguments(e) {
    let t = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(S, t, Pt);
  }
  parseFragmentArguments() {
    let e = this.parseFragmentArgument;
    return this.optionalMany(S, e, Pt);
  }
  parseArgument(e = !1) {
    let t = this._lexer.token,
      n = this.parseName();
    return (
      this.expectToken(C),
      this.node(t, { kind: ve, name: n, value: this.parseValueLiteral(e) })
    );
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  parseFragmentArgument() {
    let e = this._lexer.token,
      t = this.parseName();
    return (
      this.expectToken(C),
      this.node(e, { kind: ye, name: t, value: this.parseValueLiteral(!1) })
    );
  }
  parseFragment() {
    let e = this._lexer.token;
    this.expectToken(It);
    let t = this.expectOptionalKeyword(`on`);
    if (!t && this.peek(E)) {
      let t = this.parseFragmentName();
      return this.peek(S) && this._options.experimentalFragmentArguments
        ? this.node(e, {
            kind: be,
            name: t,
            arguments: this.parseFragmentArguments(),
            directives: this.parseDirectives(!1),
          })
        : this.node(e, {
            kind: be,
            name: t,
            directives: this.parseDirectives(!1),
          });
    }
    return this.node(e, {
      kind: xe,
      typeCondition: t ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet(),
    });
  }
  parseFragmentDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    return (
      this.expectKeyword(`fragment`),
      !0 === this._options.experimentalFragmentArguments
        ? this.node(e, {
            kind: Se,
            description: t,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword(`on`), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
          })
        : this.node(e, {
            kind: Se,
            description: t,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword(`on`), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
          })
    );
  }
  parseFragmentName() {
    if (this._lexer.token.value === `on`) throw this.unexpected();
    return this.parseName();
  }
  parseValueLiteral(e) {
    let t = this._lexer.token;
    switch (t.kind) {
      case zt:
        return this.parseList(e);
      case w:
        return this.parseObject(e);
      case Ht:
        return (
          this.advanceLexer(),
          this.node(t, { kind: we, value: t.value })
        );
      case Ut:
        return (
          this.advanceLexer(),
          this.node(t, { kind: Te, value: t.value })
        );
      case Wt:
      case Gt:
        return this.parseStringLiteral();
      case E:
        switch ((this.advanceLexer(), t.value)) {
          case `true`:
            return this.node(t, { kind: De, value: !0 });
          case `false`:
            return this.node(t, { kind: De, value: !1 });
          case `null`:
            return this.node(t, { kind: Oe });
          default:
            return this.node(t, { kind: ke, value: t.value });
        }
      case Mt:
        if (e) {
          if ((this.expectToken(Mt), this._lexer.token.kind === E)) {
            let e = this._lexer.token.value;
            throw x(
              this._lexer.source,
              t.start,
              `Unexpected variable "$${e}" in constant value.`
            );
          }
          throw this.unexpected(t);
        }
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    let e = this._lexer.token;
    return (
      this.advanceLexer(),
      this.node(e, { kind: Ee, value: e.value, block: e.kind === Gt })
    );
  }
  parseList(e) {
    return this.node(this._lexer.token, {
      kind: Ae,
      values: this.any(zt, () => this.parseValueLiteral(e), Bt),
    });
  }
  parseObject(e) {
    return this.node(this._lexer.token, {
      kind: je,
      fields: this.any(w, () => this.parseObjectField(e), T),
    });
  }
  parseObjectField(e) {
    let t = this._lexer.token,
      n = this.parseName();
    return (
      this.expectToken(C),
      this.node(t, { kind: Me, name: n, value: this.parseValueLiteral(e) })
    );
  }
  parseDirectives(e) {
    let t = [];
    for (; this.peek(Rt);) t.push(this.parseDirective(e));
    if (t.length) return t;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(e) {
    let t = this._lexer.token;
    return (
      this.expectToken(Rt),
      this.node(t, {
        kind: Ne,
        name: this.parseName(),
        arguments: this.parseArguments(e),
      })
    );
  }
  parseTypeReference() {
    let e = this._lexer.token,
      t;
    if (this.expectOptionalToken(zt)) {
      let n = this.parseTypeReference();
      (this.expectToken(Bt), (t = this.node(e, { kind: Fe, type: n })));
    } else t = this.parseNamedType();
    return this.expectOptionalToken(jt)
      ? this.node(e, { kind: Ie, type: t })
      : t;
  }
  parseNamedType() {
    return this.node(this._lexer.token, { kind: Pe, name: this.parseName() });
  }
  peekDescription() {
    return this.peek(Wt) || this.peek(Gt);
  }
  parseDescription() {
    if (this.peekDescription()) return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`schema`);
    let n = this.parseConstDirectives(),
      r = this.many(w, this.parseOperationTypeDefinition, T);
    return this.node(e, {
      kind: Le,
      description: t,
      directives: n,
      operationTypes: r,
    });
  }
  parseOperationTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseOperationType();
    this.expectToken(C);
    let n = this.parseNamedType();
    return this.node(e, { kind: Re, operation: t, type: n });
  }
  parseScalarTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`scalar`);
    let n = this.parseName(),
      r = this.parseConstDirectives();
    return this.node(e, { kind: ze, description: t, name: n, directives: r });
  }
  parseObjectTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`type`);
    let n = this.parseName(),
      r = this.parseImplementsInterfaces(),
      i = this.parseConstDirectives(),
      a = this.parseFieldsDefinition();
    return this.node(e, {
      kind: Be,
      description: t,
      name: n,
      interfaces: r,
      directives: i,
      fields: a,
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword(`implements`)
      ? this.delimitedMany(Nt, this.parseNamedType)
      : void 0;
  }
  parseFieldsDefinition() {
    return this.optionalMany(w, this.parseFieldDefinition, T);
  }
  parseFieldDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription(),
      n = this.parseName(),
      r = this.parseArgumentDefs();
    this.expectToken(C);
    let i = this.parseTypeReference(),
      a = this.parseConstDirectives();
    return this.node(e, {
      kind: Ve,
      description: t,
      name: n,
      arguments: r,
      type: i,
      directives: a,
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(S, this.parseInputValueDef, Pt);
  }
  parseInputValueDef() {
    let e = this._lexer.token,
      t = this.parseDescription(),
      n = this.parseName();
    this.expectToken(C);
    let r = this.parseTypeReference(),
      i;
    this.expectOptionalToken(Lt) && (i = this.parseConstValueLiteral());
    let a = this.parseConstDirectives();
    return this.node(e, {
      kind: He,
      description: t,
      name: n,
      type: r,
      defaultValue: i,
      directives: a,
    });
  }
  parseInterfaceTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`interface`);
    let n = this.parseName(),
      r = this.parseImplementsInterfaces(),
      i = this.parseConstDirectives(),
      a = this.parseFieldsDefinition();
    return this.node(e, {
      kind: Ue,
      description: t,
      name: n,
      interfaces: r,
      directives: i,
      fields: a,
    });
  }
  parseUnionTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`union`);
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      i = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: We,
      description: t,
      name: n,
      directives: r,
      types: i,
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(Lt)
      ? this.delimitedMany(Vt, this.parseNamedType)
      : void 0;
  }
  parseEnumTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`enum`);
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      i = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: Ge,
      description: t,
      name: n,
      directives: r,
      values: i,
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(w, this.parseEnumValueDefinition, T);
  }
  parseEnumValueDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription(),
      n = this.parseEnumValueName(),
      r = this.parseConstDirectives();
    return this.node(e, { kind: Ke, description: t, name: n, directives: r });
  }
  parseEnumValueName() {
    if (
      this._lexer.token.value === `true` ||
      this._lexer.token.value === `false` ||
      this._lexer.token.value === `null`
    )
      throw x(
        this._lexer.source,
        this._lexer.token.start,
        `${_n(this._lexer.token)} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    this.expectKeyword(`input`);
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      i = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: qe,
      description: t,
      name: n,
      directives: r,
      fields: i,
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(w, this.parseInputValueDef, T);
  }
  parseTypeSystemExtension() {
    let e = this._lexer.lookahead();
    if (e.kind === E)
      switch (e.value) {
        case `schema`:
          return this.parseSchemaExtension();
        case `scalar`:
          return this.parseScalarTypeExtension();
        case `type`:
          return this.parseObjectTypeExtension();
        case `interface`:
          return this.parseInterfaceTypeExtension();
        case `union`:
          return this.parseUnionTypeExtension();
        case `enum`:
          return this.parseEnumTypeExtension();
        case `input`:
          return this.parseInputObjectTypeExtension();
        case `directive`:
          return this.parseDirectiveExtension();
      }
    throw this.unexpected(e);
  }
  parseSchemaExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`schema`));
    let t = this.parseConstDirectives(),
      n = this.optionalMany(w, this.parseOperationTypeDefinition, T);
    if (t === void 0 && n === void 0) throw this.unexpected();
    return this.node(e, { kind: Ye, directives: t, operationTypes: n });
  }
  parseScalarTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`scalar`));
    let t = this.parseName(),
      n = this.parseConstDirectives();
    if (n === void 0) throw this.unexpected();
    return this.node(e, { kind: Ze, name: t, directives: n });
  }
  parseObjectTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`type`));
    let t = this.parseName(),
      n = this.parseImplementsInterfaces(),
      r = this.parseConstDirectives(),
      i = this.parseFieldsDefinition();
    if (n === void 0 && r === void 0 && i === void 0) throw this.unexpected();
    return this.node(e, {
      kind: Qe,
      name: t,
      interfaces: n,
      directives: r,
      fields: i,
    });
  }
  parseInterfaceTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`interface`));
    let t = this.parseName(),
      n = this.parseImplementsInterfaces(),
      r = this.parseConstDirectives(),
      i = this.parseFieldsDefinition();
    if (n === void 0 && r === void 0 && i === void 0) throw this.unexpected();
    return this.node(e, {
      kind: $e,
      name: t,
      interfaces: n,
      directives: r,
      fields: i,
    });
  }
  parseUnionTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`union`));
    let t = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseUnionMemberTypes();
    if (n === void 0 && r === void 0) throw this.unexpected();
    return this.node(e, { kind: et, name: t, directives: n, types: r });
  }
  parseEnumTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`enum`));
    let t = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseEnumValuesDefinition();
    if (n === void 0 && r === void 0) throw this.unexpected();
    return this.node(e, { kind: tt, name: t, directives: n, values: r });
  }
  parseInputObjectTypeExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`), this.expectKeyword(`input`));
    let t = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseInputFieldsDefinition();
    if (n === void 0 && r === void 0) throw this.unexpected();
    return this.node(e, { kind: nt, name: t, directives: n, fields: r });
  }
  parseDirectiveExtension() {
    let e = this._lexer.token;
    (this.expectKeyword(`extend`),
      this.expectKeyword(`directive`),
      this.expectToken(Rt));
    let t = this.parseName(),
      n = this.parseConstDirectives();
    if (n === void 0) throw this.unexpected();
    return this.node(e, { kind: Xe, name: t, directives: n });
  }
  parseDirectiveDefinition() {
    let e = this._lexer.token,
      t = this.parseDescription();
    (this.expectKeyword(`directive`), this.expectToken(Rt));
    let n = this.parseName(),
      r = this.parseArgumentDefs(),
      i = this.parseConstDirectives(),
      a = this.expectOptionalKeyword(`repeatable`);
    this.expectKeyword(`on`);
    let o = this.parseDirectiveLocations();
    return this.node(e, {
      kind: Je,
      description: t,
      name: n,
      arguments: r,
      directives: i,
      repeatable: a,
      locations: o,
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(Vt, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    let e = this._lexer.token,
      t = this.parseName();
    if (Object.hasOwn(Tt, t.value)) return t;
    throw this.unexpected(e);
  }
  parseSchemaCoordinate() {
    let e = this._lexer.token,
      t = this.expectOptionalToken(Rt),
      n = this.parseName(),
      r,
      i;
    return (
      !t && this.expectOptionalToken(Ft) && (r = this.parseName()),
      (t || r) &&
        this.expectOptionalToken(S) &&
        ((i = this.parseName()), this.expectToken(C), this.expectToken(Pt)),
      t
        ? i
          ? this.node(e, { kind: st, name: n, argumentName: i })
          : this.node(e, { kind: ot, name: n })
        : r
          ? i
            ? this.node(e, { kind: at, name: n, fieldName: r, argumentName: i })
            : this.node(e, { kind: it, name: n, memberName: r })
          : this.node(e, { kind: rt, name: n })
    );
  }
  node(e, t) {
    return (
      !0 !== this._options.noLocation &&
        (t.loc = new re(e, this._lexer.lastToken, this._lexer.source)),
      t
    );
  }
  peek(e) {
    return this._lexer.token.kind === e;
  }
  expectToken(e) {
    let t = this._lexer.token;
    if (t.kind === e) return (this.advanceLexer(), t);
    throw x(this._lexer.source, t.start, `Expected ${vn(e)}, found ${_n(t)}.`);
  }
  expectOptionalToken(e) {
    return this._lexer.token.kind === e && (this.advanceLexer(), !0);
  }
  expectKeyword(e) {
    let t = this._lexer.token;
    if (t.kind !== E || t.value !== e)
      throw x(this._lexer.source, t.start, `Expected "${e}", found ${_n(t)}.`);
    this.advanceLexer();
  }
  expectOptionalKeyword(e) {
    let t = this._lexer.token;
    return t.kind === E && t.value === e && (this.advanceLexer(), !0);
  }
  unexpected(e) {
    let t = e ?? this._lexer.token;
    return x(this._lexer.source, t.start, `Unexpected ${_n(t)}.`);
  }
  any(e, t, n) {
    this.expectToken(e);
    let r = [];
    for (; !this.expectOptionalToken(n);) r.push(t.call(this));
    return r;
  }
  optionalMany(e, t, n) {
    if (this.expectOptionalToken(e)) {
      let e = [];
      do e.push(t.call(this));
      while (!this.expectOptionalToken(n));
      return e;
    }
  }
  many(e, t, n) {
    this.expectToken(e);
    let r = [];
    do r.push(t.call(this));
    while (!this.expectOptionalToken(n));
    return r;
  }
  delimitedMany(e, t) {
    this.expectOptionalToken(e);
    let n = [];
    do n.push(t.call(this));
    while (this.expectOptionalToken(e));
    return n;
  }
  advanceLexer() {
    let { maxTokens: e } = this._options,
      t = this._lexer.advance();
    if (
      t.kind !== At &&
      (++this._tokenCounter, e !== void 0 && this._tokenCounter > e)
    )
      throw x(
        this._lexer.source,
        t.start,
        `Document contains more than ${e} tokens. Parsing aborted.`
      );
  }
};
function _n(e) {
  let t = e.value;
  return vn(e.kind) + (t == null ? `` : ` "${t}"`);
}
function vn(e) {
  return (function (e) {
    return (
      e === jt ||
      e === Mt ||
      e === Nt ||
      e === S ||
      e === Pt ||
      e === Ft ||
      e === It ||
      e === C ||
      e === Lt ||
      e === Rt ||
      e === zt ||
      e === Bt ||
      e === w ||
      e === Vt ||
      e === T
    );
  })(e)
    ? `"${e}"`
    : e;
}
function O(e) {
  return typeof e == `function`;
}
function yn(e) {
  var t = e(function (e) {
    (Error.call(e), (e.stack = Error().stack));
  });
  return (
    (t.prototype = Object.create(Error.prototype)),
    (t.prototype.constructor = t),
    t
  );
}
var bn = yn(function (e) {
  return function (t) {
    (e(this),
      (this.message = t
        ? t.length +
          ` errors occurred during unsubscription:
` +
          t.map(function (e, t) {
            return t + 1 + `) ` + e.toString();
          }).join(`
  `)
        : ``),
      (this.name = `UnsubscriptionError`),
      (this.errors = t));
  };
});
function xn(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Sn = (function () {
    function e(e) {
      ((this.initialTeardown = e),
        (this.closed = !1),
        (this._parentage = null),
        (this._finalizers = null));
    }
    return (
      (e.prototype.unsubscribe = function () {
        var e, n, i, a, o;
        if (!this.closed) {
          this.closed = !0;
          var s = this._parentage;
          if (s)
            if (((this._parentage = null), Array.isArray(s)))
              try {
                for (var l = c(s), u = l.next(); !u.done; u = l.next())
                  u.value.remove(this);
              } catch (t) {
                e = { error: t };
              } finally {
                try {
                  u && !u.done && (n = l.return) && n.call(l);
                } finally {
                  if (e) throw e.error;
                }
              }
            else s.remove(this);
          var d = this.initialTeardown;
          if (O(d))
            try {
              d();
            } catch (e) {
              o = e instanceof bn ? e.errors : [e];
            }
          var f = this._finalizers;
          if (f) {
            this._finalizers = null;
            try {
              for (var p = c(f), m = p.next(); !m.done; m = p.next()) {
                var h = m.value;
                try {
                  Tn(h);
                } catch (e) {
                  ((o ??= []),
                    e instanceof bn
                      ? (o = r(r([], t(o)), t(e.errors)))
                      : o.push(e));
                }
              }
            } catch (e) {
              i = { error: e };
            } finally {
              try {
                m && !m.done && (a = p.return) && a.call(p);
              } finally {
                if (i) throw i.error;
              }
            }
          }
          if (o) throw new bn(o);
        }
      }),
      (e.prototype.add = function (t) {
        if (t && t !== this)
          if (this.closed) Tn(t);
          else {
            if (t instanceof e) {
              if (t.closed || t._hasParent(this)) return;
              t._addParent(this);
            }
            (this._finalizers = this._finalizers ?? []).push(t);
          }
      }),
      (e.prototype._hasParent = function (e) {
        var t = this._parentage;
        return t === e || (Array.isArray(t) && t.includes(e));
      }),
      (e.prototype._addParent = function (e) {
        var t = this._parentage;
        this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
      }),
      (e.prototype._removeParent = function (e) {
        var t = this._parentage;
        t === e ? (this._parentage = null) : Array.isArray(t) && xn(t, e);
      }),
      (e.prototype.remove = function (t) {
        var n = this._finalizers;
        (n && xn(n, t), t instanceof e && t._removeParent(this));
      }),
      (e.EMPTY = (function () {
        var t = new e();
        return ((t.closed = !0), t);
      })()),
      e
    );
  })(),
  Cn = Sn.EMPTY;
function wn(e) {
  return (
    e instanceof Sn ||
    (e && `closed` in e && O(e.remove) && O(e.add) && O(e.unsubscribe))
  );
}
function Tn(e) {
  O(e) ? e() : e.unsubscribe();
}
var En = null,
  Dn = void 0,
  On = {
    setTimeout: function (e, n) {
      var i = [...arguments].slice(2),
        a = On.delegate;
      return a?.setTimeout
        ? a.setTimeout.apply(a, r([e, n], t(i)))
        : setTimeout.apply(void 0, r([e, n], t(i)));
    },
    clearTimeout: function (e) {
      return (On.delegate?.clearTimeout || clearTimeout)(e);
    },
    delegate: void 0,
  };
function kn(e) {
  On.setTimeout(function () {
    throw e;
  });
}
function An() {}
var jn = Mn(`C`, void 0, void 0);
function Mn(e, t, n) {
  return { kind: e, value: t, error: n };
}
function Nn(e) {
  e();
}
var Pn = (function (e) {
  function t(t) {
    var n = e.call(this) || this;
    return (
      (n.isStopped = !1),
      t ? ((n.destination = t), wn(t) && t.add(n)) : (n.destination = zn),
      n
    );
  }
  return (
    a(t, e),
    (t.create = function (e, t, n) {
      return new In(e, t, n);
    }),
    (t.prototype.next = function (e) {
      this.isStopped
        ? Rn(
            (function (e) {
              return Mn(`N`, e, void 0);
            })(e),
            this
          )
        : this._next(e);
    }),
    (t.prototype.error = function (e) {
      this.isStopped
        ? Rn(Mn(`E`, void 0, e), this)
        : ((this.isStopped = !0), this._error(e));
    }),
    (t.prototype.complete = function () {
      this.isStopped ? Rn(jn, this) : ((this.isStopped = !0), this._complete());
    }),
    (t.prototype.unsubscribe = function () {
      this.closed ||
        ((this.isStopped = !0),
        e.prototype.unsubscribe.call(this),
        (this.destination = null));
    }),
    (t.prototype._next = function (e) {
      this.destination.next(e);
    }),
    (t.prototype._error = function (e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }),
    (t.prototype._complete = function () {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }),
    t
  );
})(Sn);
Function.prototype.bind;
var Fn = (function () {
    function e(e) {
      this.partialObserver = e;
    }
    return (
      (e.prototype.next = function (e) {
        var t = this.partialObserver;
        if (t.next)
          try {
            t.next(e);
          } catch (e) {
            Ln(e);
          }
      }),
      (e.prototype.error = function (e) {
        var t = this.partialObserver;
        if (t.error)
          try {
            t.error(e);
          } catch (e) {
            Ln(e);
          }
        else Ln(e);
      }),
      (e.prototype.complete = function () {
        var e = this.partialObserver;
        if (e.complete)
          try {
            e.complete();
          } catch (e) {
            Ln(e);
          }
      }),
      e
    );
  })(),
  In = (function (e) {
    function t(t, n, r) {
      var i,
        a = e.call(this) || this;
      return (
        (i =
          O(t) || !t
            ? { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 }
            : t),
        (a.destination = new Fn(i)),
        a
      );
    }
    return (a(t, e), t);
  })(Pn);
function Ln(e) {
  kn(e);
}
function Rn(e, t) {
  var n = En;
  n &&
    On.setTimeout(function () {
      return n(e, t);
    });
}
var zn = {
    closed: !0,
    next: An,
    error: function (e) {
      throw e;
    },
    complete: An,
  },
  Bn = (typeof Symbol == `function` && Symbol.observable) || `@@observable`;
function Vn(e) {
  return e;
}
var k = (function () {
  function e(e) {
    e && (this._subscribe = e);
  }
  return (
    (e.prototype.lift = function (t) {
      var n = new e();
      return ((n.source = this), (n.operator = t), n);
    }),
    (e.prototype.subscribe = function (e, t, n) {
      var r,
        i = this,
        a =
          ((r = e) && r instanceof Pn) ||
          ((function (e) {
            return e && O(e.next) && O(e.error) && O(e.complete);
          })(r) &&
            wn(r))
            ? e
            : new In(e, t, n);
      return (
        Nn(function () {
          var e = i,
            t = e.operator,
            n = e.source;
          a.add(t ? t.call(a, n) : n ? i._subscribe(a) : i._trySubscribe(a));
        }),
        a
      );
    }),
    (e.prototype._trySubscribe = function (e) {
      try {
        return this._subscribe(e);
      } catch (t) {
        e.error(t);
      }
    }),
    (e.prototype.forEach = function (e, t) {
      var n = this;
      return new (t = Hn(t))(function (t, r) {
        var i = new In({
          next: function (t) {
            try {
              e(t);
            } catch (e) {
              (r(e), i.unsubscribe());
            }
          },
          error: r,
          complete: t,
        });
        n.subscribe(i);
      });
    }),
    (e.prototype._subscribe = function (e) {
      return this.source?.subscribe(e);
    }),
    (e.prototype[Bn] = function () {
      return this;
    }),
    (e.prototype.pipe = function () {
      for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return (
        (e = t).length === 0
          ? Vn
          : e.length === 1
            ? e[0]
            : function (t) {
                return e.reduce(function (e, t) {
                  return t(e);
                }, t);
              }
      )(this);
    }),
    (e.prototype.toPromise = function (e) {
      var t = this;
      return new (e = Hn(e))(function (e, n) {
        var r;
        t.subscribe(
          function (e) {
            return (r = e);
          },
          function (e) {
            return n(e);
          },
          function () {
            return e(r);
          }
        );
      });
    }),
    (e.create = function (t) {
      return new e(t);
    }),
    e
  );
})();
function Hn(e) {
  return e ?? Dn ?? Promise;
}
function A(e) {
  return function (t) {
    if (
      (function (e) {
        return O(e?.lift);
      })(t)
    )
      return t.lift(function (t) {
        try {
          return e(t, this);
        } catch (e) {
          this.error(e);
        }
      });
    throw TypeError(`Unable to lift unknown Observable type`);
  };
}
function j(e, t, n, r, i) {
  return new Un(e, t, n, r, i);
}
var Un = (function (e) {
    function t(t, n, r, i, a, o) {
      var s = e.call(this, t) || this;
      return (
        (s.onFinalize = a),
        (s.shouldUnsubscribe = o),
        (s._next = n
          ? function (e) {
              try {
                n(e);
              } catch (e) {
                t.error(e);
              }
            }
          : e.prototype._next),
        (s._error = i
          ? function (e) {
              try {
                i(e);
              } catch (e) {
                t.error(e);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._error),
        (s._complete = r
          ? function () {
              try {
                r();
              } catch (e) {
                t.error(e);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._complete),
        s
      );
    }
    return (
      a(t, e),
      (t.prototype.unsubscribe = function () {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var n = this.closed;
          (e.prototype.unsubscribe.call(this),
            !n && ((t = this.onFinalize) == null || t.call(this)));
        }
      }),
      t
    );
  })(Pn),
  Wn = yn(function (e) {
    return function () {
      (e(this),
        (this.name = `ObjectUnsubscribedError`),
        (this.message = `object unsubscribed`));
    };
  }),
  Gn = (function (e) {
    function t() {
      var t = e.call(this) || this;
      return (
        (t.closed = !1),
        (t.currentObservers = null),
        (t.observers = []),
        (t.isStopped = !1),
        (t.hasError = !1),
        (t.thrownError = null),
        t
      );
    }
    return (
      a(t, e),
      (t.prototype.lift = function (e) {
        var t = new Kn(this, this);
        return ((t.operator = e), t);
      }),
      (t.prototype._throwIfClosed = function () {
        if (this.closed) throw new Wn();
      }),
      (t.prototype.next = function (e) {
        var t = this;
        Nn(function () {
          var n, r;
          if ((t._throwIfClosed(), !t.isStopped)) {
            t.currentObservers ||= Array.from(t.observers);
            try {
              for (
                var i = c(t.currentObservers), a = i.next();
                !a.done;
                a = i.next()
              )
                a.value.next(e);
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                a && !a.done && (r = i.return) && r.call(i);
              } finally {
                if (n) throw n.error;
              }
            }
          }
        });
      }),
      (t.prototype.error = function (e) {
        var t = this;
        Nn(function () {
          if ((t._throwIfClosed(), !t.isStopped)) {
            ((t.hasError = t.isStopped = !0), (t.thrownError = e));
            for (var n = t.observers; n.length;) n.shift().error(e);
          }
        });
      }),
      (t.prototype.complete = function () {
        var e = this;
        Nn(function () {
          if ((e._throwIfClosed(), !e.isStopped)) {
            e.isStopped = !0;
            for (var t = e.observers; t.length;) t.shift().complete();
          }
        });
      }),
      (t.prototype.unsubscribe = function () {
        ((this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null));
      }),
      Object.defineProperty(t.prototype, 'observed', {
        get: function () {
          return this.observers?.length > 0;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._trySubscribe = function (t) {
        return (this._throwIfClosed(), e.prototype._trySubscribe.call(this, t));
      }),
      (t.prototype._subscribe = function (e) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(e),
          this._innerSubscribe(e)
        );
      }),
      (t.prototype._innerSubscribe = function (e) {
        var t = this,
          n = this,
          r = n.hasError,
          i = n.isStopped,
          a = n.observers;
        return r || i
          ? Cn
          : ((this.currentObservers = null),
            a.push(e),
            new Sn(function () {
              ((t.currentObservers = null), xn(a, e));
            }));
      }),
      (t.prototype._checkFinalizedStatuses = function (e) {
        var t = this,
          n = t.hasError,
          r = t.thrownError,
          i = t.isStopped;
        n ? e.error(r) : i && e.complete();
      }),
      (t.prototype.asObservable = function () {
        var e = new k();
        return ((e.source = this), e);
      }),
      (t.create = function (e, t) {
        return new Kn(e, t);
      }),
      t
    );
  })(k),
  Kn = (function (e) {
    function t(t, n) {
      var r = e.call(this) || this;
      return ((r.destination = t), (r.source = n), r);
    }
    return (
      a(t, e),
      (t.prototype.next = function (e) {
        var t, n;
        (n = (t = this.destination)?.next) == null || n.call(t, e);
      }),
      (t.prototype.error = function (e) {
        var t, n;
        (n = (t = this.destination)?.error) == null || n.call(t, e);
      }),
      (t.prototype.complete = function () {
        var e, t;
        (t = (e = this.destination)?.complete) == null || t.call(e);
      }),
      (t.prototype._subscribe = function (e) {
        return this.source?.subscribe(e) ?? Cn;
      }),
      t
    );
  })(Gn),
  qn = (function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return ((n._value = t), n);
    }
    return (
      a(t, e),
      Object.defineProperty(t.prototype, 'value', {
        get: function () {
          return this.getValue();
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._subscribe = function (t) {
        var n = e.prototype._subscribe.call(this, t);
        return (!n.closed && t.next(this._value), n);
      }),
      (t.prototype.getValue = function () {
        var e = this,
          t = e.hasError,
          n = e.thrownError,
          r = e._value;
        if (t) throw n;
        return (this._throwIfClosed(), r);
      }),
      (t.prototype.next = function (t) {
        e.prototype.next.call(this, (this._value = t));
      }),
      t
    );
  })(Gn),
  Jn = {
    now: function () {
      return (Jn.delegate || Date).now();
    },
    delegate: void 0,
  },
  Yn = (function (e) {
    function t(t, n, r) {
      (t === void 0 && (t = 1 / 0),
        n === void 0 && (n = 1 / 0),
        r === void 0 && (r = Jn));
      var i = e.call(this) || this;
      return (
        (i._bufferSize = t),
        (i._windowTime = n),
        (i._timestampProvider = r),
        (i._buffer = []),
        (i._infiniteTimeWindow = !0),
        (i._infiniteTimeWindow = n === 1 / 0),
        (i._bufferSize = Math.max(1, t)),
        (i._windowTime = Math.max(1, n)),
        i
      );
    }
    return (
      a(t, e),
      (t.prototype.next = function (t) {
        var n = this,
          r = n.isStopped,
          i = n._buffer,
          a = n._infiniteTimeWindow,
          o = n._timestampProvider,
          s = n._windowTime;
        (r || (i.push(t), !a && i.push(o.now() + s)),
          this._trimBuffer(),
          e.prototype.next.call(this, t));
      }),
      (t.prototype._subscribe = function (e) {
        (this._throwIfClosed(), this._trimBuffer());
        for (
          var t = this._innerSubscribe(e),
            n = this._infiniteTimeWindow,
            r = this._buffer.slice(),
            i = 0;
          i < r.length && !e.closed;
          i += n ? 1 : 2
        )
          e.next(r[i]);
        return (this._checkFinalizedStatuses(e), t);
      }),
      (t.prototype._trimBuffer = function () {
        var e = this,
          t = e._bufferSize,
          n = e._timestampProvider,
          r = e._buffer,
          i = e._infiniteTimeWindow,
          a = (i ? 1 : 2) * t;
        if ((t < 1 / 0 && a < r.length && r.splice(0, r.length - a), !i)) {
          for (var o = n.now(), s = 0, c = 1; c < r.length && r[c] <= o; c += 2)
            s = c;
          s && r.splice(0, s + 1);
        }
      }),
      t
    );
  })(Gn),
  Xn = (function (e) {
    function t(t, n) {
      return e.call(this) || this;
    }
    return (
      a(t, e),
      (t.prototype.schedule = function (e, t) {
        return (t === void 0 && (t = 0), this);
      }),
      t
    );
  })(Sn),
  Zn = {
    setInterval: function (e, n) {
      var i = [...arguments].slice(2),
        a = Zn.delegate;
      return a?.setInterval
        ? a.setInterval.apply(a, r([e, n], t(i)))
        : setInterval.apply(void 0, r([e, n], t(i)));
    },
    clearInterval: function (e) {
      return (Zn.delegate?.clearInterval || clearInterval)(e);
    },
    delegate: void 0,
  },
  Qn = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return ((r.scheduler = t), (r.work = n), (r.pending = !1), r);
    }
    return (
      a(t, e),
      (t.prototype.schedule = function (e, t) {
        if ((t === void 0 && (t = 0), this.closed)) return this;
        this.state = e;
        var n = this.id,
          r = this.scheduler;
        return (
          n != null && (this.id = this.recycleAsyncId(r, n, t)),
          (this.pending = !0),
          (this.delay = t),
          (this.id = this.id ?? this.requestAsyncId(r, this.id, t)),
          this
        );
      }),
      (t.prototype.requestAsyncId = function (e, t, n) {
        return (
          n === void 0 && (n = 0),
          Zn.setInterval(e.flush.bind(e, this), n)
        );
      }),
      (t.prototype.recycleAsyncId = function (e, t, n) {
        if (
          (n === void 0 && (n = 0),
          n != null && this.delay === n && !1 === this.pending)
        )
          return t;
        t != null && Zn.clearInterval(t);
      }),
      (t.prototype.execute = function (e, t) {
        if (this.closed) return Error(`executing a cancelled action`);
        this.pending = !1;
        var n = this._execute(e, t);
        if (n) return n;
        !1 === this.pending &&
          this.id != null &&
          (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
      }),
      (t.prototype._execute = function (e, t) {
        var n,
          r = !1;
        try {
          this.work(e);
        } catch (e) {
          ((r = !0), (n = e || Error(`Scheduled action threw falsy error`)));
        }
        if (r) return (this.unsubscribe(), n);
      }),
      (t.prototype.unsubscribe = function () {
        if (!this.closed) {
          var t = this.id,
            n = this.scheduler,
            r = n.actions;
          ((this.work = this.state = this.scheduler = null),
            (this.pending = !1),
            xn(r, this),
            t != null && (this.id = this.recycleAsyncId(n, t, null)),
            (this.delay = null),
            e.prototype.unsubscribe.call(this));
        }
      }),
      t
    );
  })(Xn),
  $n = (function () {
    function e(t, n) {
      (n === void 0 && (n = e.now),
        (this.schedulerActionCtor = t),
        (this.now = n));
    }
    return (
      (e.prototype.schedule = function (e, t, n) {
        return (
          t === void 0 && (t = 0),
          new this.schedulerActionCtor(this, e).schedule(n, t)
        );
      }),
      (e.now = Jn.now),
      e
    );
  })(),
  er = new ((function (e) {
    function t(t, n) {
      n === void 0 && (n = $n.now);
      var r = e.call(this, t, n) || this;
      return ((r.actions = []), (r._active = !1), r);
    }
    return (
      a(t, e),
      (t.prototype.flush = function (e) {
        var t = this.actions;
        if (this._active) t.push(e);
        else {
          var n;
          this._active = !0;
          do if ((n = e.execute(e.state, e.delay))) break;
          while ((e = t.shift()));
          if (((this._active = !1), n)) {
            for (; (e = t.shift());) e.unsubscribe();
            throw n;
          }
        }
      }),
      t
    );
  })($n))(Qn),
  tr = new k(function (e) {
    return e.complete();
  });
function nr(e) {
  return e && O(e.schedule);
}
function rr(e) {
  return nr((t = e)[t.length - 1]) ? e.pop() : void 0;
  var t;
}
var ir = function (e) {
  return e && typeof e.length == `number` && typeof e != `function`;
};
function ar(e) {
  return O(e?.then);
}
function or(e) {
  return O(e[Bn]);
}
function sr(e) {
  return Symbol.asyncIterator && O(e?.[Symbol.asyncIterator]);
}
function cr(e) {
  return TypeError(
    `You provided ` +
      (typeof e == `object` && e ? `an invalid object` : `'` + e + `'`) +
      ` where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
var lr,
  ur =
    typeof Symbol == `function` && Symbol.iterator
      ? Symbol.iterator
      : `@@iterator`;
function dr(e) {
  return O(e?.[ur]);
}
function fr(e) {
  return i(this, arguments, function () {
    var t, r, i;
    return o(this, function (a) {
      switch (a.label) {
        case 0:
          ((t = e.getReader()), (a.label = 1));
        case 1:
          (a.trys.push([1, , 9, 10]), (a.label = 2));
        case 2:
          return [4, n(t.read())];
        case 3:
          return (
            (r = a.sent()),
            (i = r.value),
            r.done ? [4, n(void 0)] : [3, 5]
          );
        case 4:
          return [2, a.sent()];
        case 5:
          return [4, n(i)];
        case 6:
          return [4, a.sent()];
        case 7:
          return (a.sent(), [3, 2]);
        case 8:
          return [3, 10];
        case 9:
          return (t.releaseLock(), [7]);
        case 10:
          return [2];
      }
    });
  });
}
function pr(e) {
  return O(e?.getReader);
}
function M(e) {
  if (e instanceof k) return e;
  if (e != null) {
    if (or(e))
      return (
        (i = e),
        new k(function (e) {
          var t = i[Bn]();
          if (O(t.subscribe)) return t.subscribe(e);
          throw TypeError(
            `Provided object does not correctly implement Symbol.observable`
          );
        })
      );
    if (ir(e))
      return (
        (r = e),
        new k(function (e) {
          for (var t = 0; t < r.length && !e.closed; t++) e.next(r[t]);
          e.complete();
        })
      );
    if (ar(e))
      return (
        (n = e),
        new k(function (e) {
          n.then(
            function (t) {
              e.closed || (e.next(t), e.complete());
            },
            function (t) {
              return e.error(t);
            }
          ).then(null, kn);
        })
      );
    if (sr(e)) return mr(e);
    if (dr(e))
      return (
        (t = e),
        new k(function (e) {
          var n, r;
          try {
            for (var i = c(t), a = i.next(); !a.done; a = i.next()) {
              var o = a.value;
              if ((e.next(o), e.closed)) return;
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              a && !a.done && (r = i.return) && r.call(i);
            } finally {
              if (n) throw n.error;
            }
          }
          e.complete();
        })
      );
    if (pr(e)) return mr(fr(e));
  }
  var t, n, r, i;
  throw cr(e);
}
function mr(e) {
  return new k(function (t) {
    `{"CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES":"false","CLAUDE_CODE_ENABLE_ASK_USER_QUESTION_TOOL":"true","NoDefaultCurrentDirectoryInExePath":"1","CLAUDE_EFFORT":"high","CLAUDE_CODE_ENTRYPOINT":"claude-desktop","NODE":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","INIT_CWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","BAGGAGE":"sentry-environment=production,sentry-release=Claude%401.24012.9,sentry-public_key=2f98127cbffe4740b1f767a2de77d23b,sentry-trace_id=51973daa19724ccba60330ca0bf7921d,sentry-org_id=1158394","CLAUDE_CODE_HOST_SESSION_ID":"local_e1a40330-586a-4281-b8aa-627bc2de6b36","CLAUDE_PREVIEW_CLASSIFIER_FLOOR":"1","CLAUDE_CODE_OAUTH_SCOPES":"user:inference user:file_upload user:profile user:sessions:claude_code","SHELL":"/bin/zsh","CLAUDE_PID":"37512","CLAUDE_CODE_CHILD_SESSION":"1","CLAUDE_CODE_EAGER_FLUSH":"1","TMPDIR":"/var/folders/bv/jgsvc6pj4mdc4cqv5ptpqt840000gn/T/","npm_config_global_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","CLAUDE_AGENT_SDK_VERSION":"0.3.219","MallocNanoZone":"0","npm_package_config_commitizen_path":"./node_modules/cz-conventional-changelog","COLOR":"0","USE_LOCAL_OAUTH":"","npm_config_noproxy":"","CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH":"1","npm_config_local_prefix":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","GIT_EDITOR":"true","AI_AGENT":"claude-code_2-1-219_agent","USER":"kenilam","API_TIMEOUT_MS":"900000","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/kenilam/.nvm/versions/node/v24.3.0/etc/npmrc","SSH_AUTH_SOCK":"/var/run/com.apple.launchd.ScwlfYDNxN/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x0","npm_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/bin/npm-cli.js","CLAUDE_CODE_REPORT_FINDINGS":"1","PATH":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/node_modules/.bin:/Users/kenilam/Documents/ME/node_modules/.bin:/Users/kenilam/Documents/node_modules/.bin:/Users/kenilam/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/kenilam/.rvm/gems/ruby-2.7.5/bin:/Users/kenilam/.rvm/gems/ruby-2.7.5@global/bin:/Users/kenilam/.rvm/rubies/ruby-2.7.5/bin:/Users/kenilam/.local/bin:/opt/homebrew/opt/ruby/bin:/Users/kenilam/.jenv/shims:/Users/kenilam/.jenv/bin:/Users/kenilam/.nvm/versions/node/v24.3.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Library/Frameworks/Python.framework/Versions/3.11/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/usr/local/hatch/bin:/Users/kenilam/.rover/bin:/usr/local/bin:/Users/kenilam/.rvm/bin:/Users/kenilam/.nvm/versions/node/v13.0.1/bin:/Users/kenilam/.nvm/versions/node/v13.1.0/bin:/Users/kenilam/.nvm/versions/node/v13.11.0/bin:/Users/kenilam/.nvm/versions/node/v13.3.0/bin:/Users/kenilam/.nvm/versions/node/v14.4.0/bin:/Users/kenilam/.nvm/versions/node/v18.12.1/bin:/Users/kenilam/.nvm/versions/node/v18.20.4/bin:/Users/kenilam/.nvm/versions/node/v19.0.1/bin:/Users/kenilam/.nvm/versions/node/v19.7.0/bin:/Users/kenilam/.nvm/versions/node/v20.2.0/bin:/Users/kenilam/.nvm/versions/node/v21.1.0/bin:/Users/kenilam/.nvm/versions/node/v21.6.1/bin:/Users/kenilam/.nvm/versions/node/v21.7.2/bin:/Users/kenilam/.nvm/versions/node/v22.3.0/bin:/Users/kenilam/.nvm/versions/node/v23.11.0/bin:/Users/kenilam/Library/pnpm:/Users/kenilam/bin:/Users/kenilam/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/54685ef1-5047-412a-b499-8512bc62b076/93d15751-6902-4952-85b7-1a5eddffba2b/bin","MCP_CONNECTION_NONBLOCKING":"true","npm_package_json":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/package.json","npm_config_engine_strict":"true","_":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin/vite","npm_config_userconfig":"/Users/kenilam/.npmrc","npm_config_init_module":"/Users/kenilam/.npm-init.js","__CFBundleIdentifier":"com.anthropic.claudefordesktop","npm_command":"exec","PWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","npm_lifecycle_event":"npx","EDITOR":"vi","npm_package_name":"kicl","npm_config_npm_version":"11.4.2","NODE_USE_SYSTEM_CA":"1","XPC_FLAGS":"0x0","npm_package_engines_node":">=24","npm_config_node_gyp":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","npm_package_version":"0.0.1","XPC_SERVICE_NAME":"0","SHLVL":"2","HOME":"/Users/kenilam","CLAUDE_CODE_DISABLE_CRON":"","ANTHROPIC_BASE_URL":"https://api.anthropic.com","CLAUDE_CODE_EXECPATH":"/Users/kenilam/Library/Application Support/Claude/claude-code/2.1.219/claude.app/Contents/MacOS/claude","npm_config_save_exact":"true","DISABLE_MICROCOMPACT":"1","npm_config_cache":"/Users/kenilam/.npm","LOGNAME":"kenilam","npm_lifecycle_script":"\\"vite\\"","COREPACK_ENABLE_AUTO_PIN":"0","npm_config_user_agent":"npm/11.4.2 node/v24.3.0 darwin arm64 workspaces/false","CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH":"1","CLAUDE_CODE_SESSION_ID":"405e48d7-2034-43c5-8bfa-b985231aa988","DISABLE_AUTOUPDATER":"1","OSLogRateLimit":"64","CLAUDECODE":"1","npm_node_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","npm_config_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","USE_STAGING_OAUTH":"","NODE_ENV":"production","PORT":"3001"}`(
      e,
      t
    ).catch(function (e) {
      return t.error(e);
    });
  });
}
function N(e, t, n, r, i) {
  (r === void 0 && (r = 0), i === void 0 && (i = !1));
  var a = t.schedule(function () {
    (n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe());
  }, r);
  if ((e.add(a), !i)) return a;
}
function hr(e, t) {
  return (
    t === void 0 && (t = 0),
    A(function (n, r) {
      n.subscribe(
        j(
          r,
          function (n) {
            return N(
              r,
              e,
              function () {
                return r.next(n);
              },
              t
            );
          },
          function () {
            return N(
              r,
              e,
              function () {
                return r.complete();
              },
              t
            );
          },
          function (n) {
            return N(
              r,
              e,
              function () {
                return r.error(n);
              },
              t
            );
          }
        )
      );
    })
  );
}
function gr(e, t) {
  return (
    t === void 0 && (t = 0),
    A(function (n, r) {
      r.add(
        e.schedule(function () {
          return n.subscribe(r);
        }, t)
      );
    })
  );
}
function _r(e, t) {
  if (!e) throw Error(`Iterable cannot be null`);
  return new k(function (n) {
    N(n, t, function () {
      var r = e[Symbol.asyncIterator]();
      N(
        n,
        t,
        function () {
          r.next().then(function (e) {
            e.done ? n.complete() : n.next(e.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function vr(e, t) {
  if (e != null) {
    if (or(e))
      return (function (e, t) {
        return M(e).pipe(gr(t), hr(t));
      })(e, t);
    if (ir(e))
      return (function (e, t) {
        return new k(function (n) {
          var r = 0;
          return t.schedule(function () {
            r === e.length
              ? n.complete()
              : (n.next(e[r++]), n.closed || this.schedule());
          });
        });
      })(e, t);
    if (ar(e))
      return (function (e, t) {
        return M(e).pipe(gr(t), hr(t));
      })(e, t);
    if (sr(e)) return _r(e, t);
    if (dr(e))
      return (function (e, t) {
        return new k(function (n) {
          var r;
          return (
            N(n, t, function () {
              ((r = e[ur]()),
                N(
                  n,
                  t,
                  function () {
                    var e, t, i;
                    try {
                      ((t = (e = r.next()).value), (i = e.done));
                    } catch (e) {
                      n.error(e);
                      return;
                    }
                    i ? n.complete() : n.next(t);
                  },
                  0,
                  !0
                ));
            }),
            function () {
              return O(r?.return) && r.return();
            }
          );
        });
      })(e, t);
    if (pr(e))
      return (function (e, t) {
        return _r(fr(e), t);
      })(e, t);
  }
  throw cr(e);
}
function yr(e, t) {
  return t ? vr(e, t) : M(e);
}
function br() {
  var e = [...arguments];
  return yr(e, rr(e));
}
function xr(e, t) {
  var n = O(e)
      ? e
      : function () {
          return e;
        },
    r = function (e) {
      return e.error(n());
    };
  return new k(
    t
      ? function (e) {
          return t.schedule(r, 0, e);
        }
      : r
  );
}
(function (e) {
  ((e.NEXT = `N`), (e.ERROR = `E`), (e.COMPLETE = `C`));
})((lr ||= {}));
var Sr = (function () {
    function e(e, t, n) {
      ((this.kind = e),
        (this.value = t),
        (this.error = n),
        (this.hasValue = e === `N`));
    }
    return (
      (e.prototype.observe = function (e) {
        return (function (e, t) {
          var n,
            r,
            i,
            a = e,
            o = a.kind,
            s = a.value,
            c = a.error;
          if (typeof o != `string`)
            throw TypeError(`Invalid notification, missing "kind"`);
          o === `N`
            ? (n = t.next) == null || n.call(t, s)
            : o === `E`
              ? (r = t.error) == null || r.call(t, c)
              : (i = t.complete) == null || i.call(t);
        })(this, e);
      }),
      (e.prototype.do = function (e, t, n) {
        var r = this,
          i = r.kind,
          a = r.value,
          o = r.error;
        return i === `N` ? e?.(a) : i === `E` ? t?.(o) : n?.();
      }),
      (e.prototype.accept = function (e, t, n) {
        return O(e?.next) ? this.observe(e) : this.do(e, t, n);
      }),
      (e.prototype.toObservable = function () {
        var e = this,
          t = e.kind,
          n = e.value,
          r = e.error,
          i =
            t === `N`
              ? br(n)
              : t === `E`
                ? xr(function () {
                    return r;
                  })
                : t === `C`
                  ? tr
                  : 0;
        if (!i) throw TypeError(`Unexpected notification kind ` + t);
        return i;
      }),
      (e.createNext = function (t) {
        return new e(`N`, t);
      }),
      (e.createError = function (t) {
        return new e(`E`, void 0, t);
      }),
      (e.createComplete = function () {
        return e.completeNotification;
      }),
      (e.completeNotification = new e(`C`)),
      e
    );
  })(),
  Cr = yn(function (e) {
    return function () {
      (e(this),
        (this.name = `EmptyError`),
        (this.message = `no elements in sequence`));
    };
  });
function P(e, t) {
  return A(function (n, r) {
    var i = 0;
    n.subscribe(
      j(r, function (n) {
        r.next(e.call(t, n, i++));
      })
    );
  });
}
var wr = Array.isArray;
function Tr(e) {
  return P(function (n) {
    return (function (e, n) {
      return wr(n) ? e.apply(void 0, r([], t(n))) : e(n);
    })(e, n);
  });
}
function Er(e, t, n) {
  return (
    n === void 0 && (n = 1 / 0),
    O(t)
      ? Er(function (n, r) {
          return P(function (e, i) {
            return t(n, e, r, i);
          })(M(e(n, r)));
        }, n)
      : (typeof t == `number` && (n = t),
        A(function (t, r) {
          return (function (e, t, n, r, i, a, o, s) {
            var c = [],
              l = 0,
              u = 0,
              d = !1,
              f = function () {
                !d || c.length || l || t.complete();
              },
              p = function (e) {
                return l < r ? m(e) : c.push(e);
              },
              m = function (e) {
                (a && t.next(e), l++);
                var s = !1;
                M(n(e, u++)).subscribe(
                  j(
                    t,
                    function (e) {
                      (i?.(e), a ? p(e) : t.next(e));
                    },
                    function () {
                      s = !0;
                    },
                    void 0,
                    function () {
                      if (s)
                        try {
                          l--;
                          for (
                            var e = function () {
                              var e = c.shift();
                              o
                                ? N(t, o, function () {
                                    return m(e);
                                  })
                                : m(e);
                            };
                            c.length && l < r;
                          )
                            e();
                          f();
                        } catch (e) {
                          t.error(e);
                        }
                    }
                  )
                );
              };
            return (
              e.subscribe(
                j(t, p, function () {
                  ((d = !0), f());
                })
              ),
              function () {
                s?.();
              }
            );
          })(t, r, e, n);
        }))
  );
}
function Dr() {
  return ((e = 1) === void 0 && (e = 1 / 0), Er(Vn, e));
  var e;
}
function Or() {
  var e = [...arguments];
  return Dr()(yr(e, rr(e)));
}
var kr = [`addListener`, `removeListener`],
  Ar = [`addEventListener`, `removeEventListener`],
  jr = [`on`, `off`];
function Mr(e, n, r, i) {
  if ((O(r) && ((i = r), (r = void 0)), i)) return Mr(e, n, r).pipe(Tr(i));
  var a = t(
      (function (e) {
        return O(e.addEventListener) && O(e.removeEventListener);
      })(e)
        ? Ar.map(function (t) {
            return function (i) {
              return e[t](n, i, r);
            };
          })
        : (function (e) {
              return O(e.addListener) && O(e.removeListener);
            })(e)
          ? kr.map(Nr(e, n))
          : (function (e) {
                return O(e.on) && O(e.off);
              })(e)
            ? jr.map(Nr(e, n))
            : [],
      2
    ),
    o = a[0],
    s = a[1];
  if (!o && ir(e))
    return Er(function (e) {
      return Mr(e, n, r);
    })(M(e));
  if (!o) throw TypeError(`Invalid event target`);
  return new k(function (e) {
    var t = function () {
      var t = [...arguments];
      return e.next(1 < t.length ? t : t[0]);
    };
    return (
      o(t),
      function () {
        return s(t);
      }
    );
  });
}
function Nr(e, t) {
  return function (n) {
    return function (r) {
      return e[n](t, r);
    };
  };
}
function Pr(e, t, n) {
  (e === void 0 && (e = 0), n === void 0 && (n = er));
  var r = -1;
  return (
    t != null && (nr(t) ? (n = t) : (r = t)),
    new k(function (t) {
      var i,
        a = (i = e) instanceof Date && !isNaN(i) ? +e - n.now() : e;
      a < 0 && (a = 0);
      var o = 0;
      return n.schedule(function () {
        t.closed ||
          (t.next(o++), 0 <= r ? this.schedule(void 0, r) : t.complete());
      }, a);
    })
  );
}
function Fr(e, t) {
  return A(function (n, r) {
    var i = 0;
    n.subscribe(
      j(r, function (n) {
        return e.call(t, n, i++) && r.next(n);
      })
    );
  });
}
function Ir(e) {
  return A(function (t, n) {
    var r,
      i = null,
      a = !1;
    ((i = t.subscribe(
      j(n, void 0, void 0, function (o) {
        ((r = M(e(o, Ir(e)(t)))),
          i ? (i.unsubscribe(), (i = null), r.subscribe(n)) : (a = !0));
      })
    )),
      a && (i.unsubscribe(), (i = null), r.subscribe(n)));
  });
}
function Lr(e, t) {
  return e === t;
}
function Rr(e) {
  e === void 0 && (e = {});
  var t = e.connector,
    n =
      t === void 0
        ? function () {
            return new Gn();
          }
        : t,
    r = e.resetOnError,
    i = r === void 0 || r,
    a = e.resetOnComplete,
    o = a === void 0 || a,
    s = e.resetOnRefCountZero,
    c = s === void 0 || s;
  return function (e) {
    var t,
      r,
      a,
      s = 0,
      l = !1,
      u = !1,
      d = function () {
        (r?.unsubscribe(), (r = void 0));
      },
      f = function () {
        (d(), (t = a = void 0), (l = u = !1));
      },
      p = function () {
        var e = t;
        (f(), e?.unsubscribe());
      };
    return A(function (e, m) {
      (s++, u || l || d());
      var h = (a ??= n());
      (m.add(function () {
        --s !== 0 || u || l || (r = zr(p, c));
      }),
        h.subscribe(m),
        !t &&
          s > 0 &&
          ((t = new In({
            next: function (e) {
              return h.next(e);
            },
            error: function (e) {
              ((u = !0), d(), (r = zr(f, i, e)), h.error(e));
            },
            complete: function () {
              ((l = !0), d(), (r = zr(f, o)), h.complete());
            },
          })),
          M(e).subscribe(t)));
    })(e);
  };
}
function zr(e, n) {
  var i = [...arguments].slice(2);
  if (!0 !== n) {
    if (!1 !== n) {
      var a = new In({
        next: function () {
          (a.unsubscribe(), e());
        },
      });
      return M(n.apply(void 0, r([], t(i)))).subscribe(a);
    }
  } else e();
}
function Br(e, t, n) {
  var r,
    i,
    a,
    o,
    s = !1;
  return (
    e && typeof e == `object`
      ? ((r = e.bufferSize),
        (o = r === void 0 ? 1 / 0 : r),
        (i = e.windowTime),
        (t = i === void 0 ? 1 / 0 : i),
        (s = (a = e.refCount) !== void 0 && a),
        (n = e.scheduler))
      : (o = e ?? 1 / 0),
    Rr({
      connector: function () {
        return new Yn(o, t, n);
      },
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: s,
    })
  );
}
function Vr(e, t, n) {
  var r = O(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? A(function (e, t) {
        var n;
        (n = r.subscribe) == null || n.call(r);
        var i = !0;
        e.subscribe(
          j(
            t,
            function (e) {
              var n;
              ((n = r.next) == null || n.call(r, e), t.next(e));
            },
            function () {
              var e;
              ((i = !1), (e = r.complete) == null || e.call(r), t.complete());
            },
            function (e) {
              var n;
              ((i = !1), (n = r.error) == null || n.call(r, e), t.error(e));
            },
            function () {
              var e, t;
              (i && ((e = r.unsubscribe) == null || e.call(r)),
                (t = r.finalize) == null || t.call(r));
            }
          )
        );
      })
    : Vn;
}
function F(e) {
  try {
    return e();
  } catch {}
}
var Hr =
    F(() => globalThis) ||
    F(() => window) ||
    F(() => self) ||
    F(() => global) ||
    F(function () {
      return F.constructor(`return this`)();
    }),
  Ur = `4.2.8`,
  Wr = `esm`,
  Gr = new Map();
function Kr(e) {
  let t = Gr.get(e) || 1;
  return (Gr.set(e, t + 1), `${e}:${t}:${Math.random().toString(36).slice(2)}`);
}
function qr(e, t = 0) {
  let n = Kr(`stringifyForDisplay`);
  return JSON.stringify(e, (e, t) => (t === void 0 ? n : t), t)
    .split(JSON.stringify(n))
    .join(`<undefined>`);
}
var Jr = `Invariant Violation`,
  Yr = class e extends Error {
    constructor(t = Jr) {
      (super(t), (this.name = Jr), Object.setPrototypeOf(this, e.prototype));
    }
  },
  Xr = [`debug`, `log`, `warn`, `error`, `silent`],
  Zr = Xr.indexOf(`silent`);
function I(e, ...t) {
  if (!e) throw L(...t);
}
function Qr(e) {
  return function (t, ...n) {
    if (Xr.indexOf(e) >= Zr) {
      let r = console[e] || console.log;
      if (typeof t == `number`) {
        let e = t;
        (t = ni(e)) || ((t = ri(e, n)), (n = []));
      }
      r(t, ...n);
    }
  };
}
function $r(e) {
  let t = Xr[Zr];
  return ((Zr = Math.max(0, Xr.indexOf(e))), t);
}
function L(e, ...t) {
  return new Yr(ni(e, t) || ri(e, t));
}
((I.debug = Qr(`debug`)),
  (I.log = Qr(`log`)),
  (I.warn = Qr(`warn`)),
  (I.error = Qr(`error`)));
var ei = Symbol.for(`ApolloErrorMessageHandler_` + Ur);
function ti(e) {
  if (typeof e == `string`) return e;
  try {
    return qr(e, 2).slice(0, 1e3);
  } catch {
    return `<non-serializable>`;
  }
}
function ni(e, t = []) {
  if (e) return Hr[ei] && Hr[ei](e, t.map(ti));
}
function ri(e, t = []) {
  if (e)
    return typeof e == `string`
      ? t.reduce((e, t) => e.replace(/%[sdfo]/, ti(t)), e)
      : `An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#${encodeURIComponent(JSON.stringify({ version: Ur, message: e, args: t.map(ti) }))}`;
}
function ii(e, t, n, r) {
  if (n.kind === `IntValue` || n.kind === `FloatValue`)
    e[t.value] = Number(n.value);
  else if (n.kind === `BooleanValue` || n.kind === `StringValue`)
    e[t.value] = n.value;
  else if (n.kind === `ObjectValue`) {
    let i = {};
    (n.fields.map((e) => ii(i, e.name, e.value, r)), (e[t.value] = i));
  } else if (n.kind === `Variable`) {
    let i = (r || {})[n.name.value];
    e[t.value] = i;
  } else if (n.kind === `ListValue`)
    e[t.value] = n.values.map((e) => {
      let n = {};
      return (ii(n, t, e, r), n[t.value]);
    });
  else if (n.kind === `EnumValue`) e[t.value] = n.value;
  else {
    if (n.kind !== `NullValue`) throw L(19, t.value, n.kind);
    e[t.value] = null;
  }
}
function ai(e, t) {
  if (e.arguments && e.arguments.length) {
    let n = {};
    return (e.arguments.forEach(({ name: e, value: r }) => ii(n, e, r, t)), n);
  }
  return null;
}
var oi = typeof F(() => window.document.createElement) == `function`,
  R = { ...Hr[Symbol.for(`apollo.cacheSize`)] };
function si(e, t) {
  return (
    e.definitions.find((e) => e.kind === `OperationDefinition` && !!e.name)
      ?.name.value ?? t
  );
}
var ci = () => Object.create(null),
  { forEach: li, slice: ui } = Array.prototype,
  { hasOwnProperty: di } = Object.prototype,
  z = class e {
    constructor(e = !0, t = ci) {
      ((this.weakness = e), (this.makeData = t));
    }
    lookup() {
      return this.lookupArray(arguments);
    }
    lookupArray(e) {
      let t = this;
      return (
        li.call(e, (e) => (t = t.getChildTrie(e))),
        di.call(t, `data`) ? t.data : (t.data = this.makeData(ui.call(e)))
      );
    }
    peek() {
      return this.peekArray(arguments);
    }
    peekArray(e) {
      let t = this;
      for (let n = 0, r = e.length; t && n < r; ++n) {
        let r = t.mapFor(e[n], !1);
        t = r && r.get(e[n]);
      }
      return t && t.data;
    }
    remove() {
      return this.removeArray(arguments);
    }
    removeArray(e) {
      let t;
      if (e.length) {
        let n = e[0],
          r = this.mapFor(n, !1),
          i = r && r.get(n);
        i &&
          ((t = i.removeArray(ui.call(e, 1))),
          i.data || i.weak || (i.strong && i.strong.size) || r.delete(n));
      } else ((t = this.data), delete this.data);
      return t;
    }
    getChildTrie(t) {
      let n = this.mapFor(t, !0),
        r = n.get(t);
      return (r || n.set(t, (r = new e(this.weakness, this.makeData))), r);
    }
    mapFor(e, t) {
      return this.weakness &&
        (function (e) {
          switch (typeof e) {
            case `object`:
              if (e === null) break;
            case `function`:
              return !0;
          }
          return !1;
        })(e)
        ? this.weak || (t ? (this.weak = new WeakMap()) : void 0)
        : this.strong || (t ? (this.strong = new Map()) : void 0);
    }
  };
function fi() {}
var pi = class {
  constructor(e = 1 / 0, t = fi) {
    ((this.max = e),
      (this.dispose = t),
      (this.map = new Map()),
      (this.newest = null),
      (this.oldest = null));
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    let t = this.getNode(e);
    return t && t.value;
  }
  get size() {
    return this.map.size;
  }
  getNode(e) {
    let t = this.map.get(e);
    if (t && t !== this.newest) {
      let { older: e, newer: n } = t;
      (n && (n.older = e),
        e && (e.newer = n),
        (t.older = this.newest),
        (t.older.newer = t),
        (t.newer = null),
        (this.newest = t),
        t === this.oldest && (this.oldest = n));
    }
    return t;
  }
  set(e, t) {
    let n = this.getNode(e);
    return n
      ? (n.value = t)
      : ((n = { key: e, value: t, newer: null, older: this.newest }),
        this.newest && (this.newest.newer = n),
        (this.newest = n),
        (this.oldest = this.oldest || n),
        this.map.set(e, n),
        n.value);
  }
  clean() {
    for (; this.oldest && this.map.size > this.max;)
      this.delete(this.oldest.key);
  }
  delete(e) {
    let t = this.map.get(e);
    return (
      !!t &&
      (t === this.newest && (this.newest = t.older),
      t === this.oldest && (this.oldest = t.newer),
      t.newer && (t.newer.older = t.older),
      t.older && (t.older.newer = t.newer),
      this.map.delete(e),
      this.dispose(t.value, e),
      !0)
    );
  }
};
function mi() {}
var hi = mi,
  gi =
    typeof WeakRef < `u`
      ? WeakRef
      : function (e) {
          return { deref: () => e };
        },
  _i = typeof WeakMap < `u` ? WeakMap : Map,
  vi =
    typeof FinalizationRegistry < `u`
      ? FinalizationRegistry
      : function () {
          return { register: mi, unregister: mi };
        },
  yi = class {
    constructor(e = 1 / 0, t = hi) {
      ((this.max = e),
        (this.dispose = t),
        (this.map = new _i()),
        (this.newest = null),
        (this.oldest = null),
        (this.unfinalizedNodes = new Set()),
        (this.finalizationScheduled = !1),
        (this.size = 0),
        (this.finalize = () => {
          let e = this.unfinalizedNodes.values();
          for (let t = 0; t < 10024; t++) {
            let t = e.next().value;
            if (!t) break;
            this.unfinalizedNodes.delete(t);
            let n = t.key;
            (delete t.key,
              (t.keyRef = new gi(n)),
              this.registry.register(n, t, t));
          }
          this.unfinalizedNodes.size > 0
            ? queueMicrotask(this.finalize)
            : (this.finalizationScheduled = !1);
        }),
        (this.registry = new vi(this.deleteNode.bind(this))));
    }
    has(e) {
      return this.map.has(e);
    }
    get(e) {
      let t = this.getNode(e);
      return t && t.value;
    }
    getNode(e) {
      let t = this.map.get(e);
      if (t && t !== this.newest) {
        let { older: e, newer: n } = t;
        (n && (n.older = e),
          e && (e.newer = n),
          (t.older = this.newest),
          (t.older.newer = t),
          (t.newer = null),
          (this.newest = t),
          t === this.oldest && (this.oldest = n));
      }
      return t;
    }
    set(e, t) {
      let n = this.getNode(e);
      return n
        ? (n.value = t)
        : ((n = { key: e, value: t, newer: null, older: this.newest }),
          this.newest && (this.newest.newer = n),
          (this.newest = n),
          (this.oldest = this.oldest || n),
          this.scheduleFinalization(n),
          this.map.set(e, n),
          this.size++,
          n.value);
    }
    clean() {
      for (; this.oldest && this.size > this.max;) this.deleteNode(this.oldest);
    }
    deleteNode(e) {
      (e === this.newest && (this.newest = e.older),
        e === this.oldest && (this.oldest = e.newer),
        e.newer && (e.newer.older = e.older),
        e.older && (e.older.newer = e.newer),
        this.size--);
      let t = e.key || (e.keyRef && e.keyRef.deref());
      (this.dispose(e.value, t),
        e.keyRef
          ? this.registry.unregister(e)
          : this.unfinalizedNodes.delete(e),
        t && this.map.delete(t));
    }
    delete(e) {
      let t = this.map.get(e);
      return !!t && (this.deleteNode(t), !0);
    }
    scheduleFinalization(e) {
      (this.unfinalizedNodes.add(e),
        this.finalizationScheduled ||
          ((this.finalizationScheduled = !0), queueMicrotask(this.finalize)));
    }
  },
  bi = new WeakSet();
function xi(e) {
  e.size <= (e.max || -1) ||
    bi.has(e) ||
    (bi.add(e),
    setTimeout(() => {
      (e.clean(), bi.delete(e));
    }, 100));
}
var Si = function (e, t) {
    let n = new yi(e, t);
    return (
      (n.set = function (e, t) {
        let n = yi.prototype.set.call(this, e, t);
        return (xi(this), n);
      }),
      n
    );
  },
  Ci = function (e, t) {
    let n = new pi(e, t);
    return (
      (n.set = function (e, t) {
        let n = pi.prototype.set.call(this, e, t);
        return (xi(this), n);
      }),
      n
    );
  };
function wi(e, { max: t, makeCacheKey: n = (e) => e }) {
  let r = new z(!0),
    i = new Si(t);
  return (...t) => {
    let a = r.lookupArray(n(t)),
      o = i.get(a);
    if (o) {
      if (o.error) throw o.error;
      return o.result;
    }
    let s = i.set(a, {});
    try {
      return (s.result = e(...t));
    } catch (e) {
      throw ((s.error = e), e);
    }
  };
}
var B = wi(
    (e, t) => {
      I(e && e.kind === `Document`, 1);
      let n = e.definitions.filter((e) => e.kind === `OperationDefinition`);
      (t && I(n.length == 1 && n[0].operation === t, 4, t, t, n[0].operation),
        _(e, {
          Field(t, r, i, a) {
            if (
              t.alias &&
              (t.alias.value === `__typename` ||
                t.alias.value.startsWith(`__ac_`)) &&
              t.alias.value !== t.name.value
            ) {
              let r = e,
                i = [];
              for (let e of a)
                ((r = r[e]),
                  r.kind === `Field` && i.push(r.alias?.value || r.name.value));
              throw (
                i.splice(-1, 1, t.name.value),
                L(
                  5,
                  t.alias.value,
                  i.join(`.`),
                  n[0].operation,
                  si(e, `(anonymous)`)
                )
              );
            }
          },
        }));
    },
    { max: R.checkDocument || 2e3 }
  ),
  { toString: Ti } = Object.prototype;
function V(...e) {
  let t = {};
  return (
    e.forEach((e) => {
      e &&
        Reflect.ownKeys(e).forEach((n) => {
          let r = e[n];
          r !== void 0 && (t[n] = r);
        });
    }),
    t
  );
}
function Ei(e = []) {
  let t = {};
  return (
    e.forEach((e) => {
      t[e.name.value] = e;
    }),
    t
  );
}
function H(e) {
  return typeof e == `object` && !!e;
}
var { hasOwnProperty: Di } = Object.prototype,
  Oi = function (e, t, n) {
    return this.merge(e[n], t[n]);
  },
  ki = (e) => (isNaN(+e) ? {} : []),
  Ai = class {
    options;
    reconciler;
    constructor(e = {}) {
      ((this.options = e), (this.reconciler = e.reconciler || Oi));
    }
    merge(e, t, n = {}) {
      let r = n.atPath;
      if (r?.length) {
        let [i, ...a] = r;
        e === void 0 && (e = ki(i));
        let o = e[i];
        o === void 0 && a.length && (o = ki(a[0]));
        let s = this.merge(o, t, { ...n, atPath: a });
        return (o !== s && ((e = this.shallowCopyForMerge(e))[i] = s), e);
      }
      return (
        Array.isArray(e) &&
          Array.isArray(t) &&
          this.options.arrayMerge === `truncate` &&
          e.length > t.length &&
          ((e = e.slice(0, t.length)), this.pastCopies.add(e)),
        H(t) && H(e)
          ? (Object.keys(t).forEach((n) => {
              if (Di.call(e, n)) {
                let r = e[n];
                if (t[n] !== r) {
                  let i = this.reconciler(e, t, n);
                  i !== r && ((e = this.shallowCopyForMerge(e))[n] = i);
                }
              } else (e = this.shallowCopyForMerge(e))[n] = t[n];
            }),
            e)
          : t
      );
    }
    isObject = H;
    pastCopies = new Set();
    shallowCopyForMerge(e) {
      return (
        H(e) &&
          (this.pastCopies.has(e) ||
            ((e = Array.isArray(e)
              ? e.slice(0)
              : { __proto__: Object.getPrototypeOf(e), ...e }),
            this.pastCopies.add(e))),
        e
      );
    }
  };
function ji(e) {
  let t = {},
    n = e && e.variableDefinitions;
  return (
    n &&
      n.length &&
      n.forEach((e) => {
        e.defaultValue && ii(t, e.variable.name, e.defaultValue);
      }),
    t
  );
}
function Mi(e, t) {
  switch (e.kind) {
    case `InlineFragment`:
      return e;
    case `FragmentSpread`: {
      let n = e.name.value;
      if (typeof t == `function`) return t(n);
      let r = t && t[n];
      return (I(r, 9, n), r || null);
    }
    default:
      return null;
  }
}
function Ni(e, t) {
  let n = t,
    r = [];
  return (
    e.definitions.forEach((e) => {
      if (e.kind === `OperationDefinition`)
        throw L(10, e.operation, e.name ? ` named '${e.name.value}'` : ``);
      e.kind === `FragmentDefinition` && r.push(e);
    }),
    n === void 0 && (I(r.length === 1, 11, r.length), (n = r[0].name.value)),
    {
      ...e,
      definitions: [
        {
          kind: `OperationDefinition`,
          operation: `query`,
          selectionSet: {
            kind: `SelectionSet`,
            selections: [
              { kind: `FragmentSpread`, name: { kind: `Name`, value: n } },
            ],
          },
        },
        ...e.definitions,
      ],
    }
  );
}
function Pi(e) {
  (I(e.kind === `Document`, 6), I(e.definitions.length <= 1, 7));
  let t = e.definitions[0];
  return (I(t.kind === `FragmentDefinition`, 8), t);
}
function Fi(e) {
  return e.definitions.filter((e) => e.kind === `FragmentDefinition`);
}
function Ii(e) {
  let t;
  B(e);
  for (let n of e.definitions) {
    if (n.kind === `OperationDefinition`) return n;
    n.kind !== `FragmentDefinition` || t || (t = n);
  }
  if (t) return t;
  throw L(12);
}
function U(e) {
  return (
    B(e),
    e.definitions.filter((e) => e.kind === `OperationDefinition`)[0]
  );
}
function Li(e) {
  let t = U(e);
  return (I(t && t.operation === `query`, 13), t);
}
var Ri,
  W = Object.assign(
    function (e) {
      return JSON.stringify(e, zi);
    },
    {
      reset() {
        Ri = new Ci(R.canonicalStringify || 1e3);
      },
    }
  );
function zi(e, t) {
  if (t && typeof t == `object`) {
    let e = Object.getPrototypeOf(t);
    if (e === Object.prototype || e === null) {
      let n = Object.keys(t);
      if (n.every(Bi)) return t;
      let r = JSON.stringify(n),
        i = Ri.get(r);
      if (!i) {
        n.sort();
        let e = JSON.stringify(n);
        ((i = Ri.get(e) || n), Ri.set(r, i), Ri.set(e, i));
      }
      let a = Object.create(e);
      return (
        i.forEach((e) => {
          a[e] = t[e];
        }),
        a
      );
    }
  }
  return t;
}
function Bi(e, t, n) {
  return t === 0 || n[t - 1] <= e;
}
W.reset();
var Vi = [
    `connection`,
    `include`,
    `skip`,
    `client`,
    `rest`,
    `export`,
    `nonreactive`,
    `stream`,
  ],
  Hi = W,
  Ui = Object.assign(
    function (e, t, n) {
      if (t && n && n.connection && n.connection.key) {
        if (n.connection.filter && n.connection.filter.length > 0) {
          let e = n.connection.filter ? n.connection.filter : [];
          e.sort();
          let r = {};
          e.forEach((e) => {
            r[e] = t[e];
          });
          let i = Hi(r);
          if (i !== `{}`) return `${n.connection.key}(${i})`;
        }
        return n.connection.key;
      }
      let r = e;
      if (t) {
        let e = Hi(t);
        e !== `{}` && (r += `(${e})`);
      }
      return (
        n &&
          Object.keys(n).forEach((e) => {
            Vi.indexOf(e) === -1 &&
              (n[e] && Object.keys(n[e]).length
                ? (r += `@${e}(${Hi(n[e])})`)
                : (r += `@${e}`));
          }),
        r
      );
    },
    {
      setStringify(e) {
        let t = Hi;
        return ((Hi = e), t);
      },
    }
  );
function Wi(e) {
  return !!e.errors?.length;
}
function Gi(e, t, n) {
  let r = new Set(e),
    i = r.size;
  return (
    _(t, {
      Directive(e) {
        if (r.delete(e.name.value) && (!n || !r.size)) return yt;
      },
    }),
    n ? !r.size : r.size < i
  );
}
function Ki(e) {
  let t = !1;
  return (
    _(e, {
      Directive: {
        enter(e) {
          if (
            e.name.value === `client` &&
            e.arguments &&
            ((t = e.arguments.some(
              (e) =>
                e.name.value === `always` &&
                e.value.kind === `BooleanValue` &&
                !0 === e.value.value
            )),
            t)
          )
            return yt;
        },
      },
    }),
    t
  );
}
var G = Array.isArray;
function qi(e) {
  return e.kind === `Field`;
}
function Ji(e) {
  return Array.isArray(e) && e.length > 0;
}
function Yi(e) {
  return { __ref: String(e) };
}
function Xi(e) {
  let t = e[0] || {},
    n = e.length;
  if (n > 1) {
    let r = new Ai();
    for (let i = 1; i < n; ++i) t = r.merge(t, e[i]);
  }
  return t;
}
function Zi(e, t) {
  return V(
    e,
    t,
    t.variables && { variables: V({ ...(e && e.variables), ...t.variables }) }
  );
}
function Qi(e) {
  return (e.catch(() => {}), e);
}
function $i(e, t) {
  B(t);
  let n = ea(``),
    r = ea(``),
    i = (e) => {
      for (let t, i = 0; i < e.length && (t = e[i]); ++i)
        if (!G(t)) {
          if (t.kind === `OperationDefinition`)
            return n(t.name && t.name.value);
          if (t.kind === `FragmentDefinition`) return r(t.name.value);
        }
      return (I.error(14), null);
    },
    a = 0;
  for (let e = t.definitions.length - 1; e >= 0; --e)
    t.definitions[e].kind === `OperationDefinition` && ++a;
  let o = (function (e) {
      let t = new Map(),
        n = new Map();
      return (
        e.forEach((e) => {
          e && (e.name ? t.set(e.name, e) : e.test && n.set(e.test, e));
        }),
        (e) => {
          let r = t.get(e.name.value);
          return (
            !r &&
              n.size &&
              n.forEach((t, n) => {
                n(e) && (r = t);
              }),
            r
          );
        }
      );
    })(e),
    s = (e) => Ji(e) && e.map(o).some((e) => e && e.remove),
    c = new Map(),
    l = !1,
    u = {
      enter(e) {
        if (s(e.directives)) return ((l = !0), null);
      },
    },
    d = _(t, {
      Field: u,
      InlineFragment: u,
      VariableDefinition: { enter: () => !1 },
      Variable: {
        enter(e, t, n, r, a) {
          let o = i(a);
          o && o.variables.add(e.name.value);
        },
      },
      FragmentSpread: {
        enter(e, t, n, r, a) {
          if (s(e.directives)) return ((l = !0), null);
          let o = i(a);
          o && o.fragmentSpreads.add(e.name.value);
        },
      },
      FragmentDefinition: {
        enter(e, t, n, r) {
          c.set(JSON.stringify(r), e);
        },
        leave: (e, t, n, i) =>
          e === c.get(JSON.stringify(i))
            ? e
            : a > 0 &&
                e.selectionSet.selections.every(
                  (e) => e.kind === `Field` && e.name.value === `__typename`
                )
              ? ((r(e.name.value).removed = !0), (l = !0), null)
              : void 0,
      },
      Directive: {
        leave(e) {
          if (o(e)) return ((l = !0), null);
        },
      },
    });
  if (!l) return t;
  let f = (e) => (
      e.transitiveVars ||
        ((e.transitiveVars = new Set(e.variables)),
        e.removed ||
          e.fragmentSpreads.forEach((t) => {
            f(r(t)).transitiveVars.forEach((t) => {
              e.transitiveVars.add(t);
            });
          })),
      e
    ),
    p = new Set();
  (d.definitions.forEach((e) => {
    e.kind === `OperationDefinition`
      ? f(n(e.name && e.name.value)).fragmentSpreads.forEach((e) => {
          p.add(e);
        })
      : e.kind !== `FragmentDefinition` ||
        a !== 0 ||
        r(e.name.value).removed ||
        p.add(e.name.value);
  }),
    p.forEach((e) => {
      f(r(e)).fragmentSpreads.forEach((e) => {
        p.add(e);
      });
    }));
  let m = {
    enter(e) {
      if (((t = e.name.value), !p.has(t) || r(t).removed)) return null;
      var t;
    },
  };
  return (function (e) {
    return ta(U(e) || Pi(e), Ei(Fi(e))) ? null : e;
  })(
    _(d, {
      FragmentSpread: m,
      FragmentDefinition: m,
      OperationDefinition: {
        leave(e) {
          if (e.variableDefinitions) {
            let t = f(n(e.name && e.name.value)).transitiveVars;
            if (t.size < e.variableDefinitions.length)
              return {
                ...e,
                variableDefinitions: e.variableDefinitions.filter((e) =>
                  t.has(e.variable.name.value)
                ),
              };
          }
        },
      },
    })
  );
}
function ea(e) {
  let t = new Map();
  return function (n = e) {
    let r = t.get(n);
    return (
      r || t.set(n, (r = { variables: new Set(), fragmentSpreads: new Set() })),
      r
    );
  };
}
function ta(e, t) {
  return (
    !e ||
    e.selectionSet.selections.every(
      (e) => e.kind === `FragmentSpread` && ta(t[e.name.value], t)
    )
  );
}
function na(e) {
  return _(e, {
    FragmentSpread(e) {
      if (!e.directives?.some(({ name: e }) => e.value === `unmask`))
        return null;
    },
  });
}
function ra(e) {
  return e.alias ? e.alias.value : e.name.value;
}
function ia({ directives: e }, t) {
  return (
    !e ||
    !e.length ||
    (function (e) {
      let t = [];
      return (
        e &&
          e.length &&
          e.forEach((e) => {
            if (
              !(function ({ name: { value: e } }) {
                return e === `skip` || e === `include`;
              })(e)
            )
              return;
            let n = e.arguments,
              r = e.name.value;
            I(n && n.length === 1, 16, r);
            let i = n[0];
            I(i.name && i.name.value === `if`, 17, r);
            let a = i.value;
            (I(
              a && (a.kind === `Variable` || a.kind === `BooleanValue`),
              18,
              r
            ),
              t.push({ directive: e, ifArgument: i }));
          }),
        t
      );
    })(e).every(({ directive: e, ifArgument: n }) => {
      let r = !1;
      return (
        n.value.kind === `Variable`
          ? ((r = t && t[n.value.name.value]),
            I(r !== void 0, 15, e.name.value))
          : (r = n.value.value),
        e.name.value === `skip` ? !r : r
      );
    })
  );
}
function aa(e) {
  let t = { data: e.data };
  return (e.error && (t.error = e.error), t);
}
function oa(e, t = () => {}) {
  return (n) =>
    new k((r) => {
      let i = t();
      return n.subscribe({
        next(t) {
          let n;
          try {
            n = e(t, i);
          } catch (e) {
            r.error(e);
          }
          n !== void 0 && r.next(n);
        },
        error(e) {
          r.error(e);
        },
        complete() {
          r.complete();
        },
      });
    });
}
var { toString: sa, hasOwnProperty: ca } = Object.prototype,
  la = Function.prototype.toString,
  ua = new Map();
function K(e, t) {
  try {
    return da(e, t);
  } finally {
    ua.clear();
  }
}
function da(e, t) {
  if (e === t) return !0;
  let n = sa.call(e);
  if (n !== sa.call(t)) return !1;
  switch (n) {
    case `[object Array]`:
      if (e.length !== t.length) return !1;
    case `[object Object]`: {
      if (ha(e, t)) return !0;
      let n = fa(e),
        r = fa(t),
        i = n.length;
      if (i !== r.length) return !1;
      for (let e = 0; e < i; ++e) if (!ca.call(t, n[e])) return !1;
      for (let r = 0; r < i; ++r) {
        let i = n[r];
        if (!da(e[i], t[i])) return !1;
      }
      return !0;
    }
    case `[object Error]`:
      return e.name === t.name && e.message === t.message;
    case `[object Number]`:
      if (e != e) return t != t;
    case `[object Boolean]`:
    case `[object Date]`:
      return +e == +t;
    case `[object RegExp]`:
    case `[object String]`:
      return e == `${t}`;
    case `[object Map]`:
    case `[object Set]`: {
      if (e.size !== t.size) return !1;
      if (ha(e, t)) return !0;
      let r = e.entries(),
        i = n === `[object Map]`;
      for (;;) {
        let e = r.next();
        if (e.done) break;
        let [n, a] = e.value;
        if (!t.has(n) || (i && !da(a, t.get(n)))) return !1;
      }
      return !0;
    }
    case `[object Uint16Array]`:
    case `[object Uint8Array]`:
    case `[object Uint32Array]`:
    case `[object Int32Array]`:
    case `[object Int8Array]`:
    case `[object Int16Array]`:
    case `[object ArrayBuffer]`:
      ((e = new Uint8Array(e)), (t = new Uint8Array(t)));
    case `[object DataView]`: {
      let n = e.byteLength;
      if (n === t.byteLength) for (; n-- && e[n] === t[n];);
      return n === -1;
    }
    case `[object AsyncFunction]`:
    case `[object GeneratorFunction]`:
    case `[object AsyncGeneratorFunction]`:
    case `[object Function]`: {
      let n = la.call(e);
      return (
        n === la.call(t) &&
        !(function (e, t) {
          let n = e.length - t.length;
          return n >= 0 && e.indexOf(t, n) === n;
        })(n, ma)
      );
    }
  }
  return !1;
}
function fa(e) {
  return Object.keys(e).filter(pa, e);
}
function pa(e) {
  return this[e] !== void 0;
}
var ma = `{ [native code] }`;
function ha(e, t) {
  let n = ua.get(e);
  if (n) {
    if (n.has(t)) return !0;
  } else ua.set(e, (n = new Set()));
  return (n.add(t), !1);
}
function ga(e, { data: t, ...n }, { data: r, ...i }, a) {
  return (
    K(n, i) &&
    _a(Ii(e).selectionSet, t, r, { fragmentMap: Ei(Fi(e)), variables: a })
  );
}
function _a(e, t, n, r) {
  if (t === n) return !0;
  let i = new Set();
  return e.selections.every((e) => {
    if (i.has(e) || (i.add(e), !ia(e, r.variables)) || va(e)) return !0;
    if (qi(e)) {
      let i = ra(e),
        a = t && t[i],
        o = n && n[i],
        s = e.selectionSet;
      if (!s) return K(a, o);
      let c = Array.isArray(a),
        l = Array.isArray(o);
      if (c !== l) return !1;
      if (c && l) {
        let e = a.length;
        if (o.length !== e) return !1;
        for (let t = 0; t < e; ++t) if (!_a(s, a[t], o[t], r)) return !1;
        return !0;
      }
      return _a(s, a, o, r);
    }
    {
      let i = Mi(e, r.fragmentMap);
      if (i) return !!va(i) || _a(i.selectionSet, t, n, r);
    }
  });
}
function va(e) {
  return !!e.directives && e.directives.some(ya);
}
function ya(e) {
  return e.name.value === `nonreactive`;
}
var ba = wi(
    function (e, t, n) {
      return (function (e, t) {
        let n, r;
        function i(e) {
          return (e !== n && ((n = e), (r = t(n))), r);
        }
        return Object.assign(
          e.pipe(P(i), Br({ bufferSize: 1, refCount: !0 })),
          { getCurrentResult: () => i(e.getCurrentResult()) }
        );
      })(e, n);
    },
    { max: 1, makeCacheKey: (e) => e.slice(0, 2) }
  ),
  xa = Symbol.for(`apollo.result.extensions`),
  q = Symbol.for(`apollo.result.streamInfo`),
  Sa = Symbol.for(`apollo.observableQuery.variablesUnknown`),
  J = null,
  Ca = {},
  wa = 1;
function Ta(e) {
  try {
    return e();
  } catch {}
}
var Ea = `@wry/context:Slot`,
  Da = Ta(() => globalThis) || Ta(() => global) || Object.create(null),
  Oa =
    Da[Ea] ||
    Array[Ea] ||
    (function (e) {
      try {
        Object.defineProperty(Da, Ea, {
          value: e,
          enumerable: !1,
          writable: !1,
          configurable: !0,
        });
      } finally {
        return e;
      }
    })(
      class {
        constructor() {
          this.id = [
            `slot`,
            wa++,
            Date.now(),
            Math.random().toString(36).slice(2),
          ].join(`:`);
        }
        hasValue() {
          for (let e = J; e; e = e.parent)
            if (this.id in e.slots) {
              let t = e.slots[this.id];
              if (t === Ca) break;
              return (e !== J && (J.slots[this.id] = t), !0);
            }
          return (J && (J.slots[this.id] = Ca), !1);
        }
        getValue() {
          if (this.hasValue()) return J.slots[this.id];
        }
        withValue(e, t, n, r) {
          let i = { __proto__: null, [this.id]: e },
            a = J;
          J = { parent: a, slots: i };
          try {
            return t.apply(r, n);
          } finally {
            J = a;
          }
        }
        static bind(e) {
          let t = J;
          return function () {
            let n = J;
            try {
              return ((J = t), e.apply(this, arguments));
            } finally {
              J = n;
            }
          };
        }
        static noContext(e, t, n) {
          if (!J) return e.apply(n, t);
          {
            let r = J;
            try {
              return ((J = null), e.apply(n, t));
            } finally {
              J = r;
            }
          }
        }
      }
    ),
  { bind: ka, noContext: Aa } = Oa,
  ja = new Oa(),
  { hasOwnProperty: Ma } = Object.prototype,
  Na =
    Array.from ||
    function (e) {
      let t = [];
      return (e.forEach((e) => t.push(e)), t);
    };
function Pa(e) {
  let { unsubscribe: t } = e;
  typeof t == `function` && ((e.unsubscribe = void 0), t());
}
var Fa = [];
function Ia(e, t) {
  if (!e) throw Error(t || `assertion failure`);
}
function La(e, t) {
  let n = e.length;
  return n > 0 && n === t.length && e[n - 1] === t[n - 1];
}
function Ra(e) {
  switch (e.length) {
    case 0:
      throw Error(`unknown value`);
    case 1:
      return e[0];
    case 2:
      throw e[1];
  }
}
function za(e) {
  return e.slice(0);
}
var Ba = class e {
  constructor(t) {
    ((this.fn = t),
      (this.parents = new Set()),
      (this.childValues = new Map()),
      (this.dirtyChildren = null),
      (this.dirty = !0),
      (this.recomputing = !1),
      (this.value = []),
      (this.deps = null),
      ++e.count);
  }
  peek() {
    if (this.value.length === 1 && !Y(this)) return (Va(this), this.value[0]);
  }
  recompute(e) {
    return (
      Ia(!this.recomputing, `already recomputing`),
      Va(this),
      Y(this)
        ? (function (e, t) {
            return (
              Ya(e),
              ja.withValue(e, Ha, [e, t]),
              (function (e, t) {
                if (typeof e.subscribe == `function`)
                  try {
                    (Pa(e), (e.unsubscribe = e.subscribe.apply(null, t)));
                  } catch {
                    return (e.setDirty(), !1);
                  }
                return !0;
              })(e, t) &&
                (function (e) {
                  ((e.dirty = !1), !Y(e) && Wa(e));
                })(e),
              Ra(e.value)
            );
          })(this, e)
        : Ra(this.value)
    );
  }
  setDirty() {
    this.dirty || ((this.dirty = !0), Ua(this), Pa(this));
  }
  dispose() {
    (this.setDirty(),
      Ya(this),
      Ga(this, (e, t) => {
        (e.setDirty(), Xa(e, this));
      }));
  }
  forget() {
    this.dispose();
  }
  dependOn(e) {
    (e.add(this), (this.deps ||= Fa.pop() || new Set()), this.deps.add(e));
  }
  forgetDeps() {
    this.deps &&=
      (Na(this.deps).forEach((e) => e.delete(this)),
      this.deps.clear(),
      Fa.push(this.deps),
      null);
  }
};
function Va(e) {
  let t = ja.getValue();
  if (t)
    return (
      e.parents.add(t),
      t.childValues.has(e) || t.childValues.set(e, []),
      Y(e) ? Ka(t, e) : qa(t, e),
      t
    );
}
function Ha(e, t) {
  e.recomputing = !0;
  let { normalizeResult: n } = e,
    r;
  (n && e.value.length === 1 && (r = za(e.value)), (e.value.length = 0));
  try {
    if (((e.value[0] = e.fn.apply(null, t)), n && r && !La(r, e.value)))
      try {
        e.value[0] = n(e.value[0], r[0]);
      } catch {}
  } catch (t) {
    e.value[1] = t;
  }
  e.recomputing = !1;
}
function Y(e) {
  return e.dirty || !(!e.dirtyChildren || !e.dirtyChildren.size);
}
function Ua(e) {
  Ga(e, Ka);
}
function Wa(e) {
  Ga(e, qa);
}
function Ga(e, t) {
  let n = e.parents.size;
  if (n) {
    let r = Na(e.parents);
    for (let i = 0; i < n; ++i) t(r[i], e);
  }
}
function Ka(e, t) {
  (Ia(e.childValues.has(t)), Ia(Y(t)));
  let n = !Y(e);
  if (e.dirtyChildren) {
    if (e.dirtyChildren.has(t)) return;
  } else e.dirtyChildren = Fa.pop() || new Set();
  (e.dirtyChildren.add(t), n && Ua(e));
}
function qa(e, t) {
  (Ia(e.childValues.has(t)), Ia(!Y(t)));
  let n = e.childValues.get(t);
  (n.length === 0
    ? e.childValues.set(t, za(t.value))
    : La(n, t.value) || e.setDirty(),
    Ja(e, t),
    Y(e) || Wa(e));
}
function Ja(e, t) {
  let n = e.dirtyChildren;
  n &&
    (n.delete(t),
    n.size === 0 && (Fa.length < 100 && Fa.push(n), (e.dirtyChildren = null)));
}
function Ya(e) {
  (e.childValues.size > 0 &&
    e.childValues.forEach((t, n) => {
      Xa(e, n);
    }),
    e.forgetDeps(),
    Ia(e.dirtyChildren === null));
}
function Xa(e, t) {
  (t.parents.delete(e), e.childValues.delete(t), Ja(e, t));
}
Ba.count = 0;
var Za,
  Qa = { setDirty: !0, dispose: !0, forget: !0 };
function $a(e) {
  let t = new Map(),
    n = e && e.subscribe;
  function r(e) {
    let r = ja.getValue();
    if (r) {
      let i = t.get(e);
      (i || t.set(e, (i = new Set())),
        r.dependOn(i),
        typeof n == `function` && (Pa(i), (i.unsubscribe = n(e))));
    }
  }
  return (
    (r.dirty = function (e, n) {
      let r = t.get(e);
      if (r) {
        let i = n && Ma.call(Qa, n) ? n : `setDirty`;
        (Na(r).forEach((e) => e[i]()), t.delete(e), Pa(r));
      }
    }),
    r
  );
}
function eo(...e) {
  return (Za ||= new z(typeof WeakMap == `function`)).lookupArray(e);
}
var to = new Set();
function no(
  e,
  {
    max: t = 2 ** 16,
    keyArgs: n,
    makeCacheKey: r = eo,
    normalizeResult: i,
    subscribe: a,
    cache: o = pi,
  } = Object.create(null)
) {
  let s = typeof o == `function` ? new o(t, (e) => e.dispose()) : o,
    c = function () {
      let t = r.apply(null, n ? n.apply(null, arguments) : arguments);
      if (t === void 0) return e.apply(null, arguments);
      let o = s.get(t);
      o ||
        (s.set(t, (o = new Ba(e))),
        (o.normalizeResult = i),
        (o.subscribe = a),
        (o.forget = () => s.delete(t)));
      let c = o.recompute(Array.prototype.slice.call(arguments));
      return (
        s.set(t, o),
        to.add(s),
        ja.hasValue() || (to.forEach((e) => e.clean()), to.clear()),
        c
      );
    };
  function l(e) {
    let t = e && s.get(e);
    t && t.setDirty();
  }
  function u(e) {
    let t = e && s.get(e);
    if (t) return t.peek();
  }
  function d(e) {
    return !!e && s.delete(e);
  }
  return (
    Object.defineProperty(c, 'size', {
      get: () => s.size,
      configurable: !1,
      enumerable: !1,
    }),
    Object.freeze(
      (c.options = {
        max: t,
        keyArgs: n,
        makeCacheKey: r,
        normalizeResult: i,
        subscribe: a,
        cache: s,
      })
    ),
    (c.dirtyKey = l),
    (c.dirty = function () {
      l(r.apply(null, arguments));
    }),
    (c.peekKey = u),
    (c.peek = function () {
      return u(r.apply(null, arguments));
    }),
    (c.forgetKey = d),
    (c.forget = function () {
      return d(r.apply(null, arguments));
    }),
    (c.makeCacheKey = r),
    (c.getKey = n
      ? function () {
          return r.apply(null, n.apply(null, arguments));
        }
      : r),
    Object.freeze(c)
  );
}
function ro(...e) {
  return eo.bind(null, ...e);
}
var io = class {
    isIncrementalResult(e) {
      return !1;
    }
    prepareRequest(e) {
      return (I(!Gi([`defer`, `stream`], e.query), 67), e);
    }
    extractErrors() {}
    startRequest = void 0;
  },
  X = class e {
    static empty() {
      return new e(() => tr);
    }
    static from(t) {
      if (t.length === 0) return e.empty();
      let [n, ...r] = t;
      return n.concat(...r);
    }
    static split(t, n, r = new e((e, t) => t(e))) {
      let i = new e((e, i) => (t(e) ? n.request(e, i) : r.request(e, i)));
      return Object.assign(i, { left: n, right: r });
    }
    static execute(e, t, n) {
      return e.request(
        (function (e, { client: t }) {
          let n = {
              query: e.query,
              variables: e.variables || {},
              extensions: e.extensions || {},
              operationName: si(e.query),
              operationType: U(e.query).operation,
            },
            r = { ...e.context },
            i = () => Object.freeze({ ...r });
          return (
            Object.defineProperty(n, 'setContext', {
              enumerable: !1,
              value: (e) => {
                r =
                  typeof e == `function` ? { ...r, ...e(i()) } : { ...r, ...e };
              },
            }),
            Object.defineProperty(n, 'getContext', {
              enumerable: !1,
              value: i,
            }),
            Object.defineProperty(n, 'client', { enumerable: !1, value: t }),
            n
          );
        })(t, n),
        () => tr
      );
    }
    static concat(...t) {
      return e.from(t);
    }
    constructor(e) {
      e && (this.request = e);
    }
    split(t, n, r) {
      return this.concat(e.split(t, n, r));
    }
    concat(...e) {
      return e.length === 0 ? this : e.reduce(this.combine.bind(this), this);
    }
    combine(t, n) {
      let r = new e((e, r) => t.request(e, (e) => n.request(e, r)));
      return Object.assign(r, { left: t, right: n });
    }
    request(e, t) {
      throw L(65);
    }
    left;
    right;
  },
  ao = X.empty,
  oo = X.from,
  so = X.split,
  co = X.concat,
  lo = X.execute;
function uo(e) {
  return e;
}
var fo,
  po = class e {
    transform;
    cached;
    resultCache = new WeakSet();
    getCacheKey(e) {
      return [e];
    }
    static identity() {
      return new e(uo, { cache: !1 });
    }
    static split(t, n, r = e.identity()) {
      return Object.assign(
        new e((e) => (t(e) ? n : r).transformDocument(e), { cache: !1 }),
        { left: n, right: r }
      );
    }
    constructor(e, t = {}) {
      ((this.transform = e),
        t.getCacheKey && (this.getCacheKey = t.getCacheKey),
        (this.cached = !1 !== t.cache),
        this.resetCache());
    }
    resetCache() {
      if (this.cached) {
        let t = new z();
        this.performWork = no(e.prototype.performWork.bind(this), {
          makeCacheKey: (e) => {
            let n = this.getCacheKey(e);
            if (n) return (I(Array.isArray(n), 20), t.lookupArray(n));
          },
          max: R[`documentTransform.cache`],
          cache: yi,
        });
      }
    }
    performWork(e) {
      return (B(e), this.transform(e));
    }
    transformDocument(e) {
      if (this.resultCache.has(e)) return e;
      let t = this.performWork(e);
      return (this.resultCache.add(t), t);
    }
    concat(t) {
      return Object.assign(
        new e((e) => t.transformDocument(this.transformDocument(e)), {
          cache: !1,
        }),
        { left: this, right: t }
      );
    }
    left;
    right;
  },
  mo = Object.assign(
    (e) => {
      let t = fo.get(e);
      return (
        t ||
          ((t = (function (e) {
            return _(e, xt);
          })(e)),
          fo.set(e, t)),
        t
      );
    },
    {
      reset() {
        fo = new Si(R.print || 2e3);
      },
    }
  );
function Z(e) {
  return !!(e && typeof e == `object` && typeof e.__ref == `string`);
}
mo.reset();
var ho = { kind: _e, name: { kind: fe, value: `__typename` } },
  go = Object.assign(
    function (e) {
      return _(e, {
        SelectionSet: {
          enter(e, t, n) {
            if (n && n.kind === `OperationDefinition`) return;
            let { selections: r } = e;
            if (
              !r ||
              r.some(
                (e) =>
                  e.kind === `Field` &&
                  (e.name.value === `__typename` ||
                    e.name.value.lastIndexOf(`__`, 0) === 0)
              )
            )
              return;
            let i = n;
            return i.kind === `Field` &&
              i.directives &&
              i.directives.some((e) => e.name.value === `export`)
              ? void 0
              : { ...e, selections: [...r, ho] };
          },
        },
      });
    },
    { added: (e) => e === ho }
  );
function _o(e, t) {
  return U(e)?.operation === t;
}
function vo(e) {
  return e === 7 || e === 8;
}
function yo(e) {
  return !vo(e);
}
var bo = class {
    assumeImmutableResults = !1;
    lookupFragment(e) {
      return null;
    }
    batch(e) {
      let t =
          typeof e.optimistic == `string`
            ? e.optimistic
            : !1 === e.optimistic
              ? null
              : void 0,
        n;
      return (this.performTransaction(() => (n = e.update(this)), t), n);
    }
    recordOptimisticTransaction(e, t) {
      this.performTransaction(e, t);
    }
    transformDocument(e) {
      return e;
    }
    transformForLink(e) {
      return e;
    }
    identify(e) {}
    gc() {
      return [];
    }
    modify(e) {
      return !1;
    }
    readQuery(e, t = !!e.optimistic) {
      return this.read({ ...e, rootId: e.id || `ROOT_QUERY`, optimistic: t });
    }
    fragmentWatches = new z(!0);
    watchFragment(e) {
      let { fragment: t, fragmentName: n, from: r } = e,
        i = this.getFragmentDoc(t, n),
        a = (Array.isArray(r) ? r : [r]).map((e) =>
          e == null ? e : this.toCacheId(e)
        );
      if (!Array.isArray(r)) {
        let t = this.watchSingleFragment(a[0], i, e);
        return r === null
          ? t
          : ba(t, Symbol.for(`apollo.transform.individualResult`), (e) => ({
              ...e,
              data: e.data ?? {},
            }));
      }
      let o;
      function s(e) {
        let t = e.reduce(
          (e, t, n) => (
            e.data.push(t.data),
            (e.complete &&= t.complete),
            (e.dataState = e.complete ? `complete` : `partial`),
            t.missing && ((e.missing ||= {}), (e.missing[n] = t.missing)),
            e
          ),
          { data: [], dataState: `complete`, complete: !0 }
        );
        return (K(o, t) || (o = t), o);
      }
      if (a.length === 0) return wo;
      let c = !1,
        l = a.map((t) => this.watchSingleFragment(t, i, e)),
        u = (function (e) {
          return e.length === 0
            ? tr
            : new k((t) => {
                let { length: n } = e,
                  r = Array(n),
                  i = new Map();
                e.forEach((e, t) => {
                  (i.has(e) || i.set(e, new Set()), i.get(e).add(t));
                });
                let a,
                  o = i.size,
                  s = i.size;
                i.forEach((n, i) => {
                  let c = !1,
                    l = i.subscribe({
                      next: (o) => {
                        (n.forEach((e) => (r[e] = o)),
                          c || ((c = !0), s--),
                          s ||
                            ((a ||= new Set(e.filter((e) => e.dirty))),
                            a.delete(i),
                            a.size || (t.next(r.slice()), (a = void 0))));
                      },
                      complete: () => {
                        (o--, o || t.complete());
                      },
                      error: t.error.bind(t),
                    });
                  t.add(l);
                });
              });
        })(l).pipe(
          P(s),
          Vr({ subscribe: () => (c = !0), unsubscribe: () => (c = !1) }),
          Br({ bufferSize: 1, refCount: !0 })
        );
      return Object.assign(u, {
        getCurrentResult: () =>
          c && o ? o : s(l.map((e) => e.getCurrentResult())),
      });
    }
    onAfterBroadcast = (e) => e();
    watchSingleFragment(e, t, n) {
      if (e === null) return So;
      let { optimistic: r = !0, variables: i } = n,
        a = [t, W({ id: e, optimistic: r, variables: i })],
        o = this.fragmentWatches.lookupArray(a);
      if (!o.observable) {
        let l,
          u = !1;
        function d(e) {
          let r = e.result;
          return (
            (l && ga(t, { data: l.data }, { data: r }, n.variables)) ||
              ((l = {
                data: r,
                dataState: e.complete ? `complete` : `partial`,
                complete: e.complete,
              }),
              e.missing && (l.missing = e.missing.missing)),
            l
          );
        }
        let f = new k((n) => {
          u = !0;
          let o = this.watch({
            variables: i,
            returnPartialData: !0,
            id: e,
            query: t,
            optimistic: r,
            immediate: !0,
            callback: (e) => {
              ((f.dirty = !0),
                this.onAfterBroadcast(() => {
                  (n.next(d(e)), (f.dirty = !1));
                }));
            },
          });
          return () => {
            ((u = !1), o(), this.fragmentWatches.removeArray(a));
          };
        }).pipe(
          (c === void 0 && (c = Vn),
          (s ??= Lr),
          A(function (e, t) {
            var n,
              r = !0;
            e.subscribe(
              j(t, function (e) {
                var i = c(e);
                (!r && s(n, i)) || ((r = !1), (n = i), t.next(e));
              })
            );
          })),
          Rr({ connector: () => new Yn(1), resetOnRefCountZero: () => Pr(0) })
        );
        o.observable = Object.assign(f, {
          dirty: !1,
          getCurrentResult: () =>
            u && l
              ? l
              : d(
                  this.diff({
                    id: e,
                    query: t,
                    returnPartialData: !0,
                    optimistic: r,
                    variables: i,
                  })
                ),
        });
      }
      var s, c;
      return o.observable;
    }
    getFragmentDoc = no(Ni, {
      max: R[`cache.fragmentQueryDocuments`] || 1e3,
      cache: yi,
      makeCacheKey: ro(this),
    });
    readFragment(e, t = !!e.optimistic) {
      let n = e.from === void 0 ? e.id : this.toCacheId(e.from);
      return this.read({
        ...e,
        query: this.getFragmentDoc(e.fragment, e.fragmentName),
        rootId: n,
        optimistic: t,
      });
    }
    writeQuery({ id: e, data: t, ...n }) {
      return this.write(
        Object.assign(n, { dataId: e || `ROOT_QUERY`, result: t })
      );
    }
    writeFragment({ data: e, fragment: t, fragmentName: n, ...r }) {
      let i = r.from === void 0 ? r.id : this.toCacheId(r.from);
      return this.write(
        Object.assign(r, {
          query: this.getFragmentDoc(t, n),
          dataId: i,
          result: e,
        })
      );
    }
    updateQuery(e, t) {
      return this.batch({
        update(n) {
          let r = n.readQuery(e),
            i = t(r);
          return i == null ? r : (n.writeQuery({ ...e, data: i }), i);
        },
      });
    }
    updateFragment(e, t) {
      return this.batch({
        update(n) {
          let r = n.readFragment(e),
            i = t(r);
          return i == null ? r : (n.writeFragment({ ...e, data: i }), i);
        },
      });
    }
    toCacheId(e) {
      return typeof e == `string` ? e : this.identify(e);
    }
  },
  xo = Object.freeze({ data: null, dataState: `complete`, complete: !0 }),
  So = Object.assign(
    new k((e) => {
      e.next(xo);
    }),
    { dirty: !1, getCurrentResult: () => xo }
  ),
  Co = Object.freeze({ data: [], dataState: `complete`, complete: !0 }),
  wo = Object.assign(
    new k((e) => {
      e.next(Co);
    }),
    { getCurrentResult: () => Co }
  ),
  To = class e extends Error {
    message;
    path;
    query;
    variables;
    constructor(t, n, r, i) {
      if (
        (super(t),
        (this.message = t),
        (this.path = n),
        (this.query = r),
        (this.variables = i),
        (this.name = `MissingFieldError`),
        Array.isArray(this.path))
      ) {
        this.missing = this.message;
        for (let e = this.path.length - 1; e >= 0; --e)
          this.missing = { [this.path[e]]: this.missing };
      } else this.missing = this.path;
      this.__proto__ = e.prototype;
    }
    missing;
  },
  { hasOwnProperty: Q } = Object.prototype;
function Eo({ __typename: e, id: t, _id: n }, r) {
  if (
    typeof e == `string` &&
    (r &&
      (r.keyObject = t == null ? (n == null ? void 0 : { _id: n }) : { id: t }),
    t == null && n != null && (t = n),
    t != null)
  )
    return `${e}:${typeof t == `number` || typeof t == `string` ? t : JSON.stringify(t)}`;
}
var Do = { dataIdFromObject: Eo, resultCaching: !0 },
  Oo = /^[_a-z][_0-9a-z]*/i;
function ko(e) {
  let t = e.match(Oo);
  return t ? t[0] : e;
}
function Ao(e, t, n) {
  return (
    !!H(t) &&
    (G(t)
      ? t.every((t) => Ao(e, t, n))
      : e.selections.every((e) => {
          if (qi(e) && ia(e, n)) {
            let r = ra(e);
            return (
              Q.call(t, r) && (!e.selectionSet || Ao(e.selectionSet, t[r], n))
            );
          }
          return !0;
        }))
  );
}
function jo(e) {
  return H(e) && !Z(e) && !G(e);
}
function Mo(e, t) {
  let n = Ei(Fi(e));
  return {
    fragmentMap: n,
    lookupFragment(e) {
      let r = n[e];
      return (!r && t && (r = t.lookup(e)), r || null);
    },
  };
}
var No = {},
  Po = () => No,
  Fo = {},
  Io = class {
    policies;
    group;
    data = {};
    constructor(e, t) {
      ((this.policies = e), (this.group = t));
    }
    toObject() {
      return { ...this.data };
    }
    has(e) {
      return this.lookup(e, !0) !== void 0;
    }
    get(e, t) {
      if ((this.group.depend(e, t), Q.call(this.data, e))) {
        let n = this.data[e];
        if (n && Q.call(n, t)) return n[t];
      }
      return t === `__typename` && Q.call(this.policies.rootTypenamesById, e)
        ? this.policies.rootTypenamesById[e]
        : this instanceof Bo
          ? this.parent.get(e, t)
          : void 0;
    }
    lookup(e, t) {
      return (
        t && this.group.depend(e, `__exists`),
        Q.call(this.data, e)
          ? this.data[e]
          : this instanceof Bo
            ? this.parent.lookup(e, t)
            : this.policies.rootTypenamesById[e]
              ? {}
              : void 0
      );
    }
    merge(e, t) {
      let n;
      (Z(e) && (e = e.__ref), Z(t) && (t = t.__ref));
      let r = typeof e == `string` ? this.lookup((n = e)) : e,
        i = typeof t == `string` ? this.lookup((n = t)) : t;
      if (!i) return;
      I(typeof n == `string`, 104);
      let a = new Ai({ reconciler: Ho }).merge(r, i);
      if (
        ((this.data[n] = a),
        a !== r && (delete this.refs[n], this.group.caching))
      ) {
        let e = {};
        (r || (e.__exists = 1),
          Object.keys(i).forEach((t) => {
            if (!r || r[t] !== a[t]) {
              e[t] = 1;
              let n = ko(t);
              (n === t ||
                this.policies.hasKeyArgs(a.__typename, n) ||
                (e[n] = 1),
                a[t] !== void 0 || this instanceof Bo || delete a[t]);
            }
          }),
          !e.__typename ||
            (r && r.__typename) ||
            this.policies.rootTypenamesById[n] !== a.__typename ||
            delete e.__typename,
          Object.keys(e).forEach((e) => this.group.dirty(n, e)));
      }
    }
    modify(e, t, n) {
      let r = this.lookup(e);
      if (r) {
        let i = {},
          a = !1,
          o = !0,
          s = {
            DELETE: No,
            INVALIDATE: Fo,
            isReference: Z,
            toReference: this.toReference,
            canRead: this.canRead,
            readField: (t, n) =>
              this.policies.readField(
                typeof t == `string` ? { fieldName: t, from: n || Yi(e) } : t,
                { store: this }
              ),
          };
        if (
          (Object.keys(r).forEach((c) => {
            let l = ko(c),
              u = r[c];
            if (u === void 0) return;
            let d = typeof t == `function` ? t : t[c] || (n ? void 0 : t[l]);
            if (d) {
              let t =
                d === Po
                  ? No
                  : d(u, {
                      ...s,
                      fieldName: l,
                      storeFieldName: c,
                      storage: this.getStorage(e, c),
                    });
              t === Fo
                ? this.group.dirty(e, c)
                : (t === No && (t = void 0),
                  t !== u && ((i[c] = t), (a = !0), (u = t)));
            }
            u !== void 0 && (o = !1);
          }),
          a)
        )
          return (
            this.merge(e, i),
            o &&
              (this instanceof Bo
                ? (this.data[e] = void 0)
                : delete this.data[e],
              this.group.dirty(e, `__exists`)),
            !0
          );
      }
      return !1;
    }
    delete(e, t, n) {
      let r = this.lookup(e);
      if (r) {
        let i = this.getFieldValue(r, `__typename`),
          a =
            t && n
              ? this.policies.getStoreFieldName({
                  typename: i,
                  fieldName: t,
                  args: n,
                })
              : t;
        return this.modify(e, a ? { [a]: Po } : Po, !!n);
      }
      return !1;
    }
    evict(e, t) {
      let n = !1;
      return (
        e.id &&
          (Q.call(this.data, e.id) &&
            (n = this.delete(e.id, e.fieldName, e.args)),
          this instanceof Bo &&
            this !== t &&
            (n = this.parent.evict(e, t) || n),
          (e.fieldName || n) &&
            this.group.dirty(e.id, e.fieldName || `__exists`)),
        n
      );
    }
    clear() {
      this.replace(null);
    }
    extract() {
      let e = this.toObject(),
        t = [];
      return (
        this.getRootIdSet().forEach((e) => {
          Q.call(this.policies.rootTypenamesById, e) || t.push(e);
        }),
        t.length && (e.__META = { extraRootIds: t.sort() }),
        e
      );
    }
    replace(e) {
      if (
        (Object.keys(this.data).forEach((t) => {
          (e && Q.call(e, t)) || this.delete(t);
        }),
        e)
      ) {
        let { __META: t, ...n } = e;
        (Object.keys(n).forEach((e) => {
          this.merge(e, n[e]);
        }),
          t && t.extraRootIds.forEach(this.retain, this));
      }
    }
    rootIds = {};
    retain(e) {
      return (this.rootIds[e] = (this.rootIds[e] || 0) + 1);
    }
    release(e) {
      if (this.rootIds[e] > 0) {
        let t = --this.rootIds[e];
        return (t || delete this.rootIds[e], t);
      }
      return 0;
    }
    getRootIdSet(e = new Set()) {
      return (
        Object.keys(this.rootIds).forEach(e.add, e),
        this instanceof Bo
          ? this.parent.getRootIdSet(e)
          : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e),
        e
      );
    }
    gc() {
      let e = this.getRootIdSet(),
        t = this.toObject();
      e.forEach((n) => {
        Q.call(t, n) &&
          (Object.keys(this.findChildRefIds(n)).forEach(e.add, e), delete t[n]);
      });
      let n = Object.keys(t);
      if (n.length) {
        let e = this;
        for (; e instanceof Bo;) e = e.parent;
        n.forEach((t) => e.delete(t));
      }
      return n;
    }
    refs = {};
    findChildRefIds(e) {
      if (!Q.call(this.refs, e)) {
        let t = (this.refs[e] = {}),
          n = this.data[e];
        if (!n) return t;
        let r = new Set([n]);
        r.forEach((e) => {
          (Z(e) && (t[e.__ref] = !0),
            H(e) &&
              Object.keys(e).forEach((t) => {
                let n = e[t];
                H(n) && r.add(n);
              }));
        });
      }
      return this.refs[e];
    }
    makeCacheKey() {
      return this.group.keyMaker.lookupArray(arguments);
    }
    getFieldValue = (e, t) => (Z(e) ? this.get(e.__ref, t) : e && e[t]);
    canRead = (e) => (Z(e) ? this.has(e.__ref) : typeof e == `object`);
    toReference = (e, t) => {
      if (typeof e == `string`) return Yi(e);
      if (Z(e)) return e;
      let [n] = this.policies.identify(e);
      if (n) {
        let r = Yi(n);
        return (t && this.merge(n, e), r);
      }
    };
    get supportsResultCaching() {
      return this.group.caching;
    }
  },
  Lo = class {
    caching;
    parent;
    d = null;
    keyMaker;
    constructor(e, t = null) {
      ((this.caching = e), (this.parent = t), this.resetCaching());
    }
    resetCaching() {
      ((this.d = this.caching ? $a() : null), (this.keyMaker = new z()));
    }
    depend(e, t) {
      if (this.d) {
        this.d(Ro(e, t));
        let n = ko(t);
        (n !== t && this.d(Ro(e, n)), this.parent && this.parent.depend(e, t));
      }
    }
    dirty(e, t) {
      this.d &&
        this.d.dirty(Ro(e, t), t === `__exists` ? `forget` : `setDirty`);
    }
  };
function Ro(e, t) {
  return t + `#` + e;
}
function zo(e, t) {
  Uo(e) && e.group.depend(t, `__exists`);
}
Io.Root = class extends Io {
  constructor({ policies: e, resultCaching: t = !0, seed: n }) {
    (super(e, new Lo(t)), n && this.replace(n));
  }
  stump = new Vo(this);
  addLayer(e, t) {
    return this.stump.addLayer(e, t);
  }
  removeLayer() {
    return this;
  }
  storageTrie = new z();
  getStorage() {
    return this.storageTrie.lookupArray(arguments);
  }
};
var Bo = class e extends Io {
    id;
    parent;
    replay;
    group;
    constructor(e, t, n, r) {
      (super(t.policies, r),
        (this.id = e),
        (this.parent = t),
        (this.replay = n),
        (this.group = r),
        n(this));
    }
    addLayer(t, n) {
      return new e(t, this, n, this.group);
    }
    removeLayer(e) {
      let t = this.parent.removeLayer(e);
      return e === this.id
        ? (this.group.caching &&
            Object.keys(this.data).forEach((e) => {
              let n = this.data[e],
                r = t.lookup(e);
              r
                ? n
                  ? n !== r &&
                    Object.keys(n).forEach((t) => {
                      K(n[t], r[t]) || this.group.dirty(e, t);
                    })
                  : (this.group.dirty(e, `__exists`),
                    Object.keys(r).forEach((t) => {
                      this.group.dirty(e, t);
                    }))
                : this.delete(e);
            }),
          t)
        : t === this.parent
          ? this
          : t.addLayer(this.id, this.replay);
    }
    toObject() {
      return { ...this.parent.toObject(), ...this.data };
    }
    findChildRefIds(e) {
      let t = this.parent.findChildRefIds(e);
      return Q.call(this.data, e) ? { ...t, ...super.findChildRefIds(e) } : t;
    }
    getStorage(...e) {
      let t = this.parent;
      for (; t.parent;) t = t.parent;
      return t.getStorage(...e);
    }
  },
  Vo = class extends Bo {
    constructor(e) {
      super(`EntityStore.Stump`, e, () => {}, new Lo(e.group.caching, e.group));
    }
    removeLayer() {
      return this;
    }
    merge(e, t) {
      return this.parent.merge(e, t);
    }
  };
function Ho(e, t, n) {
  let r = e[n],
    i = t[n];
  return K(r, i) ? r : i;
}
function Uo(e) {
  return !(!e || !e.supportsResultCaching);
}
var Wo = new Oa();
function Go(e) {
  let t = e.directives?.find(({ name: e }) => e.value === `unmask`);
  if (!t) return `mask`;
  let n = t.arguments?.find(({ name: e }) => e.value === `mode`);
  return n && `value` in n.value && n.value.value === `migrate`
    ? `migrate`
    : `unmask`;
}
function Ko(e, t, n) {
  return Wo.withValue(!0, () => {
    let r = qo(e, t, n, !1);
    return (Object.isFrozen(e), r);
  });
}
function qo(e, t, n, r, i) {
  let { knownChanged: a } = n,
    o = (function (e, t) {
      if (t.has(e)) return t.get(e);
      let n = Array.isArray(e) ? [] : {};
      return (t.set(e, n), n);
    })(e, n.mutableTargets);
  if (Array.isArray(e)) {
    for (let [i, s] of Array.from(e.entries())) {
      if (s === null) {
        o[i] = null;
        continue;
      }
      let e = qo(s, t, n, r, void 0);
      (a.has(e) && a.add(o), (o[i] = e));
    }
    return a.has(o) ? o : e;
  }
  for (let s of t.selections) {
    let t;
    if ((r && a.add(o), s.kind === `Field`)) {
      let i = ra(s),
        c = s.selectionSet;
      if (((t = o[i] || e[i]), t === void 0)) continue;
      if (c && t !== null) {
        let o = qo(e[i], c, n, r, void 0);
        a.has(o) && (t = o);
      }
      o[i] = t;
    }
    if (
      (s.kind !== `InlineFragment` ||
        (s.typeCondition && !n.cache.fragmentMatches(s, e.__typename)) ||
        (t = qo(e, s.selectionSet, n, r, i)),
      s.kind === `FragmentSpread`)
    ) {
      let r = s.name.value,
        a = n.fragmentMap[r] || (n.fragmentMap[r] = n.cache.lookupFragment(r));
      I(a, 39, r);
      let o = Go(s);
      o !== `mask` && (t = qo(e, a.selectionSet, n, o === `migrate`, i));
    }
    a.has(t) && a.add(o);
  }
  return (
    `__typename` in e && !(`__typename` in o) && (o.__typename = e.__typename),
    Object.keys(o).length !== Object.keys(e).length && a.add(o),
    a.has(o) ? o : e
  );
}
var Jo = {};
function Yo(e) {
  let t = JSON.stringify(e);
  return Jo[t] || (Jo[t] = {});
}
function Xo(e) {
  let t = Yo(e);
  return (t.keyFieldsFn ||= (t, n) => {
    let r = (e, t) => n.readField(t, e),
      i = (n.keyObject = Qo(e, (e) => {
        let i = ts(n.storeObject, e, r);
        return (
          i === void 0 &&
            t !== n.storeObject &&
            Q.call(t, e[0]) &&
            (i = ts(t, e, es)),
          I(i !== void 0, 107, e.join(`.`), t),
          i
        );
      }));
    return `${n.typename}:${JSON.stringify(i)}`;
  });
}
function Zo(e) {
  let t = Yo(e);
  return (t.keyArgsFn ||= (t, { field: n, variables: r, fieldName: i }) => {
    let a = Qo(e, (e) => {
        let i = e[0],
          a = i.charAt(0);
        if (a !== `@`) {
          if (a === `$`) {
            let t = i.slice(1);
            if (r && Q.call(r, t)) {
              let n = e.slice(0);
              return ((n[0] = t), ts(r, n));
            }
            return;
          }
          if (t) return ts(t, e);
        } else if (n && Ji(n.directives)) {
          let t = i.slice(1),
            a = n.directives.find((e) => e.name.value === t),
            o = a && ai(a, r);
          return o && ts(o, e.slice(1));
        }
      }),
      o = JSON.stringify(a);
    return ((t || o !== `{}`) && (i += `:` + o), i);
  });
}
function Qo(e, t) {
  let n = new Ai();
  return $o(e).reduce((e, r) => {
    let i = t(r);
    if (i !== void 0) {
      for (let e = r.length - 1; e >= 0; --e) i = { [r[e]]: i };
      e = n.merge(e, i);
    }
    return e;
  }, {});
}
function $o(e) {
  let t = Yo(e);
  if (!t.paths) {
    let n = (t.paths = []),
      r = [];
    e.forEach((t, i) => {
      G(t)
        ? ($o(t).forEach((e) => n.push(r.concat(e))), (r.length = 0))
        : (r.push(t), G(e[i + 1]) || (n.push(r.slice(0)), (r.length = 0)));
    });
  }
  return t.paths;
}
function es(e, t) {
  return e[t];
}
function ts(e, t, n) {
  return (
    (n ||= es),
    ns(
      t.reduce(function e(t, r) {
        return G(t) ? t.map((t) => e(t, r)) : t && n(t, r);
      }, e)
    )
  );
}
function ns(e) {
  return H(e)
    ? G(e)
      ? e.map(ns)
      : Qo(Object.keys(e).sort(), (t) => ts(e, t))
    : e;
}
var rs = new Oa(),
  is = new WeakMap();
function as(e) {
  let t = is.get(e);
  return (t || is.set(e, (t = { vars: new Set(), dep: $a() })), t);
}
function os(e) {
  as(e).vars.forEach((t) => t.forgetCache(e));
}
function ss(e) {
  let t = new Set(),
    n = new Set(),
    r = function (a) {
      if (arguments.length > 0) {
        if (e !== a) {
          ((e = a),
            t.forEach((e) => {
              (as(e).dep.dirty(r),
                (function (e) {
                  e.broadcastWatches && e.broadcastWatches();
                })(e));
            }));
          let i = Array.from(n);
          (n.clear(), i.forEach((t) => t(e)));
        }
      } else {
        let e = rs.getValue();
        e && (i(e), as(e).dep(r));
      }
      return e;
    };
  r.onNextChange = (e) => (
    n.add(e),
    () => {
      n.delete(e);
    }
  );
  let i = (r.attachCache = (e) => (t.add(e), as(e).vars.add(r), r));
  return ((r.forgetCache = (e) => t.delete(e)), r);
}
function cs(e) {
  return e.args === void 0
    ? e.field
      ? ai(e.field, e.variables)
      : null
    : e.args;
}
var ls = () => {},
  us = (e, t) => t.fieldName,
  ds = (e, t, { mergeObjects: n }) => n(e, t),
  fs = (e, t) => t,
  ps = (e, t, { streamFieldInfo: n, existingData: r }) => {
    if (!e && !r) return t;
    let i = [],
      a = e ?? r,
      o = n?.isLastChunk ? t.length : Math.max(a.length, t.length);
    for (let e = 0; e < o; e++) i[e] = t[e] === void 0 ? a[e] : t[e];
    return i;
  },
  ms = class {
    config;
    typePolicies = {};
    toBeAdded = {};
    supertypeMap = new Map();
    fuzzySubtypes = new Map();
    cache;
    rootIdsByTypename = {};
    rootTypenamesById = {};
    usingPossibleTypes = !1;
    constructor(e) {
      ((this.config = e),
        (this.config = { dataIdFromObject: Eo, ...e }),
        (this.cache = this.config.cache),
        this.setRootTypename(`Query`),
        this.setRootTypename(`Mutation`),
        this.setRootTypename(`Subscription`),
        e.possibleTypes && this.addPossibleTypes(e.possibleTypes),
        e.typePolicies && this.addTypePolicies(e.typePolicies));
    }
    identify(e, t) {
      let n = this,
        r = (t && (t.typename || t.storeObject?.__typename)) || e.__typename;
      if (r === this.rootTypenamesById.ROOT_QUERY) return [`ROOT_QUERY`];
      let i = (t && t.storeObject) || e,
        a = {
          ...t,
          typename: r,
          storeObject: i,
          readField:
            (t && t.readField) ||
            ((...e) => {
              let t = gs(e, i);
              return n.readField(t, {
                store: n.cache.data,
                variables: t.variables,
              });
            }),
        },
        o,
        s = r && this.getTypePolicy(r),
        c = (s && s.keyFn) || this.config.dataIdFromObject;
      return (
        Wo.withValue(!0, () => {
          for (; c;) {
            let t = c({ ...e, ...i }, a);
            if (!G(t)) {
              o = t;
              break;
            }
            c = Xo(t);
          }
        }),
        (o = o ? String(o) : void 0),
        a.keyObject ? [o, a.keyObject] : [o]
      );
    }
    addTypePolicies(e) {
      Object.keys(e).forEach((t) => {
        let { queryType: n, mutationType: r, subscriptionType: i, ...a } = e[t];
        (n && this.setRootTypename(`Query`, t),
          r && this.setRootTypename(`Mutation`, t),
          i && this.setRootTypename(`Subscription`, t),
          Q.call(this.toBeAdded, t)
            ? this.toBeAdded[t].push(a)
            : (this.toBeAdded[t] = [a]));
      });
    }
    updateTypePolicy(e, t, n) {
      let r = this.getTypePolicy(e),
        { keyFields: i, fields: a } = t;
      function o(e, t) {
        e.merge =
          typeof t == `function` ? t : !0 === t ? ds : !1 === t ? fs : e.merge;
      }
      (o(r, t.merge),
        (r.keyFn =
          !1 === i ? ls : G(i) ? Xo(i) : typeof i == `function` ? i : r.keyFn),
        a &&
          Object.keys(a).forEach((t) => {
            let r = n[t];
            (r && r?.typename === e) || (r = n[t] = { typename: e });
            let i = a[t];
            if (typeof i == `function`) r.read = i;
            else {
              let { keyArgs: e, read: t, merge: n } = i;
              ((r.keyFn =
                !1 === e
                  ? us
                  : G(e)
                    ? Zo(e)
                    : typeof e == `function`
                      ? e
                      : r.keyFn),
                typeof t == `function` && (r.read = t),
                o(r, n));
            }
            r.read && r.merge && (r.keyFn = r.keyFn || us);
          }));
    }
    setRootTypename(e, t = e) {
      let n = `ROOT_` + e.toUpperCase(),
        r = this.rootTypenamesById[n];
      t !== r &&
        (I(!r || r === e, 108, e),
        r && delete this.rootIdsByTypename[r],
        (this.rootIdsByTypename[t] = n),
        (this.rootTypenamesById[n] = t));
    }
    addPossibleTypes(e) {
      ((this.usingPossibleTypes = !0),
        Object.keys(e).forEach((t) => {
          (this.getSupertypeSet(t, !0),
            e[t].forEach((e) => {
              this.getSupertypeSet(e, !0).add(t);
              let n = e.match(Oo);
              (n && n[0] === e) || this.fuzzySubtypes.set(e, new RegExp(e));
            }));
        }));
    }
    getTypePolicy(e) {
      if (!Q.call(this.typePolicies, e)) {
        let t = (this.typePolicies[e] = {});
        t.fields = {};
        let n = this.supertypeMap.get(e);
        (!n &&
          this.fuzzySubtypes.size &&
          ((n = this.getSupertypeSet(e, !0)),
          this.fuzzySubtypes.forEach((t, r) => {
            if (t.test(e)) {
              let e = this.supertypeMap.get(r);
              e && e.forEach((e) => n.add(e));
            }
          })),
          n &&
            n.size &&
            n.forEach((e) => {
              let { fields: n, ...r } = this.getTypePolicy(e);
              (Object.assign(t, r), Object.assign(t.fields, n));
            }));
      }
      let t = this.toBeAdded[e];
      return (
        t &&
          t.length &&
          t.splice(0).forEach((t) => {
            this.updateTypePolicy(e, t, this.typePolicies[e].fields);
          }),
        this.typePolicies[e]
      );
    }
    getFieldPolicy(e, t) {
      if (e) return this.getTypePolicy(e).fields[t];
    }
    getSupertypeSet(e, t) {
      let n = this.supertypeMap.get(e);
      return (!n && t && this.supertypeMap.set(e, (n = new Set())), n);
    }
    fragmentMatches(e, t, n, r) {
      if (!e.typeCondition) return !0;
      if (!t) return !1;
      let i = e.typeCondition.name.value;
      if (t === i) return !0;
      if (this.usingPossibleTypes && this.supertypeMap.has(i)) {
        let a = this.getSupertypeSet(t, !0),
          o = [a],
          s = (e) => {
            let t = this.getSupertypeSet(e, !1);
            t && t.size && o.indexOf(t) < 0 && o.push(t);
          },
          c = !(!n || !this.fuzzySubtypes.size);
        for (let l = 0; l < o.length; ++l) {
          let u = o[l];
          if (u.has(i)) return (a.has(i) || a.add(i), !0);
          (u.forEach(s),
            c &&
              l === o.length - 1 &&
              Ao(e.selectionSet, n, r) &&
              ((c = !1),
              this.fuzzySubtypes.forEach((e, n) => {
                let r = t.match(e);
                r && r[0] === t && s(n);
              })));
        }
      }
      return !1;
    }
    hasKeyArgs(e, t) {
      let n = this.getFieldPolicy(e, t);
      return !(!n || !n.keyFn);
    }
    getStoreFieldName(e) {
      let { typename: t, fieldName: n } = e,
        r = this.getFieldPolicy(t, n),
        i,
        a = r && r.keyFn;
      if (a && t) {
        let r = {
            typename: t,
            fieldName: n,
            field: e.field || null,
            variables: e.variables,
          },
          o = cs(e);
        for (; a;) {
          let e = a(o, r);
          if (!G(e)) {
            i = e || n;
            break;
          }
          a = Zo(e);
        }
      }
      return (
        i === void 0 &&
          (i = e.field
            ? (function (e, t) {
                let n = null;
                e.directives &&
                  ((n = {}),
                  e.directives.forEach((e) => {
                    ((n[e.name.value] = {}),
                      e.arguments &&
                        e.arguments.forEach(({ name: r, value: i }) =>
                          ii(n[e.name.value], r, i, t)
                        ));
                  }));
                let r = null;
                return (
                  e.arguments &&
                    e.arguments.length &&
                    ((r = {}),
                    e.arguments.forEach(({ name: e, value: n }) =>
                      ii(r, e, n, t)
                    )),
                  Ui(e.name.value, r, n)
                );
              })(e.field, e.variables)
            : Ui(n, cs(e))),
        !1 === i ? n : n === ko(i) ? i : n + `:` + i
      );
    }
    readField(e, t) {
      let n = e.from;
      if (!n || (!e.field && !e.fieldName)) return;
      if (e.typename === void 0) {
        let r = t.store.getFieldValue(n, `__typename`);
        r && (e.typename = r);
      }
      let r = this.getStoreFieldName(e),
        i = ko(r),
        a = t.store.getFieldValue(n, r),
        o = this.getFieldPolicy(e.typename, i),
        s = o && o.read;
      if (s) {
        let i = hs(this, n, e, t, t.store.getStorage(Z(n) ? n.__ref : n, r));
        return rs.withValue(this.cache, s, [a, i]);
      }
      return a;
    }
    getReadFunction(e, t) {
      let n = this.getFieldPolicy(e, t);
      return n && n.read;
    }
    getMergeFunction(e, t, n) {
      let r = this.getFieldPolicy(e, t),
        i = r && r.merge;
      return (!i && n && ((r = this.getTypePolicy(n)), (i = r && r.merge)), i);
    }
    runMergeFunction(e, t, { field: n, typename: r, merge: i, path: a }, o, s) {
      let c = e;
      if (i === ds) return _s(o.store)(e, t);
      if (i === fs) return t;
      o.overwrite && (e = void 0);
      let l = o.extensions?.[q]?.deref()?.peekArray(a);
      if (l) {
        let { current: e, previous: n } = l;
        if (n && K(n.incoming, t) && K(n.streamFieldInfo, e)) return n.result;
      }
      let u = i(
        e,
        t,
        (function (e, t, n, r, i, a) {
          let o = {
              ...hs(e, t, n, r, i),
              extensions: r.extensions,
              existingData: a,
            },
            s = r.extensions;
          if (s && q in s) {
            let { [q]: e, ...t } = s,
              r = e?.deref()?.peekArray(n.path);
            (r && (o.streamFieldInfo = r.current),
              (o.extensions = Object.keys(t).length === 0 ? void 0 : t));
          }
          return o;
        })(
          this,
          void 0,
          {
            typename: r,
            fieldName: n.name.value,
            field: n,
            variables: o.variables,
            path: a,
          },
          o,
          s || {},
          c
        )
      );
      return (
        l &&
          (l.previous = { incoming: t, streamFieldInfo: l.current, result: u }),
        u
      );
    }
  };
function hs(e, t, n, r, i) {
  let a = e.getStoreFieldName(n),
    o = ko(a),
    s = n.variables || r.variables,
    { toReference: c, canRead: l } = r.store;
  return {
    args: cs(n),
    field: n.field || null,
    fieldName: o,
    storeFieldName: a,
    variables: s,
    isReference: Z,
    toReference: c,
    storage: i,
    cache: e.cache,
    canRead: l,
    readField: (...n) => e.readField(gs(n, t, s), r),
    mergeObjects: _s(r.store),
  };
}
function gs(e, t, n) {
  let { 0: r, 1: i, length: a } = e,
    o;
  return (
    typeof r == `string`
      ? (o = { fieldName: r, from: a > 1 ? i : t })
      : ((o = { ...r }), Q.call(o, `from`) || (o.from = t)),
    o.variables === void 0 && (o.variables = n),
    o
  );
}
function _s(e) {
  return function (t, n) {
    if (G(t) || G(n)) throw L(111);
    if (H(t) && H(n)) {
      let r = e.getFieldValue(t, `__typename`),
        i = e.getFieldValue(n, `__typename`);
      if (r && i && r !== i) return n;
      if (Z(t) && jo(n)) return (e.merge(t.__ref, n), t);
      if (jo(t) && Z(n)) return (e.merge(t, n.__ref), n);
      if (jo(t) && jo(n)) return { ...t, ...n };
    }
    return n;
  };
}
function vs(e) {
  return [e.selectionSet, e.objectOrReference, e.context];
}
var ys = class {
  executeSelectionSet;
  executeSubSelectedArray;
  config;
  knownResults = new WeakMap();
  constructor(e) {
    ((this.config = e),
      (this.executeSelectionSet = no(
        (e) => {
          let t = vs(e);
          return (
            this.executeSelectionSet.peek(...t) ||
            (zo(e.context.store, e.enclosingRef.__ref),
            this.execSelectionSetImpl(e))
          );
        },
        {
          max: R[`inMemoryCache.executeSelectionSet`] || 5e4,
          keyArgs: vs,
          makeCacheKey(e, t, n) {
            if (Uo(n.store))
              return n.store.makeCacheKey(e, Z(t) ? t.__ref : t, n.varString);
          },
        }
      )),
      (this.executeSubSelectedArray = no(
        (e) => (
          zo(e.context.store, e.enclosingRef.__ref),
          this.execSubSelectedArrayImpl(e)
        ),
        {
          max: R[`inMemoryCache.executeSubSelectedArray`] || 1e4,
          makeCacheKey({ field: e, array: t, context: n }) {
            if (Uo(n.store)) return n.store.makeCacheKey(e, t, n.varString);
          },
        }
      )));
  }
  diffQueryAgainstStore({
    store: e,
    query: t,
    rootId: n = `ROOT_QUERY`,
    variables: r,
    returnPartialData: i = !0,
  }) {
    let a = this.config.cache.policies;
    r = { ...ji(Li(t)), ...r };
    let o = Yi(n),
      s = this.executeSelectionSet({
        selectionSet: Ii(t).selectionSet,
        objectOrReference: o,
        enclosingRef: o,
        context: {
          store: e,
          query: t,
          policies: a,
          variables: r,
          varString: W(r),
          ...Mo(t, this.config.fragments),
        },
      }),
      c;
    s.missing &&
      (c = new To(
        (function (e) {
          try {
            JSON.stringify(e, (e, t) => {
              if (typeof t == `string`) throw t;
              return t;
            });
          } catch (e) {
            return e;
          }
        })(s.missing),
        s.missing,
        t,
        r
      ));
    let l = !c,
      { result: u } = s;
    return {
      result: l ? u : i ? (Object.keys(u).length === 0 ? null : u) : null,
      complete: l,
      missing: c,
    };
  }
  isFresh(e, t, n, r) {
    if (Uo(r.store) && this.knownResults.get(e) === n) {
      let i = this.executeSelectionSet.peek(n, t, r);
      if (i && e === i.result) return !0;
    }
    return !1;
  }
  execSelectionSetImpl({
    selectionSet: e,
    objectOrReference: t,
    enclosingRef: n,
    context: r,
  }) {
    if (Z(t) && !r.policies.rootTypenamesById[t.__ref] && !r.store.has(t.__ref))
      return {
        result: {},
        missing: `Dangling reference to missing ${t.__ref} object`,
      };
    let { variables: i, policies: a, store: o } = r,
      s = o.getFieldValue(t, `__typename`),
      c = [],
      l,
      u = new Ai();
    function d(e, t) {
      return (e.missing && (l = u.merge(l, { [t]: e.missing })), e.result);
    }
    typeof s != `string` || a.rootIdsByTypename[s] || c.push({ __typename: s });
    let f = new Set(e.selections);
    f.forEach((e) => {
      if (ia(e, i))
        if (qi(e)) {
          let i = a.readField(
              {
                fieldName: e.name.value,
                field: e,
                variables: r.variables,
                from: t,
              },
              r
            ),
            o = ra(e);
          (i === void 0
            ? go.added(e) ||
              (l = u.merge(l, {
                [o]: `Can't find field '${e.name.value}' on ${Z(t) ? t.__ref + ` object` : `object ` + JSON.stringify(t, null, 2)}`,
              }))
            : G(i)
              ? i.length > 0 &&
                (i = d(
                  this.executeSubSelectedArray({
                    field: e,
                    array: i,
                    enclosingRef: n,
                    context: r,
                  }),
                  o
                ))
              : e.selectionSet &&
                i != null &&
                (i = d(
                  this.executeSelectionSet({
                    selectionSet: e.selectionSet,
                    objectOrReference: i,
                    enclosingRef: Z(i) ? i : n,
                    context: r,
                  }),
                  o
                )),
            i !== void 0 && c.push({ [o]: i }));
        } else {
          let t = Mi(e, r.lookupFragment);
          if (!t && e.kind === `FragmentSpread`) throw L(112, e.name.value);
          t &&
            a.fragmentMatches(t, s) &&
            t.selectionSet.selections.forEach(f.add, f);
        }
    });
    let p = { result: Xi(c), missing: l };
    return (p.result && this.knownResults.set(p.result, e), p);
  }
  execSubSelectedArrayImpl({
    field: e,
    array: t,
    enclosingRef: n,
    context: r,
  }) {
    let i,
      a = new Ai();
    function o(e, t) {
      return (e.missing && (i = a.merge(i, { [t]: e.missing })), e.result);
    }
    return (
      e.selectionSet &&
        (t = t.filter((e) => e === void 0 || r.store.canRead(e))),
      {
        result: (t = t.map((t, i) =>
          t === null
            ? null
            : G(t)
              ? o(
                  this.executeSubSelectedArray({
                    field: e,
                    array: t,
                    enclosingRef: n,
                    context: r,
                  }),
                  i
                )
              : e.selectionSet
                ? o(
                    this.executeSelectionSet({
                      selectionSet: e.selectionSet,
                      objectOrReference: t,
                      enclosingRef: Z(t) ? t : n,
                      context: r,
                    }),
                    i
                  )
                : t
        )),
        missing: i,
      }
    );
  }
};
function bs(e, t, n) {
  let r = `${t}${n}`,
    i = e.flavors.get(r);
  return (
    i ||
      e.flavors.set(
        r,
        (i =
          e.clientOnly === t && e.deferred === n
            ? e
            : { ...e, clientOnly: t, deferred: n })
      ),
    i
  );
}
var xs = class {
    cache;
    reader;
    fragments;
    constructor(e, t, n) {
      ((this.cache = e), (this.reader = t), (this.fragments = n));
    }
    writeToStore(
      e,
      {
        query: t,
        result: n,
        dataId: r,
        variables: i,
        overwrite: a,
        extensions: o,
      }
    ) {
      let s = U(t),
        c = new Ai();
      i = { ...ji(s), ...i };
      let l = {
          store: e,
          written: {},
          merge: (e, t) => c.merge(e, t),
          variables: i,
          varString: W(i),
          ...Mo(t, this.fragments),
          overwrite: !!a,
          incomingById: new Map(),
          clientOnly: !1,
          deferred: !1,
          flavors: new Map(),
          extensions: o,
        },
        u = this.processSelectionSet({
          result: n || {},
          dataId: r,
          selectionSet: s.selectionSet,
          mergeTree: { map: new Map() },
          context: l,
          path: [],
        });
      if (!Z(u)) throw L(114, n);
      return (
        l.incomingById.forEach(
          ({ storeObject: t, mergeTree: n, fieldNodeSet: r }, i) => {
            let a = Yi(i);
            if (n && n.map.size) {
              let e = this.applyMerges(n, a, t, l);
              if (Z(e)) return;
              t = e;
            }
            e.merge(i, t);
          }
        ),
        e.retain(u.__ref),
        u
      );
    }
    processSelectionSet({
      dataId: e,
      result: t,
      selectionSet: n,
      context: r,
      mergeTree: i,
      path: a,
    }) {
      let { policies: o } = this.cache,
        s = {},
        c =
          (e && o.rootTypenamesById[e]) ||
          Ds(t, n, r.fragmentMap) ||
          (e && r.store.get(e, `__typename`));
      typeof c == `string` && (s.__typename = c);
      let l = (...e) => {
          let t = gs(e, s, r.variables);
          if (Z(t.from)) {
            let e = r.incomingById.get(t.from.__ref);
            if (e) {
              let n = o.readField({ ...t, from: e.storeObject }, r);
              if (n !== void 0) return n;
            }
          }
          return o.readField(t, r);
        },
        u = new Set();
      this.flattenFields(n, t, r, c).forEach((e, n) => {
        let r = t[ra(n)],
          d = [...a, n.name.value];
        if ((u.add(n), r !== void 0)) {
          let t = o.getStoreFieldName({
              typename: c,
              fieldName: n.name.value,
              field: n,
              variables: e.variables,
            }),
            a = Cs(i, t),
            u,
            f = this.processFieldValue(
              r,
              n,
              n.selectionSet ? bs(e, !1, !1) : e,
              a,
              d
            );
          n.selectionSet && (Z(f) || jo(f)) && (u = l(`__typename`, f));
          let p = o.getMergeFunction(c, n.name.value, u);
          (p
            ? (a.info = { field: n, typename: c, merge: p, path: d })
            : e.extensions?.[q] &&
                Array.isArray(f) &&
                (function (e) {
                  return (
                    !!e.directives &&
                    e.directives.some((e) => e.name.value === `stream`)
                  );
                })(n)
              ? (a.info = { field: n, typename: c, merge: ps, path: d })
              : Es(i, t),
            (s = e.merge(s, { [t]: f })));
        }
      });
      try {
        let [i, a] = o.identify(t, {
          typename: c,
          selectionSet: n,
          fragmentMap: r.fragmentMap,
          storeObject: s,
          readField: l,
        });
        ((e ||= i), a && (s = r.merge(s, a)));
      } catch (t) {
        if (!e) throw t;
      }
      if (typeof e == `string`) {
        let a = Yi(e),
          o = r.written[e] || (r.written[e] = []);
        if (
          o.indexOf(n) >= 0 ||
          (o.push(n), this.reader && this.reader.isFresh(t, a, n, r))
        )
          return a;
        let c = r.incomingById.get(e);
        return (
          c
            ? ((c.storeObject = r.merge(c.storeObject, s)),
              (c.mergeTree = ws(c.mergeTree, i)),
              u.forEach((e) => c.fieldNodeSet.add(e)))
            : r.incomingById.set(e, {
                storeObject: s,
                mergeTree: Ts(i) ? void 0 : i,
                fieldNodeSet: u,
              }),
          a
        );
      }
      return s;
    }
    processFieldValue(e, t, n, r, i) {
      return t.selectionSet && e !== null
        ? G(e)
          ? e.map((e, a) => {
              let o = this.processFieldValue(e, t, n, Cs(r, a), [...i, a]);
              return (Es(r, a), o);
            })
          : this.processSelectionSet({
              result: e,
              selectionSet: t.selectionSet,
              context: n,
              mergeTree: r,
              path: i,
            })
        : e;
    }
    flattenFields(e, t, n, r = Ds(t, e, n.fragmentMap)) {
      let i = new Map(),
        { policies: a } = this.cache,
        o = new z(!1);
      return (
        (function e(s, c) {
          let l = o.lookup(s, c.clientOnly, c.deferred);
          l.visited ||
            ((l.visited = !0),
            s.selections.forEach((o) => {
              if (!ia(o, n.variables)) return;
              let { clientOnly: s, deferred: l } = c;
              if (
                ((s && l) ||
                  !Ji(o.directives) ||
                  o.directives.forEach((e) => {
                    let t = e.name.value;
                    if ((t === `client` && (s = !0), t === `defer`)) {
                      let t = ai(e, n.variables);
                      (t && !1 === t.if) || (l = !0);
                    }
                  }),
                qi(o))
              ) {
                let e = i.get(o);
                (e && ((s &&= e.clientOnly), (l &&= e.deferred)),
                  i.set(o, bs(n, s, l)));
              } else {
                let i = Mi(o, n.lookupFragment);
                if (!i && o.kind === `FragmentSpread`)
                  throw L(116, o.name.value);
                i &&
                  a.fragmentMatches(i, r, t, n.variables) &&
                  e(i.selectionSet, bs(n, s, l));
              }
            }));
        })(e, n),
        i
      );
    }
    applyMerges(e, t, n, r, i) {
      if (e.map.size && !Z(n)) {
        let a = G(n) || (!Z(t) && !jo(t)) ? void 0 : t,
          o = n,
          s;
        a && !i && (i = [Z(a) ? a.__ref : a]);
        let c = (e, t) =>
          G(e)
            ? typeof t == `number`
              ? e[t]
              : void 0
            : r.store.getFieldValue(e, String(t));
        (e.map.forEach((e, t) => {
          let n = c(a, t),
            l = c(o, t);
          if (l === void 0) return;
          i && i.push(t);
          let u = this.applyMerges(e, n, l, r, i);
          (u !== l && ((s ||= new Map()), s.set(t, u)), i && I(i.pop() === t));
        }),
          s &&
            ((n = G(o) ? o.slice(0) : { ...o }),
            s.forEach((e, t) => {
              n[t] = e;
            })));
      }
      return e.info
        ? this.cache.policies.runMergeFunction(
            t,
            n,
            e.info,
            r,
            i && r.store.getStorage(...i)
          )
        : n;
    }
  },
  Ss = [];
function Cs({ map: e }, t) {
  return (e.has(t) || e.set(t, Ss.pop() || { map: new Map() }), e.get(t));
}
function ws(e, t) {
  if (e === t || !t || Ts(t)) return e;
  if (!e || Ts(e)) return t;
  let n = e.info && t.info ? { ...e.info, ...t.info } : e.info || t.info,
    r = e.map.size && t.map.size,
    i = { info: n, map: r ? new Map() : e.map.size ? e.map : t.map };
  if (r) {
    let n = new Set(t.map.keys());
    (e.map.forEach((e, r) => {
      (i.map.set(r, ws(e, t.map.get(r))), n.delete(r));
    }),
      n.forEach((n) => {
        i.map.set(n, ws(t.map.get(n), e.map.get(n)));
      }));
  }
  return i;
}
function Ts(e) {
  return !e || !(e.info || e.map.size);
}
function Es({ map: e }, t) {
  let n = e.get(t);
  n && Ts(n) && (Ss.push(n), e.delete(t));
}
function Ds(e, t, n) {
  let r;
  for (let n of t.selections)
    if (qi(n)) {
      if (n.name.value === `__typename`) return e[ra(n)];
    } else r ? r.push(n) : (r = [n]);
  if (typeof e.__typename == `string`) return e.__typename;
  if (r)
    for (let t of r) {
      let r = Ds(e, Mi(t, n).selectionSet, n);
      if (typeof r == `string`) return r;
    }
}
var Os = class extends bo {
  data;
  optimisticData;
  config;
  watches = new Set();
  storeReader;
  storeWriter;
  addTypenameTransform = new po(go);
  maybeBroadcastWatch;
  assumeImmutableResults = !0;
  policies;
  makeVar = ss;
  constructor(e = {}) {
    (super(),
      (this.config = (function (e) {
        return V(Do, e);
      })(e)),
      (this.policies = new ms({
        cache: this,
        dataIdFromObject: this.config.dataIdFromObject,
        possibleTypes: this.config.possibleTypes,
        typePolicies: this.config.typePolicies,
      })),
      this.init());
  }
  init() {
    let e = (this.data = new Io.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching,
    }));
    ((this.optimisticData = e.stump), this.resetResultCache());
  }
  resetResultCache() {
    let { fragments: e } = this.config;
    (this.addTypenameTransform.resetCache(),
      e?.resetCaches(),
      (this.storeWriter = new xs(
        this,
        (this.storeReader = new ys({ cache: this, fragments: e })),
        e
      )),
      (this.maybeBroadcastWatch = no((e, t) => this.broadcastWatch(e, t), {
        max: R[`inMemoryCache.maybeBroadcastWatch`] || 5e3,
        makeCacheKey: (e) => {
          let t = e.optimistic ? this.optimisticData : this.data;
          if (Uo(t)) {
            let { optimistic: n, id: r, variables: i } = e;
            return t.makeCacheKey(
              e.query,
              e.callback,
              W({ optimistic: n, id: r, variables: i })
            );
          }
        },
      })),
      new Set([this.data.group, this.optimisticData.group]).forEach((e) =>
        e.resetCaching()
      ));
  }
  restore(e) {
    return (this.init(), e && this.data.replace(e), this);
  }
  extract(e = !1) {
    return (e ? this.optimisticData : this.data).extract();
  }
  read(e) {
    let { returnPartialData: t = !1 } = e;
    return this.storeReader.diffQueryAgainstStore({
      ...e,
      store: e.optimistic ? this.optimisticData : this.data,
      config: this.config,
      returnPartialData: t,
    }).result;
  }
  write(e) {
    try {
      return (++this.txCount, this.storeWriter.writeToStore(this.data, e));
    } finally {
      --this.txCount || !1 === e.broadcast || this.broadcastWatches();
    }
  }
  modify(e) {
    if (Q.call(e, `id`) && !e.id) return !1;
    let t = e.optimistic ? this.optimisticData : this.data;
    try {
      return (++this.txCount, t.modify(e.id || `ROOT_QUERY`, e.fields, !1));
    } finally {
      --this.txCount || !1 === e.broadcast || this.broadcastWatches();
    }
  }
  diff(e) {
    return this.storeReader.diffQueryAgainstStore({
      ...e,
      store: e.optimistic ? this.optimisticData : this.data,
      rootId: e.id || `ROOT_QUERY`,
      config: this.config,
    });
  }
  watch(e) {
    var t;
    return (
      this.watches.size || as((t = this)).vars.forEach((e) => e.attachCache(t)),
      this.watches.add(e),
      e.immediate && this.maybeBroadcastWatch(e),
      () => {
        (this.watches.delete(e) && !this.watches.size && os(this),
          this.maybeBroadcastWatch.forget(e));
      }
    );
  }
  gc(e) {
    (W.reset(), mo.reset());
    let t = this.optimisticData.gc();
    return (
      e && !this.txCount && e.resetResultCache && this.resetResultCache(),
      t
    );
  }
  retain(e, t) {
    return (t ? this.optimisticData : this.data).retain(e);
  }
  release(e, t) {
    return (t ? this.optimisticData : this.data).release(e);
  }
  identify(e) {
    if (Z(e)) return e.__ref;
    try {
      return this.policies.identify(e)[0];
    } catch {}
  }
  evict(e) {
    if (!e.id) {
      if (Q.call(e, `id`)) return !1;
      e = { ...e, id: `ROOT_QUERY` };
    }
    try {
      return (++this.txCount, this.optimisticData.evict(e, this.data));
    } finally {
      --this.txCount || !1 === e.broadcast || this.broadcastWatches();
    }
  }
  reset(e) {
    return (
      this.init(),
      W.reset(),
      e && e.discardWatches
        ? (this.watches.forEach((e) => this.maybeBroadcastWatch.forget(e)),
          this.watches.clear(),
          os(this))
        : this.broadcastWatches(),
      Promise.resolve()
    );
  }
  removeOptimistic(e) {
    let t = this.optimisticData.removeLayer(e);
    t !== this.optimisticData &&
      ((this.optimisticData = t), this.broadcastWatches());
  }
  txCount = 0;
  batch(e) {
    let {
        update: t,
        optimistic: n = !0,
        removeOptimistic: r,
        onWatchUpdated: i,
      } = e,
      a,
      o = (e) => {
        let { data: n, optimisticData: r } = this;
        (++this.txCount, e && (this.data = this.optimisticData = e));
        try {
          return (a = t(this));
        } finally {
          (--this.txCount, (this.data = n), (this.optimisticData = r));
        }
      },
      s = new Set();
    return (
      i &&
        !this.txCount &&
        this.broadcastWatches({ ...e, onWatchUpdated: (e) => (s.add(e), !1) }),
      typeof n == `string`
        ? (this.optimisticData = this.optimisticData.addLayer(n, o))
        : !1 === n
          ? o(this.data)
          : o(),
      typeof r == `string` &&
        (this.optimisticData = this.optimisticData.removeLayer(r)),
      i && s.size
        ? (this.broadcastWatches({
            ...e,
            onWatchUpdated(e, t) {
              let n = i.call(this, e, t);
              return (!1 !== n && s.delete(e), n);
            },
          }),
          s.size && s.forEach((e) => this.maybeBroadcastWatch.dirty(e)))
        : this.broadcastWatches(e),
      a
    );
  }
  performTransaction(e, t) {
    return this.batch({ update: e, optimistic: t || t !== null });
  }
  transformDocument(e) {
    return this.addTypenameTransform.transformDocument(
      this.addFragmentsToDocument(e)
    );
  }
  fragmentMatches(e, t) {
    return this.policies.fragmentMatches(e, t);
  }
  lookupFragment(e) {
    return this.config.fragments?.lookup(e) || null;
  }
  resolvesClientField(e, t) {
    return !!this.policies.getReadFunction(e, t);
  }
  broadcastWatches(e) {
    if (!this.txCount) {
      let t = this.onAfterBroadcast,
        n = new Set();
      this.onAfterBroadcast = (e) => {
        n.add(e);
      };
      try {
        (this.watches.forEach((t) => this.maybeBroadcastWatch(t, e)),
          n.forEach((e) => e()));
      } finally {
        this.onAfterBroadcast = t;
      }
    }
  }
  addFragmentsToDocument(e) {
    let { fragments: t } = this.config;
    return t ? t.transform(e) : e;
  }
  broadcastWatch(e, t) {
    let { lastDiff: n } = e,
      r = this.diff(e);
    (t &&
      (e.optimistic &&
        typeof t.optimistic == `string` &&
        (r.fromOptimisticTransaction = !0),
      t.onWatchUpdated && !1 === t.onWatchUpdated.call(this, e, r, n))) ||
      (n && K(n.result, r.result)) ||
      e.callback((e.lastDiff = r), n);
  }
};
function ks(e, t) {
  return typeof e == `object` && !!e && e[Symbol.for(`apollo.error`)] === t;
}
function As(e) {
  Object.defineProperty(e, Symbol.for(`apollo.error`), {
    value: e.name,
    enumerable: !1,
    writable: !1,
    configurable: !1,
  });
}
function js(e) {
  return e.map((e) => e.message || `Error message not found.`).join(`
`);
}
var Ms = class e extends Error {
    static is(e) {
      return ks(e, `CombinedProtocolErrors`);
    }
    static formatMessage = js;
    errors;
    constructor(t) {
      (super(e.formatMessage(t, { defaultFormatMessage: js })),
        (this.name = `CombinedProtocolErrors`),
        (this.errors = t),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  },
  Ns = class e extends Error {
    static is(e) {
      return ks(e, `UnconventionalError`);
    }
    constructor(t) {
      (super(`An error of unexpected shape occurred.`, { cause: t }),
        (this.name = `UnconventionalError`),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  };
function Ps(e) {
  return e.filter((e) => e).map((e) => e.message || `Error message not found.`)
    .join(`
`);
}
var Fs = class e extends Error {
    static is(e) {
      return ks(e, `CombinedGraphQLErrors`);
    }
    static formatMessage = Ps;
    errors;
    data;
    extensions;
    constructor(t, n = t.errors || []) {
      (super(e.formatMessage(n, { result: t, defaultFormatMessage: Ps })),
        (this.errors = n),
        (this.data = t.data),
        (this.extensions = t.extensions),
        (this.name = `CombinedGraphQLErrors`),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  },
  Is = new WeakSet(),
  $,
  Ls = { is: (e) => Is.has(e) },
  Rs = class e extends Error {
    static is(e) {
      return ks(e, `LocalStateError`);
    }
    path;
    constructor(t, n = {}) {
      (super(t, { cause: n.sourceError }),
        (this.name = `LocalStateError`),
        (this.path = n.path),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  },
  zs = class e extends Error {
    static is(e) {
      return ks(e, `ServerError`);
    }
    response;
    statusCode;
    bodyText;
    constructor(t, n) {
      (super(t),
        (this.name = `ServerError`),
        (this.response = n.response),
        (this.statusCode = n.response.status),
        (this.bodyText = n.bodyText),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  },
  Bs = class e extends Error {
    static is(e) {
      return ks(e, `ServerParseError`);
    }
    response;
    statusCode;
    bodyText;
    constructor(t, n) {
      (super(
        t instanceof Error ? t.message : `Could not parse server response`,
        { cause: t }
      ),
        (this.name = `ServerParseError`),
        (this.response = n.response),
        (this.statusCode = n.response.status),
        (this.bodyText = n.bodyText),
        As(this),
        Object.setPrototypeOf(this, e.prototype));
    }
  },
  Vs = Symbol();
(function (e) {
  ((e[(e.loading = 1)] = `loading`),
    (e[(e.setVariables = 2)] = `setVariables`),
    (e[(e.fetchMore = 3)] = `fetchMore`),
    (e[(e.refetch = 4)] = `refetch`),
    (e[(e.poll = 6)] = `poll`),
    (e[(e.ready = 7)] = `ready`),
    (e[(e.error = 8)] = `error`),
    (e[(e.streaming = 9)] = `streaming`));
})(($ ||= {}));
var { assign: Hs, hasOwnProperty: Us } = Object,
  Ws = {
    loading: !0,
    networkStatus: $.loading,
    data: void 0,
    dataState: `empty`,
    partial: !0,
  },
  Gs = {
    loading: !1,
    networkStatus: $.ready,
    data: void 0,
    dataState: `empty`,
    partial: !0,
  },
  Ks = class {
    options;
    queryName;
    variablesUnknown = !1;
    _lastWrite;
    get query() {
      return this.lastQuery;
    }
    get variables() {
      return this.options.variables;
    }
    unsubscribeFromCache;
    input;
    subject;
    isTornDown;
    queryManager;
    subscriptions = new Set();
    waitForNetworkResult;
    lastQuery;
    linkSubscription;
    pollingInfo;
    get networkStatus() {
      return this.subject.getValue().result.networkStatus;
    }
    get cache() {
      return this.queryManager.cache;
    }
    constructor({
      queryManager: e,
      options: t,
      transformedQuery: n = e.transform(t.query),
    }) {
      ((this.queryManager = e),
        (this.waitForNetworkResult = t.fetchPolicy === `network-only`),
        (this.isTornDown = !1),
        (this.subscribeToMore = this.subscribeToMore.bind(this)),
        (this.maskResult = this.maskResult.bind(this)));
      let { watchQuery: { fetchPolicy: r = `cache-first` } = {} } =
          e.defaultOptions,
        {
          fetchPolicy: i = r,
          initialFetchPolicy: a = i === `standby` ? r : i,
        } = t;
      (t[Sa] && (I(i === `standby`, 82), (this.variablesUnknown = !0)),
        (this.lastQuery = n),
        (this.options = {
          ...t,
          initialFetchPolicy: a,
          fetchPolicy: i,
          variables: this.getVariablesWithDefaults(t.variables),
        }),
        this.initializeObservablesQueue(),
        (this[`@@observable`] = () => this),
        Symbol.observable && (this[Symbol.observable] = () => this));
      let o = U(this.query);
      this.queryName = o && o.name && o.name.value;
    }
    initializeObservablesQueue() {
      this.subject = new qn({
        query: this.query,
        variables: this.variables,
        result: Ws,
        meta: {},
      });
      let e = this.subject.pipe(
        Vr({
          subscribe: () => {
            this.subject.observed ||
              (this.reobserve(), setTimeout(() => this.updatePolling()));
          },
          unsubscribe: () => {
            this.subject.observed || this.tearDownQuery();
          },
        }),
        oa(
          ({ query: e, variables: t, result: n, meta: r }, i) => {
            let { shouldEmit: a } = r;
            if (
              (n === Ws &&
                ((i.previous = void 0), (i.previousVariables = void 0)),
              this.options.fetchPolicy === `standby` || a === 2)
            )
              return;
            if (a === 1) return c();
            let { previous: o, previousVariables: s } = i;
            if (o) {
              let r = this.queryManager.getDocumentInfo(e),
                i = this.queryManager.dataMasking,
                a = i ? r.nonReactiveQuery : e;
              if (
                (i || r.hasNonreactiveDirective ? ga(a, o, n, t) : K(o, n)) &&
                K(s, t)
              )
                return;
            }
            if (
              a !== 3 ||
              (this.options.notifyOnNetworkStatusChange && !K(o, n))
            )
              return c();
            function c() {
              return ((i.previous = n), (i.previousVariables = t), n);
            }
          },
          () => ({})
        )
      );
      ((this.pipe = e.pipe.bind(e)),
        (this.subscribe = e.subscribe.bind(e)),
        (this.input = new Gn()),
        (this.input.complete = () => {}),
        this.input.pipe(this.operator).subscribe(this.subject));
    }
    subscribe;
    pipe;
    [Symbol.observable];
    '@@observable';
    getCacheDiff({ optimistic: e = !0 } = {}) {
      return this.cache.diff({
        query: this.query,
        variables: this.variables,
        returnPartialData: !0,
        optimistic: e,
      });
    }
    getInitialResult(e) {
      let t = e || this.options.fetchPolicy;
      !this.queryManager.prioritizeCacheValues ||
        (t !== `network-only` && t !== `cache-and-network`) ||
        (t = `cache-first`);
      let n = () => {
        let e = this.getCacheDiff(),
          t =
            this.options.returnPartialData || e.complete
              ? (e.result ?? void 0)
              : void 0;
        return this.maskResult({
          data: t,
          dataState: e.complete
            ? `complete`
            : t === void 0
              ? `empty`
              : `partial`,
          loading: !e.complete,
          networkStatus: e.complete ? $.ready : $.loading,
          partial: !e.complete,
        });
      };
      switch (t) {
        case `cache-only`:
          return { ...n(), loading: !1, networkStatus: $.ready };
        case `cache-first`:
          return n();
        case `cache-and-network`:
          return { ...n(), loading: !0, networkStatus: $.loading };
        case `standby`:
          return Gs;
        default:
          return Ws;
      }
    }
    resubscribeCache() {
      let { variables: e, fetchPolicy: t } = this.options,
        n = this.query,
        r = t === `standby` || t === `no-cache` || this.waitForNetworkResult,
        i =
          !qs({ query: n, variables: e }, this.unsubscribeFromCache) &&
          !this.waitForNetworkResult;
      if (((r || i) && this.unsubscribeFromCache?.(), r || !i)) return;
      let a = {
          query: n,
          variables: e,
          optimistic: !0,
          watcher: this,
          callback: (e) => {
            let t = this.queryManager.getDocumentInfo(n);
            if (
              ((t.hasClientExports || t.hasForcedResolvers) &&
                (a.lastDiff = void 0),
              a.lastOwnDiff === e)
            )
              return;
            let { result: r } = this.subject.getValue();
            (e.complete || (!r.error && r !== Ws && r !== Gs)) &&
              (K(r.data, e.result) || this.scheduleNotify());
          },
        },
        o = this.cache.watch(a);
      this.unsubscribeFromCache = Object.assign(
        () => {
          ((this.unsubscribeFromCache = void 0), o());
        },
        { query: n, variables: e }
      );
    }
    stableLastResult;
    getCurrentResult() {
      let { result: e } = this.subject.getValue(),
        t =
          e.networkStatus === $.error ||
          this.hasObservers() ||
          this.options.fetchPolicy === `no-cache`
            ? e
            : this.getInitialResult();
      return (
        t === Ws && (t = this.getInitialResult()),
        K(this.stableLastResult, t) || (this.stableLastResult = t),
        this.stableLastResult
      );
    }
    refetch(e) {
      let { fetchPolicy: t } = this.options,
        n = { pollInterval: 0 };
      return (
        (n.fetchPolicy = t === `no-cache` ? `no-cache` : `network-only`),
        e &&
          !K(this.variables, e) &&
          (n.variables = this.options.variables =
            this.getVariablesWithDefaults({ ...this.variables, ...e })),
        (this._lastWrite = void 0),
        this._reobserve(n, { newNetworkStatus: $.refetch })
      );
    }
    fetchMore({
      query: e,
      variables: t,
      context: n,
      errorPolicy: r,
      updateQuery: i,
    }) {
      I(
        this.options.fetchPolicy !== `cache-only`,
        84,
        si(this.query, `(anonymous)`)
      );
      let a = {
        ...V(
          this.options,
          { errorPolicy: `none` },
          { query: e, context: n, errorPolicy: r }
        ),
        variables: e ? t : { ...this.variables, ...t },
        fetchPolicy: `no-cache`,
        notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
      };
      ((a.query = this.transformDocument(a.query)),
        (this.lastQuery = e
          ? this.transformDocument(this.options.query)
          : a.query));
      let o = !1,
        s = this.options.fetchPolicy !== `no-cache`;
      s || I(i, 85);
      let { finalize: c, pushNotification: l } = this.pushOperation(
        $.fetchMore
      );
      l(
        { source: `newNetworkStatus`, kind: `N`, value: {} },
        { shouldEmit: 3 }
      );
      let { promise: u, operator: d } = Js(),
        { observable: f } = this.queryManager.fetchObservableWithInfo(a, {
          networkStatus: $.fetchMore,
          exposeExtensions: !0,
        }),
        p = f
          .pipe(
            d,
            Fr((e) => e.kind === `N` && e.source === `network`)
          )
          .subscribe({
            next: (e) => {
              o = !1;
              let t = e.value,
                n = t[xa];
              if ((vo(e.value.networkStatus) && c(), s)) {
                let e = this.getCacheDiff();
                this.cache.batch({
                  update: (e) => {
                    i
                      ? e.updateQuery(
                          {
                            query: this.query,
                            variables: this.variables,
                            returnPartialData: !0,
                            optimistic: !1,
                            extensions: n,
                          },
                          (e) =>
                            i(e, {
                              fetchMoreResult: t.data,
                              variables: a.variables,
                            })
                        )
                      : e.writeQuery({
                          query: a.query,
                          variables: a.variables,
                          data: t.data,
                          extensions: n,
                        });
                  },
                  onWatchUpdated: (n, r) => {
                    if (n.watcher === this && !K(r.result, e.result)) {
                      o = !0;
                      let e = this.getCurrentResult();
                      yo(t.networkStatus) &&
                        l({
                          kind: `N`,
                          source: `network`,
                          value: {
                            ...e,
                            networkStatus:
                              t.networkStatus === $.error
                                ? $.ready
                                : t.networkStatus,
                            loading: !1,
                            data: r.result,
                            dataState:
                              t.dataState === `streaming`
                                ? `streaming`
                                : `complete`,
                          },
                        });
                    }
                  },
                });
              } else {
                let e = this.getCurrentResult(),
                  n = i(e.data, {
                    fetchMoreResult: t.data,
                    variables: a.variables,
                  });
                l({
                  kind: `N`,
                  value: {
                    ...e,
                    networkStatus: $.ready,
                    loading: !1,
                    data: n,
                    dataState:
                      e.dataState === `streaming` ? `streaming` : `complete`,
                  },
                  source: `network`,
                });
              }
            },
          });
      return Qi(
        u
          .then((e) => aa(this.maskResult(e)))
          .finally(() => {
            if ((p.unsubscribe(), c(), s && !o)) {
              let e = this.getCurrentResult();
              e.dataState === `streaming`
                ? l({
                    kind: `N`,
                    source: `network`,
                    value: {
                      ...e,
                      dataState: `complete`,
                      networkStatus: $.ready,
                    },
                  })
                : l(
                    { kind: `N`, source: `newNetworkStatus`, value: {} },
                    { shouldEmit: 1 }
                  );
            }
          })
      );
    }
    subscribeToMore(e) {
      let t = this.queryManager
        .startGraphQLSubscription({
          query: e.document,
          variables: e.variables,
          context: e.context,
        })
        .subscribe({
          next: (t) => {
            let { updateQuery: n, onError: r } = e,
              { error: i } = t;
            i
              ? r
                ? r(i)
                : I.error(86, i)
              : n &&
                this.updateQuery((e, r) => n(e, { subscriptionData: t, ...r }));
          },
        });
      return (
        this.subscriptions.add(t),
        () => {
          this.subscriptions.delete(t) && t.unsubscribe();
        }
      );
    }
    applyOptions(e) {
      let t = V(this.options, e || {});
      (Hs(this.options, t), this.updatePolling());
    }
    async setVariables(e) {
      return (
        (e = this.getVariablesWithDefaults(e)),
        K(this.variables, e)
          ? aa(this.getCurrentResult())
          : ((this.options.variables = e),
            this.hasObservers()
              ? this._reobserve(
                  {
                    fetchPolicy: this.options.initialFetchPolicy,
                    variables: e,
                  },
                  { newNetworkStatus: $.setVariables }
                )
              : aa(this.getCurrentResult()))
      );
    }
    updateQuery(e) {
      let { queryManager: t } = this,
        { result: n, complete: r } = this.getCacheDiff({ optimistic: !1 }),
        i = e(n, { variables: this.variables, complete: !!r, previousData: n });
      i &&
        (this.cache.writeQuery({
          query: this.options.query,
          data: i,
          variables: this.variables,
        }),
        t.broadcastQueries());
    }
    startPolling(e) {
      ((this.options.pollInterval = e), this.updatePolling());
    }
    stopPolling() {
      ((this.options.pollInterval = 0), this.updatePolling());
    }
    applyNextFetchPolicy(e, t) {
      if (t.nextFetchPolicy) {
        let { fetchPolicy: n = `cache-first`, initialFetchPolicy: r = n } = t;
        n === `standby` ||
          (typeof t.nextFetchPolicy == `function`
            ? (t.fetchPolicy = t.nextFetchPolicy.call(t, n, {
                reason: e,
                options: t,
                observable: this,
                initialFetchPolicy: r,
              }))
            : (t.fetchPolicy =
                e === `variables-changed` ? r : t.nextFetchPolicy));
      }
      return t.fetchPolicy;
    }
    fetch(e, t, n, r) {
      let i = this.options.fetchPolicy;
      e.context ??= {};
      let a = !1,
        { observable: o, fromLink: s } =
          this.queryManager.fetchObservableWithInfo(e, {
            networkStatus: t,
            query: n,
            onCacheHit: () => {
              a = !0;
            },
            fetchQueryOperator: (e) =>
              new k((n) => {
                try {
                  return e.subscribe({
                    next(e) {
                      ((a = !0), n.next(e));
                    },
                    error: (e) => n.error(e),
                    complete: () => n.complete(),
                  });
                } finally {
                  a ||
                    ((u.override = t),
                    this.input.next({
                      kind: `N`,
                      source: `newNetworkStatus`,
                      value: { resetError: !0 },
                      query: c,
                      variables: l,
                      meta: { shouldEmit: 3, fetchPolicy: i },
                    }));
                }
              }),
            observableQuery: this,
          }),
        { query: c, variables: l } = this,
        u = {
          abort: () => {
            f.unsubscribe();
          },
          query: c,
          variables: l,
        };
      this.activeOperations.add(u);
      let d = t == $.refetch || t == $.setVariables;
      o = o.pipe(r, Rr());
      let f = o
        .pipe(
          Vr({
            next: (e) => {
              e.source === `newNetworkStatus` ||
              (e.kind === `N` && e.value.loading)
                ? (u.override = t)
                : delete u.override;
            },
            finalize: () => this.activeOperations.delete(u),
          })
        )
        .subscribe({
          next: (e) => {
            let t = {};
            (d &&
              e.kind === `N` &&
              `loading` in e.value &&
              !e.value.loading &&
              ((d = !1), (t.shouldEmit = 1)),
              this.input.next({ ...e, query: c, variables: l, meta: t }));
          },
        });
      return { fromLink: s, subscription: f, observable: o };
    }
    didWarnCacheOnlyPolling = !1;
    updatePolling() {
      if (this.queryManager.ssrMode) return;
      let {
          pollingInfo: e,
          options: { fetchPolicy: t, pollInterval: n },
        } = this,
        r = () => {
          let { options: e } = this;
          return (
            !e.pollInterval ||
            !this.hasObservers() ||
            e.fetchPolicy === `cache-only` ||
            e.fetchPolicy === `standby`
          );
        };
      if (r()) return void this.cancelPolling();
      if (e?.interval === n) return;
      (e || (this.pollingInfo = {})).interval = n;
      let i = () => {
          if (r()) return this.cancelPolling();
          this.pollingInfo &&
            (yo(this.networkStatus) || this.options.skipPollAttempt?.()
              ? a()
              : this._reobserve(
                  {
                    fetchPolicy:
                      this.options.initialFetchPolicy === `no-cache`
                        ? `no-cache`
                        : `network-only`,
                  },
                  { newNetworkStatus: $.poll }
                ).then(a, a));
        },
        a = () => {
          let e = this.pollingInfo;
          e &&
            (clearTimeout(e.timeout), (e.timeout = setTimeout(i, e.interval)));
        };
      a();
    }
    cancelPolling() {
      this.pollingInfo &&
        (clearTimeout(this.pollingInfo.timeout), delete this.pollingInfo);
    }
    reobserve(e) {
      return this._reobserve(e);
    }
    _reobserve(e, t) {
      this.isTornDown = !1;
      let { newNetworkStatus: n } = t || {};
      this.queryManager.obsQueries.add(this);
      let r = n === $.refetch || n === $.poll,
        i = this.variables,
        a = this.options.fetchPolicy,
        o = V(this.options, e || {});
      this.variablesUnknown &&= o.fetchPolicy === `standby`;
      let s = r ? o : Hs(this.options, o),
        c = this.transformDocument(s.query);
      ((this.lastQuery = c),
        e &&
          `variables` in e &&
          (s.variables = this.getVariablesWithDefaults(e.variables)),
        r ||
          (this.updatePolling(),
          !e ||
            !e.variables ||
            K(e.variables, i) ||
            s.fetchPolicy === `standby` ||
            (s.fetchPolicy !== a && typeof s.nextFetchPolicy != `function`) ||
            (this.applyNextFetchPolicy(`variables-changed`, s),
            n === void 0 && (n = $.setVariables))));
      let l = this.networkStatus;
      (n ||
        ((n = $.loading),
        l !== $.loading &&
          e?.variables &&
          !K(e.variables, i) &&
          (n = $.setVariables),
        s.fetchPolicy === `standby` && (n = $.ready)),
        s.fetchPolicy === `standby` && this.cancelPolling(),
        this.resubscribeCache());
      let { promise: u, operator: d } = Js(
          s.fetchPolicy === `standby` ? { data: void 0 } : void 0
        ),
        {
          subscription: f,
          observable: p,
          fromLink: m,
        } = this.fetch(s, n, c, d);
      r ||
        (!m && this.linkSubscription) ||
        (this.linkSubscription && this.linkSubscription.unsubscribe(),
        (this.linkSubscription = f));
      let h = Object.assign(
        Qi(
          u
            .then((e) => aa(this.maskResult(e)))
            .finally(() => {
              this.hasObservers() ||
                this.activeOperations.size !== 0 ||
                this.tearDownQuery();
            })
        ),
        {
          retain: () => {
            let e = p.subscribe({}),
              t = () => e.unsubscribe();
            return (u.then(t, t), h);
          },
        }
      );
      return h;
    }
    hasObservers() {
      return this.subject.observed;
    }
    stop() {
      (this.subject.complete(),
        this.initializeObservablesQueue(),
        this.tearDownQuery());
    }
    tearDownQuery() {
      this.isTornDown ||
        (this.resetNotifications(),
        this.unsubscribeFromCache?.(),
        this.linkSubscription &&
          (this.linkSubscription.unsubscribe(), delete this.linkSubscription),
        this.stopPolling(),
        this.subscriptions.forEach((e) => e.unsubscribe()),
        this.subscriptions.clear(),
        this.queryManager.obsQueries.delete(this),
        (this.isTornDown = !0),
        this.abortActiveOperations(),
        (this._lastWrite = void 0));
    }
    transformDocument(e) {
      return this.queryManager.transform(e);
    }
    maskResult(e) {
      let t = this.queryManager.maskOperation({
        document: this.query,
        data: e.data,
        fetchPolicy: this.options.fetchPolicy,
        cause: this,
      });
      return t === e.data ? e : { ...e, data: t };
    }
    dirty = !1;
    notifyTimeout;
    resetNotifications() {
      ((this.notifyTimeout &&= (clearTimeout(this.notifyTimeout), void 0)),
        (this.dirty = !1));
    }
    scheduleNotify() {
      this.dirty ||
        ((this.dirty = !0),
        (this.notifyTimeout ||= setTimeout(() => this.notify(!0), 0)));
    }
    notify(e = !1) {
      if (!e) {
        let e = this.queryManager.getDocumentInfo(this.query);
        if (e.hasClientExports || e.hasForcedResolvers) return;
      }
      let { dirty: t } = this;
      if (
        (this.resetNotifications(),
        t &&
          (this.options.fetchPolicy === `cache-only` ||
            this.options.fetchPolicy === `cache-and-network` ||
            !this.activeOperations.size))
      ) {
        let e = this.getCacheDiff();
        K(e.result, this.getCacheDiff({ optimistic: !1 }).result)
          ? this.reobserveCacheFirst()
          : this.input.next({
              kind: `N`,
              value: {
                data: e.result,
                dataState: e.complete
                  ? `complete`
                  : e.result
                    ? `partial`
                    : `empty`,
                networkStatus: $.ready,
                loading: !1,
                error: void 0,
                partial: !e.complete,
              },
              source: `cache`,
              query: this.query,
              variables: this.variables,
              meta: {},
            });
      }
    }
    activeOperations = new Set();
    pushOperation(e) {
      let t = !1,
        { query: n, variables: r } = this,
        i = () => {
          this.activeOperations.delete(a);
        },
        a = {
          override: e,
          abort: () => {
            ((t = !0), i());
          },
          query: n,
          variables: r,
        };
      return (
        this.activeOperations.add(a),
        {
          finalize: i,
          pushNotification: (e, i) => {
            t ||
              this.input.next({ ...e, query: n, variables: r, meta: { ...i } });
          },
        }
      );
    }
    calculateNetworkStatus(e) {
      return e === $.streaming
        ? e
        : (Array.from(this.activeOperations.values())
            .reverse()
            .find((e) => qs(e, this) && e.override !== void 0)?.override ?? e);
    }
    abortActiveOperations() {
      this.activeOperations.forEach((e) => e.abort());
    }
    reset() {
      let e = this.options.fetchPolicy === `cache-only`;
      (this.setResult(e ? Gs : Ws, { shouldEmit: e ? 1 : 2 }),
        this.abortActiveOperations());
    }
    setResult(e, t) {
      this.input.next({
        source: `setResult`,
        kind: `N`,
        value: e,
        query: this.query,
        variables: this.variables,
        meta: { ...t },
      });
    }
    operator = oa((e) => {
      let { query: t, variables: n, meta: r } = e;
      if (e.source === `setResult`)
        return { query: t, variables: n, result: e.value, meta: r };
      if (e.kind === `C` || !qs(e, this)) return;
      let i,
        a = this.subject.getValue();
      if (e.source === `cache`) {
        if (
          ((i = e.value),
          i.networkStatus === $.ready &&
            i.partial &&
            (!this.options.returnPartialData ||
              a.result.networkStatus === $.error) &&
            this.options.fetchPolicy !== `cache-only`)
        )
          return;
      } else if (e.source === `network`)
        (this.waitForNetworkResult &&
          ((this.waitForNetworkResult = !1), this.resubscribeCache()),
          (i =
            e.kind === `E`
              ? {
                  ...(qs(a, e)
                    ? a.result
                    : { data: void 0, dataState: `empty`, partial: !0 }),
                  error: e.error,
                  networkStatus: $.error,
                  loading: !1,
                }
              : e.value),
          e.kind === `E` &&
            i.dataState === `streaming` &&
            (i.dataState = `complete`),
          i.error && (r.shouldEmit = 1));
      else if (e.source === `newNetworkStatus`) {
        let t = qs(a, e) ? a.result : this.getInitialResult(r.fetchPolicy),
          { resetError: n } = e.value,
          o = n ? void 0 : t.error,
          s = o ? $.error : $.ready;
        i = { ...t, error: o, networkStatus: s };
      }
      return (
        I(i),
        i.error || delete i.error,
        (i.networkStatus = this.calculateNetworkStatus(i.networkStatus)),
        (i.loading = yo(i.networkStatus)),
        (i = this.maskResult(i)),
        a.result.data !== void 0 &&
          i.data !== a.result.data &&
          K(i.data, a.result.data) &&
          (i.data = a.result.data),
        { query: t, variables: n, result: i, meta: r }
      );
    });
    reobserveCacheFirst() {
      let { fetchPolicy: e, nextFetchPolicy: t } = this.options;
      e === `cache-and-network` || e === `network-only`
        ? this.reobserve({
            fetchPolicy: `cache-first`,
            nextFetchPolicy(n, r) {
              return (
                (this.nextFetchPolicy = t),
                typeof this.nextFetchPolicy == `function`
                  ? this.nextFetchPolicy(n, r)
                  : e
              );
            },
          })
        : this.reobserve();
    }
    getVariablesWithDefaults(e) {
      return this.queryManager.getVariables(this.query, e);
    }
  };
function qs(e, t) {
  return !!(e && t && e.query === t.query && K(e.variables, t.variables));
}
function Js(e) {
  let t,
    n,
    r = e;
  return {
    promise: new Promise((e, r) => {
      ((t = e), (n = r));
    }),
    operator: Vr({
      next(e) {
        if (e.kind === `E`) return n(e.error);
        e.kind !== `N` ||
          e.source === `newNetworkStatus` ||
          e.value.loading ||
          (r = e.value);
      },
      finalize: () => {
        if (r) t(r);
        else {
          let e = `The operation was aborted.`,
            t = `AbortError`;
          n(
            typeof DOMException < `u`
              ? new DOMException(e, t)
              : Object.assign(Error(e), { name: t })
          );
        }
      },
    }),
  };
}
var Ys = {},
  Xs = new WeakMap();
function Zs(e, t) {
  let n = e[t];
  typeof n == `function` &&
    (e[t] = function () {
      return (
        Xs.set(e, (Xs.get(e) + 1) % 0x38d7ea4c68000),
        n.apply(this, arguments)
      );
    });
}
var Qs = new WeakMap(),
  $s = class {
    cache;
    queryManager;
    id;
    observableQuery;
    incremental;
    constructor(e, t) {
      let n = (this.cache = e.cache),
        r = (Qs.get(e) || 0) + 1;
      (Qs.set(e, r),
        (this.id = r + ``),
        (this.observableQuery = t),
        (this.queryManager = e),
        Xs.has(n) ||
          (Xs.set(n, 0), Zs(n, `evict`), Zs(n, `modify`), Zs(n, `reset`)));
    }
    _lastWrite;
    get lastWrite() {
      return (this.observableQuery || this)._lastWrite;
    }
    set lastWrite(e) {
      (this.observableQuery || this)._lastWrite = e;
    }
    resetLastWrite() {
      this.lastWrite = void 0;
    }
    shouldWrite(e, t) {
      let { lastWrite: n } = this;
      return !(
        n &&
        n.dmCount === Xs.get(this.cache) &&
        K(t, n.variables) &&
        K(e.data, n.result.data) &&
        e.extensions?.[q] === n.result.extensions?.[q]
      );
    }
    get hasNext() {
      return !!this.incremental && this.incremental.hasNext;
    }
    maybeHandleIncrementalResult(e, t, n) {
      let { incrementalHandler: r } = this.queryManager;
      return r.isIncrementalResult(t)
        ? ((this.incremental ||= r.startRequest({ query: n })),
          this.incremental.handle(e, t))
        : t;
    }
    markQueryResult(
      e,
      { document: t, variables: n, errorPolicy: r, cacheWriteBehavior: i }
    ) {
      let a = { query: t, variables: n, returnPartialData: !0, optimistic: !0 };
      this.observableQuery?.resetNotifications();
      let o = i === 0,
        s = o ? void 0 : this.cache.diff(a),
        c = this.maybeHandleIncrementalResult(s?.result, e, t);
      return (
        o ||
          (ec(c, r)
            ? this.cache.batch({
                onWatchUpdated: (e, t) => {
                  e.watcher === this.observableQuery && (e.lastOwnDiff = t);
                },
                update: (e) => {
                  if (this.shouldWrite(c, n))
                    (e.writeQuery({
                      query: t,
                      data: c.data,
                      variables: n,
                      overwrite: i === 1,
                      extensions: c.extensions,
                    }),
                      (this.lastWrite = {
                        result: c,
                        variables: n,
                        dmCount: Xs.get(this.cache),
                      }));
                  else if (s && s.complete)
                    return void (c = { ...c, data: s.result });
                  let r = e.diff(a);
                  r.complete && (c = { ...c, data: r.result });
                },
              })
            : (this.lastWrite = void 0)),
        c
      );
    }
    markMutationResult(e, t, n = this.cache) {
      let r = [],
        i = t.cacheWriteBehavior === 0,
        a = this.maybeHandleIncrementalResult(
          i
            ? void 0
            : n.diff({
                id: `ROOT_MUTATION`,
                query: this.queryManager.getDocumentInfo(t.document).asQuery,
                variables: t.variables,
                optimistic: !1,
                returnPartialData: !0,
              }).result,
          e,
          t.document
        );
      if (
        (t.errorPolicy === `ignore` && (a = { ...a, errors: [] }),
        Wi(a) && t.errorPolicy === `none`)
      )
        return Promise.resolve(a);
      let o = () => ({
        ...a,
        dataState: this.hasNext ? `streaming` : `complete`,
      });
      if (!i && ec(a, t.errorPolicy)) {
        r.push({
          result: a.data,
          dataId: `ROOT_MUTATION`,
          query: t.document,
          variables: t.variables,
          extensions: a.extensions,
        });
        let { updateQueries: e } = t;
        e &&
          this.queryManager.getObservableQueries(`all`).forEach((t) => {
            let n = t && t.queryName;
            if (!n || !Object.hasOwnProperty.call(e, n)) return;
            let i = e[n],
              { query: a, variables: s } = t,
              { result: c, complete: l } = t.getCacheDiff({ optimistic: !1 });
            if (l && c) {
              let e = i(c, {
                mutationResult: o(),
                queryName: (a && si(a)) || void 0,
                queryVariables: s,
              });
              e &&
                r.push({
                  result: e,
                  dataId: `ROOT_QUERY`,
                  query: a,
                  variables: s,
                });
            }
          });
      }
      let s = t.refetchQueries;
      if (
        (typeof s == `function` && (s = s(o())),
        r.length > 0 ||
          (s || ``).length > 0 ||
          t.update ||
          t.onQueryUpdated ||
          t.removeOptimistic)
      ) {
        let e = [];
        if (
          (this.queryManager
            .refetchQueries({
              updateCache: (e) => {
                i || r.forEach((t) => e.write(t));
                let { update: n } = t;
                if (n) {
                  if (!i) {
                    let n = e.diff({
                      id: `ROOT_MUTATION`,
                      query: this.queryManager.getDocumentInfo(t.document)
                        .asQuery,
                      variables: t.variables,
                      optimistic: !1,
                      returnPartialData: !0,
                    });
                    n.complete && (a = { ...a, data: n.result });
                  }
                  this.hasNext ||
                    n(e, a, { context: t.context, variables: t.variables });
                }
                i ||
                  t.keepRootFields ||
                  this.hasNext ||
                  e.modify({
                    id: `ROOT_MUTATION`,
                    fields: (e, { fieldName: t, DELETE: n }) =>
                      t === `__typename` ? e : n,
                  });
              },
              include: s,
              optimistic: !1,
              removeOptimistic: t.removeOptimistic,
              onQueryUpdated: t.onQueryUpdated || null,
            })
            .forEach((t) => e.push(t)),
          t.awaitRefetchQueries || t.onQueryUpdated)
        )
          return Promise.all(e).then(() => a);
      }
      return Promise.resolve(a);
    }
    markMutationOptimistic(e, t) {
      let n = typeof e == `function` ? e(t.variables, { IGNORE: Ys }) : e;
      return (
        n !== Ys &&
        (this.cache.recordOptimisticTransaction((e) => {
          try {
            this.markMutationResult({ data: n }, t, e);
          } catch (e) {
            I.error(e);
          }
        }, this.id),
        !0)
      );
    }
    markSubscriptionResult(
      e,
      { document: t, variables: n, errorPolicy: r, cacheWriteBehavior: i }
    ) {
      i !== 0 &&
        (ec(e, r) &&
          this.cache.write({
            query: t,
            result: e.data,
            dataId: `ROOT_SUBSCRIPTION`,
            variables: n,
            extensions: e.extensions,
          }),
        this.queryManager.broadcastQueries());
    }
  };
function ec(e, t = `none`) {
  let n = t === `ignore` || t === `all`,
    r = !Wi(e);
  return (!r && n && e.data && (r = !0), r);
}
var tc = class {
  defaultOptions;
  client;
  clientOptions;
  assumeImmutableResults;
  documentTransform;
  ssrMode;
  defaultContext;
  dataMasking;
  incrementalHandler;
  localState;
  queryDeduplication;
  prioritizeCacheValues = !1;
  onBroadcast;
  mutationStore;
  obsQueries = new Set();
  fetchCancelFns = new Map();
  constructor(e) {
    let t = new po((e) => this.cache.transformDocument(e), { cache: !1 });
    ((this.client = e.client),
      (this.defaultOptions = e.defaultOptions),
      (this.queryDeduplication = e.queryDeduplication),
      (this.clientOptions = e.clientOptions),
      (this.ssrMode = e.ssrMode),
      (this.assumeImmutableResults = e.assumeImmutableResults),
      (this.dataMasking = e.dataMasking),
      (this.localState = e.localState),
      (this.incrementalHandler = e.incrementalHandler));
    let n = e.documentTransform;
    ((this.documentTransform = n ? t.concat(n).concat(t) : t),
      (this.defaultContext = e.defaultContext || {}),
      (this.onBroadcast = e.onBroadcast) && (this.mutationStore = {}));
  }
  get link() {
    return this.client.link;
  }
  get cache() {
    return this.client.cache;
  }
  stop() {
    (this.obsQueries.forEach((e) => e.stop()),
      this.cancelPendingFetches(L(89)));
  }
  cancelPendingFetches(e) {
    (this.fetchCancelFns.forEach((t) => t(e)), this.fetchCancelFns.clear());
  }
  async mutate({
    mutation: e,
    variables: t,
    optimisticResponse: n,
    updateQueries: r,
    refetchQueries: i = [],
    awaitRefetchQueries: a = !1,
    update: o,
    onQueryUpdated: s,
    fetchPolicy: c,
    errorPolicy: l,
    keepRootFields: u,
    context: d,
  }) {
    let f = new $s(this);
    e = this.cache.transformForLink(this.transform(e));
    let { hasClientExports: p } = this.getDocumentInfo(e);
    ((t = this.getVariables(e, t)),
      p &&
        (t = await this.localState.getExportedVariables({
          client: this.client,
          document: e,
          variables: t,
          context: d,
        })));
    let m =
        this.mutationStore &&
        (this.mutationStore[f.id] = {
          mutation: e,
          variables: t,
          loading: !0,
          error: null,
        }),
      h =
        n &&
        f.markMutationOptimistic(n, {
          document: e,
          variables: t,
          cacheWriteBehavior: c === `no-cache` ? 0 : 2,
          errorPolicy: l,
          context: d,
          updateQueries: r,
          update: o,
          keepRootFields: u,
        });
    return (
      this.broadcastQueries(),
      new Promise((p, g) => {
        let ee = {};
        return this.getObservableFromLink(
          e,
          { ...d, optimisticResponse: h ? n : void 0 },
          t,
          c,
          {},
          !1
        )
          .observable.pipe(
            nc(),
            Er((n) => {
              let p = { ...n };
              return yr(
                f.markMutationResult(p, {
                  document: e,
                  variables: t,
                  cacheWriteBehavior: c === `no-cache` ? 0 : 2,
                  errorPolicy: l,
                  context: d,
                  update: o,
                  updateQueries: r,
                  awaitRefetchQueries: a,
                  refetchQueries: i,
                  removeOptimistic: h ? f.id : void 0,
                  onQueryUpdated: s,
                  keepRootFields: u,
                })
              );
            })
          )
          .pipe(
            P((e) => {
              if (Wi(e) && l === `none`) throw new Fs(ic(e));
              return (m && ((m.loading = !1), (m.error = null)), e);
            })
          )
          .subscribe({
            next: (t) => {
              if ((this.broadcastQueries(), !f.hasNext)) {
                let n = {
                  data: this.maskOperation({
                    document: e,
                    data: t.data,
                    fetchPolicy: c,
                    cause: ee,
                  }),
                };
                (Wi(t) && (n.error = new Fs(t)),
                  Object.keys(t.extensions || {}).length &&
                    (n.extensions = t.extensions),
                  p(n));
              }
            },
            error: (e) => (
              m && ((m.loading = !1), (m.error = e)),
              h && this.cache.removeOptimistic(f.id),
              this.broadcastQueries(),
              l === `ignore`
                ? p({ data: void 0 })
                : l === `all`
                  ? p({ data: void 0, error: e })
                  : void g(e)
            ),
          });
      })
    );
  }
  fetchQuery(e, t) {
    return (
      B(e.query, ce),
      (async () =>
        (function (e, t) {
          var n = typeof t == `object`;
          return new Promise(function (r, i) {
            var a,
              o = !1;
            e.subscribe({
              next: function (e) {
                ((a = e), (o = !0));
              },
              error: i,
              complete: function () {
                o ? r(a) : n ? r(t.defaultValue) : i(new Cr());
              },
            });
          });
        })(
          this.fetchObservableWithInfo(e, { networkStatus: t }).observable.pipe(
            oa((e) => {
              switch (e.kind) {
                case `E`:
                  throw e.error;
                case `N`:
                  if (e.source !== `newNetworkStatus`) return aa(e.value);
              }
            })
          ),
          { defaultValue: { data: void 0 } }
        ))()
    );
  }
  transform(e) {
    return this.documentTransform.transformDocument(e);
  }
  transformCache = new Si(R[`queryManager.getDocumentInfo`] || 2e3);
  getDocumentInfo(e) {
    let { transformCache: t } = this;
    if (!t.has(e)) {
      let n = U(e),
        r = {
          hasClientExports: Gi([`client`, `export`], e, !0),
          hasForcedResolvers: Ki(e),
          hasNonreactiveDirective: Gi([`nonreactive`], e),
          hasIncrementalDirective: Gi([`defer`], e),
          nonReactiveQuery: rc(e),
          clientQuery: Gi([`client`], e) ? e : null,
          serverQuery: $i(
            [
              { name: `client`, remove: !0 },
              { name: `connection` },
              { name: `nonreactive` },
              { name: `unmask` },
            ],
            e
          ),
          operationType: n?.operation,
          defaultVars: ji(n),
          asQuery: {
            ...e,
            definitions: e.definitions.map((e) =>
              e.kind === `OperationDefinition` && e.operation !== `query`
                ? { ...e, operation: `query` }
                : e
            ),
          },
        };
      t.set(e, r);
    }
    let n = t.get(e);
    if (n.violation) throw n.violation;
    return n;
  }
  getVariables(e, t) {
    let n = this.getDocumentInfo(e).defaultVars,
      r = Object.entries(t ?? {}).map(([e, t]) => [e, t === void 0 ? n[e] : t]);
    return { ...n, ...Object.fromEntries(r) };
  }
  watchQuery(e) {
    B(e.query, ce);
    let t = this.transform(e.query);
    return (
      (e = { ...e, variables: this.getVariables(t, e.variables) })
        .notifyOnNetworkStatusChange === void 0 &&
        (e.notifyOnNetworkStatusChange = !0),
      new Ks({ queryManager: this, options: e, transformedQuery: t })
    );
  }
  query(e) {
    let t = this.transform(e.query);
    return this.fetchQuery({ ...e, query: t }).then((n) => ({
      ...n,
      data: this.maskOperation({
        document: t,
        data: n?.data,
        fetchPolicy: e.fetchPolicy,
      }),
    }));
  }
  clearStore(e = { discardWatches: !0 }) {
    return (
      this.cancelPendingFetches(L(91)),
      this.obsQueries.forEach((e) => {
        e.reset();
      }),
      (this.mutationStore &&= {}),
      this.cache.reset(e)
    );
  }
  getObservableQueries(e = `active`) {
    let t = new Set(),
      n = new Map(),
      r = new Map(),
      i = new Set();
    return (
      Array.isArray(e) &&
        e.forEach((e) => {
          if (typeof e == `string`) (n.set(e, e), r.set(e, !1));
          else if (
            H((t = e)) &&
            t.kind === `Document` &&
            Array.isArray(t.definitions)
          ) {
            let t = mo(this.transform(e));
            (n.set(t, si(e)), r.set(t, !1));
          } else H(e) && e.query && i.add(e);
          var t;
        }),
      this.obsQueries.forEach((n) => {
        let i = mo(this.transform(n.options.query));
        if (e === `all`) return void t.add(n);
        let {
          queryName: a,
          options: { fetchPolicy: o },
        } = n;
        (e === `active` && o === `standby`) ||
          ((e === `active` || (a && r.has(a)) || (i && r.has(i))) &&
            (t.add(n), a && r.set(a, !0), i && r.set(i, !0)));
      }),
      i.size &&
        i.forEach((e) => {
          let n = new Ks({
            queryManager: this,
            options: {
              ...Zi(this.defaultOptions.watchQuery, e),
              fetchPolicy: `network-only`,
            },
          });
          t.add(n);
        }),
      t
    );
  }
  refetchObservableQueries(e = !1) {
    let t = [];
    return (
      this.getObservableQueries(e ? `all` : `active`).forEach((n) => {
        let { fetchPolicy: r } = n.options;
        (!e && r === `standby`) || r === `cache-only` || t.push(n.refetch());
      }),
      this.broadcastQueries(),
      Promise.all(t)
    );
  }
  startGraphQLSubscription(e) {
    let { query: t, variables: n } = e,
      {
        fetchPolicy: r = `cache-first`,
        errorPolicy: i = `none`,
        context: a = {},
        extensions: o = {},
      } = e,
      s;
    (B(t, ue), (t = this.transform(t)), (n = this.getVariables(t, n)));
    let c = (
      this.getDocumentInfo(t).hasClientExports
        ? yr(
            this.localState.getExportedVariables({
              client: this.client,
              document: t,
              variables: n,
              context: a,
            })
          )
        : br(n)
    ).pipe(
      Er((e) => {
        let { observable: n, restart: c } = this.getObservableFromLink(
            t,
            a,
            e,
            r,
            o
          ),
          l = new $s(this);
        return (
          (s = c),
          n.pipe(
            P((n) => {
              l.markSubscriptionResult(n, {
                document: t,
                variables: e,
                errorPolicy: i,
                cacheWriteBehavior: r === `no-cache` ? 0 : 2,
              });
              let a = { data: n.data ?? void 0 };
              return (
                Wi(n)
                  ? (a.error = new Fs(n))
                  : (function (e) {
                      return `extensions` in e && Ms.is(e.extensions[Vs]);
                    })(n) &&
                    ((a.error = n.extensions[Vs]), delete n.extensions[Vs]),
                n.extensions &&
                  Object.keys(n.extensions).length &&
                  (a.extensions = n.extensions),
                a.error && i === `none` && (a.data = void 0),
                i === `ignore` && delete a.error,
                a
              );
            }),
            Ir((e) =>
              br(i === `ignore` ? { data: void 0 } : { data: void 0, error: e })
            ),
            Fr((e) => !(!e.data && !e.error))
          )
        );
      })
    );
    return Object.assign(c, { restart: () => s?.() });
  }
  broadcastQueries() {
    (this.onBroadcast && this.onBroadcast(),
      this.obsQueries.forEach((e) => e.notify()));
  }
  inFlightLinkObservables = new z(!1);
  getObservableFromLink(
    e,
    t,
    n,
    r,
    i,
    a = t?.queryDeduplication ?? this.queryDeduplication
  ) {
    let o = {},
      {
        serverQuery: s,
        clientQuery: c,
        operationType: l,
        hasIncrementalDirective: u,
      } = this.getDocumentInfo(e),
      d = si(e),
      f = { client: this.client };
    if (s) {
      let { inFlightLinkObservables: e, link: r } = this;
      try {
        let c = this.incrementalHandler.prepareRequest({
          query: s,
          variables: n,
          context: { ...this.defaultContext, ...t, queryDeduplication: a },
          extensions: i,
        });
        function u(e) {
          return new k((t) => {
            function n() {
              return e.subscribe({
                next: t.next.bind(t),
                complete: t.complete.bind(t),
                error: t.error.bind(t),
              });
            }
            let r = n();
            return (
              (o.restart ||= () => {
                (r.unsubscribe(), (r = n()));
              }),
              () => {
                (r.unsubscribe(), (o.restart = void 0));
              }
            );
          });
        }
        if (((t = c.context), a)) {
          let t = mo(s),
            i = W(n);
          ((o = e.lookup(t, i)),
            (o.observable ||= lo(r, c, f).pipe(
              u,
              ((p = () => {
                e.peek(t, i) === o && e.remove(t, i);
              }),
              A(function (e, t) {
                try {
                  e.subscribe(t);
                } finally {
                  t.add(p);
                }
              })),
              l === ue ? Rr() : Br({ refCount: !0 })
            )));
        } else o.observable = lo(r, c, f).pipe(u);
      } catch (e) {
        o.observable = xr(() => e);
      }
    } else o.observable = br({ data: {} });
    var p;
    if (c) {
      let { operation: i } = U(e);
      (I(!u, 96, i[0].toUpperCase() + i.slice(1), d ?? `(anonymous)`),
        (o.observable = o.observable.pipe(
          Er((e) =>
            yr(
              this.localState.execute({
                client: this.client,
                document: c,
                remoteResult: e,
                context: t,
                variables: n,
                fetchPolicy: r,
              })
            )
          )
        )));
    }
    return {
      restart: () => o.restart?.(),
      observable: o.observable.pipe(
        Ir((e) => {
          throw (
            (function (e) {
              Is.add(e);
            })(
              (e = (function (e) {
                return (function (e) {
                  return (
                    typeof e == `object` &&
                    !!e &&
                    typeof e.message == `string` &&
                    typeof e.name == `string` &&
                    (typeof e.stack == `string` || e.stack === void 0)
                  );
                })(e)
                  ? e
                  : typeof e == `string`
                    ? Error(e, { cause: e })
                    : new Ns(e);
              })(e))
            ),
            e
          );
        })
      ),
    };
  }
  getResultsFromLink(
    e,
    {
      queryInfo: t,
      cacheWriteBehavior: n,
      observableQuery: r,
      exposeExtensions: i,
    }
  ) {
    let { errorPolicy: a } = e,
      o = this.cache.transformForLink(e.query);
    return this.getObservableFromLink(
      o,
      e.context,
      e.variables,
      e.fetchPolicy
    ).observable.pipe(
      P((s) => {
        let c = t.markQueryResult(s, {
            ...e,
            document: o,
            cacheWriteBehavior: n,
          }),
          l = Wi(c);
        if (l && a === `none`)
          throw (t.resetLastWrite(), r?.resetNotifications(), new Fs(ic(c)));
        let u = {
          data: c.data,
          ...(t.hasNext
            ? {
                loading: !0,
                networkStatus: $.streaming,
                dataState: `streaming`,
                partial: !0,
              }
            : {
                dataState: c.data ? `complete` : `empty`,
                loading: !1,
                networkStatus: $.ready,
                partial: !c.data,
              }),
        };
        return (
          i && `extensions` in c && (u[xa] = c.extensions),
          l &&
            (a === `none` && ((u.data = void 0), (u.dataState = `empty`)),
            a !== `ignore` &&
              ((u.error = new Fs(ic(c))),
              u.dataState !== `streaming` && (u.networkStatus = $.error))),
          u
        );
      }),
      Ir((e) => {
        if (a === `none`)
          throw (t.resetLastWrite(), r?.resetNotifications(), e);
        let n = {
          data: void 0,
          dataState: `empty`,
          loading: !1,
          networkStatus: $.ready,
          partial: !0,
        };
        return (
          a !== `ignore` && ((n.error = e), (n.networkStatus = $.error)),
          br(n)
        );
      })
    );
  }
  fetchObservableWithInfo(
    e,
    {
      networkStatus: t = $.loading,
      query: n = e.query,
      fetchQueryOperator: r = (e) => e,
      onCacheHit: i = () => {},
      observableQuery: a,
      exposeExtensions: o,
    }
  ) {
    let s = this.getVariables(n, e.variables),
      {
        fetchPolicy: c = `cache-first`,
        errorPolicy: l = `none`,
        returnPartialData: u = !1,
        notifyOnNetworkStatusChange: d = !0,
        context: f = {},
      } = e;
    !this.prioritizeCacheValues ||
      (c !== `network-only` && c !== `cache-and-network`) ||
      (c = `cache-first`);
    let p = Object.assign({}, e, {
        query: n,
        variables: s,
        fetchPolicy: c,
        errorPolicy: l,
        returnPartialData: u,
        notifyOnNetworkStatusChange: d,
        context: f,
      }),
      m = new $s(this, a),
      h = (n) => {
        p.variables = n;
        let s =
            c === `no-cache`
              ? 0
              : t === $.refetch && p.refetchWritePolicy !== `merge`
                ? 1
                : 2,
          l = this.fetchQueryByPolicy(p, {
            queryInfo: m,
            cacheWriteBehavior: s,
            onCacheHit: i,
            observableQuery: a,
            exposeExtensions: o,
          });
        return (
          (l.observable = l.observable.pipe(r)),
          p.fetchPolicy !== `standby` &&
            a?.applyNextFetchPolicy(`after-fetch`, e),
          l
        );
      },
      g = () => {
        this.fetchCancelFns.delete(m.id);
      };
    this.fetchCancelFns.set(m.id, (e) => {
      ee.next({ kind: `E`, error: e, source: `network` });
    });
    let ee = new Gn(),
      te,
      ne;
    if (this.getDocumentInfo(p.query).hasClientExports)
      ((te = yr(
        this.localState.getExportedVariables({
          client: this.client,
          document: p.query,
          variables: p.variables,
          context: p.context,
        })
      ).pipe(Er((e) => h(e).observable))),
        (ne = !0));
    else {
      let e = h(p.variables);
      ((ne = e.fromLink), (te = e.observable));
    }
    return {
      observable: new k((e) => {
        (e.add(g), te.subscribe(e), ee.subscribe(e));
      }).pipe(Rr()),
      fromLink: ne,
    };
  }
  refetchQueries({
    updateCache: e,
    include: t,
    optimistic: n = !1,
    removeOptimistic: r = n ? Kr(`refetchQueries`) : void 0,
    onQueryUpdated: i,
  }) {
    let a = new Map();
    t &&
      this.getObservableQueries(t).forEach((e) => {
        if (e.options.fetchPolicy === `cache-only` || e.variablesUnknown)
          return;
        let t = e.getCurrentResult();
        a.set(e, {
          oq: e,
          lastDiff: { result: t?.data, complete: !t?.partial },
        });
      });
    let o = new Map();
    if (e) {
      let t = new Set();
      this.cache.batch({
        update: e,
        optimistic: (n && r) || !1,
        removeOptimistic: r,
        onWatchUpdated(e, n, r) {
          let s = e.watcher;
          if (s instanceof Ks && !t.has(s)) {
            if ((t.add(s), i)) {
              a.delete(s);
              let e = i(s, n, r);
              return (
                !0 === e && (e = s.refetch().retain()),
                !1 !== e && o.set(s, e),
                e
              );
            }
            i !== null &&
              s.options.fetchPolicy !== `cache-only` &&
              a.set(s, { oq: s, lastDiff: r, diff: n });
          }
        },
      });
    }
    return (
      a.size &&
        a.forEach(({ oq: e, lastDiff: t, diff: n }) => {
          let r;
          (i && ((n ||= e.getCacheDiff()), (r = i(e, n, t))),
            (i && !0 !== r) || (r = e.refetch().retain()),
            !1 !== r && o.set(e, r));
        }),
      r && this.cache.removeOptimistic(r),
      o
    );
  }
  noCacheWarningsByCause = new WeakSet();
  maskOperation(e) {
    let { document: t, data: n } = e;
    return this.dataMasking
      ? (function (e, t, n) {
          let r = U(t);
          return (
            I(r, 43),
            e == null
              ? e
              : Ko(e, r.selectionSet, {
                  operationType: r.operation,
                  operationName: r.name?.value,
                  fragmentMap: Ei(Fi(t)),
                  cache: n,
                  mutableTargets: new WeakMap(),
                  knownChanged: new WeakSet(),
                })
          );
        })(n, t, this.cache)
      : n;
  }
  maskFragment(e) {
    let { data: t, fragment: n, fragmentName: r } = e;
    return this.dataMasking
      ? (function (e, t, n, r) {
          let i = t.definitions.filter((e) => e.kind === Se);
          r === void 0 &&
            (I(i.length === 1, 41, i.length), (r = i[0].name.value));
          let a = i.find((e) => e.name.value === r);
          return (
            I(!!a, 42, r),
            e == null || K(e, {})
              ? e
              : Ko(e, a.selectionSet, {
                  operationType: `fragment`,
                  operationName: a.name.value,
                  fragmentMap: Ei(Fi(t)),
                  cache: n,
                  mutableTargets: new WeakMap(),
                  knownChanged: new WeakSet(),
                })
          );
        })(t, n, this.cache, r)
      : t;
  }
  fetchQueryByPolicy(
    {
      query: e,
      variables: t,
      fetchPolicy: n,
      errorPolicy: r,
      returnPartialData: i,
      context: a,
    },
    {
      cacheWriteBehavior: o,
      onCacheHit: s,
      queryInfo: c,
      observableQuery: l,
      exposeExtensions: u,
    }
  ) {
    let d = () =>
        this.cache.diff({
          query: e,
          variables: t,
          returnPartialData: !0,
          optimistic: !0,
        }),
      f = (o, c) => {
        let l = o.result,
          u = (e) => (
            o.complete || i || (e = void 0),
            {
              data: e,
              dataState: o.complete ? `complete` : e ? `partial` : `empty`,
              loading: yo(c),
              networkStatus: c,
              partial: !o.complete,
            }
          ),
          d = (e) => br({ kind: `N`, value: u(e), source: `cache` });
        return (o.complete || i) && this.getDocumentInfo(e).hasForcedResolvers
          ? (s(),
            yr(
              this.localState
                .execute({
                  client: this.client,
                  document: e,
                  remoteResult: l ? { data: l } : void 0,
                  context: a,
                  variables: t,
                  onlyRunForcedResolvers: !0,
                  returnPartialData: !0,
                  fetchPolicy: n,
                })
                .then((e) => ({
                  kind: `N`,
                  value: u(e.data || void 0),
                  source: `cache`,
                }))
            ))
          : r === `none` && c === $.refetch && o.missing
            ? d(void 0)
            : d(l || void 0);
      },
      p = () =>
        this.getResultsFromLink(
          {
            query: e,
            variables: t,
            context: a,
            fetchPolicy: n,
            errorPolicy: r,
          },
          {
            cacheWriteBehavior: o,
            queryInfo: c,
            observableQuery: l,
            exposeExtensions: u,
          }
        ).pipe(
          nc(),
          A(function (e, t) {
            e.subscribe(
              j(
                t,
                function (e) {
                  t.next(Sr.createNext(e));
                },
                function () {
                  (t.next(Sr.createComplete()), t.complete());
                },
                function (e) {
                  (t.next(Sr.createError(e)), t.complete());
                }
              )
            );
          }),
          P((e) => ({ ...e, source: `network` }))
        );
    switch (n) {
      default:
      case `cache-first`: {
        let e = d();
        return e.complete
          ? { fromLink: !1, observable: f(e, $.ready) }
          : i
            ? { fromLink: !0, observable: Or(f(e, $.loading), p()) }
            : { fromLink: !0, observable: p() };
      }
      case `cache-and-network`: {
        let e = d();
        return e.complete || i
          ? { fromLink: !0, observable: Or(f(e, $.loading), p()) }
          : { fromLink: !0, observable: p() };
      }
      case `cache-only`:
        return { fromLink: !1, observable: Or(f(d(), $.ready)) };
      case `network-only`:
      case `no-cache`:
        return { fromLink: !0, observable: p() };
      case `standby`:
        return { fromLink: !1, observable: tr };
    }
  }
};
function nc() {
  let e = !1;
  return Vr({
    next() {
      e = !0;
    },
    complete() {
      I(e, 100);
    },
  });
}
function rc(e) {
  return _(e, {
    FragmentSpread: (e) => {
      if (!e.directives?.some((e) => e.name.value === `unmask`))
        return {
          ...e,
          directives: [
            ...(e.directives || []),
            { kind: Ne, name: { kind: fe, value: `nonreactive` } },
          ],
        };
    },
  });
}
function ic(e) {
  if (e.extensions?.[q] == null) return e;
  let {
    extensions: { [q]: t, ...n },
    ...r
  } = e;
  return (Object.keys(n).length > 0 && (r.extensions = n), r);
}
var ac = class {
    link;
    cache;
    disableNetworkFetches;
    set prioritizeCacheValues(e) {
      this.queryManager.prioritizeCacheValues = e;
    }
    get prioritizeCacheValues() {
      return this.queryManager.prioritizeCacheValues;
    }
    version;
    queryDeduplication;
    defaultOptions;
    devtoolsConfig;
    refetchEventManager;
    queryManager;
    devToolsHookCb;
    resetStoreCallbacks = [];
    clearStoreCallbacks = [];
    constructor(e) {
      let {
        cache: t,
        documentTransform: n,
        ssrMode: r = !1,
        ssrForceFetchDelay: i = 0,
        queryDeduplication: a = !0,
        defaultOptions: o,
        defaultContext: s,
        assumeImmutableResults: c = t.assumeImmutableResults,
        localState: l,
        devtools: u,
        dataMasking: d,
        link: f,
        incrementalHandler: p = new io(),
        experiments: m = [],
        refetchEventManager: h,
      } = e;
      ((this.link = f),
        (this.cache = t),
        (this.queryDeduplication = a),
        (this.defaultOptions = o || {}),
        (this.devtoolsConfig = { ...u, enabled: u?.enabled ?? !1 }),
        (this.watchQuery = this.watchQuery.bind(this)),
        (this.query = this.query.bind(this)),
        (this.mutate = this.mutate.bind(this)),
        (this.watchFragment = this.watchFragment.bind(this)),
        (this.resetStore = this.resetStore.bind(this)),
        (this.reFetchObservableQueries = this.refetchObservableQueries =
          this.refetchObservableQueries.bind(this)),
        (this.version = Ur),
        (this.queryManager = new tc({
          client: this,
          defaultOptions: this.defaultOptions,
          defaultContext: s,
          documentTransform: n,
          queryDeduplication: a,
          ssrMode: r,
          dataMasking: !!d,
          clientOptions: e,
          incrementalHandler: p,
          assumeImmutableResults: c,
          onBroadcast: this.devtoolsConfig.enabled
            ? () => {
                this.devToolsHookCb && this.devToolsHookCb();
              }
            : void 0,
          localState: l,
        })),
        (this.prioritizeCacheValues = r || i > 0),
        i &&
          setTimeout(() => {
            this.prioritizeCacheValues = !1;
          }, i),
        this.devtoolsConfig.enabled && this.connectToDevTools(),
        m.forEach((t) => t.call(this, e)),
        (this.refetchEventManager = h),
        this.refetchEventManager?.connect(this));
    }
    connectToDevTools() {
      if (typeof window > `u`) return;
      let e = window,
        t = Symbol.for(`apollo.devtools`);
      ((e[t] = e[t] || []).push(this), (e.__APOLLO_CLIENT__ = this));
    }
    get documentTransform() {
      return this.queryManager.documentTransform;
    }
    get localState() {
      return this.queryManager.localState;
    }
    set localState(e) {
      this.queryManager.localState = e;
    }
    stop() {
      (this.queryManager.stop(), this.refetchEventManager?.disconnect(this));
    }
    watchQuery(e) {
      let { refetchOn: t } = e;
      if (this.defaultOptions.watchQuery) {
        let n = this.defaultOptions.watchQuery.refetchOn,
          r;
        (t &&
          typeof t == `object` &&
          (typeof n == `object`
            ? (r = { ...n, ...t })
            : n != null &&
              (r = (e) => {
                let r = t[e.source] ?? n;
                return typeof r == `function` ? r(e) : r;
              })),
          (e = Zi(this.defaultOptions.watchQuery, e)),
          r && (e.refetchOn = r));
      }
      return this.queryManager.watchQuery(e);
    }
    query = (e) => (
      this.defaultOptions.query && (e = Zi(this.defaultOptions.query, e)),
      this.queryManager.query(e)
    );
    mutate = (e) => {
      let t = Zi(
        V(
          { fetchPolicy: `network-only`, errorPolicy: `none` },
          this.defaultOptions.mutate
        ),
        e
      );
      return (B(t.mutation, le), this.queryManager.mutate(t));
    };
    subscribe(e) {
      let t = {},
        n = this.queryManager.startGraphQLSubscription(e),
        r = n.pipe(
          P((n) => ({
            ...n,
            data: this.queryManager.maskOperation({
              document: e.query,
              data: n.data,
              fetchPolicy: e.fetchPolicy,
              cause: t,
            }),
          }))
        );
      return Object.assign(r, { restart: n.restart });
    }
    readQuery(e, t = !!e.optimistic) {
      return this.cache.readQuery({ ...e, query: this.transform(e.query) }, t);
    }
    watchFragment(e) {
      let t = this.queryManager.dataMasking;
      return this.cache.watchFragment({
        ...e,
        fragment: this.transform(e.fragment, t),
      });
    }
    readFragment(e, t = !!e.optimistic) {
      return this.cache.readFragment(
        { ...e, fragment: this.transform(e.fragment) },
        t
      );
    }
    writeQuery(e) {
      let t = this.cache.writeQuery(e);
      return (!1 !== e.broadcast && this.queryManager.broadcastQueries(), t);
    }
    writeFragment(e) {
      let t = this.cache.writeFragment(e);
      return (!1 !== e.broadcast && this.queryManager.broadcastQueries(), t);
    }
    __actionHookForDevTools(e) {
      this.devToolsHookCb = e;
    }
    __requestRaw(e) {
      return lo(this.link, e, { client: this });
    }
    resetStore() {
      return Promise.resolve()
        .then(() => this.queryManager.clearStore({ discardWatches: !1 }))
        .then(() => Promise.all(this.resetStoreCallbacks.map((e) => e())))
        .then(() => this.refetchObservableQueries());
    }
    clearStore() {
      return Promise.resolve()
        .then(() => this.queryManager.clearStore({ discardWatches: !0 }))
        .then(() => Promise.all(this.clearStoreCallbacks.map((e) => e())));
    }
    onResetStore(e) {
      return (
        this.resetStoreCallbacks.push(e),
        () => {
          this.resetStoreCallbacks = this.resetStoreCallbacks.filter(
            (t) => t !== e
          );
        }
      );
    }
    onClearStore(e) {
      return (
        this.clearStoreCallbacks.push(e),
        () => {
          this.clearStoreCallbacks = this.clearStoreCallbacks.filter(
            (t) => t !== e
          );
        }
      );
    }
    reFetchObservableQueries;
    refetchObservableQueries(e) {
      return this.queryManager.refetchObservableQueries(e);
    }
    refetchQueries(e) {
      let t = this.queryManager.refetchQueries(e),
        n = [],
        r = [];
      t.forEach((e, t) => {
        (n.push(t), r.push(e));
      });
      let i = Promise.all(r);
      return ((i.queries = n), (i.results = r), i.catch((e) => {}), i);
    }
    getObservableQueries(e = `active`) {
      return this.queryManager.getObservableQueries(e);
    }
    extract(e) {
      return this.cache.extract(e);
    }
    restore(e) {
      return this.cache.restore(e);
    }
    setLink(e) {
      this.link = e;
    }
    get defaultContext() {
      return this.queryManager.defaultContext;
    }
    maskedFragmentTransform = new po(na);
    transform(e, t = !1) {
      let n = this.queryManager.transform(e);
      return t ? this.maskedFragmentTransform.transformDocument(n) : n;
    }
  },
  oc = ({ client: e, matchesRefetchOn: t }) =>
    e.refetchQueries({ include: `active`, onQueryUpdated: t }),
  sc = class {
    sources;
    handlers;
    subscriptions = new Map();
    client;
    defaultHandler;
    constructor(e = {}) {
      ((this.sources = e.sources ?? {}),
        (this.handlers = e.handlers ?? {}),
        (this.defaultHandler = e.defaultHandler ?? oc));
    }
    connect(e) {
      this.client !== e &&
        (this.client && this.disconnect(),
        (this.client = e),
        Object.entries(this.sources).forEach(([e, t]) => {
          typeof t == `function` && this.subscribeToSource(e, t);
        }));
    }
    disconnect(e) {
      (e && this.client !== e) ||
        ((this.client = void 0),
        this.subscriptions.forEach((e) => e.unsubscribe()),
        this.subscriptions.clear());
    }
    hasSource(e) {
      return Object.hasOwn(this.sources, e);
    }
    setEventSource(e, t) {
      ((this.sources[e] = t), this.subscribeToSource(e, t));
    }
    removeEventSource(e) {
      (this.subscriptions.get(e)?.unsubscribe(),
        this.subscriptions.delete(e),
        delete this.sources[e]);
    }
    setEventHandler(e, t) {
      this.handlers[e] = t;
    }
    setDefaultEventHandler(e) {
      this.defaultHandler = e;
    }
    emit(e, ...t) {
      let [n] = t;
      this.client &&
        this.hasSource(e) &&
        (this.handlers[e] ?? this.defaultHandler)({
          client: this.client,
          source: e,
          payload: n,
          matchesRefetchOn: function (t) {
            let r = { source: e, payload: n },
              i = t.options.refetchOn;
            return typeof i == `boolean`
              ? i
              : typeof i == `function`
                ? i(r)
                : typeof i?.[e] == `function`
                  ? i[e](r)
                  : !1 !== i?.[e];
          },
        });
    }
    subscribeToSource(e, t) {
      (this.subscriptions.get(e)?.unsubscribe(),
        this.subscriptions.delete(e),
        this.client &&
          this.subscriptions.set(
            e,
            t().subscribe((t) => this.emit(e, t))
          ));
    }
  },
  cc = () => (oi ? Mr(window, `online`) : tr),
  lc = () =>
    oi
      ? Mr(window, `visibilitychange`).pipe(
          Fr(() => document.visibilityState === `visible`)
        )
      : tr,
  { hasOwnProperty: uc } = Object.prototype;
function dc(e) {
  return H(e) && `payload` in e;
}
async function fc(e, t) {
  for await (let n of (async function* (e) {
    let t = new TextDecoder(`utf-8`),
      n = e.headers
        ?.get(`content-type`)
        ?.match(/;\s*boundary=(?:'([^']+)'|"([^"]+)"|([^"'].+?))\s*(?:;|$)/i),
      r =
        `\r
--` + (n ? (n[1] ?? n[2] ?? n[3] ?? `-`) : `-`),
      i = ``;
    I(e.body && typeof e.body.getReader == `function`, 62);
    let a = e.body.getReader(),
      o,
      s = !1,
      c = !1,
      l = () => c && i[0] == `-` && i[1] == `-`;
    try {
      for (; !s;) {
        ({ value: o, done: s } = await a.read());
        let e = typeof o == `string` ? o : t.decode(o),
          n = i.length - r.length + 1;
        i += e;
        let u = i.indexOf(r, n);
        for (; u > -1 && !l();) {
          let e;
          ((c = !0), ([e, i] = [i.slice(0, u), i.slice(u + r.length)]));
          let t = e.indexOf(`\r
\r
`),
            n = pc(e.slice(0, t))[`content-type`];
          if (n && n.toLowerCase().indexOf(`application/json`) === -1)
            throw Error(
              `Unsupported patch content type: application/json is required.`
            );
          let a = e.slice(t);
          (a && (yield a), (u = i.indexOf(r)));
        }
        if (l()) return;
      }
      throw Error(`premature end of multipart body`);
    } finally {
      a.cancel();
    }
  })(e)) {
    let r = mc(e, n);
    if (Object.keys(r).length != 0)
      if (dc(r)) {
        if (Object.keys(r).length === 1 && r.payload === null) return;
        let e = { ...r.payload };
        (`errors` in r &&
          (e.extensions = { ...e.extensions, [Vs]: new Ms(r.errors ?? []) }),
          t(e));
      } else t(r);
  }
}
function pc(e) {
  let t = {};
  return (
    e
      .split(
        `
`
      )
      .forEach((e) => {
        let n = e.indexOf(`:`);
        if (n > -1) {
          let r = e.slice(0, n).trim().toLowerCase(),
            i = e.slice(n + 1).trim();
          t[r] = i;
        }
      }),
    t
  );
}
function mc(e, t) {
  if (e.status >= 300)
    throw new zs(`Response not successful: Received status code ${e.status}`, {
      response: e,
      bodyText: t,
    });
  try {
    return JSON.parse(t);
  } catch (n) {
    throw new Bs(n, { response: e, bodyText: t });
  }
}
function hc(e, t) {
  return e.headers
    .get(`content-type`)
    ?.includes(`application/graphql-response+json`)
    ? (function (e, t) {
        try {
          return JSON.parse(t);
        } catch (n) {
          throw new Bs(n, { response: e, bodyText: t });
        }
      })(e, t)
    : mc(e, t);
}
function gc(e) {
  return (t) =>
    t.text().then((n) => {
      let r = hc(t, n);
      if (!Array.isArray(r) && !uc.call(r, `data`) && !uc.call(r, `errors`))
        throw new zs(
          `Server response was malformed for query '${Array.isArray(e) ? e.map((e) => e.operationName) : e.operationName}'.`,
          { response: t, bodyText: n }
        );
      return r;
    });
}
var _c = {
    http: { includeQuery: !0, includeExtensions: !0, preserveHeaderCase: !1 },
    headers: {
      accept: `application/graphql-response+json,application/json;q=0.9`,
      'content-type': `application/json`,
    },
    options: { method: `POST` },
  },
  vc = (e, t) => t(e);
function yc(e, t, ...n) {
  return (n.unshift(t), bc(e, vc, ...n));
}
function bc(e, t, ...n) {
  let r = {},
    i = {};
  (n.forEach((e) => {
    ((r = { ...r, ...e.options, headers: { ...r.headers, ...e.headers } }),
      e.credentials && (r.credentials = e.credentials),
      (r.headers.accept = (e.http?.accept || [])
        .concat(r.headers.accept)
        .join(`,`)),
      (i = { ...i, ...e.http }));
  }),
    (r.headers = (function (e, t) {
      if (!t) {
        let t = {};
        return (
          Object.keys(Object(e)).forEach((n) => {
            t[n.toLowerCase()] = e[n];
          }),
          t
        );
      }
      let n = {};
      Object.keys(Object(e)).forEach((t) => {
        n[t.toLowerCase()] = { originalName: t, value: e[t] };
      });
      let r = {};
      return (
        Object.keys(n).forEach((e) => {
          r[n[e].originalName] = n[e].value;
        }),
        r
      );
    })(r.headers, i.preserveHeaderCase)));
  let { operationName: a, extensions: o, variables: s, query: c } = e,
    l = { operationName: a, variables: s };
  return (
    i.includeExtensions && Object.keys(o || {}).length && (l.extensions = o),
    i.includeQuery && (l.query = t(c, mo)),
    { options: r, body: l }
  );
}
var xc = (e) => {
    I(e || typeof fetch < `u`, 61);
  },
  Sc = () => {
    if (typeof AbortController > `u`) return { controller: !1, signal: !1 };
    let e = new AbortController();
    return { controller: e, signal: e.signal };
  },
  Cc = (e, t) =>
    e.getContext().uri || (typeof t == `function` ? t(e) : t || `/graphql`);
function wc(e, t) {
  let n = [],
    r = (e, t) => {
      n.push(`${e}=${encodeURIComponent(t)}`);
    };
  if (
    (`query` in t && r(`query`, t.query),
    t.operationName && r(`operationName`, t.operationName),
    t.variables)
  ) {
    let e;
    try {
      e = JSON.stringify(t.variables);
    } catch (e) {
      return { parseError: e };
    }
    r(`variables`, e);
  }
  if (t.extensions) {
    let e;
    try {
      e = JSON.stringify(t.extensions);
    } catch (e) {
      return { parseError: e };
    }
    r(`extensions`, e);
  }
  let i = ``,
    a = e,
    o = e.indexOf(`#`);
  o !== -1 && ((i = e.substr(o)), (a = e.substr(0, o)));
  let s = a.indexOf(`?`) === -1 ? `?` : `&`;
  return { newURI: a + s + n.join(`&`) + i };
}
var Tc = F(() => fetch);
function Ec() {}
var Dc = class extends X {
    constructor(e = {}) {
      let {
          uri: t = `/graphql`,
          fetch: n,
          print: r = vc,
          includeExtensions: i,
          preserveHeaderCase: a,
          useGETForQueries: o,
          includeUnusedVariables: s = !1,
          ...c
        } = e,
        l = {
          http: V({ includeExtensions: i, preserveHeaderCase: a }),
          options: c.fetchOptions,
          credentials: c.credentials,
          headers: c.headers,
        };
      super((e) => {
        let i = Cc(e, t),
          a = e.getContext(),
          c = { ...a.http };
        (function (e) {
          return _o(e, `subscription`);
        })(e.query) &&
          (c.accept = [
            `multipart/mixed;boundary=graphql;subscriptionSpec=1.0`,
            ...(c.accept || []),
          ]);
        let u = {
            http: c,
            options: a.fetchOptions,
            credentials: a.credentials,
            headers: a.headers,
          },
          { options: d, body: f } = bc(e, r, _c, l, u);
        f.variables &&
          !s &&
          (f.variables = (function (e, t) {
            let n = { ...e },
              r = new Set(Object.keys(e));
            return (
              _(t, {
                Variable(e, t, n) {
                  n &&
                    n.kind !== `VariableDefinition` &&
                    r.delete(e.name.value);
                },
              }),
              r.forEach((e) => {
                delete n[e];
              }),
              n
            );
          })(f.variables, e.query));
        let p = new AbortController(),
          m = () => {
            p = void 0;
          };
        if (d.signal) {
          let e = d.signal,
            t = () => {
              p?.abort(e.reason);
            };
          (e.addEventListener(`abort`, t, { once: !0 }),
            (m = () => {
              (p?.signal.removeEventListener(`abort`, m),
                (p = void 0),
                e.removeEventListener(`abort`, t),
                (m = Ec));
            }),
            p.signal.addEventListener(`abort`, m, { once: !0 }));
        }
        return (
          (d.signal = p.signal),
          o &&
            !(function (e) {
              return _o(e, `mutation`);
            })(e.query) &&
            (d.method = `GET`),
          new k((t) => {
            if (d.method === `GET`) {
              let { newURI: e, parseError: t } = wc(i, f);
              if (t) throw t;
              i = e;
            } else d.body = JSON.stringify(f);
            let r = n || F(() => fetch) || Tc,
              a = t.next.bind(t);
            return (
              r(i, d)
                .then((t) => {
                  e.setContext({ response: t });
                  let n = t.headers?.get(`content-type`);
                  return n !== null && /^multipart\/mixed/i.test(n)
                    ? fc(t, a)
                    : gc(e)(t).then(a);
                })
                .then(() => {
                  (m(), t.complete());
                })
                .catch((e) => {
                  (m(), t.error(e));
                }),
              () => {
                p && p.abort();
              }
            );
          })
        );
      });
    }
  },
  Oc = class extends X {
    constructor(e = {}) {
      super((t, n) => {
        let r = t.client,
          i = r.queryManager.clientOptions,
          a = t.getContext();
        {
          let {
            name: n,
            version: r,
            transport: o = `headers`,
          } = V({}, i.clientAwareness, e.clientAwareness, a.clientAwareness);
          o === `headers` &&
            t.setContext(({ headers: e }) => ({
              headers: V(
                {
                  'apollographql-client-name': n,
                  'apollographql-client-version': r,
                },
                e
              ),
            }));
        }
        {
          let { transport: n = `extensions` } = V(
            {},
            i.enhancedClientAwareness,
            e.enhancedClientAwareness
          );
          (n === `extensions` &&
            (t.extensions = V(
              { clientLibrary: { name: `@apollo/client`, version: r.version } },
              t.extensions
            )),
            n === `headers` &&
              t.setContext(({ headers: e }) => ({
                headers: V(
                  {
                    'apollographql-library-name': `@apollo/client`,
                    'apollographql-library-version': r.version,
                  },
                  e
                ),
              })));
        }
        return n(t);
      });
    }
  },
  kc = class extends X {
    constructor(e = {}) {
      let { left: t, right: n, request: r } = X.from([new Oc(e), new Dc(e)]);
      (super(r), Object.assign(this, { left: t, right: n }));
    }
  },
  Ac = (e = {}) => new kc(e),
  jc = new Map(),
  Mc = new Map(),
  Nc = !0,
  Pc = !1;
function Fc(e) {
  return e.replace(/[\s,]+/g, ` `).trim();
}
function Ic(e) {
  var t = new Set(),
    n = [];
  return (
    e.definitions.forEach(function (e) {
      if (e.kind === `FragmentDefinition`) {
        var r = e.name.value,
          i = Fc((o = e.loc).source.body.substring(o.start, o.end)),
          a = Mc.get(r);
        (a && !a.has(i)
          ? Nc &&
            console.warn(
              `Warning: fragment with name ` +
                r +
                ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`
            )
          : a || Mc.set(r, (a = new Set())),
          a.add(i),
          t.has(i) || (t.add(i), n.push(e)));
      } else n.push(e);
      var o;
    }),
    s(s({}, e), { definitions: n })
  );
}
function Lc(e) {
  var t = Fc(e);
  if (!jc.has(t)) {
    var n = mn(e, {
      experimentalFragmentVariables: Pc,
      allowLegacyFragmentVariables: Pc,
    });
    if (!n || n.kind !== `Document`)
      throw Error(`Not a valid GraphQL document.`);
    jc.set(
      t,
      (function (e) {
        var t = new Set(e.definitions);
        t.forEach(function (e) {
          (e.loc && delete e.loc,
            Object.keys(e).forEach(function (n) {
              var r = e[n];
              r && typeof r == `object` && t.add(r);
            }));
        });
        var n = e.loc;
        return (n && (delete n.startToken, delete n.endToken), e);
      })(Ic(n))
    );
  }
  return jc.get(t);
}
function Rc(e) {
  var t = [...arguments].slice(1);
  typeof e == `string` && (e = [e]);
  var n = e[0];
  return (
    t.forEach(function (t, r) {
      (t && t.kind === `Document` ? (n += t.loc.source.body) : (n += t),
        (n += e[r + 1]));
    }),
    Lc(n)
  );
}
function zc() {
  (jc.clear(), Mc.clear());
}
function Bc() {
  Nc = !1;
}
function Vc() {
  Pc = !0;
}
function Hc() {
  Pc = !1;
}
var Uc,
  Wc = Rc,
  Gc = zc,
  Kc = Bc,
  qc = Vc,
  Jc = Hc;
(((Uc = Rc ||= {}).gql = Wc),
  (Uc.resetCaches = Gc),
  (Uc.disableFragmentWarnings = Kc),
  (Uc.enableExperimentalFragmentVariables = qc),
  (Uc.disableExperimentalFragmentVariables = Jc),
  (Rc.default = Rc));
var Yc = e({
    ApolloCache: () => bo,
    ApolloClient: () => ac,
    ApolloLink: () => X,
    CombinedGraphQLErrors: () => Fs,
    CombinedProtocolErrors: () => Ms,
    DocumentTransform: () => po,
    HttpLink: () => kc,
    InMemoryCache: () => Os,
    LinkError: () => Ls,
    LocalStateError: () => Rs,
    MissingFieldError: () => To,
    NetworkStatus: () => $,
    Observable: () => k,
    ObservableQuery: () => Ks,
    RefetchEventManager: () => sc,
    ServerError: () => zs,
    ServerParseError: () => Bs,
    UnconventionalError: () => Ns,
    build: () => `esm`,
    checkFetcher: () => xc,
    concat: () => co,
    createHttpLink: () => Ac,
    createSignalIfSupported: () => Sc,
    defaultDataIdFromObject: () => Eo,
    defaultPrinter: () => vc,
    disableExperimentalFragmentVariables: () => Hc,
    disableFragmentWarnings: () => Bc,
    empty: () => ao,
    enableExperimentalFragmentVariables: () => Vc,
    execute: () => lo,
    fallbackHttpConfig: () => _c,
    from: () => oo,
    gql: () => Rc,
    isNetworkRequestSettled: () => vo,
    isReference: () => Z,
    makeVar: () => ss,
    onlineSource: () => cc,
    parseAndCheckHttpResponse: () => gc,
    resetCaches: () => zc,
    rewriteURIForGET: () => wc,
    selectHttpOptionsAndBody: () => yc,
    selectHttpOptionsAndBodyInternal: () => bc,
    selectURI: () => Cc,
    setLogVerbosity: () => $r,
    split: () => so,
    version: () => Ur,
    windowFocusSource: () => lc,
  }),
  Xc = Reflect.get(Yc, `default`) ?? Yc;
export {
  bo as ApolloCache,
  ac as ApolloClient,
  X as ApolloLink,
  Fs as CombinedGraphQLErrors,
  Ms as CombinedProtocolErrors,
  po as DocumentTransform,
  kc as HttpLink,
  Os as InMemoryCache,
  Ls as LinkError,
  Rs as LocalStateError,
  To as MissingFieldError,
  $ as NetworkStatus,
  k as Observable,
  Ks as ObservableQuery,
  sc as RefetchEventManager,
  zs as ServerError,
  Bs as ServerParseError,
  Ns as UnconventionalError,
  Wr as build,
  xc as checkFetcher,
  co as concat,
  Ac as createHttpLink,
  Sc as createSignalIfSupported,
  Xc as default,
  Eo as defaultDataIdFromObject,
  vc as defaultPrinter,
  Hc as disableExperimentalFragmentVariables,
  Bc as disableFragmentWarnings,
  ao as empty,
  Vc as enableExperimentalFragmentVariables,
  lo as execute,
  _c as fallbackHttpConfig,
  oo as from,
  Rc as gql,
  vo as isNetworkRequestSettled,
  Z as isReference,
  ss as makeVar,
  cc as onlineSource,
  gc as parseAndCheckHttpResponse,
  zc as resetCaches,
  wc as rewriteURIForGET,
  yc as selectHttpOptionsAndBody,
  bc as selectHttpOptionsAndBodyInternal,
  Cc as selectURI,
  $r as setLogVerbosity,
  so as split,
  Ur as version,
  lc as windowFocusSource,
};
//# sourceMappingURL=_virtual_mf___mfe_internal__kicl__mf_owner__1__prebuild___mf_0_apollo_mf_1_client__prebuild__-CYwol0UA.js.map

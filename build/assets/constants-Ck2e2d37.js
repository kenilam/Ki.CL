import {
  C as e,
  O as t,
  S as n,
  b as r,
  h as i,
  m as a,
  p as o,
  t as s,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js';
import { n as c } from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-CvHS1BZ1.js';
import { v as l } from './Components-DsgpJoHg.js';
import {
  n as u,
  r as d,
} from './virtual_mf___mfe_internal__kicl__loadRemote__api_mf_1_provider__mf_owner__1__loadRemote__-DlWULvJt.js';
t();
var { getKiclClient: f, gql: p } = d,
  m = p`
  fragment TreeOfLifeNodeLineage on TreeOfLifeNode {
    nodeId
    ancestor {
      nodeId
    }
  }
`;
Promise.all([u]);
var { getKiclClient: h, gql: g } = d,
  _ = g`
  fragment TreeOfLifeNodeShape on TreeOfLifeNode {
    nodeId
    name
    rank
    numTips
    ancestor {
      nodeId
    }
    descendants {
      nodeId
    }
  }
`;
Promise.all([u]);
var {
    useQuery: v,
    useLazyQuery: y,
    Kicl_TreeOfLifeSubtreeDocument: b,
    Kicl_TreeOfLifeSubtreesDocument: x,
  } = d,
  S = s.createContext({
    params: {},
    data: void 0,
    loading: !1,
    error: void 0,
    find: () => null,
    chains: [],
    focus: void 0,
    rooted: !1,
    animate: !1,
    setAnimate: () => {},
  }),
  C = ({ children: t }) => {
    let a = l(),
      [s, u] = e(!1),
      { data: d, ...p } = v(b, {
        variables: { nodeId: a.nodeId },
        fetchPolicy: `cache-first`,
      }),
      [g, C] = y(x, { fetchPolicy: `cache-first` }),
      w = g;
    i(() => {
      a.nodeId && w({ variables: { nodeIds: [a.nodeId] } });
    }, [a.nodeId]);
    let T = o(
        (e) =>
          (function (e) {
            if (!e) return null;
            let { cache: t } = h();
            return t.readFragment({
              id: t.identify({ __typename: `TreeOfLifeNode`, nodeId: e }),
              fragment: _,
              returnPartialData: !0,
            });
          })(e),
        [d, C.data]
      ),
      E = r(
        () =>
          (function (e) {
            if (!e) return { ids: [], complete: !1 };
            let { cache: t } = f(),
              n = [],
              r = new Set(),
              i = e;
            for (; i && !r.has(i);) {
              (r.add(i), n.push(i));
              let e = t.readFragment({
                id: t.identify({ __typename: `TreeOfLifeNode`, nodeId: i }),
                fragment: m,
                returnPartialData: !0,
              });
              if (!e || e.ancestor === void 0) return { ids: n, complete: !1 };
              if (e.ancestor === null) return { ids: n, complete: !0 };
              i = e.ancestor.nodeId;
            }
            return { ids: n, complete: !1 };
          })(a.nodeId),
        [a.nodeId, d, C.data]
      ),
      D = n({ ids: [], complete: !1 });
    E.complete && (D.current = E);
    let O = E.complete ? E.ids : D.current.ids,
      k = E.complete || D.current.complete,
      A = O[0],
      j = n(new Set());
    (i(() => {
      let e = E.ids[E.ids.length - 1];
      !e ||
        E.complete ||
        j.current.has(e) ||
        (j.current.add(e), w({ variables: { nodeIds: [e] } }));
    }, [E]),
      console.info(`TreeOfLifeSubtree`, a.nodeId, d?.TreeOfLifeSubtree));
    let M = p.error || C.error,
      N = {
        params: a,
        data: d,
        loading: p.loading || C.loading,
        error: M,
        fetch: w,
        find: T,
        chains: O,
        focus: A,
        rooted: k,
        animate: s,
        setAnimate: u,
      };
    return c(S.Provider, { value: N, children: t });
  },
  w = () => a(S),
  T = (Promise.all([u]), `experiments`);
function E(e, t = !1) {
  let n = t
      ? `Origin of life`
      : (function (e) {
          let t = e.name?.trim();
          return t ? t.replace(/\s*\([^)]*silva[^)]*\)\s*/gi, ``).trim() : ``;
        })(e),
    r = (function (e) {
      let t = e?.trim() ?? ``;
      return !t || /^no[\s_-]?rank\b/i.test(t) ? `` : t;
    })(e.rank);
  return n ? (r ? `${n} · ${r}` : n) : r;
}
var D = `tree-of-life`,
  O = `:nodeId`,
  k = `ott93302`,
  A = (e) => (e ? `/${T}/${D}/${e}` : `/${T}/${D}`);
export { E as a, w as c, A as i, D as n, T as o, k as r, C as s, O as t };
//# sourceMappingURL=constants-Ck2e2d37.js.map

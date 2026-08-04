import { a as e } from './rolldown-runtime-Mj8OWp7p.js';
import { O as t } from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react__loadShare__.js-BchAxkJF.js';
import {
  n,
  r,
  t as i,
} from './_virtual_mf___mfe_internal__kicl__mf_owner__1__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-CvHS1BZ1.js';
import {
  C as a,
  O as o,
  P as s,
  _ as c,
  a as l,
  g as u,
  i as d,
  r as f,
  x as p,
} from './Components-DsgpJoHg.js';
t();
var m = e(s()),
  h = `kicl--widgets--global-header--navigation--mobile`,
  g = { true: n(a, {}), false: n(o, {}) },
  _ = [n(l, { className: `kicl-font-size`, to: `/`, children: `Home` }, ``)],
  v = () => {
    let { search: e, ...t } = u(),
      a = c(),
      o = new URLSearchParams(e),
      s = o.get(`globalNavigation`) === `✓`,
      v = g[String(s)];
    return r(i, {
      children: [
        n(d, {
          children: n(l, {
            className: (0, m.default)(`kicl-font-size`, `${h}--toggle`),
            preventScrollReset: !0,
            relative: `route`,
            to: `?globalNavigation=✓`,
            unstyled: !0,
            children: v,
          }),
        }),
        n(p, {
          onExited: () => {
            let e = new URL(t.pathname, window.location.origin);
            (o.delete(`globalNavigation`),
              o.forEach((t, n) => {
                e.searchParams.append(n, t);
              }),
              a(e));
          },
          open: s,
          children: n(d, {
            justifyItems: `start`,
            gap: `widest`,
            children: n(`section`, {
              className: h,
              children: n(f, {
                animation: {
                  animationDelay: 1200,
                  animationDuration: `slow`,
                  animationStyle: `slide-from-top`,
                },
                autoFlow: `column`,
                gap: `widest`,
                children: _,
              }),
            }),
          }),
        }),
      ],
    });
  };
export { v as default };
//# sourceMappingURL=Mobile-DSXVZ2-z.js.map

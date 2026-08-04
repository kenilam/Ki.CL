var e = {},
  t = function (t, n, r) {
    let i = Promise.resolve();
    if (n && n.length > 0) {
      let t = document.getElementsByTagName(`link`),
        r = document.querySelector(`meta[property=csp-nonce]`),
        o = r?.nonce || r?.getAttribute(`nonce`);
      ((a = n.map((n) => {
        var r;
        if (
          ((n = (function (e) {
            return `/` + e;
          })(n)),
          (r = n),
          (n = import.meta.resolve
            ? import.meta.resolve(r)
            : new URL(r, import.meta.url).href) in e)
        )
          return;
        e[n] = !0;
        let i = n.endsWith(`.css`);
        for (let e = t.length - 1; e >= 0; e--) {
          let r = t[e];
          if (r.href === n && (!i || r.rel === `stylesheet`)) return;
        }
        let a = document.createElement(`link`);
        return (
          (a.rel = i ? `stylesheet` : `modulepreload`),
          i || (a.as = `script`),
          (a.crossOrigin = ``),
          (a.href = n),
          o && a.setAttribute(`nonce`, o),
          document.head.appendChild(a),
          i
            ? new Promise((e, t) => {
                (a.addEventListener(`load`, e),
                  a.addEventListener(`error`, () =>
                    t(Error(`Unable to preload CSS for ${n}`))
                  ));
              })
            : void 0
        );
      })),
        (i = Promise.all(
          a.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e })
            )
          )
        )));
    }
    var a;
    function o(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return i.then((e) => {
      for (let t of e || []) t.status === `rejected` && o(t.reason);
      return t().catch(o);
    });
  };
export { t };

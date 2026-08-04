const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/module-runner-DFh9nYzw.js',
      'assets/vite-preload-helper-BpIsQ93C.js',
      'assets/ssrVmStrategy-C_cJtu5V-CNXtoom4.js',
    ])
) => i.map((i) => d[i]);
import { t as e } from './vite-preload-helper-BpIsQ93C.js';
function t(e) {
  let t = (function (e) {
      let t = typeof e == `string` || e instanceof URL ? String(e) : e.url;
      return new URL(t);
    })(e),
    n =
      t.hostname === `localhost` ||
      t.hostname === `127.0.0.1` ||
      t.hostname === `[::1]`;
  if (t.protocol !== `https:` && (t.protocol !== `http:` || !n))
    throw TypeError(
      `Refusing to fetch SSR resource over an insecure connection: ${t}`
    );
  return t;
}
async function n(e, n = {}, r = 1e4) {
  let i = t(e),
    a = (e) => {
      let t = { ...n, redirect: `error` };
      if (!Number.isFinite(r) || r <= 0) return fetch(e.href, t);
      let i = AbortSignal.timeout(r),
        a = n.signal ? AbortSignal.any([n.signal, i]) : i;
      return fetch(e.href, { ...t, signal: a });
    };
  try {
    return await a(i);
  } catch (e) {
    if (
      i.hostname !== `localhost` ||
      (function (e) {
        if (!e || typeof e != `object`) return !1;
        let t = e.name;
        return t === `AbortError` || t === `TimeoutError`;
      })(e)
    )
      throw e;
    return ((i.hostname = `[::1]`), a(i));
  }
}
var r = class extends Error {
  url;
  maxBytes;
  declaredBytes;
  constructor(e, t, n) {
    (super(
      n == null
        ? `SSR response from ${e} exceeded the ${t}-byte limit`
        : `SSR response from ${e} declared ${n} bytes which exceeds the ${t}-byte limit`
    ),
      (this.name = `SsrFetchBodyTooLargeError`),
      (this.url = e),
      (this.maxBytes = t),
      (this.declaredBytes = n));
  }
};
function i(e) {
  return e instanceof r;
}
async function a(e, t = 10485760, n = e.url || `unknown`) {
  if (!Number.isFinite(t) || t <= 0) return e.text();
  let i = e.headers?.get?.(`content-length`) ?? null;
  if (i != null) {
    let a = Number(i);
    if (Number.isFinite(a) && a > t) {
      try {
        await e.body?.cancel();
      } catch {}
      throw new r(n, t, a);
    }
  }
  if (!e.body) return e.text();
  let a = e.body.getReader(),
    o = [],
    s = 0;
  for (;;) {
    let { done: e, value: i } = await a.read();
    if (e) break;
    if (i) {
      if (((s += i.byteLength), s > t)) {
        try {
          await a.cancel();
        } catch {}
        throw new r(n, t);
      }
      o.push(i);
    }
  }
  let c = new Uint8Array(s),
    l = 0;
  for (let e of o) (c.set(e, l), (l += e.byteLength));
  return new TextDecoder().decode(c);
}
var o = new Map();
async function s(t) {
  return (
    o.has(t) ||
      o.set(
        t,
        e(() => import(t), [])
      ),
    o.get(t)
  );
}
var c = new Map();
async function l(t, r, i) {
  let o = `${r}::${i}::${t}`;
  if (c.has(o)) return c.get(o);
  let l = (async () => {
    let o = await (async function () {
      try {
        let { createRequire: e } = await s(`module`);
        return e(import.meta.url)(`vite/module-runner`);
      } catch {}
      try {
        return await e(
          () => import(`./module-runner-DFh9nYzw.js`),
          __vite__mapDeps([0, 1])
        );
      } catch {
        return null;
      }
    })();
    if (!o) return null;
    let { ModuleRunner: c, ESModulesEvaluator: l } = o,
      u = `${t}/__mf_runner__`;
    try {
      return new c(
        {
          hmr: !1,
          transport: {
            async invoke(e) {
              let t = await a(
                await n(
                  u,
                  {
                    method: `POST`,
                    headers: { 'Content-Type': `application/json` },
                    body: JSON.stringify(e),
                  },
                  r
                ),
                i,
                u
              );
              return JSON.parse(t);
            },
          },
        },
        new l()
      );
    } catch {
      return null;
    }
  })();
  return (c.set(o, l), l);
}
var u = () => s(`path`),
  d = () => s(`fs`),
  f = `unversioned`;
function p(e) {
  let t = e.metaData?.buildInfo?.buildVersion,
    n = (function (e) {
      let t = 2166136261;
      for (let n = 0; n < e.length; n++)
        ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
      return (t >>> 0).toString(16).padStart(8, `0`);
    })(JSON.stringify(e));
  return t ? `${t}-${n}` : n;
}
var m = new Map(),
  h = new Map();
function g(e, t, n) {
  return `${t}::${n}::${e}`;
}
var _ = class extends Error {
  constructor(e, t, n, r) {
    (super(
      `Failed to fetch SSR module "${e}": ${t} ${n}` +
        (r ? `\npreview: ${r}` : ``)
    ),
      (this.url = e),
      (this.status = t),
      (this.statusText = n),
      (this.bodyPreview = r),
      (this.name = `SsrEntryHttpError`));
  }
};
function v(e) {
  return e instanceof _;
}
async function y(e, t, r) {
  let o = g(e, t, r);
  if (!h.has(o)) {
    let s = (async function (e, t, r) {
      try {
        let i = await n(e, {}, t);
        if (!i.ok) return null;
        let o = await a(i, r, e);
        return JSON.parse(o);
      } catch (e) {
        if (i(e)) throw e;
        return null;
      }
    })(e, t, r);
    (h.set(o, s),
      s.then(
        (e) => {
          e || h.get(o) !== s || h.delete(o);
        },
        () => {
          h.get(o) === s && h.delete(o);
        }
      ));
  }
  return h.get(o);
}
function b(e) {
  try {
    let { pathname: t } = new URL(e);
    return /\.json$/i.test(t);
  } catch {
    return /\.json(?:[?#]|$)/i.test(e);
  }
}
function x(e) {
  return b(e) ? e : e.replace(/\/[^/]+$/, `/mf-manifest.json`);
}
function S(e) {
  return (
    e
      .split(`/`)
      .pop()
      ?.replace(/[?#].*$/, ``)
      .replace(/\.[^.]+$/, ``) ?? `remoteEntry`
  );
}
async function C(e, t) {
  try {
    let r = await n(e.url, { method: `HEAD` }, t),
      i = r.headers.get(`content-type`) ?? ``;
    if (r.ok && !i.includes(`text/html`)) return e;
  } catch {}
  return null;
}
function w(e, t, n) {
  let r = t?.metaData?.remoteEntry;
  return r?.name
    ? (function (e, t) {
        let n = t.replace(/\/[^/]+$/, `/`);
        return new URL(`${e.path || ``}${e.name}`, n).href;
      })(r, n)
    : b(e)
      ? new URL(`remoteEntry.js`, n.replace(/\/[^/]+$/, `/`)).href
      : e;
}
async function T(e, t, n) {
  if (
    (function (e) {
      return /\.ssr\.js(?:[?#].*)?$/.test(e);
    })(e)
  )
    return { url: e, type: `module`, versionKey: f };
  if (!b(e)) {
    let n = S(e),
      r = await C(
        {
          url: `${e.replace(/\/[^/]+$/, ``)}/__mf_server__/${n}.ssr.js`,
          type: `module`,
          versionKey: f,
        },
        t
      );
    if (r) return r;
  }
  let r = await (async function (e, t, n) {
    let r = x(e),
      i = await y(r, t, n),
      a = w(e, i, r);
    return {
      entryUrl: e,
      manifestUrl: r,
      manifest: i,
      assetBaseUrl: a,
      filename: S(a),
      remoteOrigin: a.replace(/\/[^/]+$/, ``),
    };
  })(e, t, n);
  if (r.manifest) {
    let e = (function (e, t) {
      let n = e?.metaData;
      if (!n?.ssrRemoteEntry?.name) return null;
      let r = t.replace(/\/[^/]+$/, `/`),
        i = (n.ssrRemoteEntry.path || ``) + n.ssrRemoteEntry.name;
      return {
        url: new URL(i, r).href,
        type: n.ssrRemoteEntry.type || `module`,
        versionKey: p(e),
      };
    })(r.manifest, r.manifestUrl);
    if (e) return e;
  }
  return (async function (e, t) {
    for (let n of e) {
      let e = await C(n, t);
      if (e) return e;
    }
    return null;
  })(
    (function (e, t = {}) {
      let { assetBaseUrl: n, filename: r, remoteOrigin: i } = e,
        a = n.replace(/\.[^.]+$/, ``),
        o = [];
      return (
        t.skipServerBuild ||
          o.push({
            url: `${i}/__mf_server__/${r}.ssr.js`,
            type: `module`,
            versionKey: f,
          }),
        o.push(
          { url: `${a}.ssr.js`, type: `module`, versionKey: f },
          { url: `${i}/__mf_ssr__/${r}.ssr.js`, type: `module`, versionKey: f }
        ),
        o
      );
    })(r, { skipServerBuild: !b(e) }),
    t
  );
}
function E(e, t, n) {
  let r = g(e, t, n),
    i = { promise: T(e, t, n), resolvedAt: Date.now() };
  return (
    m.set(r, i),
    i.promise.then(
      (e) => {
        e || m.get(r) !== i || m.delete(r);
      },
      () => {
        m.get(r) === i && m.delete(r);
      }
    ),
    i
  );
}
function D(e) {
  let t;
  try {
    t = new URL(e).origin;
  } catch {
    return;
  }
  for (let [e] of A)
    JSON.parse(e)
      .find((e) => typeof e == `string` && /^https?:\/\//.test(e))
      ?.startsWith(t) && (A.delete(e), j.delete(e));
}
function O(e) {
  if (e) {
    for (let t of m.keys()) t.endsWith(`::${e}`) && m.delete(t);
    let t = x(e);
    for (let e of h.keys()) e.endsWith(`::${t}`) && h.delete(e);
    D(e);
  } else (m.clear(), h.clear(), A.clear(), j.clear());
  let t = globalThis.__FEDERATION__;
  for (let e of t?.__INSTANCES__ ?? [])
    try {
      e?.moduleCache?.clear?.();
    } catch {}
}
var k,
  A = new Map(),
  j = new Map();
function M(e) {
  return (e = (e = (e = e.replace(
    /import\s*\{([^}]*)\}\s*from\s*["'][^"']*preload-helper[^"']*["'];?/g,
    (e, t) =>
      t
        .split(`,`)
        .map((e) => {
          let t = e.trim().split(/\s+as\s+/);
          return (t[1] ?? t[0]).trim();
        })
        .filter(Boolean)
        .map((e) => `const ${e} = (fn) => fn();`).join(`
`)
  )).replace(/__vite__mapDeps\([^)]+\)/g, `[]`)).replace(
    /\b([A-Za-z_$][\w$]*)\s*\(\s*\(\s*\)\s*=>\s*import\(([^)]*)\)\s*,\s*\[\]\s*\)/g,
    `import($2)`
  ));
}
function N(e) {
  return e.includes(`preload-helper`);
}
async function P(e, t, r, i, o, c = f, l = 1e4, p = `default`, m = 10485760) {
  let h = JSON.stringify([l, m, c, e, p]);
  if (r.has(e)) return r.get(e);
  let g = A.get(h);
  if (g) {
    i.add(g);
    let t = j.get(h),
      n = t ? await t : await g;
    return (r.set(e, n), n);
  }
  let v = (async () => {
    let { createHash: e } = await s(`crypto`),
      { join: n } = await u();
    return n(t, `${e(`sha1`).update(h).digest(`hex`).slice(0, 12)}.js`);
  })();
  j.set(h, v);
  let y = (async () => {
    let s = await v;
    r.set(e, s);
    let u = await n(e, {}, l),
      f = await a(u, m, e);
    if (!u.ok)
      throw new _(
        e,
        u.status,
        u.statusText,
        f.slice(0, 240).replace(/\s+/g, ` `).trim()
      );
    let h = e.replace(/\/[^/]*$/, `/`),
      g = [],
      y =
        /(?:from|export\s*\*\s*from|import\s*(?:\(|\s))\s*["'`]([^"'`\s]+)["'`]/g,
      b;
    for (; (b = y.exec(f)) !== null;)
      (!b[1].startsWith(`./`) && !b[1].startsWith(`../`)) ||
        N(b[1]) ||
        g.push(new URL(b[1], h).href);
    let x = new Map();
    (await Promise.all(
      [...new Set(g)]
        .filter((e) => e.startsWith(`http://`) || e.startsWith(`https://`))
        .map(async (e) => {
          let n = await P(e, t, r, i, o, c, l, p, m);
          x.set(e, `file://${n}`);
        })
    ),
      (f = (function (e, t, n) {
        return (
          (e = (e = (e = e.replace(
            /((?:from|export\s*\*\s*from)\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`]/g,
            (e, n, r, i) => `${n}"${new URL(i, t).href}"`
          )).replace(
            /(import\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`]/g,
            (e, n, r, i) => `${n}"${new URL(i, t).href}"`
          )).replace(
            /(import\s*\(\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`](\s*\))/g,
            (e, n, r, i, a) => `${n}"${new URL(i, t).href}"${a}`
          )),
          n &&
            n.size > 0 &&
            (e = e.replace(
              /(?:from|import\s*\()\s*(["'`])([^"'`./][^"'`]*)["'`]/g,
              (e, t, r) => {
                let i = n.get(r);
                return i ? e.replace(r, `file://${i}`) : e;
              }
            )),
          M(e)
        );
      })(f, h, o)));
    for (let [e, t] of x) f = f.split(e).join(t);
    let { writeFileSync: S } = await d();
    return (S(s, f, `utf8`), s);
  })();
  return (
    A.set(h, y),
    i.add(y),
    y.catch(() => {
      (A.get(h) === y && A.delete(h), j.get(h) === v && j.delete(h));
    }),
    y
  );
}
var F = !1;
async function I(t, n) {
  let { url: r, type: a, versionKey: o } = t,
    { resolvedShared: c } = n;
  if (a === `commonjs-module` || a === `commonjs`) {
    let { createRequire: e } = await s(`module`),
      t = e(import.meta.url);
    try {
      return t(r);
    } catch {}
  }
  if (r.startsWith(`http://`) || r.startsWith(`https://`)) {
    let a = new URL(r);
    if (a.pathname.includes(`/__mf_ssr__/`)) {
      let e = a.origin,
        t = await l(e, n.fetchTimeoutMs, n.fetchMaxBytes);
      if (t)
        try {
          let e = await t.import(a.pathname);
          if (e && typeof e == `object` && `init` in e) return e;
        } catch (e) {
          if (i(e)) throw e;
        }
    }
    if (n.strategy === `vm`)
      try {
        let r = await (async function (t, n) {
          let { loadViaVmStrategy: r, isVmStrategyAvailable: i } = await e(
            async () => {
              let { loadViaVmStrategy: e, isVmStrategyAvailable: t } =
                await import(`./ssrVmStrategy-C_cJtu5V-CNXtoom4.js`);
              return { loadViaVmStrategy: e, isVmStrategyAvailable: t };
            },
            __vite__mapDeps([2, 1])
          );
          return (await i())
            ? await r(t.url, {
                resolvedShared: n.resolvedShared,
                shareScopeName: n.shareScopeName,
                versionKey: t.versionKey,
                fetchTimeoutMs: n.fetchTimeoutMs,
                fetchMaxBytes: n.fetchMaxBytes,
                cacheContext: n.cacheContext,
                federationInstance: n.federationInstance,
              })
            : (F ||
                ((F = !0),
                console.warn(
                  `[mf-vite:ssr-entry-loader] strategy "vm" requires vm.SourceTextModule (run Node with --experimental-vm-modules); falling back to the temp-file strategy.`
                )),
              null);
        })(t, n);
        if (r) return r;
      } catch (e) {
        if (v(e) || i(e)) throw e;
      }
    let { mkdirSync: s } = await d(),
      p = await (async function () {
        return (
          (k ||= (async () => {
            let { join: e } = await u(),
              { rmSync: t } = await d(),
              n = e(
                `{"CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES":"false","CLAUDE_CODE_ENABLE_ASK_USER_QUESTION_TOOL":"true","NoDefaultCurrentDirectoryInExePath":"1","CLAUDE_EFFORT":"high","CLAUDE_CODE_ENTRYPOINT":"claude-desktop","NODE":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","INIT_CWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","BAGGAGE":"sentry-environment=production,sentry-release=Claude%401.24012.9,sentry-public_key=2f98127cbffe4740b1f767a2de77d23b,sentry-trace_id=51973daa19724ccba60330ca0bf7921d,sentry-org_id=1158394","CLAUDE_CODE_HOST_SESSION_ID":"local_e1a40330-586a-4281-b8aa-627bc2de6b36","CLAUDE_PREVIEW_CLASSIFIER_FLOOR":"1","CLAUDE_CODE_OAUTH_SCOPES":"user:inference user:file_upload user:profile user:sessions:claude_code","SHELL":"/bin/zsh","CLAUDE_PID":"37512","CLAUDE_CODE_CHILD_SESSION":"1","CLAUDE_CODE_EAGER_FLUSH":"1","TMPDIR":"/var/folders/bv/jgsvc6pj4mdc4cqv5ptpqt840000gn/T/","npm_config_global_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","CLAUDE_AGENT_SDK_VERSION":"0.3.219","MallocNanoZone":"0","npm_package_config_commitizen_path":"./node_modules/cz-conventional-changelog","COLOR":"0","USE_LOCAL_OAUTH":"","npm_config_noproxy":"","CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH":"1","npm_config_local_prefix":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","GIT_EDITOR":"true","AI_AGENT":"claude-code_2-1-219_agent","USER":"kenilam","API_TIMEOUT_MS":"900000","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/kenilam/.nvm/versions/node/v24.3.0/etc/npmrc","SSH_AUTH_SOCK":"/var/run/com.apple.launchd.ScwlfYDNxN/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x0","npm_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/bin/npm-cli.js","CLAUDE_CODE_REPORT_FINDINGS":"1","PATH":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/node_modules/.bin:/Users/kenilam/Documents/ME/node_modules/.bin:/Users/kenilam/Documents/node_modules/.bin:/Users/kenilam/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/kenilam/.rvm/gems/ruby-2.7.5/bin:/Users/kenilam/.rvm/gems/ruby-2.7.5@global/bin:/Users/kenilam/.rvm/rubies/ruby-2.7.5/bin:/Users/kenilam/.local/bin:/opt/homebrew/opt/ruby/bin:/Users/kenilam/.jenv/shims:/Users/kenilam/.jenv/bin:/Users/kenilam/.nvm/versions/node/v24.3.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Library/Frameworks/Python.framework/Versions/3.11/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/usr/local/hatch/bin:/Users/kenilam/.rover/bin:/usr/local/bin:/Users/kenilam/.rvm/bin:/Users/kenilam/.nvm/versions/node/v13.0.1/bin:/Users/kenilam/.nvm/versions/node/v13.1.0/bin:/Users/kenilam/.nvm/versions/node/v13.11.0/bin:/Users/kenilam/.nvm/versions/node/v13.3.0/bin:/Users/kenilam/.nvm/versions/node/v14.4.0/bin:/Users/kenilam/.nvm/versions/node/v18.12.1/bin:/Users/kenilam/.nvm/versions/node/v18.20.4/bin:/Users/kenilam/.nvm/versions/node/v19.0.1/bin:/Users/kenilam/.nvm/versions/node/v19.7.0/bin:/Users/kenilam/.nvm/versions/node/v20.2.0/bin:/Users/kenilam/.nvm/versions/node/v21.1.0/bin:/Users/kenilam/.nvm/versions/node/v21.6.1/bin:/Users/kenilam/.nvm/versions/node/v21.7.2/bin:/Users/kenilam/.nvm/versions/node/v22.3.0/bin:/Users/kenilam/.nvm/versions/node/v23.11.0/bin:/Users/kenilam/Library/pnpm:/Users/kenilam/bin:/Users/kenilam/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/54685ef1-5047-412a-b499-8512bc62b076/93d15751-6902-4952-85b7-1a5eddffba2b/bin","MCP_CONNECTION_NONBLOCKING":"true","npm_package_json":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/package.json","npm_config_engine_strict":"true","_":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin/vite","npm_config_userconfig":"/Users/kenilam/.npmrc","npm_config_init_module":"/Users/kenilam/.npm-init.js","__CFBundleIdentifier":"com.anthropic.claudefordesktop","npm_command":"exec","PWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","npm_lifecycle_event":"npx","EDITOR":"vi","npm_package_name":"kicl","npm_config_npm_version":"11.4.2","NODE_USE_SYSTEM_CA":"1","XPC_FLAGS":"0x0","npm_package_engines_node":">=24","npm_config_node_gyp":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","npm_package_version":"0.0.1","XPC_SERVICE_NAME":"0","SHLVL":"2","HOME":"/Users/kenilam","CLAUDE_CODE_DISABLE_CRON":"","ANTHROPIC_BASE_URL":"https://api.anthropic.com","CLAUDE_CODE_EXECPATH":"/Users/kenilam/Library/Application Support/Claude/claude-code/2.1.219/claude.app/Contents/MacOS/claude","npm_config_save_exact":"true","DISABLE_MICROCOMPACT":"1","npm_config_cache":"/Users/kenilam/.npm","LOGNAME":"kenilam","npm_lifecycle_script":"\\"vite\\"","COREPACK_ENABLE_AUTO_PIN":"0","npm_config_user_agent":"npm/11.4.2 node/v24.3.0 darwin arm64 workspaces/false","CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH":"1","CLAUDE_CODE_SESSION_ID":"405e48d7-2034-43c5-8bfa-b985231aa988","DISABLE_AUTOUPDATER":"1","OSLogRateLimit":"64","CLAUDECODE":"1","npm_node_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","npm_config_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","USE_STAGING_OAUTH":"","NODE_ENV":"production","PORT":"3001"}`.cwd(),
                `node_modules`,
                `.ssr-cache`
              );
            return (
              `{"CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES":"false","CLAUDE_CODE_ENABLE_ASK_USER_QUESTION_TOOL":"true","NoDefaultCurrentDirectoryInExePath":"1","CLAUDE_EFFORT":"high","CLAUDE_CODE_ENTRYPOINT":"claude-desktop","NODE":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","INIT_CWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","BAGGAGE":"sentry-environment=production,sentry-release=Claude%401.24012.9,sentry-public_key=2f98127cbffe4740b1f767a2de77d23b,sentry-trace_id=51973daa19724ccba60330ca0bf7921d,sentry-org_id=1158394","CLAUDE_CODE_HOST_SESSION_ID":"local_e1a40330-586a-4281-b8aa-627bc2de6b36","CLAUDE_PREVIEW_CLASSIFIER_FLOOR":"1","CLAUDE_CODE_OAUTH_SCOPES":"user:inference user:file_upload user:profile user:sessions:claude_code","SHELL":"/bin/zsh","CLAUDE_PID":"37512","CLAUDE_CODE_CHILD_SESSION":"1","CLAUDE_CODE_EAGER_FLUSH":"1","TMPDIR":"/var/folders/bv/jgsvc6pj4mdc4cqv5ptpqt840000gn/T/","npm_config_global_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","CLAUDE_AGENT_SDK_VERSION":"0.3.219","MallocNanoZone":"0","npm_package_config_commitizen_path":"./node_modules/cz-conventional-changelog","COLOR":"0","USE_LOCAL_OAUTH":"","npm_config_noproxy":"","CLAUDE_CODE_SDK_HAS_OAUTH_REFRESH":"1","npm_config_local_prefix":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","GIT_EDITOR":"true","AI_AGENT":"claude-code_2-1-219_agent","USER":"kenilam","API_TIMEOUT_MS":"900000","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/kenilam/.nvm/versions/node/v24.3.0/etc/npmrc","SSH_AUTH_SOCK":"/var/run/com.apple.launchd.ScwlfYDNxN/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x0","npm_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/bin/npm-cli.js","CLAUDE_CODE_REPORT_FINDINGS":"1","PATH":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/ki-cl.com/node_modules/.bin:/Users/kenilam/Documents/ME/WORK/node_modules/.bin:/Users/kenilam/Documents/ME/node_modules/.bin:/Users/kenilam/Documents/node_modules/.bin:/Users/kenilam/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/kenilam/.rvm/gems/ruby-2.7.5/bin:/Users/kenilam/.rvm/gems/ruby-2.7.5@global/bin:/Users/kenilam/.rvm/rubies/ruby-2.7.5/bin:/Users/kenilam/.local/bin:/opt/homebrew/opt/ruby/bin:/Users/kenilam/.jenv/shims:/Users/kenilam/.jenv/bin:/Users/kenilam/.nvm/versions/node/v24.3.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Library/Frameworks/Python.framework/Versions/3.11/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/pkg/env/global/bin:/Library/Apple/usr/bin:/usr/local/hatch/bin:/Users/kenilam/.rover/bin:/usr/local/bin:/Users/kenilam/.rvm/bin:/Users/kenilam/.nvm/versions/node/v13.0.1/bin:/Users/kenilam/.nvm/versions/node/v13.1.0/bin:/Users/kenilam/.nvm/versions/node/v13.11.0/bin:/Users/kenilam/.nvm/versions/node/v13.3.0/bin:/Users/kenilam/.nvm/versions/node/v14.4.0/bin:/Users/kenilam/.nvm/versions/node/v18.12.1/bin:/Users/kenilam/.nvm/versions/node/v18.20.4/bin:/Users/kenilam/.nvm/versions/node/v19.0.1/bin:/Users/kenilam/.nvm/versions/node/v19.7.0/bin:/Users/kenilam/.nvm/versions/node/v20.2.0/bin:/Users/kenilam/.nvm/versions/node/v21.1.0/bin:/Users/kenilam/.nvm/versions/node/v21.6.1/bin:/Users/kenilam/.nvm/versions/node/v21.7.2/bin:/Users/kenilam/.nvm/versions/node/v22.3.0/bin:/Users/kenilam/.nvm/versions/node/v23.11.0/bin:/Users/kenilam/Library/pnpm:/Users/kenilam/bin:/Users/kenilam/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/54685ef1-5047-412a-b499-8512bc62b076/93d15751-6902-4952-85b7-1a5eddffba2b/bin","MCP_CONNECTION_NONBLOCKING":"true","npm_package_json":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/package.json","npm_config_engine_strict":"true","_":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend/node_modules/.bin/vite","npm_config_userconfig":"/Users/kenilam/.npmrc","npm_config_init_module":"/Users/kenilam/.npm-init.js","__CFBundleIdentifier":"com.anthropic.claudefordesktop","npm_command":"exec","PWD":"/Users/kenilam/Documents/ME/WORK/ki-cl.com/Frontend","npm_lifecycle_event":"npx","EDITOR":"vi","npm_package_name":"kicl","npm_config_npm_version":"11.4.2","NODE_USE_SYSTEM_CA":"1","XPC_FLAGS":"0x0","npm_package_engines_node":">=24","npm_config_node_gyp":"/Users/kenilam/.nvm/versions/node/v24.3.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","npm_package_version":"0.0.1","XPC_SERVICE_NAME":"0","SHLVL":"2","HOME":"/Users/kenilam","CLAUDE_CODE_DISABLE_CRON":"","ANTHROPIC_BASE_URL":"https://api.anthropic.com","CLAUDE_CODE_EXECPATH":"/Users/kenilam/Library/Application Support/Claude/claude-code/2.1.219/claude.app/Contents/MacOS/claude","npm_config_save_exact":"true","DISABLE_MICROCOMPACT":"1","npm_config_cache":"/Users/kenilam/.npm","LOGNAME":"kenilam","npm_lifecycle_script":"\\"vite\\"","COREPACK_ENABLE_AUTO_PIN":"0","npm_config_user_agent":"npm/11.4.2 node/v24.3.0 darwin arm64 workspaces/false","CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH":"1","CLAUDE_CODE_SESSION_ID":"405e48d7-2034-43c5-8bfa-b985231aa988","DISABLE_AUTOUPDATER":"1","OSLogRateLimit":"64","CLAUDECODE":"1","npm_node_execpath":"/Users/kenilam/.nvm/versions/node/v24.3.0/bin/node","npm_config_prefix":"/Users/kenilam/.nvm/versions/node/v24.3.0","USE_STAGING_OAUTH":"","NODE_ENV":"production","PORT":"3001"}`.once(
                `exit`,
                () => {
                  try {
                    t(n, { recursive: !0, force: !0 });
                  } catch {}
                }
              ),
              n
            );
          })()),
          k
        );
      })();
    s(p, { recursive: !0 });
    let m = new Map(Object.entries(c));
    try {
      return await (async function (t, n) {
        return await e(() => import(`${t}?v=${encodeURIComponent(n)}`), []);
      })(
        await (async function (
          e,
          t,
          n,
          r = f,
          i = 1e4,
          a = `default`,
          o = 10485760
        ) {
          let s = new Set(),
            c = await P(e, t, new Map(), s, n, r, i, a, o);
          return (await Promise.all(s), c);
        })(
          r,
          p,
          m,
          o,
          n.fetchTimeoutMs,
          (function (e, t) {
            return JSON.stringify([
              t,
              Object.entries(e).sort(([e], [t]) => e.localeCompare(t)),
            ]);
          })(c, n.shareScopeName),
          n.fetchMaxBytes
        ),
        o
      );
    } catch (e) {
      if (v(e) || i(e)) throw e;
      return null;
    }
  }
  try {
    return await e(() => import(r), []);
  } catch {
    return null;
  }
}
function L(e = {}) {
  let t = {
    resolvedShared: e.resolvedShared ?? {},
    strategy: e.strategy ?? `temp-file`,
    shareScopeName: e.shareScopeName ?? `default`,
    maxAgeMs: e.maxAgeMs,
    fetchTimeoutMs: e.fetchTimeoutMs ?? 1e4,
    fetchMaxBytes: e.fetchMaxBytes ?? 10485760,
    cacheContext: {},
  };
  return {
    name: `mf-vite:ssr-entry-loader`,
    async loadEntry({ remoteInfo: e, origin: n }) {
      if (typeof globalThis.process?.versions?.node != `string`) return;
      let r = n ? { ...t, cacheContext: n, federationInstance: n } : t,
        i = await (async function (e, t, n, r) {
          let i = g(e, n, r),
            a = m.get(i);
          if (!a) return E(e, n, r).promise;
          if (!(
            typeof t == `number` &&
            t >= 0 &&
            Date.now() - a.resolvedAt >= t
          ))
            return a.promise;
          let o = await a.promise.catch(() => null);
          h.delete(g(x(e), n, r));
          let s = E(e, n, r),
            c = await s.promise.catch(() => null);
          return (o && c && o.versionKey !== c.versionKey && D(e), s.promise);
        })(e.entry, r.maxAgeMs, r.fetchTimeoutMs, r.fetchMaxBytes);
      return (i && (await I(i, r))) || void 0;
    },
  };
}
export { O as a, a as i, n, L as o, M as r, _ as t };
//# sourceMappingURL=ssrEntryLoader-BUD1-3Z2-CD9UkcYe.js.map
